package com.mybooks.configuration;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TrafficSimulator {

    private final RestTemplate restTemplate;

    public TrafficSimulator(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Scheduled(cron = "0 */13 * * * *")
    public void sendGetRequest() {
        String URL = "https://my-books-server.onrender.com/books";

        restTemplate.getForObject(URL, String.class);

        System.out.println("Wakeup request successfully sent at: " +
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss")));

    }
}
