import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetType } from '../../models/asset-type';
import { AssetTypeService } from '../../services/asset-type.service';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-add-asset-type',
  imports: [CommonModule, ReactiveFormsModule, FloatLabel, Button, InputTextModule],
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
