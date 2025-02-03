package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.AssetType;
import com.notahmed.plan_ahead_stash_api.repository.AssetTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AssetTypeService {

    private final AssetTypeRepository assetTypeRepository;

    public AssetTypeService(AssetTypeRepository assetTypeRepository) {
        this.assetTypeRepository = assetTypeRepository;
    }

    public AssetType create(AssetType assetType) {
        var assetTypeCreate = new AssetType(
                null,
                assetType.getName(),
                null,
                null
        );
        return assetTypeRepository.save(assetTypeCreate);
    }

    public List<AssetType> findAll() {
        return assetTypeRepository.findAll();
    }

    public AssetType findById(Long id) {
        return assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));
    }

    @Transactional
    public AssetType update(Long id, AssetType assetType) {

        // First check if it exists in DB
        AssetType existingAssetType = assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));

        // Else update
        AssetType assetTypeUpdated = new AssetType(
                id,
                assetType.getName(),
                existingAssetType.getCreatedDate(),
                new Date()
        );

        return assetTypeRepository.save(assetTypeUpdated);
    }

    @Transactional
    public void delete(Long id) {
        // check if it exists
        // If not then throw Resource Not Found
        assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));

        // Else delete from database
        assetTypeRepository.deleteById(id);
    }


    @Transactional
    public List<AssetType> bulkCreate(List<AssetType> assetTypeList) {
        return assetTypeRepository.saveAll(assetTypeList);
    }

    @Transactional
    public void bulkDelete() {
        assetTypeRepository.deleteAll();
    }


}
