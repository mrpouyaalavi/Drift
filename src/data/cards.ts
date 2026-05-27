import type { RewardsCard, SpendingSummary } from "@/types";

/** Mock annual spending profile in AUD, used for the initial prototype. */
export const sampleAnnualSpending: SpendingSummary = {
  groceries: 7800,
  dining: 3600,
  transport: 2400,
  travel: 2000,
  entertainment: 1200,
  other: 4800,
};

export const sampleCards: RewardsCard[] = [
  {
    id: "qff-platinum",
    name: "Qantas Frequent Flyer Platinum",
    issuer: "ANZ",
    annualFee: 295,
    rates: { base: 0.01, dining: 0.02, travel: 0.025 },
    highlight: "Earn Qantas Points on every dollar — boosted on dining and travel.",
  },
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    issuer: "American Express",
    annualFee: 395,
    rates: { base: 0.02, travel: 0.03, entertainment: 0.03 },
    highlight: "Higher base earn, plus $400 travel credit each year.",
  },
  {
    id: "cba-low-rate-rewards",
    name: "CommBank Awards Low Fee",
    issuer: "CommBank",
    annualFee: 59,
    rates: { base: 0.0075, groceries: 0.015 },
    highlight: "Low annual fee, with a bonus earn rate at the supermarket.",
  },
];
