package ar.edu.um.programacion2.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GetApiDataService {

    public static final String URL = "http://192.168.194.254:8080/api/catedra/dispositivos";
    public static final String JWT_TOKEN =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGVmYW5vMTIzIiwiZXhwIjoxNzM3NzUxMjYzLCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzI5MTExMjYzfQ.MN7mDl7nswUM30IHJlvkfSjjqe_5NAEC6CGIF07SHCu-1R2fr1cETw0MtX7G6Aa47WqiPsoY5qPTgR2REs_jFA";
    public static ObjectMapper mapper = new ObjectMapper();

    private static String getDataFromApi() throws IOException {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet request = new HttpGet(URL);
            request.addHeader("Authorization", "Bearer " + JWT_TOKEN);

            try (CloseableHttpResponse response = httpClient.execute(request)) {
                HttpEntity entity = response.getEntity();
                return EntityUtils.toString(entity);
            }
        }
    }

    public JsonNode getDispositivos() throws IOException {
        String jsonResponse = getDataFromApi();
        return mapper.readTree(jsonResponse);
    }

    public JsonNode getCaracteristicas() throws IOException {
        String jsonResponse = getDataFromApi();
        return mapper.readTree(jsonResponse);
    }

    public JsonNode getPersonalizaciones() throws IOException {
        String jsonResponse = getDataFromApi();
        return mapper.readTree(jsonResponse);
    }

    public JsonNode getOpciones() throws IOException {
        String jsonResponse = getDataFromApi();
        return mapper.readTree(jsonResponse);
    }

    public JsonNode getAdicionales() throws IOException {
        String jsonResponse = getDataFromApi();
        return mapper.readTree(jsonResponse);
    }
}
