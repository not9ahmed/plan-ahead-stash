import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { AssetsTypeComponent } from "../assets-type-old/assets-type.component";
import { AddAssetTypeComponent } from "../add-asset-type/add-asset-type.component";

@Component({
  selector: 'app-management',
  imports: [HeaderComponent, RouterOutlet, AssetsTypeComponent, AddAssetTypeComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {

}
