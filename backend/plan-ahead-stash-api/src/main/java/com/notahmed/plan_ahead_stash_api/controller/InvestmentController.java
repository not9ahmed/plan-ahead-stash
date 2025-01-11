package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.model.Investment;
import com.notahmed.plan_ahead_stash_api.service.InvestmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investments")
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }


    // @GetMapping
    // public ResponseEntity<Investment> findInvestment(Long id)


    @PostMapping
    public ResponseEntity<Investment> createInvestment(@RequestBody @Valid Investment investment) {
        Investment investmentSaved = investmentService.create(investment);
        return ResponseEntity.status(HttpStatus.CREATED).body(investmentSaved);
    }


}
