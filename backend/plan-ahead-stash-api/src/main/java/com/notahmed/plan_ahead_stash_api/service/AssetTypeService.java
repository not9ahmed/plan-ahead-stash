package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.AssetType;
import com.notahmed.plan_ahead_stash_api.repository.AssetTypeRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AssetTypeService {

    private final AssetTypeRepository assetTypeRepository;

    public AssetTypeService(AssetTypeRepository assetTypeRepository) {
        this.assetTypeRepository = assetTypeRepository;
    }

    public AssetType create(AssetType assetType) {
        return assetTypeRepository.save(assetType);
    }

    public List<AssetType> findAll() {
        return assetTypeRepository.findAll();
    }

    public AssetType findById(Long id) {
        return assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));
    }

    public AssetType update(Long id, AssetType assetType) {
        AssetType assetTypeDb = assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));

        AssetType assetTypeUpdated = new AssetType(
                id,
                assetTypeDb.getName(),
                assetTypeDb.getCreatedDate(),
                new Date()
        );

        return assetTypeRepository.save(assetTypeUpdated);
    }


    public void delete(Long id) {

        // check if it exists
        AssetType assetType = assetTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Asset Type not found"));

        assetTypeRepository.deleteById(id);
    }



}
