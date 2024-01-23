package com.codecool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("/.env")
public class TouristsParadiseApplication {
    public static void main(String[] args) {
        SpringApplication.run(TouristsParadiseApplication.class, args);
    }
}