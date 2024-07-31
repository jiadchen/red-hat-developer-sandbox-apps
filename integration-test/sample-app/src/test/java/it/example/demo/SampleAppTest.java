package it.example.demo;

import it.example.config.AppProperties;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class SampleAppTest {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private AppProperties appProperties;

  @Test
  public void sayHelloTest() {
    // Arrange
    String expected = "Hello, openshift! version:1.0.49";
    int expectedStatusCode = 200;

    // Act
    RestTemplate restTemplate = new RestTemplate();
    String url = appProperties.getApiUrl() + "/hello";

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    String actual = response.getBody();
    int actualStatusCode = response.getStatusCode().value();

    assertThat(actualStatusCode).isEqualTo(expectedStatusCode);
    assertThat(actual).isEqualTo(expected);
  }
}
