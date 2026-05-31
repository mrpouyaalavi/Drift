export function TrustNotice() {
  return (
    <section className="mb-12 rounded-2xl border border-border bg-surface/60 p-6">
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex h-1.5 w-1.5 rounded-full bg-accent"
        />
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-300">
          Responsible credit
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">
        Drift is an educational prototype. Estimates use simplified earn rates
        and assume points are worth roughly one cent each — actual values vary
        by program, by redemption, and over time.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        These figures do <span className="text-zinc-200">not</span> account for
        eligibility, ongoing interest charges, late fees, foreign-transaction
        fees, sign-up bonuses, points caps, your credit score, or your personal
        financial circumstances. A rewards card only makes sense if you pay
        your balance in full every month — interest at 18–22% wipes out the
        rewards quickly.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Always check the current Product Disclosure Statement and Target
        Market Determination before applying. This is general information,
        not personal financial advice.
      </p>
    </section>
  );
}
