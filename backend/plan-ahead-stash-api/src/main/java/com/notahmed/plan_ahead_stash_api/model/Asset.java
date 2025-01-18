package com.notahmed.plan_ahead_stash_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Ijara, Alsalam, Government Bond
    @Column(nullable = false)
    @NotNull
    private String name;


    // TODO: check the different behaviors for Lazy and Eager
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "asset_type_id", nullable = false)
    private AssetType assetType;


    @Column(name = "created_date", nullable = false)
    @CreationTimestamp
    private Date createdDate;

    // TODO: Will be done from service temporarily
    @Column(name = "modified_date")
    @LastModifiedDate
    private Date modifiedDate;

    public Asset() {
    }

    public Asset(Long id, String name, AssetType assetType, Date createdDate, Date modifiedDate) {
        this.id = id;
        this.name = name;
        this.assetType = assetType;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AssetType getAssetType() {
        return assetType;
    }

    public void setAssetType(AssetType assetType) {
        this.assetType = assetType;
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
        Asset asset = (Asset) o;
        return Objects.equals(id, asset.id) && Objects.equals(name, asset.name) && Objects.equals(assetType, asset.assetType) && Objects.equals(createdDate, asset.createdDate) && Objects.equals(modifiedDate, asset.modifiedDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, assetType, createdDate, modifiedDate);
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", assetType=" + assetType +
                ", createdDate=" + createdDate +
                ", modifiedDate=" + modifiedDate +
                '}';
    }
}
