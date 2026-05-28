import type {
  CardRewardEstimate,
  MonthlySpending,
  RewardsCard,
  ScenarioCategory,
  SpendingCategory,
  SpendingSummary,
} from "@/types";

/**
 * Estimate annual rewards for a single card given an annual spending summary.
 * Rates are decimals (e.g. 0.02 = 2% back). Categories without a specific
 * rate fall back to the card's `base` rate. Missing categories count as zero.
 */
export function estimateAnnualRewards(
  card: RewardsCard,
  spending: SpendingSummary,
): CardRewardEstimate {
  const entries = Object.entries(spending) as [
    SpendingCategory,
    number | undefined,
  ][];

  const gross = entries.reduce((total, [category, amount]) => {
    if (!amount) return total;
    const rate = card.rates[category] ?? card.rates.base;
    return total + amount * rate;
  }, 0);

  return {
    card,
    grossAnnualRewards: gross,
    netAnnualRewards: gross - card.annualFee,
  };
}

export function rankCards(
  cards: RewardsCard[],
  spending: SpendingSummary,
): CardRewardEstimate[] {
  return cards
    .map((c) => estimateAnnualRewards(c, spending))
    .sort((a, b) => b.netAnnualRewards - a.netAnnualRewards);
}

export function totalAnnualSpend(spending: SpendingSummary): number {
  return Object.values(spending).reduce<number>(
    (sum, n) => sum + (n ?? 0),
    0,
  );
}

/** Map the scenario form's 5 monthly categories to an annual SpendingSummary. */
export function monthlyScenarioToAnnual(
  monthly: MonthlySpending,
): SpendingSummary {
  return {
    groceries: monthly.groceries * 12,
    fuel: monthly.fuel * 12,
    dining: monthly.dining * 12,
    subscriptions: monthly.subscriptions * 12,
    other: monthly.other * 12,
  };
}

export function totalMonthlySpend(monthly: MonthlySpending): number {
  return Object.values(monthly).reduce((sum, n) => sum + n, 0);
}

/**
 * Value missed if the same spend went on debit instead of the best rewards card.
 * Debit earns ~0 rewards, so the gap is the best card's net annual rewards
 * (clamped at zero — a card whose fee exceeds rewards isn't an improvement).
 */
export function missedValueOnDebit(best: CardRewardEstimate): number {
  return Math.max(0, best.netAnnualRewards);
}

export const SCENARIO_CATEGORY_LABELS: Record<ScenarioCategory, string> = {
  groceries: "Groceries",
  fuel: "Fuel",
  dining: "Dining",
  subscriptions: "Subscriptions",
  other: "Other everyday spend",
};

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export const formatAUD = (n: number) => aud.format(n);
