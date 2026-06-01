import type { CategoryOpportunity } from "@/types";
import { formatAUD } from "@/lib/rewards";

interface Props {
  opportunities: CategoryOpportunity[];
  cardName: string;
}

export function CategoryOpportunityBreakdown({ opportunities, cardName }: Props) {
  const top = opportunities[0];

  return (
    <section className="mb-12 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="mb-5">
        <p className="caption mb-2">Breakdown</p>
        <h2 className="text-lg font-medium text-foreground">
          Where your rewards come from
        </h2>
        <p className="mt-1 text-sm text-muted">
          Estimated annual rewards by category using the current best-match
          card (<span className="text-foreground">{cardName}</span>), sorted
          biggest first.
          {top && top.annualReward > 0 && (
            <>
              {" "}
              <span className="text-foreground">{top.label.toLowerCase()}</span>{" "}
              is currently your largest opportunity.
            </>
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surfaceMuted text-left">
            <tr className="[&>th]:caption [&>th]:px-4 [&>th]:py-2.5">
              <th>Category</th>
              <th className="!text-right">Monthly</th>
              <th className="!text-right">Annual</th>
              <th className="!text-right">Est. rewards / yr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {opportunities.map((o, i) => (
              <tr
                key={o.category}
                className={i === 0 ? "bg-accent/[0.05]" : undefined}
              >
                <td className="px-4 py-3 text-foreground">{o.label}</td>
                <td className="px-4 py-3 text-right tabular-nums text-muted">
                  {formatAUD(o.monthly)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted">
                  {formatAUD(o.annual)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium tabular-nums ${
                    i === 0 ? "text-accent" : "text-foreground"
                  }`}
                >
                  {formatAUD(o.annualReward)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
