import type { MonthlySpending, RewardsCard, SpendingSummary } from "@/types";

/** Mock annual spending profile in AUD, used for the static summary section. */
export const sampleAnnualSpending: SpendingSummary = {
  groceries: 7800,
  fuel: 2400,
  dining: 3600,
  transport: 1200,
  travel: 2000,
  subscriptions: 960,
  entertainment: 1200,
  other: 3600,
};

/** Default starting values for the interactive scenario (AUD per month). */
export const defaultMonthlyScenario: MonthlySpending = {
  groceries: 650,
  fuel: 200,
  dining: 300,
  subscriptions: 80,
  other: 400,
};

export const sampleCards: RewardsCard[] = [
  {
    id: "qff-platinum",
    name: "Qantas Frequent Flyer Platinum",
    issuer: "ANZ",
    annualFee: 295,
    rates: { base: 0.01, dining: 0.02, travel: 0.025, fuel: 0.015 },
    highlight: "Earn Qantas Points on every dollar — boosted on dining and travel.",
  },
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    issuer: "American Express",
    annualFee: 395,
    rates: {
      base: 0.02,
      travel: 0.03,
      entertainment: 0.03,
      subscriptions: 0.025,
    },
    highlight: "Higher base earn, plus $400 travel credit each year.",
  },
  {
    id: "cba-low-rate-rewards",
    name: "CommBank Awards Low Fee",
    issuer: "CommBank",
    annualFee: 59,
    rates: { base: 0.0075, groceries: 0.015, fuel: 0.015 },
    highlight:
      "Low annual fee, with a bonus earn rate at the supermarket and at the pump.",
  },
];
