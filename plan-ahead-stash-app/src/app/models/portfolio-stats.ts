import { PortfolioHolding } from "./portfolio-holding";

export interface PortfolioStats {
    total: number| null,
    highestPurchase: PortfolioHolding | null,
    latestPurchase: PortfolioHolding | null,
}
