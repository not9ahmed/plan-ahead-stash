package com.notahmed.plan_ahead_stash_api.repository;

import com.notahmed.plan_ahead_stash_api.model.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetTypeRepository extends JpaRepository<AssetType, Long> {
}
