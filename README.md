# School ERP website

Public website: home, features, Smart Learning, pricing (with calculator and
plan comparison), free-trial sign-up (mobile code, then approval by the
company), sign-up status, about, contact, security, privacy policy, terms,
refund & cancellation.

- Next.js (static export), Tailwind CSS, Framer Motion. Calm light palette.
- Brand name, contact, company / legal details, trial and refund days, social
  links, announcement and extra policy text come from the API
  (`GET /public/website`), edited in Super Admin › Website. Plans and prices
  come from Super Admin › Plans. No rebuild needed after changes.

## Run

```bash
cp .env.example .env.local   # API and app URLs
npm install
npm run dev                  # http://localhost:3100
npm run build                # static site in out/ (any host / CDN)
```

Production: add the website's domain to the API's `CORS_ORIGINS`.
