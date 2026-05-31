import { CATEGORY_LABELS } from "@/data/cards";
import type {
  CardRewardEstimate,
  CategoryOpportunity,
  MonthlySpending,
  RewardsCard,
  SpendingCategory,
  SpendingSummary,
} from "@/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as SpendingCategory[];

/**
 * Estimate annual rewards for a single card given an annual spending summary.
 * Categories without an explicit rate fall back to the card's `base` rate.
 */
export function estimateAnnualRewards(
  card: RewardsCard,
  spending: SpendingSummary,
): CardRewardEstimate {
  const gross = CATEGORIES.reduce((total, category) => {
    const amount = spending[category];
    const rate = card.rates[category] ?? card.rates.base;
    return total + amount * rate;
  }, 0);

  return {
    card,
    grossAnnualRewards: gross,
    netAnnualRewards: gross - card.annualFee,
  };
}

/** Rank a list of cards by **net** annual rewards (after the annual fee). */
export function rankCards(
  cards: RewardsCard[],
  spending: SpendingSummary,
): CardRewardEstimate[] {
  return cards
    .map((c) => estimateAnnualRewards(c, spending))
    .sort((a, b) => b.netAnnualRewards - a.netAnnualRewards);
}

export function totalSpend(spending: SpendingSummary | MonthlySpending): number {
  return CATEGORIES.reduce((sum, c) => sum + spending[c], 0);
}

/** Multiply every category by 12 to project a monthly profile to a year. */
export function monthlyToAnnual(monthly: MonthlySpending): SpendingSummary {
  return CATEGORIES.reduce<SpendingSummary>((acc, c) => {
    acc[c] = monthly[c] * 12;
    return acc;
  }, {} as SpendingSummary);
}

/**
 * Value missed if the same spend went on debit instead of the best rewards card.
 * Debit earns ~0 rewards, so the gap is the best card's net annual rewards
 * (clamped at zero — a card whose fee exceeds rewards isn't an improvement).
 */
export function missedValueOnDebit(best: CardRewardEstimate): number {
  return Math.max(0, best.netAnnualRewards);
}

/**
 * For each category, compute the annual rewards value it contributes under
 * the given card. Sorted descending so the biggest opportunity comes first.
 */
export function categoryOpportunities(
  monthly: MonthlySpending,
  card: RewardsCard,
): CategoryOpportunity[] {
  return CATEGORIES.map<CategoryOpportunity>((category) => {
    const monthlyAmount = monthly[category];
    const annual = monthlyAmount * 12;
    const rate = card.rates[category] ?? card.rates.base;
    return {
      category,
      label: CATEGORY_LABELS[category],
      monthly: monthlyAmount,
      annual,
      annualReward: annual * rate,
    };
  }).sort((a, b) => b.annualReward - a.annualReward);
}

// ──────────────────────────────────────────────────────────────────────────────
// Formatting

const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Single source of truth for AUD currency strings (e.g. `$1,630`). */
export const formatAUD = (n: number): string =>
  audFormatter.format(Math.round(Number.isFinite(n) ? n : 0));

const percentFormatter = new Intl.NumberFormat("en-AU", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export const formatRate = (n: number): string => percentFormatter.format(n);
