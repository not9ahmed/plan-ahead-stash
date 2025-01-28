package com.notahmed.plan_ahead_stash_api.dto.mapper;

import com.notahmed.plan_ahead_stash_api.dto.request.AssetRequest;
import com.notahmed.plan_ahead_stash_api.model.Asset;

import java.util.function.Function;


public class AssetRequestMapper implements Function<AssetRequest, Asset> {
    @Override
    public Asset apply(AssetRequest assetRequest) {
        new Asset();
        return null;
    }
}
