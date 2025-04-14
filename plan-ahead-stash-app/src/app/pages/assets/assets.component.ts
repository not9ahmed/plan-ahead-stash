import { Component, signal } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets',
  imports: [CommonModule, ReactiveFormsModule, TableModule, InputTextModule, InputNumberModule, DialogModule, ToastModule, RouterLink, RouterLinkActive, ConfirmDialogModule, ToolbarModule, ButtonModule, SelectModule, DatePickerModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AssetsComponent {

  // UI
  isDialogVisible = signal<boolean>(false);

  assets = signal<Asset[]>([]);
  assetsType = signal<AssetType[]>([]);

  cols: Column[] = [];

  // Creating a form
  assetForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    assetType: new FormControl<number | null>(null, [Validators.required]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    maturityDate: new FormControl<Date | null>(null, [Validators.required]),
    numberOfDays: new FormControl<number | null>(null, [Validators.required])
  })



  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private assetService: AssetService, private assetTypeService: AssetTypeService) {
    this.initCols();
    this.loadData();
  }

  initCols(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'assetType', header: 'Asset Type' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'maturityDate', header: 'Maturity Date' },
      { field: 'numberOfDays', header: 'Number Of Days' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'modifiedDate', header: 'Modified Date' }
    ]
  }

  loadData(): void {
    this.assetService.findAll().subscribe({
      next: (data: Asset[]) => {
        this.assets.set(data);
        console.log("assets", this.assets());
      },
      error: (err) => {
        console.log(err);
      }
    });


    this.assetTypeService.findAll().subscribe({
      next: (data: AssetType[]) => {
        this.assetsType.set(data);
        console.log("assets", this.assets());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showDialog() {
    console.log("Show Dialog");
    this.isDialogVisible.set(true);
  }

  refresh() {
    console.log("refresh");
    this.loadData();
  }

  confirm(event: Event, id: number) {
    console.log("confirm");

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Asset ' + id,
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },

      // callbacks
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'record deleted'
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'action was canceled'
        })
      }
    })

  }

  // call post asste
  handleSubmit() {
    console.log("handleSubmit");
    console.log("form ", this.assetForm.value);

    // let { name, assetType, startDate, maturityDate, numberOfDays} = this.assetForm.value;

    // if(name && assetType && startDate && maturityDate && numberOfDays) {
    //   console.log("valid");
    // }

    let { name, assetType, startDate, maturityDate, numberOfDays} = this.assetForm.value;

    if(name && assetType && startDate && maturityDate && numberOfDays) {
      console.log("valid");


      // data to be submitted
      const newAsset: Asset = {
        name,
        assetType: {
          id: assetType
        },
        startDate,
        maturityDate,
        numberOfDays
      }


      this.assetService.create(newAsset).subscribe({
        next: (value) => {
          // success show pop up 
          console.log("success");
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'Asset was created '+ JSON.stringify(value),
            life: 3000
          })

          this.assetForm.reset();
          this.isDialogVisible.set(false);
          this.loadData();

        },
        error: (err) => {
          console.log(err);

          console.log("success");
          this.messageService.add({
            severity: 'succdangeress',
            summary: 'Confirmed',
            detail: 'Asset was failed '+ JSON.stringify(err),
            life: 3000
          })

        }

      })
      
    }


  }

  handleCancel() {
    console.log("handleCancel");
    this.isDialogVisible.set(false);
    this.assetForm.reset();
  }


  handleDelete(id: number): {

  }
}
