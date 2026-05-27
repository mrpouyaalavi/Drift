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

## Roadmap

- CSV transaction upload
- AI-assisted spending insights
- Polished UI (shadcn/ui, Framer Motion)
- Vercel deployment
