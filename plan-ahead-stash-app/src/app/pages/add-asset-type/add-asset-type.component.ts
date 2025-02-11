import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetType } from '../../models/asset-type';
import { AssetTypeService } from '../../services/asset-type.service';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-asset-type',
  imports: [CommonModule, ReactiveFormsModule, FloatLabel, Button, InputTextModule, Toast],
  templateUrl: './add-asset-type.component.html',
  styleUrl: './add-asset-type.component.css',
  providers: [MessageService]
})
export class AddAssetTypeComponent {
  constructor(
    private assetTypeService: AssetTypeService,
    private messageService: MessageService){

  }

  // Creating a form
  assetTypeForm = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required])
  })



  handleSubmit() {

    const {name} = this.assetTypeForm.value;

    // if not valid
    if(!name){
      return;
    }


    const newAssetType: AssetType = {name: name};

    this.assetTypeService.create(newAssetType).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Record created',
          life: 3000
        });

      },
      error: (err) => {

        // handle api errors here
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message + " " + err.error.timestamp,
          life: 3000
        });
      }

    });

    this.assetTypeForm.reset();

  }
}
