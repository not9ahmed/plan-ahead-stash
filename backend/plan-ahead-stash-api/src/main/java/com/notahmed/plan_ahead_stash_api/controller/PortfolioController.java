package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.dto.request.PortfolioRequest;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.model.User;
import com.notahmed.plan_ahead_stash_api.service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

        // create temp user
        var tempUser = new User();
        tempUser.setId(portfolio.userId());

        // map PortfolioRequest to Portfolio
        Portfolio portfolioToBeSaved = new Portfolio(
                null,
                portfolio.name(),
                portfolio.description(),
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
    public ResponseEntity<Portfolio> update(@PathVariable("id") Long id, @RequestBody PortfolioRequest portfolio) {
        // create temp user
        var tempUser = new User();
        tempUser.setId(portfolio.userId());

        // map PortfolioRequest to Portfolio
        Portfolio portfolioToBeUpdated = new Portfolio(
                id,
                portfolio.name(),
                portfolio.description(),
                tempUser,
                null,
                null
        );

        Portfolio result = portfolioService.update(id, portfolioToBeUpdated);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        portfolioService.delete(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }


    @PostMapping("/bulk")
    public ResponseEntity<List<Portfolio>> bulkCreate(@RequestBody List<PortfolioRequest> portfolios) {

        List<Portfolio> portfolioList = portfolios.stream()
                .map(p -> new Portfolio(
                        null,
                        p.name(),
                        p.description(),
                        new User(p.userId(), null, null, null, null, null, null),
                        null,
                        null
                )).toList();

        List<Portfolio> result = portfolioService.bulkCreate(portfolioList);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(result);
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<?> bulkDelete() {
        portfolioService.bulkDelete();
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<List<Portfolio>> findByUserId(@PathVariable("id") Long userId) {

        System.out.println("userId: " + userId);
        List<Portfolio> portfolios = portfolioService.findByUserId(userId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(portfolios);
    }


    @GetMapping("/name/{name}")
    public ResponseEntity<List<Portfolio>> findByUserId(@PathVariable("name") String name) {

        System.out.println("userId: " + name);
        List<Portfolio> portfolios = portfolioService.findAllByName(name);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(portfolios);
    }

}
