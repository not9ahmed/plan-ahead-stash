import { Injectable } from '@angular/core';

export type AssetType = {
  id: number,
  name: string,
  createdDate: Date,
  modifiedDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AssetsTypeService {

  private assetsType: AssetType[] = [];

  constructor() {

    this.assetsType = [
      { id: 1, name: "Sukuk", createdDate: new Date(), modifiedDate: new Date() },
      { id: 2, name: "ETF", createdDate: new Date(), modifiedDate: new Date() },
      { id: 3, name: "Crowfunding", createdDate: new Date(), modifiedDate: new Date() },
      { id: 4, name: "Stocks", createdDate: new Date(), modifiedDate: new Date() },
      { id: 3, name: "Mutual Funds", createdDate: new Date(), modifiedDate: new Date() },
    ]
  }


  getAssets(): AssetType[] {
    return this.assetsType;
  }
}
