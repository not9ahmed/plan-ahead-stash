import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PortfolioHoldingService {

  private API_URL = environment.BACKEND_API_URL + "/portfolios";
// http://localhost:8080/api/portfolios/12/holdings/

  constructor(private http: HttpClient) { }
  
  findAllPortfolioId(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}/holdings/`);
  }
}
