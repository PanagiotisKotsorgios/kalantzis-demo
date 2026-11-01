https://bracketweb.com/ogenixwp/ https://wordpress.vecurosoft.com/foodano/













# Premium V5 — Sitewide Entrance Animations.

The entire V4 site has been extended with a premium animation system. See [MOTION_GUIDE.md](MOTION_GUIDE.md) for the complete choreography, accessibility behaviour and configuration. No visual content or retail/wholesale access logic has been removed.

# Lazaros Kalantzis Foods — Premium Frontend v4

An expanded, responsive multi-page corporate product catalogue / e-commerce UI built exclusively with **HTML, CSS and vanilla JavaScript**. No React, build process, backend or paid dependency is required to view it.

## Preview / deployment

Open `index.html` in a recent browser or serve this directory through any static web server. All paths are relative so that the site can be placed in a subdirectory. Test using `python -m http.server 8000` if you want normal HTTP navigation. Open `http://localhost:8000`.

The project includes **11 working pages**:

| Page | Purpose |
| --- | --- |
| `index.html` | Editorial homepage with hero, categories, regional origin, company, curated products, recipes/stories, quality, FAQ, reviews and wholesale CTA |
| `products.html` | Searchable/filterable 24-item showcase, wishlist and add-to-enquiry-list |
| `blog.html` | Journal index, categories, article previews and Mediterranean editorial content |
| `philosophy.html` | Company story, provenance, comparison table, quality approach |
| `partner-login.html` | Separate B2B partner sign-in frontend demo (including wholesale redirect hint) |
| `customer-login.html` | Customer-first portal sign-in and registration UI, both clearly marked as demo |
| `customer-dashboard.html` | Customer dashboard visual preview with local favourites and enquiry basket |
| `price-list.html` | Public retail catalogue and wholesale partner-only sign-in route; no fabricated price data |
| `order.html` | Enquiry and ordering journey, with no simulated completed payment |
| `cart.html` | Local enquiry list, quantity management, remove/clear, export to pre-addressed email |
| `contact.html` | Contact information, contact form and B2B inquiry form (email client based) |

## Design system

The modernized design uses a solid deep-forest and gold identity, large editorial serif headlines, readable sans-serif interface text, carefully spaced card grids, CSS-only responsive layout and Font Awesome Free icons. **No emoji, backdrop blur or image blurring filters** are used. Previous screenshot-derived blurred hero assets were replaced by genuine clean crops available in the previous project. Some of these crops are lower resolution than final art-directed photography and should eventually be replaced with approved original high-resolution assets.

`styles.css` and `enhancements.css` retain the earlier component styling. `premium.css` is the final overriding visual layer. `app.js` contains the original catalogue, navigation, cart, filter and page content. `premium.js` adds premium content and inquiries without framework dependencies. All assets are found in `assets/`, including the original Kalantzis Foods logo supplied by the client.

## Real content and data fidelity

Editorial company information, Astakos origin, contact details, main product categories, quality / food safety certification mention and attributed testimonial excerpts were cross-checked with the public site `https://kalantzisfoods.com/` on 30 October 2026. Product titles in the demonstration catalogue originated in the earlier provided frontend and must be verified against the company's current live inventory before publishing commercially. Images may use the existing website's remote product URLs with included local fallback shots.

**No prices in this package should be interpreted as official commercial prices.** This version intentionally replaces visible illustrative prices with **"Price on request"** and transforms the cart into an enquiry list. Other legacy data model fields retain test numeric values internally but are not displayed as official prices. There is no "free shipping" claim in the updated cart.

## What actually works in this frontend

- Navigation and two-level header with desktop product-category mega-menu and mobile hamburger navigation
- Language selection (Greek / English for most content; some pre-existing blog and catalogue labels remain English)
- Filterable searchable product catalogue and product sorting by name
- Add/remove/update quantities in an enquiry cart; wishlist and preferences in browser `localStorage`
- Email-based product enquiry through the `mailto:` protocol, including basket details
- Contact and wholesale inquiry forms that compose emails (they do not store submissions)
- Accessible FAQ `<details>` components, blog filters/search, desktop and mobile responsive layouts

## What is **not** implemented

This is **not a deployed, fully functioning production e-commerce platform**. It contains no payment collection, authentic customer/partner login, secure server-side order processing, shipping-rate calculation, verified live stock, real newsletter subscription, transactional emails, database or CMS. The partner login is explicitly a visual/demo UI. A real purchase or secure authenticated portal cannot be delivered using static HTML/CSS/JS alone.

See `DEPLOYMENT_CHECKLIST.md` for the remaining launch requirements. Review all copy, claims, product names, imagery rights, legal notices and email addresses with the business owner before going live.

## v4 — Customer portal and trade pricing separation

The customer account entry is now `customer-login.html`, with a sign-in / registration **visual frontend only** and a separate, clearly labeled `customer-dashboard.html` preview. No real customer registration, authentication, password storage, purchase history or customer data backend exists. The dashboard only reads the browser's local basket and favourite selections.

The partner entry remains distinct at `partner-login.html`, discoverable in the top utility navigation, mobile menu, wholesale CTA and footer. The wholesale route points to `partner-login.html?next=wholesale`, with a relevant message explaining that authenticated trade pricing requires a real secure server.

`price-list.html` clearly separates **Retail Catalogue** (public product reference; no invented prices) from **Wholesale Price List** (partner-only sign-in call-to-action). **No wholesale price dataset or partner-only files are shipped in this public static frontend.** Rendering a restricted table in client-side JavaScript or hiding it with CSS would not secure it. Production must enforce authorization at the server/API and only return wholesale prices to verified trade accounts.

Full-width dropdown mega menus now cover the homepage, products, price lists, ordering, company, blog, and contact pages. Mouse, keyboard focus, Escape, and mobile/touch accordion controls are supported. All new interface icons use Font Awesome Free.

`v4.css` and `v4-ui.js` contain the v4 enhancements, layered over the earlier sources. All files are plain HTML/CSS/JavaScript.
