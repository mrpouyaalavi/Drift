import { sampleAnnualSpending, sampleCards } from "@/data/cards";
import { formatAUD, rankCards, totalAnnualSpend } from "@/lib/rewards";

export default function HomePage() {
  const ranked = rankCards(sampleCards, sampleAnnualSpending);
  const best = ranked[0];
  const totalSpend = totalAnnualSpend(sampleAnnualSpending);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-14">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">
          Drift
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          The rewards you&apos;re leaving on the table.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Most people swipe debit out of habit. Drift estimates the annual
          rewards value you could be earning by routing the same spending
          through an eligible rewards card.
        </p>
      </header>

      <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Stat label="Annual spend (sample)" value={formatAUD(totalSpend)} />
          <Stat
            label="Best-card rewards / yr"
            value={formatAUD(best.grossAnnualRewards)}
            accent
          />
          <Stat
            label="Net of annual fee"
            value={formatAUD(best.netAnnualRewards)}
          />
        </div>
        <p className="mt-6 text-sm text-zinc-400">
          Based on the sample spending profile below, the{" "}
          <span className="text-zinc-100">{best.card.name}</span> would return
          an estimated{" "}
          <span className="text-accent">
            {formatAUD(best.netAnnualRewards)}
          </span>{" "}
          in rewards each year after fees.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium text-zinc-200">
          Sample spending profile
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Object.entries(sampleAnnualSpending).map(([cat, amount]) => (
            <div
              key={cat}
              className="rounded-xl border border-border bg-surface px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                {cat}
              </p>
              <p className="mt-1 font-medium text-zinc-100">
                {formatAUD(amount)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-medium text-zinc-200">
          Card comparison
        </h2>
        <ul className="space-y-3">
          {ranked.map((est, i) => (
            <li
              key={est.card.id}
              className={`rounded-xl border bg-surface p-5 transition ${
                i === 0
                  ? "border-accent/60 shadow-[0_0_0_1px_rgba(124,92,255,0.25)]"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
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
                <div className="shrink-0 text-right">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Net / yr
                  </p>
                  <p className="text-lg font-semibold text-zinc-100">
                    {formatAUD(est.netAnnualRewards)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    fee {formatAUD(est.card.annualFee)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="rounded-2xl border border-border bg-surface/60 p-5 text-xs leading-relaxed text-zinc-500">
        Drift is an educational prototype. Estimates are based on static
        mock data and simplified reward rates — they are not personal financial
        advice. Always check current product disclosure statements before
        applying for a credit card.
      </footer>
    </main>
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
        className={`mt-1 text-2xl font-semibold ${
          accent ? "text-accent" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
