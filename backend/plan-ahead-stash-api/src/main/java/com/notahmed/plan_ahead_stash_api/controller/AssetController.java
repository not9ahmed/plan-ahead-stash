package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.model.Asset;
import com.notahmed.plan_ahead_stash_api.service.AssetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {

        Asset assetCreated = assetService.create(asset);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(assetCreated);
    }

    @GetMapping("/")
    public ResponseEntity<List<Asset>> findAll() {
        List<Asset> assets = assetService.findAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(assets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> findById(@PathVariable("id") Long id) {
        Asset asset = assetService.findById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(asset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> update(@PathVariable("id") Long id, @RequestBody Asset asset) {
        Asset updatedAsset = assetService.update(id, asset);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(updatedAsset);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Asset> delete(@PathVariable("id") Long id) {
        assetService.delete(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }

}
