package com.notahmed.plan_ahead_stash_api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class PlanAheadStashApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlanAheadStashApiApplication.class, args);
	}

}
