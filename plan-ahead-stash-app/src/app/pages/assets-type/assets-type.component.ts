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


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-assets-type',
  imports: [CommonModule, TableModule, ButtonModule, FloatLabelModule, ConfirmDialogModule, ToastModule],
  templateUrl: './assets-type.component.html',
  styleUrl: './assets-type.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AssetsTypeComponent {
  
  assetsType: AssetType[] = [];
  cols!: Column[];

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

}
