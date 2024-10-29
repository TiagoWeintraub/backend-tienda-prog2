package ar.edu.um.programacion2.service.mapper;

import ar.edu.um.programacion2.domain.Adicional;
import ar.edu.um.programacion2.domain.Dispositivo;
import ar.edu.um.programacion2.domain.Venta;
import ar.edu.um.programacion2.service.dto.AdicionalDTO;
import ar.edu.um.programacion2.service.dto.DispositivoDTO;
import ar.edu.um.programacion2.service.dto.VentaDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Dispositivo} and its DTO {@link DispositivoDTO}.
 */
@Mapper(componentModel = "spring")
public interface DispositivoMapper extends EntityMapper<DispositivoDTO, Dispositivo> {
    @Mapping(target = "adicionales", source = "adicionales", qualifiedByName = "adicionalIdSet")
    @Mapping(target = "venta", source = "venta", qualifiedByName = "ventaId")
    DispositivoDTO toDto(Dispositivo s);

    @Mapping(target = "removeAdicionales", ignore = true)
    Dispositivo toEntity(DispositivoDTO dispositivoDTO);

    @Named("adicionalId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AdicionalDTO toDtoAdicionalId(Adicional adicional);

    @Named("adicionalIdSet")
    default Set<AdicionalDTO> toDtoAdicionalIdSet(Set<Adicional> adicional) {
        return adicional.stream().map(this::toDtoAdicionalId).collect(Collectors.toSet());
    }

    @Named("ventaId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VentaDTO toDtoVentaId(Venta venta);
}
