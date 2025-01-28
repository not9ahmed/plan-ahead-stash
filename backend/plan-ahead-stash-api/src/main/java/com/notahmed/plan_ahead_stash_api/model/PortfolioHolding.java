package com.notahmed.plan_ahead_stash_api.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

// this entity will be many to 1 portfolio
// @Entity
// @Table(name = "portfolio_holdings")
public class PortfolioHolding {

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @OneToMany
    // @JoinColumn(name = "asset_id")
    private Set<Asset> asset;
}
