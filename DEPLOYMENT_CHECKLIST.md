# Production launch checklist — Kalantzis Foods

The frontend is visually and structurally prepared for a high-quality brand presentation. The following items require real business decisions and engineering integrations before describing the website as commercially production-ready.

## Critical: business and compliance

- [ ] Confirm all product SKUs, descriptions, quantities, pack sizes, image ownership and official product photos.
- [ ] Obtain approved high-resolution imagery of the olive groves, facility and each retail package; replace screenshot crops in `assets/`.
- [ ] Confirm the current certification documents and exactly which product lines / processes each applies to; have legal review for any nutrition or health statements.
- [ ] Publish approved Privacy Policy, Cookie Policy (if tracking is added), Terms of Sale, returns/cancellation policy, shipping policy, and company identity details as applicable under Greek/EU law.
- [ ] Verify official wholesale terms, VAT handling, shipping regions, payment methods, published prices and stock rules.
- [ ] Verify newsletter consent/disclosure and integrate an email-list service before displaying an active subscription success claim.

## Critical: backend and security

- [ ] Select whether the site supports requests for quotation only or actual checkout.
- [ ] For actual sales, integrate a vetted secure backend/CMS, payment provider, stock and tax calculations; never process payment credentials in frontend JavaScript.
- [ ] Implement authenticated B2B/partner accounts server-side with password hashing, role authorization, rate limiting, audit logs, CSRF protections and secure session cookies.
- [ ] Connect validated contact/quote forms to a secure transactional email service with spam protection and confirmation, with explicit data retention settings.
- [ ] Ensure forms display actual server acknowledgements (not simulated success states).

## Performance and accessibility

- [ ] Serve Font Awesome and Google Fonts with a resilient hosting / licensing strategy (currently they use public CDNs); test fallback and local cache behaviour.
- [ ] Convert all approved photography to responsive AVIF/WebP variants, create `srcset` and crop with responsive `sizes` while preserving original clarity.
- [ ] Run Lighthouse and manual keyboard/screen reader checks against the **actual deployed** domain.
- [ ] Validate at 320px, 390px, tablet 768px, laptop 1440px and wide monitors. Source code was checked for horizontal overflow at these widths in the preview harness, not a substitute for live cross-browser testing.
- [ ] Check all image alt text and content translations (the legacy English blog/catalog sections are not entirely localized).
- [ ] Add brand-approved OG images and finalized page metadata; choose the canonical production URL and build sitemap/robots rules only after deployment path is fixed.

## Hosting and operations

- [ ] Deploy over HTTPS with secure headers/CSP appropriate to external CDNs and media.
- [ ] Set backups, monitoring, error logging, uptime checks, analytics only with appropriate consent, and a rollback process.
- [ ] Test CDN failures, slow connections, image loading errors, email-client limitations and navigation without JavaScript.
- [ ] Obtain sign-off from the business owner for content, imagery, product authenticity and pricing.

### v4 launch security requirements

- [ ] Build separate secure customer and partner authentication endpoints, session handling, password reset, and CSRF safeguards.
- [ ] Confirm email verification and privacy notices before enabling real customer registration.
- [ ] Enforce server-side role authorization before returning any wholesale prices or trade documents. Do not embed wholesale values in static HTML, JS, downloadable JSON, page source or sourcemaps.
- [ ] Create official public retail price data and an authorized partner price API. Currently the site displays 'price on request' instead of invented prices.
- [ ] Wire the partner login's `next=wholesale` parameter to a server-validated redirect after login (with allowlisted internal destinations).
- [ ] Replace the customer dashboard's explicitly labeled UI preview with actual authorized customer-only records.
