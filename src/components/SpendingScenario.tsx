"use client";

import { useMemo, useState } from "react";
import { defaultMonthlyScenario, sampleCards } from "@/data/cards";
import {
  formatAUD,
  missedValueOnDebit,
  monthlyScenarioToAnnual,
  rankCards,
  SCENARIO_CATEGORY_LABELS,
  totalMonthlySpend,
} from "@/lib/rewards";
import type { MonthlySpending, ScenarioCategory } from "@/types";

const CATEGORIES = Object.keys(SCENARIO_CATEGORY_LABELS) as ScenarioCategory[];

const SLIDER_MAX: Record<ScenarioCategory, number> = {
  groceries: 1500,
  fuel: 600,
  dining: 1000,
  subscriptions: 300,
  other: 1500,
};

export function SpendingScenario() {
  const [monthly, setMonthly] = useState<MonthlySpending>(
    defaultMonthlyScenario,
  );

  const { monthlyTotal, annualTotal, best, missed } = useMemo(() => {
    const annual = monthlyScenarioToAnnual(monthly);
    const ranked = rankCards(sampleCards, annual);
    const top = ranked[0];
    return {
      monthlyTotal: totalMonthlySpend(monthly),
      annualTotal: monthly
        ? Object.values(annual).reduce<number>((s, n) => s + (n ?? 0), 0)
        : 0,
      best: top,
      missed: missedValueOnDebit(top),
    };
  }, [monthly]);

  const update = (cat: ScenarioCategory, value: number) => {
    setMonthly((prev) => ({ ...prev, [cat]: Math.max(0, value) }));
  };

  const reset = () => setMonthly(defaultMonthlyScenario);

  return (
    <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-zinc-200">
            Spending scenario
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Adjust your monthly spend below. The rewards estimate updates live.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-border px-3 py-1.5 text-xs text-zinc-400 transition hover:border-accent/60 hover:text-zinc-100"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <div key={cat}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <label
                htmlFor={`scenario-${cat}`}
                className="text-xs uppercase tracking-wide text-zinc-500"
              >
                {SCENARIO_CATEGORY_LABELS[cat]}
              </label>
              <input
                id={`scenario-${cat}`}
                type="number"
                min={0}
                step={10}
                value={monthly[cat]}
                onChange={(e) => update(cat, Number(e.target.value) || 0)}
                className="w-24 rounded-md border border-border bg-background px-2 py-1 text-right text-sm text-zinc-100 outline-none focus:border-accent/70"
                aria-label={`${SCENARIO_CATEGORY_LABELS[cat]} monthly spend in AUD`}
              />
            </div>
            <input
              type="range"
              min={0}
              max={SLIDER_MAX[cat]}
              step={10}
              value={monthly[cat]}
              onChange={(e) => update(cat, Number(e.target.value))}
              className="w-full accent-accent"
              aria-label={`${SCENARIO_CATEGORY_LABELS[cat]} slider`}
            />
            <div className="mt-1 flex justify-between text-[10px] text-zinc-600">
              <span>$0</span>
              <span>{formatAUD(SLIDER_MAX[cat])}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
        <Stat label="Monthly spend" value={formatAUD(monthlyTotal)} />
        <Stat label="Annual spend" value={formatAUD(annualTotal)} />
        <Stat
          label="Est. annual rewards"
          value={formatAUD(Math.max(0, best.grossAnnualRewards))}
          accent
        />
        <Stat label="Missed on debit / yr" value={formatAUD(missed)} accent />
      </div>

      <p className="mt-5 text-sm text-zinc-400">
        Based on this profile, the best match is the{" "}
        <span className="text-zinc-100">{best.card.name}</span> — an estimated{" "}
        <span className="text-accent">{formatAUD(best.netAnnualRewards)}</span>{" "}
        in net rewards each year after the {formatAUD(best.card.annualFee)}{" "}
        annual fee.
      </p>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        Numbers are estimates only, based on sample earn rates and a simplified
        1 cent-per-point value assumption. Real-world earn rates, caps, and
        point redemption values vary by card and program.
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p
        className={`mt-1 text-xl font-semibold ${
          accent ? "text-accent" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
