package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;
import com.notahmed.plan_ahead_stash_api.model.PortfolioHolding;
import com.notahmed.plan_ahead_stash_api.repository.AssetRepository;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioHoldingRepository;
import com.notahmed.plan_ahead_stash_api.repository.PortfolioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioHoldingService {

    private final PortfolioRepository portfolioRepository;
    private final PortfolioHoldingRepository portfolioHoldingRepository;
    private final AssetRepository assetRepository;

    public PortfolioHoldingService(PortfolioRepository portfolioRepository, PortfolioHoldingRepository portfolioHoldingRepository, AssetRepository assetRepository) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioHoldingRepository = portfolioHoldingRepository;
        this.assetRepository = assetRepository;
    }

    @Transactional
    public PortfolioHolding create(PortfolioHolding portfolioHolding) {


        // First find the portfolio by id
        Portfolio portfolio = portfolioRepository.findById(portfolioHolding.getPortfolio().getId())
                .orElseThrow(() -> new ResourceNotFound("Portfolio not found"));

        System.out.println(portfolio);


        // Then find Asset
        Asset asset = assetRepository.findById(portfolioHolding.getAsset().getId())
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));


        // then create portfolio holding
        PortfolioHolding portfolioHoldingTemp = new PortfolioHolding(
                null,
                portfolio,
                asset,
                portfolioHolding.getQuantity(),
                portfolioHolding.getPurchasePrice(),
                portfolioHolding.getPurchaseDate(),
                portfolioHolding.getCreatedDate(),
                portfolioHolding.getModifiedDate()
        );


        return portfolioHoldingRepository.save(portfolioHoldingTemp);
    }

    public List<PortfolioHolding> findAll() {
        return portfolioHoldingRepository.findAll();
    }

    public List<PortfolioHolding> findAllByPortfolio(Long portfolioId) {
        return portfolioHoldingRepository.findAllByPortfolioId(portfolioId);
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
                dbPortfolioHolding.getPortfolio(),
                dbPortfolioHolding.getAsset(),
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

        // List<PortfolioHolding> portfolioHoldingsMapped = portfolioHoldingList.stream().map(
        //         el -> {
        //
        //             Asset asset = assetRepository.findById(el.getAsset().getId())
        //                     .orElseThrow(() -> new ResourceNotFound("Asset " + el.getAsset().getId() + " not found"));
        //             el.setAsset(asset);
        //
        //             Portfolio portfolio = portfolioRepository.findById(el.getAsset().getId())
        //                     .orElseThrow(() -> new ResourceNotFound("Portfolio " + el.getPortfolio().getId() + " not found"));
        //             el.setPortfolio(portfolio);
        //
        //             return el;
        //         }
        // ).toList();


        return portfolioHoldingRepository.saveAll(portfolioHoldingList);
    }

    @Transactional
    public void bulkDelete() {
        portfolioHoldingRepository.deleteAll();
    }

}
