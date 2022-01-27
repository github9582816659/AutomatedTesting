package com.testing.automated;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import java.time.ZoneId;
import java.util.TimeZone;


@SpringBootApplication
public class AutomatedApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomatedApplication.class, args);
	}

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone(ZoneId.of("Europe/Zurich")));
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4201")
						.allowCredentials(true)
						.allowedMethods("GET", "POST", "OPTIONS","PATCH", "DELETE","PUT")
						.allowedHeaders("*");
			}
		};
	}
}
