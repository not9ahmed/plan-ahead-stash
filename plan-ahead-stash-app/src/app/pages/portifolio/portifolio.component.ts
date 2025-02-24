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

  constructor(private portifolioService: PortifolioService) {
    portifolioService.findAll().subscribe({
      next: (data) => {
        console.log(data);
        this.portfolios = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
