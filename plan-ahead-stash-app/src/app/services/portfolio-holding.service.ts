import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PortfolioHolding } from '../models/portfolio-holding';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioHoldingService {

  private API_URL = environment.BACKEND_API_URL + "/portfolios";

  constructor(private http: HttpClient) { }
  
  findAllByPortfolioId(id: number): Observable<PortfolioHolding[]> {
    return this.http.get<PortfolioHolding[]>(`${this.API_URL}/${id}/holdings/`);
  }

  create(portfolioId: number, portfolioHolding: PortfolioHolding): Observable<PortfolioHolding> {
    const url = `${this.API_URL}`;
    return this.http.post<PortfolioHolding>(`${url}/${portfolioId}/holdings`, portfolioHolding);
  }

  update(id: number, portfolioHolding: PortfolioHolding): Observable<PortfolioHolding> {
    const url = `${this.API_URL}`;
    return this.http.put<PortfolioHolding>(`${url}/holdings/${id}`, portfolioHolding);
  }

  delete(id: number): Observable<any> {
    const url = `${this.API_URL}`;
    return this.http.delete<PortfolioHolding>(`${url}/holdings/${id}`);
  }
}
