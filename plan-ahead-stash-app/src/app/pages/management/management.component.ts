import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { AssetsTypeComponent } from "../old/assets-type-old/assets-type.component";
import { AddAssetTypeComponent } from "../old/add-asset-type-old/add-asset-type.component";

@Component({
  selector: 'app-management',
  imports: [HeaderComponent, RouterOutlet, AssetsTypeComponent, AddAssetTypeComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {

}
