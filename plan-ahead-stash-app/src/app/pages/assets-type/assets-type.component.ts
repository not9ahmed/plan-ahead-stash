import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule, TableModule, ButtonModule, FloatLabelModule, ConfirmDialogModule, ToastModule, DialogModule, ToolbarModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AssetsTypeComponent {

  isDialogVisible: boolean = false;
  assetsType: AssetType[] = [];
  cols!: Column[];

  // Creating a form
  assetTypeForm = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required])
  })

  constructor(private assetTypeService: AssetTypeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.loadData();

    // make it dynamic
    this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'createdDate', header: 'Created Date' },
        { field: 'modifiedDate', header: 'Modified Date' }
    ];
  }

  loadData() {
    this.assetTypeService.findAll().subscribe(data => {
      console.log(data);
      this.assetsType = data;
    })
  }

  // create new asset type
  handleSubmit() {

    console.log(this.assetTypeForm);
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
          detail: 'Record created' + JSON.stringify(data),
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


  handleDelete(id: number) {
    this.assetTypeService.delete(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  handleCancel() {
    this.assetTypeForm.reset();
    this.isDialogVisible = false
  }    


  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Danger Zone' + ", The is id: "+ id,
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
          this.handleDelete(id);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}

  refresh() {
    this.loadData();
  }


  showDialog() {
    this.isDialogVisible = true
  }
}
