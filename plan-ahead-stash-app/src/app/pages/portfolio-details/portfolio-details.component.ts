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
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PortfolioStats } from '../../models/portfolio-stats';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { PortfolioHoldingsComponent } from "../portfolio-holdings/portfolio-holdings.component";


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
  imports: [CommonModule, ReactiveFormsModule, PanelModule, CardModule, DividerModule, TableModule, NavbarComponent, ToolbarModule, ToastModule, ButtonModule, DialogModule, ConfirmDialogModule, InputNumberModule, InputTextModule, SelectModule, DatePickerModule, PortfolioHoldingsComponent],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css',
  providers: [ConfirmationService, MessageService]
})
export class PortfolioDetailsComponent {

  @Input()
  set id(id: number) {
    this.portfolioId.set(id);
  }

  portfolioId = signal<number>(0);
  portfolio = signal<Portfolio | null>(null);
  portfolioHoldings = signal<PortfolioHolding[] | []>([]);
  portfolioStats = signal<PortfolioStats>
  ({
    total: 0,
    highestPurchase: null,
    latestPurchase: null
  });
  assets = signal<Asset[]>([]);




  // UI Logic
  isDialogVisible = signal<boolean>(false);
  products: any;





  portfolioHoldingForm = new FormGroup({
    portfolioId: new FormControl<number>(this.portfolioId(), [Validators.required]),
    assetId: new FormControl<number | null>(null, [Validators.required]),
    quantity: new FormControl<number | null>(null, [Validators.required]),
    purchasePrice: new FormControl<number | null>(null, [Validators.required]),
    purchaseDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  constructor(private portfolioService: PortfolioService, private portfolioHoldingService: PortfolioHoldingService, private assetService: AssetService) {
  
  }

  ngOnInit() {
    console.log("ngOnInit");
    console.log("portfolioId: ", this.portfolioId());

    this.portfolioHoldingForm.setValue({
      portfolioId: this.portfolioId(),
      assetId: null,
      quantity: null,
      purchasePrice: null,
      purchaseDate: null
    })


    this.loadData();
  }


  loadData(): void {
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


    this.assetService.findAll().subscribe({
      next: (data: Asset[]) => {
        console.log("assets", data);
        this.assets.set(data);
      },
      error: (err) => {
        console.log(err);

      },
    });

    this.portfolioHoldingService.findAllByPortfolioId(this.portfolioId()).subscribe({
      next: (data: PortfolioHolding[]) => {
        console.log(data);
        this.portfolioHoldings.set(data);

        // test stats
        this.portfolioStats.set({
          total: this.findSum(this.portfolioHoldings()),
          highestPurchase: this.findHighest(this.portfolioHoldings()),
          latestPurchase: this.findLatestPurchase(this.portfolioHoldings()),
        })
        console.log(this.portfolioStats());

      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  handleSubmit(): void {
    console.log("handleSubmit");

    console.log(this.portfolioHoldingForm.value);
    console.log(this.portfolioHoldingForm.valid);
    console.log(this.portfolioHoldingForm.valid);


    const { portfolioId, assetId, quantity, purchasePrice, purchaseDate} = this.portfolioHoldingForm.value;
    
    if(portfolioId && assetId && quantity && purchasePrice && purchaseDate) {

      const newPortfolioHolding: PortfolioHolding = {
        asset: {
          id: assetId
        },
        quantity,
        purchasePrice,
        purchaseDate
      }
  
      this.portfolioHoldingService.create(portfolioId, newPortfolioHolding).subscribe({
        
        next: (value) => {
            console.log("value: ", value);
            this.portfolioHoldingForm.reset();
            this.isDialogVisible.set(false);
            this.loadData();
        },
        error: (err) => {
          console.log("err: ", err);
        },
      });


    }

  }
  
  handleCancel() {
    console.log("handleCancel");
  }

  showDialog(): void {
    console.log("showDialog");

    
    // this.isDialogVisible.set(!this.isDialogVisible())


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


