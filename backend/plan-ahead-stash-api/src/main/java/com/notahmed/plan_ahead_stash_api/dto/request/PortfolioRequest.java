package com.notahmed.plan_ahead_stash_api.dto.request;

public record PortfolioRequest(
        String name,
        String description,
        Long userId
) { }
