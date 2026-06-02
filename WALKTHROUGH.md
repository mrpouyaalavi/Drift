# Drift — Walkthrough

A short written walkthrough of the decisions behind Drift, my take-home for the
Software Engineer Intern role at Open / Open Home Loans.

- **Project type:** B — New Product Feature
- **Brief:** 1C — Daily Spend Optimizer

---

## The problem I focused on

Lots of people already hold a rewards credit card, but still reach for debit on
everyday purchases out of habit. The rewards they forgo are real but invisible —
there's no moment in their day that puts a number on it, so the behaviour never
changes.

Brief 1C asks for a tool that makes the ongoing value of rewards-card spending
tangible. I took "tangible" literally: the core of Drift is a single number that
moves as you describe your own spending.

## Why it matters

This is a small, recurring, compounding leak. It isn't dramatic like high-
interest debt, which is exactly why it's ignored. A tool that converts a vague
"I should probably use my rewards card more" into "this is worth about $X a year
to me" gives people a concrete reason to act — and does it honestly, by netting
off the annual fee rather than quoting a flattering gross number.

## Product approach

I scoped deliberately to one screen that does one thing well:

1. **Estimate your spend** — five everyday categories (groceries, fuel, dining,
   subscriptions, other) with sliders and number inputs.
2. **See the value** — live stats for monthly/annual spend, gross estimated
   rewards, and the headline **net benefit per year** vs paying on debit.
3. **Understand and decide** — a best-card recommendation, a category-level
   breakdown of where the rewards come from, a ranked card comparison, and a
   responsible-credit notice.

Depth over breadth: rather than a thin multi-feature app, I built one flow that
feels considered end to end.

## Key product decisions

- **Net, not gross, is the hero.** Cards are ranked by net annual rewards (after
  the annual fee), and the recommendation can change as the spending profile
  changes. A high-fee card shouldn't "win" on gross points alone.
- **Debit = zero rewards**, so "net benefit vs debit" is simply the best card's
  net annual rewards — an easy mental model to trust.
- **Responsible-credit context is first-class**, not fine print. The tool
  explicitly says it ignores interest, eligibility, points caps, and personal
  circumstances, and that a rewards card only makes sense if you pay in full.
- **Realistic mock data over a live API.** The team confirmed public earn-rate
  and points-value benchmarks with sample spending were acceptable, so I used a
  small set of AU-flavoured cards and a simple ~1¢/point valuation — clearly
  labelled as assumptions.

## Design decisions

- Aligned the UI to the supplied **Open.money / Figma design direction**: pure-
  black background, near-black surfaces, soft borders, generous rounding, and a
  brand-gold accent, with a hotter orange reserved for the "missed value" moment.
- Centralised the palette as **semantic tokens** in `tailwind.config.ts` plus a
  few reusable classes (`.btn-primary`, `.btn-secondary`, `.caption`), so the
  look is consistent and easy to retheme rather than scattered hex.
- Kept a clear three-tier text hierarchy and an uppercase, letter-spaced caption
  motif to match the reference's premium, minimal tone.

## Engineering decisions

- **Pure calculation core.** All rewards maths lives in `src/lib/rewards.ts` as
  small pure functions (`estimateAnnualRewards`, `rankCards`,
  `categoryOpportunities`, `monthlyToAnnual`), with a single AUD formatter as the
  source of truth for currency strings. This keeps the logic testable and the
  components dumb.
- **Server Component by default.** The page is a Server Component; only the
  interactive `SpendingScenario` is a client component and owns the scenario
  state, so everything below it re-derives live from one source of truth.
- **Strict TypeScript, no external UI library.** Small surface area, fast build
  (~106 kB First Load JS), statically prerendered, ready for Vercel.

## AI-native workflow

I used AI as an accelerator while keeping ownership of the decisions:

- Pressure-testing scope so the prototype stayed focused on one problem.
- Scaffolding components, the pure helpers, and token wiring — all reviewed.
- Sweeping QA passes (stray colours, unclear labels, types, responsiveness),
  each verified against `tsc --noEmit` and `next build`.
- Drafting documentation, which I edited for accuracy and tone.

The product framing, the calculation model, and the wording of every financial
claim are mine.

## What I'd do next with more time

- **CSV / bank-feed import** so people don't estimate spend by hand — a CSV drop
  zone first, then a provider like Basiq for live feeds.
- **A real card registry** behind the existing typed schema, refreshed as offers
  change, instead of three sample cards.
- **A sensitivity view** showing how the recommendation shifts as points value
  moves from ~0.5¢ to ~2¢, since that assumption drives the headline number.
- **AI-assisted insight** that names the single highest-leverage change ("moving
  fuel to Card X earns ~$84/year more").
- **Unit tests** around `rewards.ts` — it's intentionally pure to make this easy.
