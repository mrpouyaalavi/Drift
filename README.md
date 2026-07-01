# Drift — Daily Spend Optimizer

Drift is a financial decision-support web app that helps users model spending
habits, compare reward scenarios, and estimate annual net benefit across
spending categories.

**Live demo:** [drift-daily-spend-optimizer.vercel.app](https://drift-daily-spend-optimizer.vercel.app) _(update with your deployed URL)_

## Screenshots

_Add a screenshot or short screen recording of the app here once deployed —
the hero, the interactive scenario, and the card comparison are good shots to
include._

```
docs/screenshot-hero.png
docs/screenshot-scenario.png
docs/screenshot-comparison.png
```

## Why I built it

Most people have at least one rewards card sitting in their wallet but still
reach for debit out of habit. The rewards left on the table are real money,
but they're invisible — nothing in the moment puts a number on them, so the
habit never changes. I wanted to build something that turns a vague "I should
probably use my rewards card more" into a concrete, personalised number, and
to practice the product thinking that goes into decision-support tools:
picking one honest metric, being upfront about what the model doesn't know,
and keeping the interaction loop tight and immediate.

## Problem

Everyday spending decisions (which card to use, where the money actually
goes) are hard to reason about because the value of "doing it right" is
diffuse and delayed. A single missed rewards category rarely feels worth
worrying about, even though the effect compounds over a year.

## Solution

Drift makes that value concrete. The user adjusts five everyday monthly
spend categories and immediately sees:

- their monthly and annual spend
- the estimated annual rewards value the best-matched card would earn
- the **net benefit**, which is rewards after the card's annual fee
- a category-level breakdown showing where the biggest opportunity is
- a side-by-side ranking of sample cards by **net** annual rewards

Everything recalculates live as the inputs change.

## Features

- **Interactive scenario** with sliders and number inputs for five spending
  categories, recalculating instantly.
- **Best-match recommendation** with net rewards, gross rewards, annual fee,
  and base reward rate broken out clearly.
- **Category opportunity breakdown**, ranked from highest to lowest estimated
  annual contribution, with a proportion bar per row.
- **Card comparison**, ranked by net annual rewards, with a "Best match"
  badge that updates live with the scenario.
- **"How this is calculated"** section that explains the model in plain
  language.
- **Reset to sample data** to return to a representative default scenario.
- **Trust-aware disclaimer** that states plainly what the estimate does *not*
  model.
- Dark, accessible UI with keyboard-navigable controls and a responsive
  layout down to mobile widths.

## Tech stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) (strict)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) for unit tests
- Deployed on [Vercel](https://vercel.com/)
- No backend, no database, no auth, no external UI library — all state lives
  in the browser for the current session

## Product thinking

- **Net, not gross, is the headline number.** Cards are ranked by net annual
  rewards (after the fee), so a high-fee card can't win purely on a flattering
  gross figure.
- **Debit is the baseline.** Debit is modelled as earning zero rewards, so
  "net benefit" is simply the best card's net annual rewards — an easy model
  to explain and to trust.
- **The disclaimer is up front, not buried.** The app says plainly that it
  ignores interest, eligibility, points caps, and personal circumstances.
- **One flow, done well.** Rather than a thin app with five shallow features,
  Drift is a single screen that takes a user from "adjust your spend" to "see
  the number" to "understand why" without navigation.
- **Calculation logic stays pure and separate from UI** (`src/lib/rewards.ts`),
  so the model is easy to read, easy to test, and easy to change without
  touching any component.

## Calculation assumptions

- **Points are valued at roughly 1 cent each.** Real-world value varies by
  program and redemption type (premium flight redemptions can be worth more;
  cashback or gift-card redemptions are often worth less).
- **Sample cards and earn rates are mocked**, loosely modelled on common
  card archetypes (frequent-flyer, premium base-earn, low-fee everyday).
- **Debit is assumed to earn zero rewards**, so "net benefit" equals the best
  card's net annual rewards.
- **Best card = highest net annual rewards** (gross rewards minus the annual
  fee). There's no modelling of sign-up bonuses, intro offers, or points
  caps.
- **Inputs are clamped** to each category's slider range, so a stray typed
  value can't produce an unrealistic estimate.

## Disclaimer

All calculations are illustrative and based on simplified mock assumptions.
Drift is for demonstration purposes only and is not financial advice. It does
not account for eligibility, ongoing interest charges, late fees,
foreign-transaction fees, sign-up bonuses, points caps, your credit score, or
your personal financial circumstances. A rewards card only makes sense if you
pay your balance in full every month — carried-interest charges typically
outweigh any rewards value.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest unit tests
npm run build      # production build (also type-checks and lints)
```

## Project structure

```
src/
  app/                              # App Router: page, layout, global styles
  components/
    SpendingScenario.tsx            # Client: owns state, inputs, summary, ranking
    CategoryOpportunityBreakdown.tsx
    HowItsCalculated.tsx
    TrustNotice.tsx
  data/cards.ts                     # Mock cards, default scenario, category labels
  lib/rewards.ts                    # Pure calculation and formatting helpers
  lib/rewards.test.ts               # Unit tests for the calculation core
  types/index.ts                    # Shared TypeScript types
```

## Future improvements

- CSV or bank-feed import, so spend doesn't have to be estimated by hand.
- A real, periodically refreshed card registry behind the existing typed
  schema instead of three sample cards.
- A sensitivity view showing how the recommendation shifts as points value
  moves between roughly 0.5 and 2 cents per point.
- Charts for the category breakdown and "what if I shifted X% of my spend"
  projections.
- Deeper accessibility polish: explicit focus-ring tokens, reduced-motion
  handling, and live regions for the scenario stats.

---

Originally developed as a time-boxed product engineering exercise and later
refined as a portfolio project.
