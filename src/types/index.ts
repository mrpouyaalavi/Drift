export type SpendingCategory =
  | "groceries"
  | "dining"
  | "transport"
  | "travel"
  | "entertainment"
  | "other";

export type CategoryRewardRates = Partial<Record<SpendingCategory, number>> & {
  base: number;
};

export interface RewardsCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  /** Reward rates as decimals, e.g. 0.03 = 3% back. `base` applies to uncategorized spend. */
  rates: CategoryRewardRates;
  highlight: string;
}

export type SpendingSummary = Record<SpendingCategory, number>;

export interface CardRewardEstimate {
  card: RewardsCard;
  grossAnnualRewards: number;
  netAnnualRewards: number;
}
