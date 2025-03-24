import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private API_URL = environment.BACKEND_API_URL + "/portfolios";

  constructor(private http: HttpClient) { }


  findAll(): Observable<Portfolio[]> {
    const url = `${this.API_URL}/`;
    return this.http.get<Portfolio[]>(url);
  }

  findById(id: number): Observable<Portfolio> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Portfolio>(url);
  }

  create(portfolio: Portfolio): Observable<Portfolio> {
    const url = `${this.API_URL}`;
    return this.http.post<Portfolio>(url, portfolio);
  }

  update(id: number, portfolio: Portfolio): Observable<Portfolio> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<Portfolio>(url, portfolio);
  }


  delete(id: number): Observable<null> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<null>(url);
  }


  findAllByUserId(userId: number): Observable<Portfolio[]> {
    const url = `${this.API_URL}/users/${userId}`;
    return this.http.get<Portfolio[]>(url);
  }

}
