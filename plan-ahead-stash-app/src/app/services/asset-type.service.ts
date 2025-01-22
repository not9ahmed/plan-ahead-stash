import { Injectable } from '@angular/core';
import { AssetType } from '../models/asset-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:8080/assetsType";

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(`${API_URL}/`);
  }

  findById(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(`${API_URL}/${id}`);
  }

  create(assetType: AssetType): Observable<AssetType> {
    return this.http.post<AssetType>(`${API_URL}`, assetType);
  }


  edit(id: number, assetType: AssetType): Observable<AssetType> {
    return this.http.put<AssetType>(`${API_URL}/${id}`, assetType);
  }


  delete(id: number) {
    return this.http.delete<null>(`${API_URL}/${id}`);
  }

}
