import { HttpClient } from '@angular/common/http';
import { Component, Input, signal } from '@angular/core';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-assets-type-details',
  imports: [CommonModule, TableModule, DividerModule],
  templateUrl: './assets-type-details.component.html',
  styleUrl: './assets-type-details.component.css',
  providers: [AssetTypeService, AssetService]
})
export class AssetsTypeDetailsComponent {

  assetTypeId = signal<number>(0);

  assetType  = signal<AssetType | null>(null);

  assets = signal<Asset[] | []>([]);

  // dynamic route
  // access the id from route
  @Input()
  set id(id: number) {
    console.log("asset type id:", id);
    this.assetTypeId.set(id);
    // this.assetTypeId = id;
  }

  constructor(private assetTypeService: AssetTypeService, private assetService: AssetService) {
      
  }


  ngOnInit() {
    console.log("ngOnInit");

    
    this.assetTypeService.findById(this.assetTypeId()).subscribe({
      next: (data: AssetType) => {
        console.log(data);
        this.assetType.set(data);
      },
      error: (error) => {
        console.log(error);
      }
    });



    this.assetService.findAllByAssetTypeId(this.assetTypeId()).subscribe({
      next: (data: Asset[]) => {
        console.log(data);
        this.assets.set(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
