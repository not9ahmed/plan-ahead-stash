package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.model.PortfolioHolding;
import com.notahmed.plan_ahead_stash_api.service.PortfolioHoldingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioHoldingController {

    private final PortfolioHoldingService portfolioHoldingService;

    public PortfolioHoldingController(PortfolioHoldingService portfolioHoldingService) {
        this.portfolioHoldingService = portfolioHoldingService;
    }


    @PostMapping("/{id}/holdings")
    public ResponseEntity<PortfolioHolding> create(@PathVariable("id") Long portfolioId,
                                                         @RequestBody @Valid PortfolioHolding portfolioHolding) {

        // getting portfolioId from path variable
        System.out.println("portfolioId: "+ portfolioId);
        Portfolio portfolio = new Portfolio();
        portfolio.setId(portfolioId);

        portfolioHolding.setPortfolio(portfolio);


        PortfolioHolding result = portfolioHoldingService.create(portfolioHolding);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(result);
    }


    @PostMapping("/{id}/holdings/bulk")
    public ResponseEntity<List<PortfolioHolding>> bulkCreate(@PathVariable("id") Long portfolioId,
                                                   @RequestBody @Valid List<PortfolioHolding> portfolioHoldings) {

        // getting portfolioId from path variable
        System.out.println("portfolioId: "+ portfolioId);

        System.out.println("portfolioHoldings: "+ portfolioHoldings);


        List<PortfolioHolding> result = portfolioHoldingService.bulkCreate(portfolioHoldings);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(result);

    }

    @GetMapping("/holdings/")
    public ResponseEntity<List<PortfolioHolding>> findAll() {

        List<PortfolioHolding> portfolioHoldingList = portfolioHoldingService.findAll();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(portfolioHoldingList);
    }


    @GetMapping("/{id}/holdings/")
    public ResponseEntity<List<PortfolioHolding>> findAllByPortfolio(@PathVariable("id") Long portfolioId) {
        List<PortfolioHolding> portfolioHoldingList = portfolioHoldingService.findAllByPortfolio(portfolioId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(portfolioHoldingList);
    }


    @DeleteMapping("/{id}/holdings/{portfolioId}")
    public ResponseEntity<List<PortfolioHolding>> delete(@PathVariable("id") Long id,
                                                         @PathVariable("portfolioId") Long portfolioId) {
        System.out.println("id: "+ id);
        System.out.println("portfolioId: "+ portfolioId);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(List.of());
    }



}
