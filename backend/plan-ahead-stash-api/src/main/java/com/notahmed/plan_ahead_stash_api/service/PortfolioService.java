package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.model.User;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioRepository;
import com.notahmed.plan_ahead_stash_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    private final UserRepository userRepository;

    public PortfolioService(PortfolioRepository portfolioRepository, UserRepository userRepository) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    public Portfolio create(Portfolio portfolio) {

        // find the user
        User user = userRepository.findById(portfolio.getUser().getId())
                .orElseThrow(() -> new ResourceNotFound("User does not exist"));

        // cer
        Portfolio portfolioTobeSaved = new Portfolio(
                portfolio.getId(),
                portfolio.getName(),
                user,
                new Date(),
                null
        );

        return portfolioRepository.save(portfolioTobeSaved);
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

        // find existing portfolio in db
        Portfolio portfolioDb = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Portfolio not found"));

        // find existing user in db
        User user = userRepository.findById(portfolio.getUser().getId())
                .orElseThrow(() -> new ResourceNotFound("User not found"));

        // map from db
        var updatedPortfolio = new Portfolio(
                id,
                portfolio.getName(),
                user,
                portfolioDb.getCreatedDate(),
                null

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
