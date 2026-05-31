import type { CategoryOpportunity } from "@/types";
import { formatAUD } from "@/lib/rewards";

interface Props {
  opportunities: CategoryOpportunity[];
  cardName: string;
}

export function CategoryOpportunityBreakdown({ opportunities, cardName }: Props) {
  const top = opportunities[0];

  return (
    <section className="mb-12 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="text-lg font-medium text-zinc-100">
          Where your rewards come from
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Estimated annual rewards by category using the current best-match
          card (<span className="text-zinc-200">{cardName}</span>), sorted
          biggest first.
          {top && top.annualReward > 0 && (
            <>
              {" "}
              <span className="text-zinc-200">{top.label.toLowerCase()}</span>{" "}
              is currently your largest opportunity.
            </>
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-background/60 text-left text-[11px] uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Category</th>
              <th className="px-4 py-2.5 text-right font-medium">Monthly</th>
              <th className="px-4 py-2.5 text-right font-medium">Annual</th>
              <th className="px-4 py-2.5 text-right font-medium">
                Est. rewards / yr
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {opportunities.map((o, i) => (
              <tr
                key={o.category}
                className={i === 0 ? "bg-accent/[0.04]" : undefined}
              >
                <td className="px-4 py-3 text-zinc-200">{o.label}</td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
                  {formatAUD(o.monthly)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-300">
                  {formatAUD(o.annual)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium tabular-nums ${
                    i === 0 ? "text-accent" : "text-zinc-100"
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
