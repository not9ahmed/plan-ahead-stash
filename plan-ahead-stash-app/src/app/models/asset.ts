import { AssetType } from "./asset-type";

export interface Asset {
    id?: number,
    name: string,
    assetType: AssetType,
    startDate: Date,
    maturityDate: Date,
    numberOfDays: number,
    createdDate?: Date,
    modifiedDate?: Date
}

// I can create entity with 

// name: string,
// assetType: {
//     id: 1
// },
// startDate: Date,
// maturityDate: Date,
