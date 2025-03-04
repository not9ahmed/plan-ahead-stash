package com.notahmed.plan_ahead_stash_api.controller;

import com.notahmed.plan_ahead_stash_api.model.AssetType;
import com.notahmed.plan_ahead_stash_api.service.AssetTypeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assetsType")
public class AssetTypeController {

    private final AssetTypeService assetTypeService;

    public AssetTypeController(AssetTypeService assetTypeService) {
        this.assetTypeService = assetTypeService;
    }

    @PostMapping
    public ResponseEntity<AssetType> create(@RequestBody @Valid AssetType assetType) {

        var assetTypeCreated = assetTypeService.create(assetType);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(assetTypeCreated);
    }

    @GetMapping("/")
    public ResponseEntity<List<AssetType>> findAll() {
        var assetTypeList = assetTypeService.findAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(assetTypeList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetType> findById(@PathVariable("id") Long id) {
        var assetType = assetTypeService.findById(id);
        return ResponseEntity.
                status(HttpStatus.OK)
                .body(assetType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetType> update(@PathVariable("id") Long id, @RequestBody @Valid AssetType assetType) {
        var assetTypeUpdated = assetTypeService.update(id, assetType);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(assetTypeUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AssetType> delete(@PathVariable("id") Long id) {
        assetTypeService.delete(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }


    @PostMapping("/bulk")
    public ResponseEntity<List<AssetType>> saveAll(@RequestBody List<AssetType> assetTypeList) {
        List<AssetType> result = assetTypeService.bulkCreate(assetTypeList);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<?> deleteAll() {
        assetTypeService.bulkDelete();
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }

}
