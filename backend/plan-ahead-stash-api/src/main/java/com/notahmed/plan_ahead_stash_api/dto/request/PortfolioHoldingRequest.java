package com.notahmed.plan_ahead_stash_api.dto.request;

import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.model.Portfolio;

import java.util.Date;
import java.util.Set;

public record PortfolioHoldingRequest(
        Set<Portfolio> portfolios,
        Set<Asset> assets,
        Integer quantity,
        Double purchasePrice,
        Date purchaseDate
) { }
