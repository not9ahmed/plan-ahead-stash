package com.notahmed.plan_ahead_stash_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    // accessing the header in controller
    @GetMapping("")
    public ResponseEntity<Object> home(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok("Hello world: "+token);
    }
}
