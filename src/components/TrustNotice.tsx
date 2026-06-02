export function TrustNotice() {
  return (
    <section className="surface-panel mb-12 p-6 sm:p-8">
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden
          className="inline-flex h-1.5 w-1.5 rounded-full bg-accent"
        />
        <h2 className="caption text-muted">Responsible credit</h2>
      </div>
      <p className="text-sm leading-relaxed text-muted">
        Drift is an educational prototype. Estimates use simplified earn rates
        and assume points are worth roughly one cent each — actual values vary
        by program, by redemption, and over time.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        These figures do <span className="text-foreground">not</span> account
        for eligibility, ongoing interest charges, late fees, foreign-
        transaction fees, sign-up bonuses, points caps, your credit score, or
        your personal financial circumstances. A rewards card only makes sense
        if you pay your balance in full every month — high interest charges can
        quickly outweigh any rewards value.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Always check the current Product Disclosure Statement and Target
        Market Determination before applying. This is general information,
        not personal financial advice.
      </p>
    </section>
  );
}
