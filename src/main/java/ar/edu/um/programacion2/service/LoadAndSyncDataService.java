package ar.edu.um.programacion2.service;

import ar.edu.um.programacion2.domain.Adicional;
import ar.edu.um.programacion2.domain.Caracteristica;
import ar.edu.um.programacion2.domain.Dispositivo;
import ar.edu.um.programacion2.domain.Opcion;
import ar.edu.um.programacion2.domain.Personalizacion;
import ar.edu.um.programacion2.repository.AdicionalRepository;
import ar.edu.um.programacion2.repository.CaracteristicaRepository;
import ar.edu.um.programacion2.repository.DispositivoRepository;
import ar.edu.um.programacion2.repository.OpcionRepository;
import ar.edu.um.programacion2.repository.PersonalizacionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Transactional
public class LoadAndSyncData {

    private final Logger log = LoggerFactory.getLogger(LoadAndSyncData.class);

    private final DispositivoRepository dispositivoRepository;
    private final CaracteristicaRepository caracteristicaRepository;
    private final PersonalizacionRepository personalizacionRepository;
    private final OpcionRepository opcionRepository;
    private final AdicionalRepository adicionalRepository;

    private final GetApiDataService getApiDataService;

    private final ObjectMapper mapper = new ObjectMapper();
    private final WebClient webClient;

    public LoadAndSyncData(
        DispositivoRepository dispositivoRepository,
        CaracteristicaRepository caracteristicaRepository,
        PersonalizacionRepository personalizacionRepository,
        OpcionRepository opcionRepository,
        AdicionalRepository adicionalRepository,
        GetApiDataService getApiDataService
    ) {
        this.dispositivoRepository = dispositivoRepository;
        this.caracteristicaRepository = caracteristicaRepository;
        this.personalizacionRepository = personalizacionRepository;
        this.opcionRepository = opcionRepository;
        this.adicionalRepository = adicionalRepository;
        this.getApiDataService = getApiDataService;
        this.webClient =
            WebClient
                .builder()
                .baseUrl("http://192.168.194.254:8080/api/catedra/dispositivos")
                .defaultHeader("Authorization", "Bearer " + GetApiDataService.JWT_TOKEN)
                .build();
    }

    // Método que se ejecuta al iniciar la aplicación
    @PostConstruct
    public void init() {
        log.info("Iniciando sincronización de datos al iniciar la aplicación...");
        syncData();
    }

    // Ejecutar cada 6 horas
    @Scheduled(fixedRate = 21600000)
    public void syncData() {
        log.info("Iniciando sincronización de datos programada...");
        try {
            syncDispositivos();
            syncCaracteristicas();
            syncPersonalizaciones();
            syncOpciones();
            syncAdicionales();
            log.info("Sincronización de datos completada.");
        } catch (Exception e) {
            log.error("Error en la sincronización de datos: ", e);
        }
    }

    private void syncDispositivos() throws IOException {
        JsonNode dispositivosNode = getApiDataService.getDispositivos();
        List<Dispositivo> dispositivos = new ArrayList<>();
        for (JsonNode dispositivoNode : dispositivosNode) {
            Dispositivo dispositivo = new Dispositivo();
            dispositivo.setId(dispositivoNode.get("id").asLong());
            dispositivo.setCodigo(dispositivoNode.get("codigo").asText());
            dispositivo.setNombre(dispositivoNode.get("nombre").asText());
            dispositivo.setDescripcion(dispositivoNode.get("descripcion").asText());
            dispositivo.setPrecioBase(dispositivoNode.get("precioBase").asDouble());
            dispositivo.setMoneda(dispositivoNode.get("moneda").asText());
            dispositivos.add(dispositivo);
        }

        for (Dispositivo dispositivo : dispositivos) {
            if (!dispositivoRepository.existsById(dispositivo.getId())) {
                dispositivoRepository.save(dispositivo);
            }
        }
    }

