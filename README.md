# Drift — Daily Spend Optimizer

Drift is a small educational fintech prototype that estimates the annual rewards value a user may miss by spending on a debit card instead of an eligible rewards-based credit card.

> Educational prototype only. Not financial advice.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Static mock data (no DB, no auth, no API)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/         # App Router pages, layout, global styles
  data/        # Static mock data (cards, sample spending)
  lib/         # Pure logic (rewards calculation)
  types/       # Shared TypeScript types
```

## Interactive spending scenario

The home page now includes a **Spending scenario** section where you can
adjust your assumed monthly spend across five everyday categories —
Groceries, Fuel, Dining, Subscriptions, and Other — using number inputs
and sliders. As values change, Drift recalculates live:

- Total monthly and annual spend
- Estimated annual rewards on the best-matched card
- Estimated value missed each year if that same spend went on debit

Estimates use the sample earn rates in `src/data/cards.ts` and a
simplified 1¢-per-point value assumption.

## Roadmap

- CSV transaction upload
- AI-assisted spending insights
- Polished UI (shadcn/ui, Framer Motion)
- Vercel deployment
