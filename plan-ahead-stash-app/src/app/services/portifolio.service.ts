import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortifolioService {

  private API_URL = environment.BACKEND_API_URL + "/portfolios";

  constructor(private http: HttpClient) { }


  findAll(): Observable<Portfolio[]> {
    const url = `${this.API_URL}/`;
    return this.http.get<Portfolio[]>(url);
  }

  


}