    private void syncCaracteristicas() throws IOException {
        JsonNode caracteristicasNode = getApiDataService.getCaracteristicas();
        List<Caracteristica> caracteristicas = new ArrayList<>();
        for (JsonNode caracteristicaNode : caracteristicasNode) {
            Caracteristica caracteristica = new Caracteristica();
            caracteristica.setId(caracteristicaNode.get("id").asLong());
            caracteristica.setNombre(caracteristicaNode.get("nombre").asText());
            caracteristica.setDescripcion(caracteristicaNode.get("descripcion").asText());

            // Obtén el dispositivo asociado
            JsonNode dispositivoNode = caracteristicaNode.get("dispositivo");
            if (dispositivoNode != null) {
                Dispositivo dispositivo = new Dispositivo();
                dispositivo.setId(dispositivoNode.get("id").asLong());
                dispositivo.setNombre(dispositivoNode.get("nombre").asText());
                caracteristica.setDispositivo(dispositivo);
            }
            caracteristicas.add(caracteristica);
        }

        for (Caracteristica caracteristica : caracteristicas) {
            if (!caracteristicaRepository.existsById(caracteristica.getId())) {
                caracteristicaRepository.save(caracteristica);
            }
        }
    }

    private void syncPersonalizaciones() throws IOException {
        JsonNode personalizacionesNode = getApiDataService.getPersonalizaciones();
        List<Personalizacion> personalizaciones = new ArrayList<>();
        for (JsonNode personalizacionNode : personalizacionesNode) {
            Personalizacion personalizacion = new Personalizacion();
            personalizacion.setId(personalizacionNode.get("id").asLong());
            personalizacion.setNombre(personalizacionNode.get("nombre").asText());
            personalizacion.setDescripcion(personalizacionNode.get("descripcion").asText());

            // Obtén el dispositivo asociado
            JsonNode dispositivoNode = personalizacionNode.get("dispositivo");
            if (dispositivoNode != null) {
                Dispositivo dispositivo = new Dispositivo();
                dispositivo.setId(dispositivoNode.get("id").asLong());
                dispositivo.setNombre(dispositivoNode.get("nombre").asText());
                personalizacion.setDispositivo(dispositivo);
            }
            personalizaciones.add(personalizacion);
        }

        for (Personalizacion personalizacion : personalizaciones) {
            if (!personalizacionRepository.existsById(personalizacion.getId())) {
                personalizacionRepository.save(personalizacion);
            }
        }
    }

    private void syncOpciones() throws IOException {
        JsonNode opcionesNode = getApiDataService.getOpciones();
        List<Opcion> opciones = new ArrayList<>();
        for (JsonNode opcionNode : opcionesNode) {
            Opcion opcion = new Opcion();
            opcion.setId(opcionNode.get("id").asLong());
            opcion.setCodigo(opcionNode.get("codigo").asText());
            opcion.setNombre(opcionNode.get("nombre").asText());
            opcion.setDescripcion(opcionNode.get("descripcion").asText());
            opcion.setPrecioAdicional(opcionNode.get("precioAdicional").asDouble());

            // Obtén la personalización asociada
            JsonNode personalizacionNode = opcionNode.get("personalizacion");
            if (personalizacionNode != null) {
                Personalizacion personalizacion = new Personalizacion();
                personalizacion.setId(personalizacionNode.get("id").asLong());
                personalizacion.setNombre(personalizacionNode.get("nombre").asText());
                opcion.setPersonalizacion(personalizacion);
            }
            opciones.add(opcion);
        }

        for (Opcion opcion : opciones) {
            if (!opcionRepository.existsById(opcion.getId())) {
                opcionRepository.save(opcion);
            }
        }
    }

    private void syncAdicionales() throws IOException {
        JsonNode adicionalesNode = getApiDataService.getAdicionales();
        List<Adicional> adicionales = new ArrayList<>();
        for (JsonNode adicionalNode : adicionalesNode) {
            Adicional adicional = new Adicional();
            adicional.setId(adicionalNode.get("id").asLong());
            adicional.setNombre(adicionalNode.get("nombre").asText());
            adicional.setDescripcion(adicionalNode.get("descripcion").asText());
            adicional.setPrecio(adicionalNode.get("precio").asDouble());
            adicional.setPrecioGratis(adicionalNode.get("precioGratis").asDouble());

            // Obtén el dispositivo asociado
            JsonNode dispositivoNode = adicionalNode.get("dispositivo");
            if (dispositivoNode != null) {
                Dispositivo dispositivo = new Dispositivo();
                dispositivo.setId(dispositivoNode.get("id").asLong());
                dispositivo.setNombre(dispositivoNode.get("nombre").asText());
                adicional.setDispositivo(dispositivo);
            }
            adicionales.add(adicional);
        }

        for (Adicional adicional : adicionales) {
            if (!adicionalRepository.existsById(adicional.getId())) {
                adicionalRepository.save(adicional);
            }
        }
    }
}
