const STEPS = [
  "Spending values are illustrative monthly estimates you enter or adjust.",
  "Drift converts each monthly figure into an annual estimate (× 12).",
  "It estimates annual rewards for each card using mock, category-specific earn rates.",
  "The card's annual fee is subtracted from gross rewards to get a net benefit.",
  "Cards are ranked highest net benefit first, so a high-fee card can't win on gross rewards alone.",
  "All of this is illustrative only — Drift is not financial advice.",
];

export function HowItsCalculated() {
  return (
    <section className="surface-panel mb-12 p-6 sm:p-8">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <span>
            <span className="caption mb-2 block">Methodology</span>
            <span className="text-lg font-medium text-foreground">
              How this is calculated
            </span>
          </span>
          <span
            aria-hidden
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-sm text-muted transition group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <ol className="mt-5 space-y-3 border-t border-border pt-5 text-sm leading-relaxed text-muted">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="caption-tight mt-0.5 shrink-0 text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
