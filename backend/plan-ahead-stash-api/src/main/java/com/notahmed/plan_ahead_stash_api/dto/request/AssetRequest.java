package com.notahmed.plan_ahead_stash_api.dto.request;

import com.notahmed.plan_ahead_stash_api.model.AssetType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

public record AssetRequest (

        @NotNull
        String name,
        AssetType assetType,
        Date startDate,
        Date maturityDate,
        Integer numberOfDays
) { }
