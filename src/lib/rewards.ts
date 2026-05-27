import type {
  CardRewardEstimate,
  RewardsCard,
  SpendingCategory,
  SpendingSummary,
} from "@/types";

/**
 * Estimate annual rewards for a single card given an annual spending summary.
 * Rates are decimals (e.g. 0.02 = 2% back). Categories without a specific
 * rate fall back to the card's `base` rate.
 */
export function estimateAnnualRewards(
  card: RewardsCard,
  spending: SpendingSummary,
): CardRewardEstimate {
  const gross = (Object.entries(spending) as [SpendingCategory, number][]).reduce(
    (total, [category, amount]) => {
      const rate = card.rates[category] ?? card.rates.base;
      return total + amount * rate;
    },
    0,
  );

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
  return Object.values(spending).reduce((sum, n) => sum + n, 0);
}

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export const formatAUD = (n: number) => aud.format(n);
