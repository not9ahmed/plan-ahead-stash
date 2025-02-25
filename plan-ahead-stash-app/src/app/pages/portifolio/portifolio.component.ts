import { Component } from '@angular/core';
import { PortifolioService } from '../../services/portifolio.service';
import { Portfolio } from '../../models/portfolio';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-portifolio',
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule],
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.css',
  providers: []
})
export class PortifolioComponent {

  portfolios: Portfolio[] = [];
  portfolio?: Portfolio;
  cols: Column[] = [];

  constructor(private portifolioService: PortifolioService) {


    this.initCols();
    this.loadData();

    // find single portfolio
    const id = 9;
    portifolioService.findById(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete called');
      }
    });


    // create  portfolio
    // const portfolio: Portfolio = {
    //   name: "example of me creating",
    //   userId: 1
    // };
    // portifolioService.create(this.portfolio).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('complete called');
    //   }
    // });


    // update portfolio
    // const updateId: number = 9;
    // const portfolioUpdated: Portfolio = {
    //   name: "example of me updating",
    //   userId: 1
    // };

    // portifolioService.update(updateId, portfolioUpdated).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("complete");
    //   }
    // });
    



    // delete portfolio
    // const deleteId: number = 9;
    // portifolioService.delete(deleteId).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("complete");
    //   }
    // })

  }

  initCols() {
    this.cols = [
      { field: "id", header: "ID"},
      { field: "name", header: "Name"},
      { field: "user", header: "User"},
      { field: "createdDate", header: "Created Date"},
      { field: "modifiedDate", header: "Modified Date"},
    ];
  }

  loadData() {
    // find all portfolios
    this.portifolioService.findAll().subscribe({
      next: (data) => {
        console.log(data);
        this.portfolios = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Observer completed');
      }
    });

  }


}
