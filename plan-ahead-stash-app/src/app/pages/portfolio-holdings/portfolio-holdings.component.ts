import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { PortfolioHolding } from '../../models/portfolio-holding';
import { PortfolioStats } from '../../models/portfolio-stats';
import { PortfolioHoldingService } from '../../services/portfolio-holding.service';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-portfolio-holdings',
  imports: [CommonModule, PanelModule, CardModule, DividerModule, TableModule, ToolbarModule, ToastModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './portfolio-holdings.component.html',
  styleUrl: './portfolio-holdings.component.css',
  providers: [ConfirmationService, MessageService]

})
export class PortfolioHoldingsComponent {

  id = input<number>(0);
  
  // Child to parent communication
  @Output()
  dialogVisableEvent = new EventEmitter<boolean>();


  portfolio = signal<Portfolio | null>(null);
  portfolioHoldings = signal<PortfolioHolding[] | []>([]);
  portfolioStats = signal<PortfolioStats>
    ({
      total: 0,
      highestPurchase: null,
      latestPurchase: null
    });



  constructor(private portfolioService: PortfolioService, private portfolioHoldingService: PortfolioHoldingService, private assetService: AssetService) {

  }


  ngOnInit() {
    console.log("ngOnInit PortfolioHoldingsComponent");

    this.loadData();
  }


  loadData(): void {
    // get all portfolio along with the assets
    // may better us portfolio holding
    this.portfolioService.findById(this.id()).subscribe({
      next: (data: Portfolio) => {
        console.log(data);
        this.portfolio.set(data);
      },
      error: (err) => {
        console.log(err)
      },
    });


    this.portfolioHoldingService.findAllByPortfolioId(this.id()).subscribe({
      next: (data: PortfolioHolding[]) => {
        console.log(data);
        this.portfolioHoldings.set(data);

      },
      error: (err) => {
        console.log(err);
      },
    })

  }

  showDialog() {
    console.log("showDialog PortfolioHoldingsComponent");
    this.dialogVisableEvent.emit(true);
  }
}
