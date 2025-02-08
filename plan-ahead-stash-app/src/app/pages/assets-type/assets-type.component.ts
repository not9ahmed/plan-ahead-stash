import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule, TableModule, ButtonModule, FloatLabelModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css'
})
export class AssetsTypeComponent {
  
  assetsType: AssetType[] = [];
  cols!: Column[];

  constructor(private assetTypeService: AssetTypeService) {
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
  handleSubmit(assetType: AssetType) {
    this.assetTypeService.create(assetType).subscribe(data => {
      console.log(data);
    });
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

  refresh() {
    this.loadData();
  }

}
