package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.model.AssetType;
import com.notahmed.plan_ahead_stash_api.repository.AssetRepository;
import com.notahmed.plan_ahead_stash_api.repository.AssetTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final AssetTypeRepository assetTypeRepository;

    public AssetService(AssetRepository assetRepository, AssetTypeRepository assetTypeRepository) {
        this.assetRepository = assetRepository;
        this.assetTypeRepository = assetTypeRepository;
    }

    @Transactional
    public Asset create(Asset asset) {


        // first get the asset type
        AssetType assetType = assetTypeRepository.findById(asset.getAssetType().getId())
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));

        // id=null to ensure the asset in db does not get updated
        // User mapper
        var tempAsset = new Asset(
                null,
                asset.getName(),
                assetType,
                asset.getStartDate(),
                asset.getMaturityDate(),
                asset.getNumberOfDays(),
                null,
                null
        );

        Asset assetSaved = assetRepository.save(tempAsset);

        return assetRepository.findById(assetSaved.getId())
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));
    }


    public Asset findById(Long id) {
        return assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));
    }

    // TOdO: add pagination
    public List<Asset> findAll() {
        return assetRepository.findAll();
    }

    @Transactional
    public Asset update(Long id, Asset asset) {

        Asset assetDb = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset not found"));

        // get assetType
        AssetType assetType = assetTypeRepository.findById(asset.getAssetType().getId())
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));;

        // TODO: user mapper from Asset to AssetDTO
        var updatedAsset = new Asset(
                id,
                asset.getName(),
                assetType,
                asset.getStartDate(),
                asset.getMaturityDate(),
                asset.getNumberOfDays(),
                assetDb.getCreatedDate(),
                new Date()
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


    @Transactional
    public List<Asset> saveAll(List<Asset> assets) {

        // transform the assets before save
        // such as

        return assetRepository.saveAll(assets);
    }

    @Transactional
    public void deleteAll() {
        assetRepository.deleteAll();
    }
}
