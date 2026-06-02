import type { CategoryOpportunity } from "@/types";
import { formatAUD } from "@/lib/rewards";

interface Props {
  opportunities: CategoryOpportunity[];
  cardName: string;
}

export function CategoryOpportunityBreakdown({ opportunities, cardName }: Props) {
  // Already sorted high → low, so the first row is the largest opportunity.
  const top = opportunities[0];
  const maxReward = top?.annualReward ?? 0;

  return (
    <section className="surface-panel mb-12 p-6 sm:p-8">
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

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[28rem] text-sm">
          <thead className="bg-surfaceMuted">
            <tr>
              <th className="caption-tight px-4 py-2.5 text-left">Category</th>
              <th className="caption-tight px-4 py-2.5 text-right">Monthly</th>
              <th className="caption-tight px-4 py-2.5 text-right">Annual</th>
              <th className="caption-tight px-4 py-2.5 text-right">
                Est. rewards / yr
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {opportunities.map((o, i) => {
              const share = maxReward > 0 ? o.annualReward / maxReward : 0;
              const isTop = i === 0;
              return (
                <tr key={o.category} className={isTop ? "bg-accent/[0.05]" : undefined}>
                  <td className="px-4 py-3 text-foreground">{o.label}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted">
                    {formatAUD(o.monthly)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted">
                    {formatAUD(o.annual)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`font-medium tabular-nums ${
                          isTop ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {formatAUD(o.annualReward)}
                      </span>
                      {/* little proportion bar so you can eyeball the split */}
                      <span
                        aria-hidden
                        className="block h-1 w-20 overflow-hidden rounded-full bg-border/50"
                      >
                        <span
                          className={`block h-full rounded-full ${
                            isTop ? "bg-accent" : "bg-accent/40"
                          }`}
                          style={{ width: `${Math.round(share * 100)}%` }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
