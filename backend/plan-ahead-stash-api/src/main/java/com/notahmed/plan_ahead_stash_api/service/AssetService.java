package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.repository.AssetRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    @Transactional
    public Asset create(Asset asset) {

        // id=null to ensure the asset in db does not get updated
        var tempAsset = new Asset(
                null,
                asset.getName(),
                asset.getAssetType(),
                null,
                null
        );

        Asset assetSaved = assetRepository.save(tempAsset);

        Asset assetDb = assetRepository.findById(assetSaved.getId())
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));

        return assetDb;
    }


    public Asset findById(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));
    }

    public List<Asset> findAll() {
        return assetRepository.findAll();
    }

    @Transactional
    public Asset update(Long id, Asset asset) {

        assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));

        var updatedAsset = new Asset(
                id,
                asset.getName(),
                asset.getAssetType(),
                asset.getCreatedDate(),
                asset.getModifiedDate()
        );
        return assetRepository.save(updatedAsset);
    }

    @Transactional
    public void delete(Long id) {

        // Check if it exists in db
        assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));

        // else delete from db
        assetRepository.deleteById(id);
    }
}
