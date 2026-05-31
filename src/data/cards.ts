import type { MonthlySpending, RewardsCard, SpendingCategory } from "@/types";

/** Default starting values for the interactive scenario (AUD per month). */
export const defaultMonthlyScenario: MonthlySpending = {
  groceries: 650,
  fuel: 200,
  dining: 300,
  subscriptions: 80,
  other: 400,
};

export const CATEGORY_LABELS: Record<SpendingCategory, string> = {
  groceries: "Groceries",
  fuel: "Fuel",
  dining: "Dining",
  subscriptions: "Subscriptions",
  other: "Other everyday spend",
};

/** Upper bound on each slider (AUD per month). */
export const CATEGORY_SLIDER_MAX: Record<SpendingCategory, number> = {
  groceries: 1500,
  fuel: 600,
  dining: 1000,
  subscriptions: 300,
  other: 1500,
};

export const sampleCards: RewardsCard[] = [
  {
    id: "qff-platinum",
    name: "Qantas Frequent Flyer Platinum",
    issuer: "ANZ",
    annualFee: 295,
    rates: { base: 0.01, dining: 0.02, fuel: 0.015 },
    highlight:
      "Earn Qantas Points on every dollar, with a higher rate at restaurants and the pump.",
  },
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    issuer: "American Express",
    annualFee: 395,
    rates: { base: 0.02, subscriptions: 0.025 },
    highlight:
      "Strong base earn across all categories, with a small boost on streaming and subscriptions.",
  },
  {
    id: "cba-low-rate-rewards",
    name: "CommBank Awards Low Fee",
    issuer: "CommBank",
    annualFee: 59,
    rates: { base: 0.0075, groceries: 0.015, fuel: 0.015 },
    highlight:
      "Low annual fee with a bonus earn rate at the supermarket and at the pump.",
  },
];
