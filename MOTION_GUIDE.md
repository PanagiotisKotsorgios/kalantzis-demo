# Lazaros Kalantzis Foods | Premium Motion Design System V5

This version extends the existing V4 customer/partner portals and product navigation. All motion runs client-side with plain HTML, CSS and JavaScript. No backend or build step is required.

## Files added

- `motion.css` — the cinematic motion language, timing, easing, mega-menu transitions, hover polish and reduced-motion fallback.
- `motion.js` — scroll reveal observer, staged nav and page hero entrances, dynamically inserted product/blog animations, reading progress and navigation wipe.

All 11 HTML files load `motion.css` **after** the existing stylesheets and `motion.js` **after** the existing JavaScript scripts. Do not change that order.

## Motion choreography

1. **Masthead:** the top information strip fades in, logo enters from the left, individual header actions rise consecutively, then navigation items enter with short staggers.
2. **Homepage hero:** overline, headline, body copy, CTAs and location info appear in staggered order; the original sharp photographic assets settle gently into place. No `filter: blur()` or `backdrop-filter` effects.
3. **Inner page banners:** headings and descriptions enter separately. The photographic background makes a small positional adjustment.
4. **Mega-menus:** the large menu opens downward, followed by its introductory column, individual navigation options, image panel and bottom action row. On mobile, the accordion opens vertically.
5. **On-scroll content:** headings, short editorial blocks, benefits, category cards, product cards, article tiles, feature cards, photo/text columns, forms and FAQ items reveal as they enter the viewport.
6. **Dynamic content:** newly loaded products, blog articles and cart items animate when filters or selections change; already-read items are not reanimated.
7. **Footer:** columns, supporting contact ribbon and legal footer enter naturally as the user reaches the bottom.
8. **Page navigation:** an internal HTML-page link triggers a quick green curtain with the original logo, then navigates normally. Modifier keys, browser back/forward, external, email, phone, hash and download links retain native behavior.
9. **Reading progress:** a restrained gold 3px progress indicator displays only on motion-enabled experiences.

## Motion values

- Easing: `cubic-bezier(.22, 1, .36, 1)` for editorial entrances.
- Scroll reveal: 620–930ms depending on element type; stagger usually 37–74ms.
- Header sequence: short 45–65ms staggering.
- Route hand-off: 360ms before standard navigation.
- Photo entrance: slow, gentle scale from 1.055 to 1.0, **no blur**.

Tweak shared variables at the top of `motion.css`. For detailed stagger logic see `prepare`, `animateHeader`, and `animateHero` in `motion.js`.

## Progressive enhancement and accessibility

- Without JS or `IntersectionObserver`, the original page content remains visible.
- `prefers-reduced-motion: reduce` turns off reveal, menu and page animations, hides motion-only ornaments, and preserves normal navigation.
- Newly introduced revealing elements regain their original CSS state when their transition finishes; this avoids interfering with the site's hover transforms.
- The animation library never sends customer information, loads analytics, or makes external requests. Existing Font Awesome and Google Fonts CDNs still require connectivity.
- Production authentication, partner-only wholesale prices, server-side orders and payments **still require a backend** and are not implemented by this motion upgrade.

## Run

Extract the ZIP and open `index.html` in Chrome, Edge, Firefox or Safari. For reliable local development, a simple static server is recommended, but no bundler is needed.

## Visual QA suggestions before go-live

Verify on desktop, tablet and mobile: opening every mega-menu; keyboard tab focus; nav opening on mobile; product filtering; blog category filtering; cart controls; browser back and forward; system Reduced Motion preference; slow devices; and actual server/CDN loading.
