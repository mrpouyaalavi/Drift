# Drift: Walkthrough

A short write-up of the thinking behind Drift, my take-home for the Software
Engineer Intern role at Open / Open Home Loans.

- **Project type:** B, New Product Feature
- **Brief:** 1C, Daily Spend Optimizer
- **Live demo:** https://drift-daily-spend-optimizer.vercel.app

## The problem I focused on

Plenty of people already hold a rewards credit card but still reach for debit on
everyday purchases out of habit. The rewards they give up are real, but they're
invisible. Nothing in the day puts a number on them, so nobody changes anything.

Brief 1C asks for a tool that makes the ongoing value of rewards-card spending
tangible. I took "tangible" literally. The core of Drift is a single number that
moves as you describe your own spending.

## Why it matters

This is a small leak that recurs and compounds. It isn't dramatic like
high-interest debt, which is exactly why people ignore it. If you can turn a
vague "I should probably use my rewards card more" into "this is worth about
$X a year to me," you give someone a concrete reason to act. I wanted to do that
honestly, by netting off the annual fee instead of quoting a flattering gross
number.

## Product approach

I kept the scope to one screen that does one job well:

1. **Estimate your spend.** Five everyday categories (groceries, fuel, dining,
   subscriptions, other), each with a slider and a number input.
2. **See the value.** Live figures for monthly and annual spend, gross estimated
   rewards, and the headline net benefit per year versus paying on debit.
3. **Understand and decide.** A best-card recommendation, a category breakdown
   of where the rewards come from, a ranked card comparison, and a
   responsible-credit notice.

I'd rather ship one flow that feels considered end to end than a thin app that
does five things halfway.

## Key product decisions

- **Net, not gross, is the headline.** Cards rank by net annual rewards (after
  the fee), and the recommendation changes as the spending profile changes. A
  high-fee card shouldn't win on gross points alone.
- **Debit earns nothing**, so "net benefit" is just the best card's net annual
  rewards. It's an easy model to trust.
- **Responsible credit is up front**, not buried. The tool says plainly that it
  ignores interest, eligibility, points caps, and personal circumstances, and
  that a rewards card only makes sense if you pay in full.
- **Realistic mock data instead of a live API.** The team confirmed that public
  earn-rate and points-value benchmarks with sample spending were fine, so I
  used a small set of AU-flavoured cards and a simple 1 cent per point value,
  clearly labelled as assumptions.

## Design decisions

- Followed the supplied Open.money / Figma direction: a dark, warm, premium
  look with near-black surfaces, soft borders, generous rounding, and a
  brand-gold accent, with a hotter orange kept only for the missed-value moment.
- Centralised the palette as semantic tokens in `tailwind.config.ts` and a few
  reusable classes in `globals.css` (`.surface-panel`, `.surface-card`,
  `.surface-selected`, `.btn-primary`, `.btn-secondary`, `.caption`), so the
  look stays consistent and is easy to retheme.
- Gave the page some depth with a faint amber glow and lit-from-above card
  gradients, because a flat black void felt cheap.

## Engineering decisions

- **Pure calculation core.** All the rewards maths sits in `src/lib/rewards.ts`
  as small pure functions, with one AUD formatter so currency always looks the
  same. That keeps the logic easy to reason about and the components simple.
- **Server Component by default.** The page is a Server Component; only
  `SpendingScenario` is a client component and it owns the state, so the
  recommendation, breakdown, and comparison all re-derive from one source.
- **Strict TypeScript, no UI library.** Small surface area, fast static build
  (about 106 kB first load), ready for Vercel.
- **Input safety.** Typed values are clamped to each category's range, so a
  stray 99999 can't leak into the maths.

## AI-native workflow

I used AI as an accelerator and kept the decisions myself. It helped me scaffold
components and the pure helpers, sweep for stray colours and unclear labels,
and draft the docs. I reviewed everything, verified each change against
`tsc --noEmit` and `next build`, and wrote or rewrote the product framing, the
calculation model, and the wording of every financial claim.

## What I'd do next with more time

- CSV or bank-feed import so people don't estimate spend by hand. A drop zone
  first, then a provider like Basiq.
- A real card registry behind the existing typed schema, refreshed as offers
  change, instead of three sample cards.
- A sensitivity view showing how the recommendation shifts as points value moves
  from about 0.5 to 2 cents, since that assumption drives the headline number.
- An AI insight that names the single highest-leverage change, for example
  "moving fuel to Card X earns about $84 a year more."
- Unit tests around `rewards.ts`, which is kept pure to make that easy.
