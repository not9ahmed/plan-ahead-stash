import { Injectable } from '@angular/core';
import { AssetType } from '../models/asset-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {

  private API_URL = environment.BACKEND_API_URL + "/assetsType";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<AssetType[]> {
    return this.http.get<AssetType[]>(`${this.API_URL}/`);
  }

  findById(id: number): Observable<AssetType> {
    return this.http.get<AssetType>(`${this.API_URL}/${id}`);
  }

  create(assetType: AssetType): Observable<AssetType> {
    return this.http.post<AssetType>(`${this.API_URL}`, assetType);
  }


  edit(id: number, assetType: AssetType): Observable<AssetType> {
    return this.http.put<AssetType>(`${this.API_URL}/${id}`, assetType);
  }


  delete(id: number) {
    return this.http.delete<null>(`${this.API_URL}/${id}`);
  }

}
