package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.PortfolioHolding;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioHoldingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioHoldingService {

    public final PortfolioHoldingRepository portfolioHoldingRepository;

    public PortfolioHoldingService(PortfolioHoldingRepository portfolioHoldingRepository) {
        this.portfolioHoldingRepository = portfolioHoldingRepository;
    }

    @Transactional
    public PortfolioHolding create(PortfolioHolding portfolioHolding) {
        return portfolioHoldingRepository.save(portfolioHolding);
    }

    public List<PortfolioHolding> findAll() {
        return portfolioHoldingRepository.findAll();
    }

    public PortfolioHolding findById(Long id) {
        return portfolioHoldingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("PortfolioHolding not found"));
    }

    @Transactional
    public PortfolioHolding update(Long id, PortfolioHolding portfolioHolding) {

        // first find existing
        PortfolioHolding dbPortfolioHolding = portfolioHoldingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("PortfolioHolding not found"));

        // update
        PortfolioHolding portfolioHoldingUpdated = new PortfolioHolding(
                id,
                dbPortfolioHolding.getPortfolios(),
                dbPortfolioHolding.getAssets(),
                dbPortfolioHolding.getQuantity(),
                dbPortfolioHolding.getPurchasePrice(),
                dbPortfolioHolding.getPurchaseDate(),
                dbPortfolioHolding.getCreatedDate(),
                dbPortfolioHolding.getModifiedDate()
        );

        return portfolioHoldingRepository.save(portfolioHoldingUpdated);
    }

    @Transactional
    public void delete(Long id) {
        portfolioHoldingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("PortfolioHolding not found"));

        portfolioHoldingRepository.deleteById(id);
    }


    @Transactional
    public List<PortfolioHolding> bulkCreate(List<PortfolioHolding> portfolioHoldingList) {
        return portfolioHoldingRepository.saveAll(portfolioHoldingList);
    }

    @Transactional
    public void bulkDelete() {
        portfolioHoldingRepository.deleteAll();
    }

}
