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


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets',
  imports: [CommonModule, ReactiveFormsModule, TableModule, InputTextModule, DialogModule, ToastModule, RouterLink, RouterLinkActive, ConfirmDialogModule, ToolbarModule, ButtonModule, SelectModule],
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
    name: new FormControl<string | null>('', [Validators.required]),
    assetType: new FormControl<number>(-999, [Validators.required])
  })



  constructor(private assetService: AssetService, private assetTypeService: AssetTypeService) {
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
  }

  handleSubmit() {
    console.log("handleSubmit");
    console.log("form ", this.assetForm.value)
    this.isDialogVisible.set(false);

  }

  handleCancel() {
    console.log("handleCancel");
    this.isDialogVisible.set(true);
    this.assetForm.reset();
  }
}
