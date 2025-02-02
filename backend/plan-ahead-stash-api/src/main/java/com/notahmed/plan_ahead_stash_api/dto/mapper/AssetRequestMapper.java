package com.notahmed.plan_ahead_stash_api.dto.mapper;

import com.notahmed.plan_ahead_stash_api.dto.request.AssetRequest;
import com.notahmed.plan_ahead_stash_api.model.Asset;
import org.springframework.stereotype.Service;

import java.util.function.Function;

/**
 * Functional Interface which take an object of type AssetRequest and maps it to Asset type
 */
@Service
public class AssetRequestMapper implements Function<AssetRequest, Asset> {


    @Override
    public Asset apply(AssetRequest assetRequest) {

        return new Asset(
                null,
                assetRequest.name(),
                assetRequest.assetType(),
                assetRequest.startDate(),
                assetRequest.maturityDate(),
                assetRequest.numberOfDays(),
                null,
                null
        );
    }
}
