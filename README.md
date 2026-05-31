# Drift — Daily Spend Optimizer

> An educational fintech prototype that helps Australians see the rewards
> value they leave on the table by spending on debit instead of an eligible
> rewards credit card.

Built as a take-home for the Software Engineer Intern application at
Open / Open Home Loans.

---

## Problem

Many Australians have a rewards credit card sitting in their wallet, but
still tap debit out of habit for everyday spending. Even modest household
spending routed through a rewards card can generate hundreds of dollars in
points value per year — but that value is invisible, so behaviour
doesn't change.

## Solution

Drift makes the missed value concrete. The user adjusts five everyday
monthly spend categories (groceries, fuel, dining, subscriptions, other)
and immediately sees:

- their monthly and annual spend
- the estimated annual rewards value the best-matched card would earn
- how much of that value they&rsquo;d miss if the same spend went on debit
- a category-level breakdown showing where the biggest opportunity is
- a side-by-side ranking of sample cards by **net** annual rewards

Everything updates live as the sliders move.

## Key features

- **Interactive scenario** — sliders + number inputs for five categories,
  live recalculation.
- **Best-card recommendation** with net rewards, gross rewards, annual fee
  and base earn rate clearly broken out.
- **Category opportunity breakdown** — sorted from highest to lowest
  estimated annual rewards contribution.
- **Card comparison** ranked by net annual rewards, with a "Best match"
  badge that moves live with the scenario.
- **Trust-aware disclaimer** that explicitly flags what the estimate does
  *not* model (interest, eligibility, points caps, personal circumstances).
- Dark fintech aesthetic, accessible labels, keyboard-navigable.

## Tech stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- React 19 client components for the interactive section
- No backend, no database, no API routes, no auth, no external UI library

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run lint    # lint
```

## Project structure

```
src/
  app/                       # App Router pages, layout, global styles
    page.tsx                 # Server Component — hero, structure
    layout.tsx
    globals.css
  components/
    SpendingScenario.tsx     # Client — state owner + form + summary + ranking
    CategoryOpportunityBreakdown.tsx
    TrustNotice.tsx
  data/cards.ts              # Mock cards, default scenario, category labels
  lib/rewards.ts             # Pure calculation + formatting helpers
  types/index.ts             # Shared TypeScript types
```

## Assumptions

- **Points are valued at ~1 cent each.** Real-world value varies by program
  and redemption type (premium flight redemptions can be 2–4¢/point;
  cashback or gift cards are often lower).
- **Sample cards and earn rates are mocked** for the prototype. Three
  AU-flavoured cards roughly representative of common archetypes (frequent
  flyer, base-earn premium, low-fee everyday).
- **Debit is assumed to earn zero rewards** — so "missed on debit" equals
  the best card's net annual rewards.
- **Best card = highest net annual rewards** (gross rewards minus annual
  fee). No modelling of sign-up bonuses, intro offers, or points caps.

## Responsible credit disclaimer

Drift is an **educational prototype**, not financial advice. The estimates
do not consider eligibility, ongoing interest charges, late fees, foreign
transaction fees, sign-up bonuses, points caps, your credit score, or your
personal financial circumstances. A rewards card only makes sense if you
pay your balance in full every month — interest at 18–22% wipes out the
rewards quickly. Always check the current Product Disclosure Statement
and Target Market Determination before applying.

## What I&rsquo;d improve next

- **CSV / bank-feed import** so the user doesn't have to estimate spend
  manually — start with a CSV drop zone, then explore Basiq for live feeds.
- **AI-assisted insights** — summarise the user's spending pattern and
  suggest the single highest-leverage behaviour change (e.g. "moving your
  fuel spend to Card X would earn an extra $84/year").
- **Real card data** behind a typed schema, sourced from a curated
  YAML/JSON registry and refreshed periodically — keeps the calculator
  honest as offers change.
- **Sensitivity view** — show how the recommendation changes as points
  value moves from 0.5¢ to 2¢ per point.
- **Charts** for the category opportunity breakdown and "what if I shifted
  X% of my debit spend to a rewards card" projections.
- **Accessibility & motion polish** — proper focus ring tokens, prefers-
  reduced-motion handling, screen-reader friendly live regions for the
  scenario stats.
- **Tests** — `vitest` unit tests around `rewards.ts` (it&rsquo;s
  intentionally pure to make this easy).

## Note

This prototype uses **static mock data only**. No live financial APIs,
no user data leaves the browser, no analytics. Designed to be read,
understood, and extended in an afternoon.
