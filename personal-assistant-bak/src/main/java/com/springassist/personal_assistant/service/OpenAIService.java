package com.springassist.personal_assistant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    @Autowired
    public OpenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getResponse(String prompt) {
        String url = "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";
        Map<String, Object> request = new HashMap<>();
        request.put("prompt", prompt);
        request.put("max_tokens", 100);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, String>> choices = (List<Map<String, String>>) responseBody.get("choices");
            return choices.get(0).get("text");
        } catch (Exception e) {
            if (e instanceof org.springframework.web.client.HttpClientErrorException.TooManyRequests) {
                // Handle rate limit error, maybe implement retry logic
                return "Rate limit exceeded, please try again later.";
            } else {
                throw new RuntimeException("An error occurred while fetching response from OpenAI", e);
            }
        }
    }
}
