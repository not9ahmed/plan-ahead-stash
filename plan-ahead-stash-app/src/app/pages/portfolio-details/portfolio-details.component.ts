import { Component, Input, signal } from '@angular/core';
import { PortifolioService } from '../../services/portifolio.service';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Portfolio } from '../../models/portfolio';
import { TableModule } from 'primeng/table';


const dummyProducts = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '1001',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '1002',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
]



@Component({
  selector: 'app-portfolio-details',
  imports: [CommonModule, PanelModule, CardModule, DividerModule, TableModule],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent {
  
  portfolioId = signal<number>(0);
  portfolio = signal<Portfolio | null>(null);
  products: any;


  @Input()
  set id(id: number) {
    this.portfolioId.set(id);
  }


  constructor(private portifolioService: PortifolioService) {
  }

  ngOnInit() { 
    console.log("ngOnInit");
    console.log("portfolioId: ",  this.portfolioId());


    // get all portfolio along with the assets
    // may better us portfolio holding
    this.portifolioService.findById(this.portfolioId()).subscribe({
      next: (data: Portfolio) => {
          console.log(data);
          this.portfolio.set(data);
      },
      error: (err) => {
          console.log(err)
      },
    })


    // dummy table 

    this.products = dummyProducts;


  }
}


