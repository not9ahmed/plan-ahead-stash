import { Component, inject, signal } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { assetTypeFormValidator } from '../../validations/asset-type-form-validator.directive';



interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule, TableModule, ButtonModule, FloatLabelModule, ConfirmDialogModule, ToastModule, DialogModule, ToolbarModule, InputTextModule, ReactiveFormsModule, DividerModule, RouterModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AssetsTypeComponent {
  cols!: Column[];

  private formBuilder = inject(FormBuilder);

  isDialogVisible = signal<boolean>(false);
  assetsType = signal<AssetType[]>([]);

  // Creating form with formbuilder
  assetTypeForm = this.formBuilder.group({
    name: ['', Validators.required]
  }, {validators: assetTypeFormValidator});




  constructor(private assetTypeService: AssetTypeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.initCols()
    this.loadData();
  }

  loadData() {
    this.assetTypeService.findAll().subscribe(data => {
      console.log(data);
      this.assetsType.set(data);
    })
  }

  showDialog(): void {
    this.isDialogVisible.set(true);
  }

  hideDialog(): void {
    this.isDialogVisible.set(false);
  }

  handleCancel(): void {
    this.assetTypeForm.reset();
    this.hideDialog();
  }




  // create new asset type
  handleSubmit() {

    console.log(this.assetTypeForm);
    const {name} = this.assetTypeForm.value;

    // if not valid
    if(!name || this.assetTypeForm.errors){
      return;
    }

    // take values from form
    const newAssetType: AssetType = {name: name};

    this.assetTypeService.create(newAssetType).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Record created ' + JSON.stringify(data),
          life: 3000
        });
        
        this.loadData();
        this.hideDialog()

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

      },
      // recently added
      complete: () => {
        console.log("complete")
        // this.isDialogVisible = false;
      },

    });

    this.hideDialog();
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



  initCols() {
    // make it dynamic
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'modifiedDate', header: 'Modified Date' }
  ];
  }
}
