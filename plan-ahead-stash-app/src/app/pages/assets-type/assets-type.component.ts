import { Component } from '@angular/core';
import { AssetsTypeService, AssetType } from '../../services/assets-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css'
})
export class AssetsTypeComponent {

  assetsType: AssetType[] = []; 

  constructor(private assetsTypeService: AssetsTypeService) {
    this.assetsType = assetsTypeService.getAssets();
  }


}
