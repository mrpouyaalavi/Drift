# Drift: Daily Spend Optimizer

> An educational fintech prototype that helps Australians see the rewards
> value they leave on the table by spending on debit instead of an eligible
> rewards credit card.

Built as a take-home for the Software Engineer Intern application at
Open / Open Home Loans.

- **Project type:** B, New Product Feature
- **Brief:** 1C, Daily Spend Optimizer
- **Live demo:** https://drift-daily-spend-optimizer.vercel.app
- **Repository:** this repo
- **Walkthrough:** [`WALKTHROUGH.md`](./WALKTHROUGH.md)

## Problem

Many Australians have a rewards credit card sitting in their wallet but still
tap debit out of habit for everyday spending. Even modest household spending
routed through a rewards card can generate hundreds of dollars in points value
per year. The trouble is that the value is invisible, so the behaviour never
changes.

## Solution

Drift makes that missing value concrete. The user adjusts five everyday monthly
spend categories (groceries, fuel, dining, subscriptions, other) and
immediately sees:

- their monthly and annual spend
- the estimated annual rewards value the best matched card would earn
- the **net benefit vs debit**, which is rewards after the card's annual fee
  compared with earning no rewards on debit
- a category-level breakdown showing where the biggest opportunity is
- a side-by-side ranking of sample cards by **net** annual rewards

Everything updates live as the sliders move.

## Key features

- **Interactive scenario** with sliders and number inputs for five categories,
  recalculating live.
- **Best-card recommendation** with net rewards, gross rewards, annual fee, and
  base reward return broken out clearly.
- **Category opportunity breakdown**, sorted from highest to lowest estimated
  annual rewards contribution, with a small proportion bar per row.
- **Card comparison** ranked by net annual rewards, with a "Best match" badge
  that moves live with the scenario.
- **Trust-aware disclaimer** that flags what the estimate does *not* model
  (interest, eligibility, points caps, personal circumstances).
- Dark fintech aesthetic, accessible labels, keyboard navigable.

## Design system

Visual tokens are aligned to the supplied Open / Open.money design-system
reference (`Design System Reference [For Intern].fig`). Key tokens:

- Warm near-black background with subtle amber and charcoal glows, **surface**
  `#1B1B1A`, warmer card surface `#24231F`, **surface-muted** `#121211`,
  **border** `#383C3F` (highlight `#F2AC59`).
- **Brand gold** `#F2AC59` (hover `#F6BD73`) for rewards and positive emphasis,
  plus a hotter `#FD6422` for missed value, used here on the *Net benefit*
  metric. No purple.
- **Three-tier text**: primary `#FFFFFF`, secondary `#B8B8B8`, muted `#7A7A7A`.
- **Buttons** follow the system convention (primary is a solid white pill,
  secondary is a bordered pill), and **captions** are uppercase and
  letter-spaced (around 0.14em, with a tighter variant for long labels).

Tokens are centralised in `tailwind.config.ts` and reusable classes
(`.surface-panel`, `.surface-card`, `.surface-selected`, `.btn-primary`,
`.btn-secondary`, `.caption`) live in `src/app/globals.css`, so styling stays
consistent rather than scattered as one-off hex through JSX.

> Note: the `.fig` file is a ZIP whose `canvas.fig` payload is Figma's
> compressed Kiwi binary, so exact vector data and the precise typeface could
> not be extracted offline. Tokens above were read from the style-guide and
> component screenshots. Typography uses a modern system-sans stack as a
> stand-in.

## Tech stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- React 19 client component for the interactive section
- No backend, no database, no API routes, no auth, no external UI library

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build (also type-checks and lints the app)
```

> Standalone ESLint is not configured (`next lint` would launch an interactive
> setup), but `next build` runs Next.js's built-in linting and type validation,
> which pass cleanly.

## Project structure

```
src/
  app/                       # App Router pages, layout, global styles
    page.tsx                 # Server Component: hero and structure
    layout.tsx
    globals.css
  components/
    SpendingScenario.tsx     # Client: owns state, form, summary, ranking
    CategoryOpportunityBreakdown.tsx
    TrustNotice.tsx
  data/cards.ts              # Mock cards, default scenario, category labels
  lib/rewards.ts             # Pure calculation and formatting helpers
  types/index.ts             # Shared TypeScript types
```

## Assumptions

- **Points are valued at about 1 cent each.** Real-world value varies by
  program and redemption type (premium flight redemptions can be 2 to 4 cents
  per point; cashback or gift cards are often lower).
- **Sample cards and earn rates are mocked** for the prototype. Three
  AU-flavoured cards roughly representative of common archetypes (frequent
  flyer, base-earn premium, low-fee everyday).
- **Debit is assumed to earn zero rewards**, so "net benefit vs debit" equals
  the best card's net annual rewards.
- **Best card means highest net annual rewards** (gross rewards minus the
  annual fee). No modelling of sign-up bonuses, intro offers, or points caps.
- **Inputs are clamped** to each category's slider range (typed values are
  bounded to `[0, max]`) so the estimate stays realistic.

## Responsible credit disclaimer

Drift is an **educational prototype**, not financial advice. The estimates do
not consider eligibility, ongoing interest charges, late fees, foreign
transaction fees, sign-up bonuses, points caps, your credit score, or your
personal financial circumstances. A rewards card only makes sense if you pay
your balance in full every month, because interest of roughly 18 to 22 percent
quickly outweighs the rewards. Always check the current Product Disclosure
Statement and Target Market Determination before applying.

## Known limitations

- **Mock data only.** Three hand-written sample cards and a flat 1 cent per
  point value, not a live or comprehensive card market.
- **No live financial APIs**, no bank feeds, no persistence. All state lives in
  the browser for the current session.
- **Simplified earn model.** No points caps, tiers, sign-up bonuses, intro
  rates, interest, or eligibility logic.
- **Typeface is a stand-in.** The exact Figma font could not be extracted
  offline (see the design system note).
- **No automated tests yet.** `rewards.ts` is pure and ready for unit tests,
  but none are wired up.

## What I'd improve next

- **CSV or bank-feed import** so the user doesn't have to estimate spend by
  hand. A CSV drop zone first, then a provider like Basiq for live feeds.
- **AI-assisted insights** that summarise the spending pattern and name the
  single highest-leverage change (for example, "moving your fuel spend to Card
  X would earn an extra $84 a year").
- **A real card registry** behind the existing typed schema, refreshed
  periodically so the calculator stays honest as offers change.
- **A sensitivity view** showing how the recommendation shifts as points value
  moves from about 0.5 to 2 cents per point.
- **Charts** for the category breakdown and "what if I shifted X% of my debit
  spend to a rewards card" projections.
- **Accessibility and motion polish**: proper focus-ring tokens, reduced-motion
  handling, and screen-reader friendly live regions for the scenario stats.
- **Unit tests** around `rewards.ts`, which is kept pure to make that easy.

## Submission checklist

- [x] Working feature (interactive Daily Spend Optimizer)
- [x] Live demo on Vercel
- [x] GitHub repository
- [x] Written walkthrough ([`WALKTHROUGH.md`](./WALKTHROUGH.md))
- [x] Runs locally with `npm install` and `npm run dev`
- [x] Clean `npm run build`

## Note

This prototype uses **static mock data only**. No live financial APIs, no user
data leaves the browser, no analytics. It is built to be read, understood, and
extended quickly.
