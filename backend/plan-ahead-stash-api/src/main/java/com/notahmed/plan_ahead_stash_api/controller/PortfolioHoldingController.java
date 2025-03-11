package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.model.PortfolioHolding;
import com.notahmed.plan_ahead_stash_api.service.PortfolioHoldingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        System.out.println("portfolioId: "+ portfolioId);
        portfolioHoldingService.create(portfolioHolding);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(portfolioHolding);
    }


    @GetMapping("/{id}/holdings")
    public ResponseEntity<List<PortfolioHolding>> findAll() {

        List<PortfolioHolding> portfolioHoldingList = portfolioHoldingService.findAll();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(portfolioHoldingList);
    }


}
