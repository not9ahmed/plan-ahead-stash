import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';

@Component({
  selector: 'app-assets-type-details',
  imports: [],
  templateUrl: './assets-type-details.component.html',
  styleUrl: './assets-type-details.component.css'
})
export class AssetsTypeDetailsComponent {

  assetTypeId: number = this.id;

  // dynamic route
  @Input()
  set id(id: number) {
    console.log("asset type id:", id);
    this.assetTypeId = id;
  }


  constructor(private assetTypeService: AssetTypeService) {
      
  }


  ngOnInit() {
    console.log("ngOnInit");

    console.log(this.assetTypeId);
    
    this.assetTypeService.findById(this.assetTypeId).subscribe({
      next: (data: AssetType) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
