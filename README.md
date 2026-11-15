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

`.env.local` sets `NEXT_PUBLIC_API_URL` (the API, e.g. `http://localhost:3000`)
and `NEXT_PUBLIC_APP_URL` (the school app, e.g. `http://localhost:8080`). With the
API stopped the pages still load, without live plans and contact details.

Production: add the website's domain to the API's `CORS_ORIGINS`.

## Try it locally

| Page | Address |
| --- | --- |
| Website | http://localhost:3100 (from a phone on the same Wi-Fi: `http://<this Mac's IP>:3100`) |
| Pricing | http://localhost:3100/pricing |
| Free trial sign-up | http://localhost:3100/signup |

1. Sign up on the website (the mobile code is printed in the API terminal in development).
2. Approve it in the Super Admin panel (http://localhost:8080/#/admin › Website;
   login `admin@schoolerp.local` / `Admin@12345` + authenticator code).
3. The new school's admin then logs in to the app with the new school code.

All demo school logins: [`school-erp-api/README.md`](https://github.com/pawankhated/school-erp-api#demo-logins-local-only).
