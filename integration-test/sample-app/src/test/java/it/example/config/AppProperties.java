package it.example.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppProperties {
    @Value("${environment}")
    private String environment;

    @Value("${application.api.url}")
    private String apiUrl;

    public String getEnvironment() { return environment; }

    public String getApiUrl() { return apiUrl; }


}

