package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.dto.request.PortfolioRequest;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.model.User;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioRepository;
import com.notahmed.plan_ahead_stash_api.service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }


    @PostMapping
    public ResponseEntity<Portfolio> create(@RequestBody PortfolioRequest portfolio) {

        // map PortfolioRequest to Portfolio
        var tempUser = new User();
        tempUser.setId(portfolio.userId());

        Portfolio portfolioToBeSaved = new Portfolio(
                null,
                portfolio.name(),
                tempUser,
                null,
                null
        );

        Portfolio result = portfolioService.create(portfolioToBeSaved);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(result);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> findById(@PathVariable("id") Long id) {
        Portfolio result = portfolioService.findById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }


    @GetMapping("/")
    public ResponseEntity<List<Portfolio>> findAll() {
        List<Portfolio> result = portfolioService.findAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> update(@PathVariable("id") Long id, @RequestBody Portfolio portfolio) {
        Portfolio result = portfolioService.update(id, portfolio);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Portfolio> delete(@PathVariable("id") Long id) {
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }

}
