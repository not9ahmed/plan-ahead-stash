import { Component } from '@angular/core';
import { AssetTypeService } from '../../services/asset-type.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetType } from '../../models/asset-type';

@Component({
  selector: 'app-add-asset-type',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-asset-type.component.html',
  styleUrl: './add-asset-type.component.css'
})
export class AddAssetTypeComponent {

  constructor(private assetTypeService: AssetTypeService){

  }

  // Creating a form
  assetTypeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })


  handleSubmit() {

    const {name} = this.assetTypeForm.value;

    // if not valid
    if(!name){
      return;
    }

    const newAssetType: AssetType = {name: name};

    this.assetTypeService.create(newAssetType).subscribe(data => {
      console.log(data);
    });
  }
}
