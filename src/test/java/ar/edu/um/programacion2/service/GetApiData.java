//package ar.edu.um.programacion2.service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ArrayNode;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import java.io.IOException;
//import java.util.HashSet;
//import java.util.Set;
//import org.springframework.stereotype.Service;
//
//@Service
//public class JSONDeserializer {
//
//    public static JSONRequester jsonRequester = new JSONRequester();
//    public static ObjectMapper mapper = new ObjectMapper();
//
//    public static String dispositivosFromJson() throws IOException {
//        String jsonResponse = jsonRequester.getJSONFromEndpoint(
//            "http://192.168.194.254:8080",
//            "/api/dispositivos",
//            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aWFnb3ciLCJleHAiOjE3MzU3MzczMzIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE3MjcwOTczMzJ9.2fQLGp7mRSRK3zzcCOje-D6ukhRieCW6CHkY1oJX3vn1olL_kHs87KLVDCexsWwOatZ1ip-Y7wCFnobrzkBL6w"
//        );
//        ArrayNode originalArray = (ArrayNode) mapper.readTree(jsonResponse);
//        ArrayNode resultArray = mapper.createArrayNode();
//        Set<Integer> processedIds = new HashSet<>();
//
//        for (int i = 0; i < originalArray.size(); i++) {
//            ObjectNode device = (ObjectNode) originalArray.get(i);
//            int id = device.get("id").asInt();
//
//            if (!processedIds.contains(id)) {
//                processedIds.add(id);
//                ObjectNode simpleDevice = mapper.createObjectNode();
//                simpleDevice.put("id", id);
//                simpleDevice.put("codigo", device.get("codigo").asText());
//                simpleDevice.put("nombre", device.get("nombre").asText());
//                simpleDevice.put("descripcion", device.get("descripcion").asText());
//                simpleDevice.put("precioBase", device.get("precioBase").asDouble());
//                simpleDevice.put("moneda", device.get("moneda").asText());
//                resultArray.add(simpleDevice);
//            }
//        }
//        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultArray);
//    }
//
//    public static String caracteristicasFromJson() throws IOException {
//        String jsonResponse = jsonRequester.getJSONFromEndpoint(
//            "http://192.168.194.254:8080",
//            "/api/dispositivos",
//            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWxpYW5jYXN0aWxsbyIsImV4cCI6MTczNjUyMzE5MiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzg4MzE5Mn0.FbIpN_C-wofDOe7mYMpFGySrNFgmqo4mMFFB8nrcmfBsuzKxT4mzLsmyQkjQmSWF4bN4n0HOuOpYAeBv7QMHaw"
//        );
//        ArrayNode originalArray = (ArrayNode) mapper.readTree(jsonResponse);
//        ArrayNode resultArray = mapper.createArrayNode();
//        Set<Integer> processedIds = new HashSet<>();
//
//        for (int i = 0; i < originalArray.size(); i++) {
//            ObjectNode device = (ObjectNode) originalArray.get(i);
//            ArrayNode caracteristicas = (ArrayNode) device.get("caracteristicas");
//
//            for (int j = 0; j < caracteristicas.size(); j++) {
//                ObjectNode caracteristica = (ObjectNode) caracteristicas.get(j);
//                int caracteristicaId = caracteristica.get("id").asInt();
//
//                if (!processedIds.contains(caracteristicaId)) {
//                    processedIds.add(caracteristicaId);
//                    // Dispositivo anidado
//                    ObjectNode dispositivo = mapper.createObjectNode();
//                    dispositivo.put("id", device.get("id").asInt());
//                    dispositivo.put("nombre", device.get("nombre").asText());
//                    caracteristica.set("dispositivos", dispositivo);
//                    resultArray.add(caracteristica);
//                }
//            }
//        }
//        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultArray);
//    }
//
//    public static String opcionesFromJson() throws IOException {
//        String jsonResponse = jsonRequester.getJSONFromEndpoint(
//            "http://192.168.194.254:8080",
//            "/api/dispositivos",
//            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWxpYW5jYXN0aWxsbyIsImV4cCI6MTczNjUyMzE5MiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzg4MzE5Mn0.FbIpN_C-wofDOe7mYMpFGySrNFgmqo4mMFFB8nrcmfBsuzKxT4mzLsmyQkjQmSWF4bN4n0HOuOpYAeBv7QMHaw"
//        );
//        ArrayNode originalArray = (ArrayNode) mapper.readTree(jsonResponse);
//        ArrayNode resultArray = mapper.createArrayNode();
//        Set<Integer> processedIds = new HashSet<>();
//
//        for (int i = 0; i < originalArray.size(); i++) {
//            ObjectNode device = (ObjectNode) originalArray.get(i);
//            ArrayNode personalizaciones = (ArrayNode) device.get("personalizaciones");
//
//            for (int j = 0; j < personalizaciones.size(); j++) {
//                ObjectNode personalizacion = (ObjectNode) personalizaciones.get(j);
//                ArrayNode opciones = (ArrayNode) personalizacion.get("opciones");
//
//                for (int k = 0; k < opciones.size(); k++) {
//                    ObjectNode opcion = (ObjectNode) opciones.get(k);
//                    int opcionId = opcion.get("id").asInt();
//
//                    if (!processedIds.contains(opcionId)) {
//                        processedIds.add(opcionId);
//                        // Anidar personalización en opción
//                        ObjectNode personalizacionNode = mapper.createObjectNode();
//                        personalizacionNode.put("id", personalizacion.get("id").asInt());
//                        personalizacionNode.put("nombre", personalizacion.get("nombre").asText());
//                        opcion.set("personalizaciones", personalizacionNode);
//                        resultArray.add(opcion);
//                    }
//                }
//            }
//        }
//        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultArray);
//    }
//
//    public static String adicionalesFromJson() throws IOException {
//        String jsonResponse = jsonRequester.getJSONFromEndpoint(
//            "http://192.168.194.254:8080",
//            "/api/dispositivos",
//            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWxpYW5jYXN0aWxsbyIsImV4cCI6MTczNjUyMzE5MiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzg4MzE5Mn0.FbIpN_C-wofDOe7mYMpFGySrNFgmqo4mMFFB8nrcmfBsuzKxT4mzLsmyQkjQmSWF4bN4n0HOuOpYAeBv7QMHaw"
//        );
//        ArrayNode originalArray = (ArrayNode) mapper.readTree(jsonResponse);
//        ArrayNode resultArray = mapper.createArrayNode();
//        Set<Integer> processedIds = new HashSet<>();
//
//        for (int i = 0; i < originalArray.size(); i++) {
//            ObjectNode device = (ObjectNode) originalArray.get(i);
//            ArrayNode adicionales = (ArrayNode) device.get("adicionales");
//
//            for (int j = 0; j < adicionales.size(); j++) {
//                ObjectNode adicional = (ObjectNode) adicionales.get(j);
//                int adicionalId = adicional.get("id").asInt();
//
//                if (!processedIds.contains(adicionalId)) {
//                    processedIds.add(adicionalId);
//                    // Anidar dispositivo en adicional
//                    ObjectNode dispositivo = mapper.createObjectNode();
//                    dispositivo.put("id", device.get("id").asInt());
//                    dispositivo.put("nombre", device.get("nombre").asText());
//                    adicional.set("dispositivos", dispositivo);
//                    resultArray.add(adicional);
//                }
//            }
//        }
//
//        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultArray);
//    }
//
//    public static String personalizacionesFromJson() throws IOException {
//        String jsonResponse = jsonRequester.getJSONFromEndpoint(
//            "http://192.168.194.254:8080",
//            "/api/dispositivos",
//            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWxpYW5jYXN0aWxsbyIsImV4cCI6MTczNjUyMzE5MiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzg4MzE5Mn0.FbIpN_C-wofDOe7mYMpFGySrNFgmqo4mMFFB8nrcmfBsuzKxT4mzLsmyQkjQmSWF4bN4n0HOuOpYAeBv7QMHaw"
//        );
//        ArrayNode originalArray = (ArrayNode) mapper.readTree(jsonResponse);
//        ArrayNode resultArray = mapper.createArrayNode();
//        Set<Integer> processedIds = new HashSet<>();
//
//        for (int i = 0; i < originalArray.size(); i++) {
//            ObjectNode device = (ObjectNode) originalArray.get(i);
//            ArrayNode personalizaciones = (ArrayNode) device.get("personalizaciones");
//
//            for (int j = 0; j < personalizaciones.size(); j++) {
//                ObjectNode personalizacion = (ObjectNode) personalizaciones.get(j);
//                int personalizacionId = personalizacion.get("id").asInt();
//
//                if (!processedIds.contains(personalizacionId)) {
//                    processedIds.add(personalizacionId);
//                    // Anidar dispositivo en personalización
//                    ObjectNode dispositivo = mapper.createObjectNode();
//                    dispositivo.put("id", device.get("id").asInt());
//                    dispositivo.put("nombre", device.get("nombre").asText());
//                    personalizacion.set("dispositivos", dispositivo);
//                    personalizacion.remove("opciones");
//                    resultArray.add(personalizacion);
//                }
//            }
//        }
//
//        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultArray);
//    }
//
//    public static void main(String[] args) {
//        try {
//            // Prueba de dispositivosFromJson()
//            System.out.println("Probando dispositivosFromJson:");
//            String dispositivosJson = JSONDeserializer.dispositivosFromJson();
//            System.out.println(dispositivosJson);
//
//            // Prueba de caracteristicasFromJson()
//            System.out.println("Probando caracteristicasFromJson:");
//            String caracteristicasJson = JSONDeserializer.caracteristicasFromJson();
//            System.out.println(caracteristicasJson);
//
//            // Prueba de opcionesFromJson()
//            System.out.println("Probando opcionesFromJson:");
//            String opcionesJson = JSONDeserializer.opcionesFromJson();
//            System.out.println(opcionesJson);
//
//            // Prueba de adicionalesFromJson()
//            System.out.println("Probando adicionalesFromJson:");
//            String adicionalesJson = JSONDeserializer.adicionalesFromJson();
//            System.out.println(adicionalesJson);
//
//            // Prueba de personalizacionesFromJson()
//            System.out.println("Probando personalizacionesFromJson:");
//            String personalizacionesJson = JSONDeserializer.personalizacionesFromJson();
//            System.out.println(personalizacionesJson);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
