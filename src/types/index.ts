// Five everyday categories: enough to be useful without drowning the user
// in options.
export type SpendingCategory =
  | "groceries"
  | "fuel"
  | "dining"
  | "subscriptions"
  | "other";

// Earn rates as decimals (0.02 = 2% back). `base` covers anything without a
// category-specific rate.
export type CategoryRewardRates = Partial<Record<SpendingCategory, number>> & {
  base: number;
};

export interface RewardsCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  rates: CategoryRewardRates;
  highlight: string;
}

// Spend by category in AUD. Every category is always present (no optionals to
// guard against downstream).
export type SpendingSummary = Record<SpendingCategory, number>;
export type MonthlySpending = Record<SpendingCategory, number>;

export interface CardRewardEstimate {
  card: RewardsCard;
  grossAnnualRewards: number;
  netAnnualRewards: number;
}

export interface CategoryOpportunity {
  category: SpendingCategory;
  label: string;
  monthly: number;
  annual: number;
  annualReward: number; // rewards this category alone earns in a year
}
