import { SpendingScenario } from "@/components/SpendingScenario";
import { TrustNotice } from "@/components/TrustNotice";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="mb-12 sm:mb-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          Drift · Daily spend optimizer
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          The rewards you&apos;re leaving on the table — every single week.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          Many Australians use rewards cards, but still tap debit out of habit
          for everyday spending. Drift turns that habit into a number — the
          estimated annual value you&apos;d earn by routing the same spending
          through an eligible rewards card instead.
        </p>

        <div className="mt-7 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
          <HowItWorksStep
            n={1}
            title="Estimate your spend"
            body="Match the sliders to roughly what you spend each month."
          />
          <HowItWorksStep
            n={2}
            title="See the net benefit"
            body="Drift ranks sample cards by net annual rewards on that profile."
          />
          <HowItWorksStep
            n={3}
            title="Decide deliberately"
            body="Use it as a starting point — not as financial advice."
          />
        </div>
      </header>

      <SpendingScenario />

      <TrustNotice />

      <footer className="border-t border-border pt-6 text-xs text-zinc-600">
        Built as a take-home prototype. Uses static mock data — no live
        financial APIs.
      </footer>
    </main>
  );
}

function HowItWorksStep({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[11px] font-medium text-accent">
          {n}
        </span>
        <p className="text-sm font-medium text-zinc-200">{title}</p>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{body}</p>
    </div>
  );
}
