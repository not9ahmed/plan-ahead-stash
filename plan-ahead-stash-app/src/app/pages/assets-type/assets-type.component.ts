import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';
import { assetTypeFormValidator } from '../../validations/asset-type-form-validator.directive';
import { Column } from '../../types/column';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/message';

import { NavbarComponent } from '../../components/navbar/navbar.component';



@Component({
  selector: 'app-assets-type',
  imports: [CommonModule, TableModule, ButtonModule, FloatLabelModule, ConfirmDialogModule, ToastModule, DialogModule, ToolbarModule, InputTextModule, ReactiveFormsModule, DividerModule, RouterModule, Message, NavbarComponent],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AssetsTypeComponent {
  
  // Services 
  private formBuilder = inject(FormBuilder);
  private assetTypeService = inject(AssetTypeService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  cols!: Column[];
  
  // API states
  assetsType = signal<AssetType[]>([]);

  // UI states
  isDataLoaded = signal<boolean>(false);
  isDialogVisible = signal<boolean>(false);
  isFormInvalid = signal<boolean|null>(null);
  isFormSubmitted = signal<boolean>(false);

  // Form action
  isUpdateForm = signal<boolean>(false);
  formTitle = computed<string>(() => this.isUpdateForm() ? "Update" : "Create")

  
  // Creating form with formbuilder
  assetTypeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  }, {validators: assetTypeFormValidator});

  get name() {
    return this.assetTypeForm.get('name');
  }



  constructor() {
    this.initCols()
    this.loadData();
  }


  // UI LOGIC  
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

  loadData() {
    this.assetTypeService.findAll().subscribe(data => {
      console.log(data);
      this.assetsType.set(data);
    })
  }




  // create new asset type
  handleSubmit() {

    const {name} = this.assetTypeForm.value;

    // Undefined fields & Invalid form & form level error
    if(!name || !this.assetTypeForm.valid || this.assetTypeForm.errors) {
      this.isFormInvalid.set(true);
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
          detail: 'Asset Type created ' + JSON.stringify(data),
          life: 3000
        });
        
        this.assetTypeForm.reset();
        this.hideDialog();
        this.loadData();
        this.isFormSubmitted.set(true);

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: JSON.parse(err.error),
          life: 3000
        });
        this.isFormSubmitted.set(false);
      }

    });
  }


  handleDelete(id: number) {
    this.assetTypeService.delete(id).subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.loadData();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error Occurred', detail: JSON.stringify(err.error.message) });
      }
    })
  }


  confirmDelete(event: Event, id: number) {

    // if(!user || !user.id) return;


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
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}



  initCols() {
    // make it dynamic
    this.cols = [
      { field: 'id', header: 'ID', type:'number' },
      { field: 'name', header: 'Name', type:'string' },
      { field: 'createdDate', header: 'Created Date', type:'date' },
      { field: 'modifiedDate', header: 'Modified Date', type:'date' }
  ];
  }
}
