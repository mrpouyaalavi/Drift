export type SpendingCategory =
  | "groceries"
  | "fuel"
  | "dining"
  | "transport"
  | "travel"
  | "subscriptions"
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

/** Sparse: missing categories are treated as zero spend. */
export type SpendingSummary = Partial<Record<SpendingCategory, number>>;

export interface CardRewardEstimate {
  card: RewardsCard;
  grossAnnualRewards: number;
  netAnnualRewards: number;
}

/** Categories surfaced in the interactive scenario form. */
export type ScenarioCategory =
  | "groceries"
  | "fuel"
  | "dining"
  | "subscriptions"
  | "other";

export type MonthlySpending = Record<ScenarioCategory, number>;
