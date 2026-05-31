"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  CATEGORY_SLIDER_MAX,
  defaultMonthlyScenario,
  sampleCards,
} from "@/data/cards";
import {
  categoryOpportunities,
  formatAUD,
  formatRate,
  missedValueOnDebit,
  monthlyToAnnual,
  rankCards,
  totalSpend,
} from "@/lib/rewards";
import type { MonthlySpending, SpendingCategory } from "@/types";
import { CategoryOpportunityBreakdown } from "./CategoryOpportunityBreakdown";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as SpendingCategory[];

export function SpendingScenario() {
  const [monthly, setMonthly] = useState<MonthlySpending>(
    defaultMonthlyScenario,
  );

  const view = useMemo(() => {
    const annual = monthlyToAnnual(monthly);
    const ranked = rankCards(sampleCards, annual);
    const best = ranked[0];
    return {
      monthlyTotal: totalSpend(monthly),
      annualTotal: totalSpend(annual),
      ranked,
      best,
      missed: missedValueOnDebit(best),
      opportunities: categoryOpportunities(monthly, best.card),
    };
  }, [monthly]);

  const update = (cat: SpendingCategory, value: number) => {
    const safe = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
    setMonthly((prev) => ({ ...prev, [cat]: safe }));
  };

  const reset = () => setMonthly(defaultMonthlyScenario);

  return (
    <>
      <section
        id="scenario"
        className="mb-8 rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-100">
              Try your monthly spending
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              Drag the sliders or type a number to match your household. Drift
              re-estimates the value you&apos;d earn on a rewards card — and
              how much of that you&apos;d miss on debit — instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="self-start rounded-md border border-border px-3 py-1.5 text-xs text-zinc-400 transition hover:border-accent/60 hover:text-zinc-100"
          >
            Reset to sample
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <label
                  htmlFor={`scenario-${cat}`}
                  className="text-xs uppercase tracking-wide text-zinc-500"
                >
                  {CATEGORY_LABELS[cat]}
                </label>
                <div className="flex items-center gap-1 text-sm text-zinc-400">
                  <span className="text-zinc-500">$</span>
                  <input
                    id={`scenario-${cat}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={10}
                    value={monthly[cat]}
                    onChange={(e) => update(cat, Number(e.target.value))}
                    className="w-20 rounded-md border border-border bg-background px-2 py-1 text-right text-sm tabular-nums text-zinc-100 outline-none focus:border-accent/70"
                    aria-label={`${CATEGORY_LABELS[cat]} monthly spend in AUD`}
                  />
                  <span className="text-xs text-zinc-500">/mo</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={CATEGORY_SLIDER_MAX[cat]}
                step={10}
                value={monthly[cat]}
                onChange={(e) => update(cat, Number(e.target.value))}
                className="w-full accent-accent"
                aria-label={`${CATEGORY_LABELS[cat]} slider`}
              />
              <div className="mt-1 flex justify-between text-[10px] tabular-nums text-zinc-600">
                <span>{formatAUD(0)}</span>
                <span>{formatAUD(CATEGORY_SLIDER_MAX[cat])}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
          <StatCard label="Monthly spend" value={formatAUD(view.monthlyTotal)} />
          <StatCard label="Annual spend" value={formatAUD(view.annualTotal)} />
          <StatCard
            label="Est. annual rewards"
            value={formatAUD(Math.max(0, view.best.grossAnnualRewards))}
            accent
          />
          <StatCard
            label="Missed on debit / yr"
            value={formatAUD(view.missed)}
            hint="What you&rsquo;d leave on the table if this spend went on debit."
            accent
          />
        </div>
      </section>

      {/* Recommendation */}
      <section className="mb-12 rounded-2xl border border-accent/40 bg-gradient-to-br from-accentMuted/15 via-surface to-surface p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
            Best match
          </span>
          <span className="text-xs text-zinc-500">
            for your current spending profile
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-zinc-50">
          {view.best.card.name}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{view.best.card.issuer}</p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Net rewards / yr"
            value={formatAUD(view.best.netAnnualRewards)}
            accent
          />
          <StatCard
            label="Gross rewards / yr"
            value={formatAUD(Math.max(0, view.best.grossAnnualRewards))}
          />
          <StatCard
            label="Annual fee"
            value={formatAUD(view.best.card.annualFee)}
          />
          <StatCard
            label="Base earn rate"
            value={formatRate(view.best.card.rates.base)}
          />
        </div>

        <p className="mt-6 text-sm leading-relaxed text-zinc-300">
          {view.best.card.highlight} On your current spending profile, that
          works out to about{" "}
          <span className="text-accent">
            {formatAUD(view.best.netAnnualRewards)}
          </span>{" "}
          per year after the {formatAUD(view.best.card.annualFee)} annual fee —
          assuming you pay your balance in full every month.
        </p>
      </section>

      <CategoryOpportunityBreakdown
        opportunities={view.opportunities}
        cardName={view.best.card.name}
      />

      {/* Card comparison */}
      <section className="mb-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-medium text-zinc-100">
              Card comparison
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Ranked by net annual rewards on your current scenario.
            </p>
          </div>
        </div>
        <ul className="space-y-3">
          {view.ranked.map((est, i) => (
            <li
              key={est.card.id}
              className={`rounded-xl border bg-surface p-5 transition ${
                i === 0
                  ? "border-accent/60 shadow-[0_0_0_1px_rgba(124,92,255,0.25)]"
                  : "border-border"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-zinc-100">
                      {est.card.name}
                    </h3>
                    {i === 0 && (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                        Best match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">{est.card.issuer}</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {est.card.highlight}
                  </p>
                </div>
                <div className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-1 text-right sm:grid-cols-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                      Net / yr
                    </p>
                    <p className="text-lg font-semibold tabular-nums text-zinc-100">
                      {formatAUD(est.netAnnualRewards)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                      Annual fee
                    </p>
                    <p className="text-sm tabular-nums text-zinc-400">
                      {formatAUD(est.card.annualFee)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  accent?: boolean;
  hint?: string;
}

function StatCard({ label, value, accent, hint }: StatCardProps) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-1 text-xl font-semibold tabular-nums sm:text-2xl ${
          accent ? "text-accent" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[11px] leading-snug text-zinc-500">{hint}</p>
      )}
    </div>
  );
}
