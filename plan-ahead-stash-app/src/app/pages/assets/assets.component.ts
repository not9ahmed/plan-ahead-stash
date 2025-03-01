import { Component } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-assets',
  imports: [],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css'
})
export class AssetsComponent {

  assets: Asset[] = [];

  constructor(private assetService: AssetService) {

    assetService.findAll().subscribe({
      next: (data: Asset[]) => {
        this.assets = data;
        console.log("assets", this.assets);
      },
      error: (err) => {
        console.log(err);
      }
    });



  }
}
