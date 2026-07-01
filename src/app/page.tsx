import { HowItsCalculated } from "@/components/HowItsCalculated";
import { SpendingScenario } from "@/components/SpendingScenario";
import { TrustNotice } from "@/components/TrustNotice";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="mb-14 sm:mb-20">
        <p className="caption mb-4 text-accent">Drift · Daily spend optimizer</p>
        <h1 className="max-w-2xl text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-[3.25rem]">
          See the everyday rewards value you may be missing.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Many people use debit out of habit for everyday spending. Drift turns
          that habit into a clear estimate of the rewards value they could earn
          by routing eligible spend through a rewards card instead.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <HowItWorksStep
            title="Estimate your spend"
            body="Match the sliders to roughly what you spend each month."
          />
          <HowItWorksStep
            title="See the net benefit"
            body="Drift compares sample cards and ranks them by estimated net annual value after fees."
          />
          <HowItWorksStep
            title="Decide deliberately"
            body="Use the result as a starting point, not personal financial advice."
          />
        </div>
      </header>

      <SpendingScenario />

      <HowItsCalculated />

      <TrustNotice />

      <footer className="border-t border-border pt-6 text-xs text-subtle">
        This tool uses simplified assumptions and mock data for demonstration
        purposes only. It is not financial advice.
      </footer>
    </main>
  );
}

function HowItWorksStep({ title, body }: { title: string; body: string }) {
  return (
    <div className="surface-card p-5">
      {/* A short gold rule instead of a numbered badge. Reads as editorial,
          not a templated step counter. */}
      <span aria-hidden className="block h-px w-7 bg-accent/70" />
      <p className="mt-4 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
