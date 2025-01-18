package com.notahmed.plan_ahead_stash_api.dto.request;

import com.notahmed.plan_ahead_stash_api.model.AssetType;

public record AssetRequest (
        String name,
        AssetType assetType
) { }
