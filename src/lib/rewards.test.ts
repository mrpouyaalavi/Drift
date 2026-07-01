import { describe, expect, it } from "vitest";
import {
  categoryOpportunities,
  clamp,
  estimateAnnualRewards,
  missedValueOnDebit,
  monthlyToAnnual,
  rankCards,
  totalSpend,
} from "./rewards";
import type { MonthlySpending, RewardsCard } from "@/types";

const monthly: MonthlySpending = {
  groceries: 500,
  fuel: 100,
  dining: 200,
  subscriptions: 50,
  other: 150,
};

const lowFeeCard: RewardsCard = {
  id: "low-fee",
  name: "Low Fee Everyday",
  issuer: "Test Bank",
  annualFee: 50,
  rates: { base: 0.01, groceries: 0.02 },
  highlight: "Test card with a low fee and a groceries bonus.",
};

const highFeeCard: RewardsCard = {
  id: "high-fee",
  name: "High Fee Premium",
  issuer: "Test Bank",
  annualFee: 400,
  rates: { base: 0.03 },
  highlight: "Test card with a high base rate but a steep fee.",
};

describe("monthlyToAnnual", () => {
  it("multiplies every category by 12", () => {
    const annual = monthlyToAnnual(monthly);
    expect(annual.groceries).toBe(6000);
    expect(annual.fuel).toBe(1200);
    expect(annual.dining).toBe(2400);
    expect(annual.subscriptions).toBe(600);
    expect(annual.other).toBe(1800);
  });
});

describe("totalSpend", () => {
  it("sums every category", () => {
    expect(totalSpend(monthly)).toBe(500 + 100 + 200 + 50 + 150);
  });
});

describe("estimateAnnualRewards", () => {
  it("computes gross rewards using category rates, falling back to base", () => {
    const annual = monthlyToAnnual(monthly);
    const estimate = estimateAnnualRewards(lowFeeCard, annual);

    // groceries at 2%, everything else at the 1% base rate.
    const expectedGross =
      annual.groceries * 0.02 +
      annual.fuel * 0.01 +
      annual.dining * 0.01 +
      annual.subscriptions * 0.01 +
      annual.other * 0.01;

    expect(estimate.grossAnnualRewards).toBeCloseTo(expectedGross);
  });

  it("nets the annual fee off the gross rewards", () => {
    const annual = monthlyToAnnual(monthly);
    const estimate = estimateAnnualRewards(lowFeeCard, annual);
    expect(estimate.netAnnualRewards).toBeCloseTo(
      estimate.grossAnnualRewards - lowFeeCard.annualFee,
    );
  });
});

describe("rankCards", () => {
  it("ranks by net annual rewards, not gross", () => {
    const annual = monthlyToAnnual(monthly);
    const [best] = rankCards([lowFeeCard, highFeeCard], annual);

    // The high-fee card earns more gross rewards on this spend, but its
    // steep fee should push it below the low-fee card on a net basis.
    expect(best.card.id).toBe("low-fee");
  });

  it("sorts results highest net rewards first", () => {
    const annual = monthlyToAnnual(monthly);
    const ranked = rankCards([highFeeCard, lowFeeCard], annual);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].netAnnualRewards).toBeGreaterThanOrEqual(
        ranked[i].netAnnualRewards,
      );
    }
  });
});

describe("missedValueOnDebit", () => {
  it("floors at zero when the best card is net-negative", () => {
    const annual = monthlyToAnnual({
      groceries: 0,
      fuel: 0,
      dining: 0,
      subscriptions: 0,
      other: 0,
    });
    const estimate = estimateAnnualRewards(highFeeCard, annual);
    expect(missedValueOnDebit(estimate)).toBe(0);
  });

  it("equals the best card's net rewards otherwise", () => {
    const annual = monthlyToAnnual(monthly);
    const estimate = estimateAnnualRewards(lowFeeCard, annual);
    expect(missedValueOnDebit(estimate)).toBe(estimate.netAnnualRewards);
  });
});

describe("clamp", () => {
  it("keeps values within [min, max]", () => {
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("treats non-finite input as the minimum", () => {
    expect(clamp(NaN, 0, 100)).toBe(0);
    expect(clamp(Infinity, 0, 100)).toBe(0);
  });
});

describe("categoryOpportunities", () => {
  it("sorts categories by estimated annual reward, highest first", () => {
    const opportunities = categoryOpportunities(monthly, lowFeeCard);
    for (let i = 1; i < opportunities.length; i++) {
      expect(opportunities[i - 1].annualReward).toBeGreaterThanOrEqual(
        opportunities[i].annualReward,
      );
    }
  });
});
