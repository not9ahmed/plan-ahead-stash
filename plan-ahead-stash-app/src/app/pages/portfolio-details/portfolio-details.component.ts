import { Component, Input, signal } from '@angular/core';
import { PortifolioService } from '../../services/portifolio.service';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Portfolio } from '../../models/portfolio';


@Component({
  selector: 'app-portfolio-details',
  imports: [CommonModule, PanelModule, CardModule, DividerModule],
  templateUrl: './portfolio-details.component.html',
  styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent {
  
  portfolioId = signal<number>(0);
  portfolio = signal<Portfolio | null>(null);


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
    this.portifolioService.findById(this.portfolioId()).subscribe({
      next: (data: Portfolio) => {
          console.log(data);
          this.portfolio.set(data);
      },
      error: (err) => {
          console.log(err)
      },
    })

  }
}
