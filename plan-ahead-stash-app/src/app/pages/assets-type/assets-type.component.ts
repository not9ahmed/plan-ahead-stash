import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../models/asset-type';

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css'
})
export class AssetsTypeComponent {

  assetsType: AssetType[] = []; 

  constructor(private assetTypeService: AssetTypeService) {
    this.loadData();

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


  // handleDelete(id: number){
  //   const result = confirm('Are you sure, do you want to delete the employee?')
  //   if(result){
  //     this.employeeService.deleteEmployee(id).subscribe({
  //       next: ()=>{
  //         this.loadAllEmployees()
  //       },
  //       error: (error)=>{
  //         console.log(error);          
  //       }
  //     })
  //   }
  // }
}
