package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Investment;
import com.notahmed.plan_ahead_stash_api.service.InvestmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// TODO: Create DTO for requests, responses
@RestController
@RequestMapping("/investments")
public class InvestmentController {

    private final InvestmentService investmentService;

    public InvestmentController(InvestmentService investmentService) {
        this.investmentService = investmentService;
    }


    @PostMapping
    public ResponseEntity<Investment> createInvestment(@RequestBody @Valid Investment investment) {
        var investmentSaved = investmentService.create(investment);
        return ResponseEntity.status(HttpStatus.CREATED).body(investmentSaved);
    }

    @GetMapping("/")
    public ResponseEntity<List<Investment>> getAllInvestments() {
        var investments = investmentService.findAll();
        return ResponseEntity.status(HttpStatus.OK)
                .body(investments);
    }


    @GetMapping("/active")
    public ResponseEntity<List<Investment>> getAllActiveInvestments() {
        var investments = investmentService.findAllActive();
        return ResponseEntity.status(HttpStatus.OK)
                .body(investments);
    }


    @GetMapping("/currency")
    public ResponseEntity<List<Investment>> getAllInvestmentsByCurrency(@RequestParam("name") String name) {
        var investments = investmentService.findAllByCurrency(name);
        return ResponseEntity.status(HttpStatus.OK)
                .body(investments);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Investment> getInvestmentById(@PathVariable("id") Long id) {
        var investment = investmentService.findById(id).orElseThrow(() -> new ResourceNotFound("Resource not found"));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(investment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Investment> updateInvestment(@PathVariable("id") Long id,
                                                       @RequestBody Investment investment) {

        var investmentUpdated = investmentService.update(id, investment);
        return ResponseEntity.status(HttpStatus.OK)
                .body(investmentUpdated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Investment> deleteInvestment(@PathVariable("id") Long id) {
        investmentService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
