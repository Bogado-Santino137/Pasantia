package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// Esta responde en: http://localhost:8080/hola
	@GetMapping("/hola")
	public String holaMundo() {
		return "Hola";
	}

	// NUEVA: Esta responde en: http://localhost:8080/html
	@GetMapping("/html")
	public String holaMundo2() {
		return "<h1> A </h1>";
	}
}

