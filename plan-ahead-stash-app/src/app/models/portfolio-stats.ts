import { PortfolioHolding } from "./portfolio-holding";

export interface PortfolioStats {
    total: number,
    highestPurchase: PortfolioHolding,
    latestPurchase: PortfolioHolding,

}
