package com.notahmed.plan_ahead_stash_api.dto.request;

import com.notahmed.plan_ahead_stash_api.model.AssetType;
import jakarta.validation.constraints.NotNull;


import java.util.Date;

public record AssetRequest (
        @NotNull
        String name,
        AssetType assetType,
        Date startDate,
        Date maturityDate,
        Integer numberOfDays
) { }
