package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.model.Investment;
import com.notahmed.plan_ahead_stash_api.repository.InvestmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestmentService {

    private final InvestmentRepository investmentRepository;

    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }

    public Optional<Investment> findById(Long id) {
        return investmentRepository.findById(id);
    }

    // TODO: Pagination to be added
    public List<Investment> findAll() {
        return investmentRepository.findAll();
    }

    public Investment create(Investment investment) {
        return investmentRepository.save(investment);
    }

    public Investment update(Long id, Investment investment) {
        investment.setId(id);
        return investmentRepository.save(investment);
    }

    public void delete(Long id) {
        investmentRepository.deleteById(id);
    }


}
