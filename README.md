# Oak & Form — Premium Furniture Showroom Demo

Oak & Form is a fictional, frontend-only furniture showroom demonstration built to help present a credible digital-showroom concept to independent furniture businesses. It is not a real business, e-commerce shop, or production admin system.

## Stack

- Next.js 16 App Router with TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Typed mock data and browser `localStorage`
- Static export configuration for Netlify

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks and production build

```bash
npm run lint
npm run build
```

`npm run build` produces a deployable static site in `out/`.

## Demo routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial showroom homepage |
| `/catalogue` | Searchable, filterable product catalogue |
| `/product?slug=…` | Browser-local product detail page and gallery, including newly added products |
| `/contact` | Clearly labelled fictional showroom/contact flow |
| `/admin` | Demo management dashboard |
| `/admin/products` | Local product CRUD demonstration |
| `/admin/categories` | Local category create, rename and safe-delete management |
| `/admin/bookings` | Local booking request and status management |
| `/admin/inquiries` | Local inquiry status management |

## Mock data and persistence

- Product data is in `data/catalogue.ts`; business copy/contact placeholders are in `data/config.ts`.
- The client-side demo store seeds products, inquiries and booking requests into `localStorage` under `oak-form-demo-v1`.
- Dashboard edits persist only in the current browser and are immediately reflected in the public catalogue in that browser. This includes category additions and renames; deleting a category with products requires moving those products first.
- New demo products use the static, browser-local product-detail route so they can be viewed immediately without a backend-generated dynamic page.
- Netlify also rewrites legacy `/products/<slug>` URLs to the browser-local detail route, so product links remain usable after deployment.
- “Demo inquiry” submissions never contact a real person. They are saved only to the current browser’s demo dashboard.
- Product booking requests are likewise browser-local. They demonstrate visit, availability-hold and custom-order requests; they are not payments, completed orders or guaranteed reservations.

## Netlify deployment

This project uses `output: "export"` and requires no server or API routes.

1. Push the repository to your Git provider.
2. In Netlify, create a new site from the repository.
3. Set build command to `npm run build`.
4. Set publish directory to `out`.
5. Deploy.

## Before adapting for a real showroom

- Replace all fictional business details and mock products.
- Replace remote demo photography with licensed, client-owned or correctly licensed assets. Current Unsplash image URLs are for prototype presentation only.
- Add a real inquiry delivery channel after agreement with the business.
- Move products, inquiries, categories and image uploads to a secured backend/database.
- Add authentication, authorization, validation, auditability and privacy practices before exposing the admin experience.
- Verify prices, specifications, addresses, policies and all business claims with the client.

## Project documentation

- `docs/DESIGN_RESEARCH.md` — inspected references, visual direction, palette and interaction choices.
- `docs/IMPLEMENTATION_PLAN.md` — routes, architecture, data/state strategy, and deployment plan.
