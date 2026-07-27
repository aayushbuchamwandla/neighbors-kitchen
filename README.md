# Neighbor's Kitchen

A trust-first marketplace for home-cooked meals — pickup only. Neighbors discover, reserve, and pick up real meals from verified home cooks nearby. This is a frontend-only MVP prototype: no backend, no auth, no payments, no database. All data is static mock data.

> "Would I trust buying dinner from this person?" — every page is built to answer yes.

## Why this exists

Delivery apps solved logistics. They didn't solve trust. Neighbor's Kitchen is Shopify + Airbnb + Etsy for home food businesses: cooks build a real profile (story, verification, reviews), neighbors reserve a meal and pick it up in person. Delivery is explicitly **not** the focus of this MVP — it's a future roadmap item, alongside subscriptions, group orders, office catering, cook analytics, community events, and loyalty rewards (see the "Coming Soon" section on the homepage).

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — CSS-variable design tokens, no config file
- **shadcn/ui** (`base-nova` style, built on [Base UI](https://base-ui.com) — not Radix)
- **Framer Motion** for microinteractions
- **Lucide React** for icons

No backend, no database, no authentication, no payment processing — by design, per the MVP spec. All content lives in `src/data/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, Neighborhood Favorites, Trending This Week, New Cooks Nearby, Popular Cuisines, How It Works, Featured Home Cooks, Testimonials, Coming Soon roadmap |
| `/discover` | Pinterest-style masonry grid with cuisine/dietary/price/rating/pickup filters, live search, and sort |
| `/meal/[id]` | Meal detail — full description, ingredients, allergens, nutrition, embedded "Meet Your Cook," reviews, Reserve flow |
| `/cook/[slug]` | Full cook profile — story, stats, all 7 verification badges, reviews, full menu |
| `/become-a-cook` | Cook acquisition page — benefits, 5-step onboarding timeline, mock application form |

## The trust system

Every cook carries seven verification badges (`src/components/shared/verification-badges.tsx`): Government ID, Food Handler Certified, Kitchen Verified, Phone Verified, Email Verified, Background Check Complete, and Neighborhood Trusted Cook. This is the product's moat, so it's surfaced everywhere — cook cards, meal pages, and full cook profiles — not buried in a settings page.

## Reserve flow

`/meal/[id]` → "Reserve Meal" opens a dialog: pick quantity, add pickup instructions, confirm. On confirm it shows an order number, a stylized pickup code, the pickup neighborhood, and a reminder that this is pickup-only (mock — no real payment or backend order is created).

## Mock data

`src/data/` holds everything the app renders:

- `cooks.ts` — 25 home cooks across 15 cuisines, each with a real backstory, verification status, stats, and a slug-based profile route
- `meals.ts` — 105 dishes (4–5 per cook) with descriptions, ingredients, allergens, dietary tags, nutrition, and pickup windows
- `reviews.ts`, `testimonials.ts`, `cuisines.ts` — supporting content

No external image URLs are used anywhere. Every "photo" is CSS/SVG placeholder art (`src/components/shared/meal-art.tsx`, `cook-avatar.tsx`) — a gradient + Lucide icon, tone-mapped per cuisine via a static Tailwind lookup table (`src/components/shared/theme.ts`). This keeps the app fully offline-safe and avoids ever showing a broken image.

## Project structure

```
src/
  app/                    routes (App Router)
  components/
    ui/                   shadcn primitives (Base UI-based)
    shared/                MealCard, CookCard, avatars, badges, rating stars, placeholder art
    layout/                 Navbar, Footer
    home/, discover/, meal/, become-cook/   page-specific sections
  data/                    mock data + types
  lib/                     types.ts, utils.ts
```

## Known limitations (intentional, per MVP scope)

- No authentication, backend, database, or payment integration — everything is client-side mock data
- The Reserve and Become a Cook flows are fully interactive but don't persist anywhere (refresh resets state)
- The "QR code" on the reservation success screen is stylized placeholder art, not a scannable code
- Delivery, subscriptions, group orders, and the other roadmap items are marked "Coming Soon" and are not implemented
