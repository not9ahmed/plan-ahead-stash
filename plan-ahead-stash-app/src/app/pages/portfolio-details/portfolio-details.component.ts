import { Component, Input, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Portfolio } from '../../models/portfolio';
import { TableModule } from 'primeng/table';
import { PortfolioHoldingService } from '../../services/portfolio-holding.service';
import { PortfolioHolding } from '../../models/portfolio-holding';


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
  portfolioHoldings = signal<PortfolioHolding[] | []>([]);
  portfolioStats = signal<{
    total?: number, highest?: PortfolioHolding, latest?: PortfolioHolding}>
    ({
    total: 0,
    highest: undefined,
    latest: undefined
  });

  products: any;


  @Input()
  set id(id: number) {
    this.portfolioId.set(id);
  }


  constructor(private portfolioService: PortfolioService, private portfolioHoldingService: PortfolioHoldingService) {
  }

  ngOnInit() { 
    console.log("ngOnInit");
    console.log("portfolioId: ",  this.portfolioId());


    // get all portfolio along with the assets
    // may better us portfolio holding
    this.portfolioService.findById(this.portfolioId()).subscribe({
      next: (data: Portfolio) => {
          console.log(data);
          this.portfolio.set(data);
      },
      error: (err) => {
          console.log(err)
      },
    });







    this.portfolioHoldingService.findAllPortfolioId(this.portfolioId()).subscribe({
      next: (data: PortfolioHolding[]) => {
        console.log(data);
        this.portfolioHoldings.set(data);

        // test sum
        this.portfolioStats.set({
          total: this.findSum(this.portfolioHoldings()),
          highest: this.findHighest(this.portfolioHoldings()),
          latest: this.findLatestPurchase(this.portfolioHoldings()),
        })
        console.log(this.portfolioStats());


      },
      error: (err) => {
          console.log(err);
      },
    })

  }



  // Basic Stats can be all in one single function
  findSum(portfolios: PortfolioHolding[]): number {
    return portfolios.reduce<number>((sum: number, portfolioHolding: PortfolioHolding) => {
      sum += portfolioHolding.purchasePrice
      return sum;
    }, 0)
  }

  findHighest(portfolios: PortfolioHolding[]): PortfolioHolding {
    return portfolios.reduce((highestHolding: PortfolioHolding, holding: PortfolioHolding) => {
      return highestHolding.purchasePrice > holding.purchasePrice ? highestHolding : holding;
    });
  }

  findLatestPurchase(portfolios: PortfolioHolding[]) {
    return portfolios.reduce((highestHolding: PortfolioHolding, holding: PortfolioHolding) => {
      return highestHolding.purchaseDate > holding.purchaseDate ? highestHolding : holding;
    });
  }
}


