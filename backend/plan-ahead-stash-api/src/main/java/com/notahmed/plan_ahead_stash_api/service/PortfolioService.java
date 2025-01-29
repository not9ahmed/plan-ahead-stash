package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public Portfolio create(Portfolio portfolio) {

        // check if already exists

        return portfolioRepository.save(portfolio);
    }

    public Portfolio findById(Long id) {

        Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Portfolio not found"));

        return portfolio;
    }

    // Add pagination
    public List<Portfolio> findAll() {
        return portfolioRepository.findAll();
    }

    public Portfolio update(Long id, Portfolio portfolio) {

        // first find existing in db
        Portfolio portfolioDb = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Portfolio not found"));

        // map from db
        var updatedPortfolio = new Portfolio(
                id,
                portfolio.getName(),
                portfolio.getUser(),
                portfolioDb.getCreatedDate(),
                new Date()

        );

        Portfolio portfolioSaved = portfolioRepository.save(updatedPortfolio);

        return portfolioSaved;
    }


    public void delete(Long id) {

        // check if it exists
        portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Portfolio not found"));

        portfolioRepository.deleteById(id);
    }

}
