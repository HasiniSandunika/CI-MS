package com.hasini.cims.recordservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EntityScan(basePackages = "com.hasini.cims.models.record")
public class RecordServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecordServiceApplication.class, args);
	}

}
