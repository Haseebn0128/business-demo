# Oak & Form — Design Research

Research completed 16 October 2026. The references below were inspected through their live public websites; they are inspiration only, not assets or layouts to copy.

## Useful references

### 1. [Article](https://www.article.com/)
- Broad but structured product navigation groups the catalogue around rooms and product families without overloading the initial view.
- Its product-led catalogue language and the connection between online browsing and a physical showroom are especially relevant to a Lahore showroom demo. Article explicitly frames stores as a place to experience materials and craftsmanship in person.
- Adopt: clear category language, crisp product cards, a practical browse-to-showroom journey.

### 2. [HAY](https://www.hay.com/)
- HAY keeps a restrained, contemporary presentation while allowing product imagery and art direction to carry personality.
- Its content structure connects furniture, lighting, accessories, inspiration and a store finder without visual clutter.
- Adopt: clean editorial compositions, confident negative space, and deliberately limited accent colour.

### 3. [Castlery](https://www.castlery.com/us)
- The homepage balances aspirational room photography with direct category entry points and an in-person showroom invitation.
- The site uses lifestyle images to make the products legible in a real home context rather than treating every image as a cut-out catalogue asset.
- Adopt: room-led feature imagery and a clear path from discovery to a showroom conversation.

### 4. [BoConcept](https://www.boconcept.com/en-us/)
- BoConcept foregrounds its collection and then supports it with customisation, materials and expert advice.
- The presentation makes configurable furniture feel premium by using a calm hierarchy, generous image areas and purposeful copy.
- Adopt: material/finish detail, custom-order language, and consultation-oriented CTAs rather than checkout pressure.

### 5. [West Elm](https://www.westelm.com/)
- West Elm is useful as a catalogue reference for category-driven shopping, editorial room stories, and an accessible but warm home-furnishing tone.
- Adopt: approachable curation and varied editorial section rhythms; do not imitate its brand, commerce flow, or merchandising density.

## Patterns appropriate for Oak & Form

- A slim, typography-led header with a compact mobile menu.
- A full-bleed, editorial hero image with a short, high-confidence proposition.
- Alternating image-led and product-led sections rather than a sequence of identical cards.
- Neutral product photography in stable portrait and landscape aspect ratios.
- A catalogue with one search field and a small category selector, not a wall of speculative filters.
- Product details that centre material, dimensions, finishes and a direct enquiry journey.
- A compact, data-forward admin shell with persistent sidebar navigation, clear page titles, generous row spacing and explicit demo notices.

## Patterns to avoid

- Marketplace-style sale banners, urgency timers, carts and checkout affordances.
- Heavy gradients, parallax, auto-playing carousels, or animation that competes with product imagery.
- Generic admin cards in every available colour; the dashboard should inherit Oak & Form's warm neutral system.
- Excessive filters and faceted navigation before user research supports them.
- Testimonials, business performance claims, or addresses/phone numbers that could imply a real operating business.

## Recommended visual direction

**Oak & Form: Quiet Craft. Contemporary Living.**

The public experience is an editorial showroom: warm ivory surfaces, deep charcoal type, walnut-brown accents, confident cream cards and generous empty space. Images have softly rounded corners only where it helps, avoiding a bubbly template look. The admin remains more functional, but uses the same ink, sand, clay and walnut tokens.

### Typography

- Display: `DM Serif Display` — warm, characterful serif for major headings only.
- Interface/body: `DM Sans` — highly readable geometric sans for navigation, data and long-form product information.
- Avoid decorative script and more than two type families.

### Palette

| Token | Value | Purpose |
| --- | --- | --- |
| Canvas | `#F5F1EB` | Main warm backdrop |
| Paper | `#FFFDF9` | Cards and lifted surfaces |
| Ink | `#20201D` | Primary text / dark sections |
| Walnut | `#6C4E39` | Brand accent and primary action |
| Clay | `#C97B5B` | Small labels and emphasis |
| Moss | `#78806A` | Secondary status / natural accent |
| Line | `#DDD6CC` | Borders |

### Animation philosophy

Use Framer Motion for short opacity/translate entrances, product-image scale on hover, dialog/menu transitions, and restrained list staggering. Default durations stay around 180–420ms with no bouncing. Reduced-motion preferences must remove transforms and nonessential transitions.

## Recommended layouts

### Customer website

`Header → image-led hero → collections → category rail → featured pieces → craftsmanship story → showroom/inquiry CTA → footer`

`Catalogue → heading/search/filter → responsive grid → empty state`

`Product → breadcrumb → gallery + information → inquiry action → related products`

### Admin dashboard

`Sidebar → top bar/demo notice → overview metrics → products table or category/inquiry views → local dialogs/forms`

The public and admin navigation must make the demo context clear and never suggest security or real customer messaging.

## Image notes

The implementation will use remote Unsplash Source URLs for a local-only visual demonstration. They should be replaced by licensed, business-owned photography before any commercial customer deployment. Product image IDs and data live in a single mock-data module for simple replacement.
