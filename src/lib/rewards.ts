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

// Work out a year's rewards for one card. Categories without their own rate
// fall back to the card's base rate.
export function estimateAnnualRewards(
  card: RewardsCard,
  spending: SpendingSummary,
): CardRewardEstimate {
  const gross = CATEGORIES.reduce((total, category) => {
    const rate = card.rates[category] ?? card.rates.base;
    return total + spending[category] * rate;
  }, 0);

  return {
    card,
    grossAnnualRewards: gross,
    netAnnualRewards: gross - card.annualFee,
  };
}

// Best card = best *net* return, so a fat annual fee can't win on gross alone.
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

// Keep a number inside [min, max]; junk (NaN/Infinity) becomes min.
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function monthlyToAnnual(monthly: MonthlySpending): SpendingSummary {
  return CATEGORIES.reduce<SpendingSummary>((acc, c) => {
    acc[c] = monthly[c] * 12;
    return acc;
  }, {} as SpendingSummary);
}

// Debit earns nothing, so the "you'd miss this on debit" figure is just the
// best card's net return. Floor at zero — a fee-heavy card isn't a saving.
export function missedValueOnDebit(best: CardRewardEstimate): number {
  return Math.max(0, best.netAnnualRewards);
}

// Per-category breakdown for the chosen card, biggest opportunity first.
export function categoryOpportunities(
  monthly: MonthlySpending,
  card: RewardsCard,
): CategoryOpportunity[] {
  return CATEGORIES.map<CategoryOpportunity>((category) => {
    const annual = monthly[category] * 12;
    const rate = card.rates[category] ?? card.rates.base;
    return {
      category,
      label: CATEGORY_LABELS[category],
      monthly: monthly[category],
      annual,
      annualReward: annual * rate,
    };
  }).sort((a, b) => b.annualReward - a.annualReward);
}

// One formatter, reused everywhere, so currency always looks the same.
const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export const formatAUD = (n: number): string =>
  aud.format(Math.round(Number.isFinite(n) ? n : 0));

const percent = new Intl.NumberFormat("en-AU", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export const formatRate = (n: number): string => percent.format(n);
