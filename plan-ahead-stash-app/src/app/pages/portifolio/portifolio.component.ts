import { Component } from '@angular/core';
import { PortifolioService } from '../../services/portifolio.service';
import { Portfolio } from '../../models/portfolio';

@Component({
  selector: 'app-portifolio',
  imports: [],
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.css'
})
export class PortifolioComponent {

  portfolios: Portfolio[] = [];
  portfolio?: Portfolio;

  constructor(private portifolioService: PortifolioService) {

    // find all portfolios
    portifolioService.findAll().subscribe({
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
}
