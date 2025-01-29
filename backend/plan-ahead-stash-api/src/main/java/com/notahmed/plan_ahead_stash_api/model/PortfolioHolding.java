package com.notahmed.plan_ahead_stash_api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

// this entity will be many to 1 portfolio
@Entity
@Table(name = "portfolio_holdings")
public class PortfolioHolding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany
    @JoinColumn(name = "portfolio")
    private Set<Portfolio> portfolios;

    @OneToMany
    @JoinColumn(name = "asset_id")
    private Set<Asset> assets;

    private Integer quantity;

    private Double purchasePrice;

    private Double purchaseDate;


    @Column(name = "created_date", nullable = false)
    @CreationTimestamp
    private Date createdDate;

    // TODO: Will be done from service temporarily
    @Column(name = "modified_date")
    private Date modifiedDate;


    public PortfolioHolding() {
    }

    public PortfolioHolding(Long id, Set<Portfolio> portfolios, Set<Asset> assets, Integer quantity, Double purchasePrice, Double purchaseDate, Date createdDate, Date modifiedDate) {
        this.id = id;
        this.portfolios = portfolios;
        this.assets = assets;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.purchaseDate = purchaseDate;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Portfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(Set<Portfolio> portfolios) {
        this.portfolios = portfolios;
    }

    public Set<Asset> getAssets() {
        return assets;
    }

    public void setAssets(Set<Asset> assets) {
        this.assets = assets;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Double purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PortfolioHolding that = (PortfolioHolding) o;
        return Objects.equals(id, that.id) && Objects.equals(portfolios, that.portfolios) && Objects.equals(assets, that.assets) && Objects.equals(quantity, that.quantity) && Objects.equals(purchasePrice, that.purchasePrice) && Objects.equals(purchaseDate, that.purchaseDate) && Objects.equals(createdDate, that.createdDate) && Objects.equals(modifiedDate, that.modifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, portfolios, assets, quantity, purchasePrice, purchaseDate, createdDate, modifiedDate);
    }

    @Override
    public String toString() {
        return "PortfolioHolding{" +
                "id=" + id +
                ", portfolios=" + portfolios +
                ", assets=" + assets +
                ", quantity=" + quantity +
                ", purchasePrice=" + purchasePrice +
                ", purchaseDate=" + purchaseDate +
                ", createdDate=" + createdDate +
                ", modifiedDate=" + modifiedDate +
                '}';
    }
}
