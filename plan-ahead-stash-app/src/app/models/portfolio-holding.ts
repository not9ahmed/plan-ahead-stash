import { Asset } from "./asset"
import { Portfolio } from "./portfolio"

export interface PortfolioHolding {
    id?: 7,
    portfolio?: Portfolio,
    portfolioId?: number,
    asset?: Asset,
    assetId?: number,
    quantity: number,
    purchasePrice: number,
    purchaseDate: Date,
    createdDate?: Date,
    modifiedDate?: Date
}
