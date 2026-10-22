# Oak & Form — Implementation Plan

## Visual direction

An editorial premium showroom, following the research in `DESIGN_RESEARCH.md`: warm neutrals, walnut accents, DM Serif Display headings, DM Sans interface typography, image-forward layout and restrained motion.

## Routes

| Route | Responsibility |
| --- | --- |
| `/` | Home, collections, featured pieces, showroom CTA |
| `/catalogue` | Searchable/filterable product catalogue |
| `/products/[slug]` | Product gallery, specifications, finishes, inquiry action, related products |
| `/contact` | Fictional showroom details and a simulated inquiry form |
| `/admin` | Demo dashboard overview |
| `/admin/products` | Locally persisted product management |
| `/admin/categories` | Category management demonstration |
| `/admin/inquiries` | Locally persisted demo inquiry tracking |

## Architecture

```text
app/                 route-level screens and layouts
components/
  storefront/        public-navigation, hero, cards, product gallery, inquiry form
  admin/             sidebar, metrics, data tables and editing dialogs
  ui/                shared buttons, inputs, dialog, section heading, empty state
lib/                 class utilities and localStorage helpers
data/                business configuration, mock products, categories and inquiries
types/               product, category and inquiry models
```

## Data and state

- Typed static seed data holds 18 products, categories, business configuration and initial inquiries.
- `DemoStoreProvider` hydrates from `localStorage` in the browser, seeds clean installations, and exposes product/category/inquiry CRUD.
- Any admin change updates the public catalogue immediately in the same browser.
- Demo data is strictly browser-specific, not authenticated, and not shared between devices; the UI repeats that limitation where appropriate.
- Product details use existing static slugs. Demo-created products link back to the catalogue until a real backend supports dynamic route generation.

## Reusable components

- `Button`, `Input`, `Dialog`, `SectionHeading`, `EmptyState`, `Reveal`
- `ProductCard`, `ProductGallery`, `CategoryRail`, `CatalogueControls`, `InquiryForm`
- `PublicHeader`, `Footer`, `AdminSidebar`, `MetricCard`, `ProductTable`, `ProductEditor`

## Responsive strategy

- Public content uses a centred `max-width: 1440px` container with 20px mobile gutters.
- Grids move from 1–2 columns on phones through 3 on tablet to 4 on wide desktop.
- Tables become compact cards/scrollable containers on small screens; sidebar becomes a horizontal mobile control.
- Touch targets meet a 44px minimum. Keyboard focus and reduced-motion styles are part of the global design system.

## Animation strategy

- Framer Motion powers hero/reveal entrances, card stagger, image hover and dialogs/menu transitions.
- Uses `useReducedMotion`; motion is short and optional.

## Implementation order

1. Initialize Next.js/Tailwind project and install minimal dependencies.
2. Configure theme, fonts, data models and demo-store context.
3. Build shared primitives and public shell.
4. Build home, catalogue and product-detail experience.
5. Build contact/inquiry flow.
6. Build dashboard shell, products, categories and inquiries screens.
7. Add localStorage persistence, accessibility pass and responsive styling.
8. Run lint/type checks/build and verify key interactions in a browser where available.

## Testing and Netlify plan

- Run `npm run lint` and `npm run build` after implementation.
- Use `output: 'export'` in Next config so `out/` can be deployed as a static Netlify site with no server/API dependency.
- Netlify build command: `npm run build`; publish directory: `out`.
- Before deploying a real customer version, replace demo contact data, configure proper enquiry delivery, supply licensed photos, add authentication and move shared data to a backend.
