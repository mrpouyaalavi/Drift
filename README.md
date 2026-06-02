# Drift — Daily Spend Optimizer

> An educational fintech prototype that helps Australians see the rewards
> value they leave on the table by spending on debit instead of an eligible
> rewards credit card.

Built as a take-home for the Software Engineer Intern application at
Open / Open Home Loans.

- **Project type:** B — New Product Feature
- **Brief:** 1C — Daily Spend Optimizer
- **Demo:** _deployment URL to be added (Vercel)_
- **Walkthrough:** [`WALKTHROUGH.md`](./WALKTHROUGH.md)

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
- the **net benefit vs debit** — rewards after the card's annual fee,
  compared with earning no rewards on debit
- a category-level breakdown showing where the biggest opportunity is
- a side-by-side ranking of sample cards by **net** annual rewards

Everything updates live as the sliders move.

## Key features

- **Interactive scenario** — sliders + number inputs for five categories,
  live recalculation.
- **Best-card recommendation** with net rewards, gross rewards, annual fee
  and base reward return clearly broken out.
- **Category opportunity breakdown** — sorted from highest to lowest
  estimated annual rewards contribution.
- **Card comparison** ranked by net annual rewards, with a "Best match"
  badge that moves live with the scenario.
- **Trust-aware disclaimer** that explicitly flags what the estimate does
  *not* model (interest, eligibility, points caps, personal circumstances).
- Dark fintech aesthetic, accessible labels, keyboard-navigable.

## Design system

Visual tokens are aligned to the supplied Open / Open.money design-system
reference (`Design System Reference [For Intern].fig`). Key tokens:

- **Background** pure black `#000000`, **surface** `#1B1B1A`, **surface-muted**
  `#121211`, **border** `#383C3F` (highlight `#F2AC59`).
- **Brand gold** `#F2AC59` (hover `#F6BD73`) for rewards / "healthy" emphasis,
  plus a hotter **`#FD6422`** for "missed value" — mirroring the system's
  savings motif, used here on the *Net benefit vs debit* metric. No purple.
- **Three-tier text**: primary `#FFFFFF`, secondary `#B8B8B8`, muted `#7A7A7A`.
- **Buttons** follow the system convention (primary = solid white pill,
  secondary = bordered pill), and **captions** are uppercase + letter-spaced
  (~0.14em).

Tokens are centralised in `tailwind.config.ts` (semantic colours, radii,
caption tracking) and reusable `.btn-primary` / `.btn-secondary` / `.caption`
classes live in `src/app/globals.css`, so styling is consistent rather than
scattered as one-off hex through JSX.

> The `.fig` file is a ZIP whose `canvas.fig` payload is Figma's proprietary,
> compressed Kiwi binary, so exact vector data and the precise typeface could
> not be extracted offline. Tokens above were read from the style-guide and
> component screenshots; typography uses a modern system-sans stack as an
> acceptable stand-in.

## Tech stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- React 19 client components for the interactive section
- No backend, no database, no API routes, no auth, no external UI library

## AI-native workflow

AI tooling was used as an accelerator throughout, with all decisions and
validation kept under my control:

- **Ideation** — pressure-testing scope so the prototype stays focused on one
  problem (Brief 1C) rather than sprawling.
- **Implementation** — scaffolding components, the pure calculation helpers,
  and Tailwind token wiring, which I reviewed and adjusted.
- **QA** — sweeping for stray colours, unclear labels, type issues, and
  responsiveness gaps; I verified each fix against `tsc` and `next build`.
- **Documentation** — drafting this README and the walkthrough, which I edited
  for accuracy and tone.

The product framing, the calculation model, the wording of financial claims,
and the final sign-off on every change are mine.

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
- **Debit is assumed to earn zero rewards** — so "net benefit vs debit"
  equals the best card's net annual rewards.
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

## Known limitations

- **Mock data only.** Three hand-written sample cards and a flat ~1¢/point
  value — not a live or comprehensive card market.
- **No live financial APIs**, no bank feeds, no persistence. All state lives
  in the browser for the current session.
- **Simplified earn model.** No points caps, tiers, sign-up bonuses, intro
  rates, interest, or eligibility logic.
- **Typeface is a stand-in.** Exact Figma font could not be extracted offline
  (see Design system note).
- **No automated tests yet** — `rewards.ts` is pure and ready for unit tests,
  but none are wired up.

## What I'd improve next

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
- **Tests** — `vitest` unit tests around `rewards.ts` (it's intentionally
  pure to make this easy).

## Submission checklist

- [x] Working feature (interactive Daily Spend Optimizer)
- [x] GitHub repository
- [x] Written walkthrough ([`WALKTHROUGH.md`](./WALKTHROUGH.md))
- [x] Runs locally with `npm install` && `npm run dev`
- [x] Clean `npm run build`
- [ ] Live demo URL (deploy to Vercel, then add above)

## Note

This prototype uses **static mock data only**. No live financial APIs,
no user data leaves the browser, no analytics. Designed to be read,
understood, and extended in an afternoon.
