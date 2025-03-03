import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private API_URL = environment.BACKEND_API_URL + "/assets";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Asset[]> {
    const url = `${this.API_URL}/`;
    return this.http.get<Asset[]>(url);
  }

  findAllByAssetTypeId(id: number): Observable<Asset[]> {
    
    // const url = `${this.API_URL}/`;

    const urlString = `${this.API_URL}/`;
    
    const searchParams = new URLSearchParams({
      "assetTypeId": id.toString()
    });


    const url = `${new URL(urlString).toString()}?${searchParams.toString()}`;

    console.log("url: ", url);

    return this.http.get<Asset[]>(url);
  }

  findById(id: number): Observable<Asset> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Asset>(url);
  }

  create(asset: Asset): Observable<Asset> {
    const url = `${this.API_URL}`;
    return this.http.post<Asset>(url, asset);
  }

  update(id: number, asset: Asset): Observable<Asset> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<Asset>(url, asset);
  }

  delete(id: number): Observable<Asset> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<Asset>(url);
  }

}
