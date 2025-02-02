package com.notahmed.plan_ahead_stash_api.dto.mapper;

import com.notahmed.plan_ahead_stash_api.dto.request.AssetTypeRequest;
import com.notahmed.plan_ahead_stash_api.model.AssetType;

import java.util.function.Function;

public class AssetTypeRequestMapper implements Function<AssetTypeRequest, AssetType> {
    @Override
    public AssetType apply(AssetTypeRequest assetTypeRequest) {
        return new AssetType(
                null,
                assetTypeRequest.name(),
                null,
                null
        );
    }
}
