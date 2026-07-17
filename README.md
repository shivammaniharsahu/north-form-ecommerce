# NORTH & FORM ecommerce template

A customizable, free-first Next.js ecommerce foundation. The current implementation contains the complete storefront vertical slice and the production database foundation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshivammaniharsahu%2Fnorth-form-ecommerce&project-name=north-form-ecommerce&repository-name=north-form-ecommerce)

## Implemented

- Editorial responsive home page with reusable sections and CSS design tokens
- Shop page with category filters and sorting
- Dynamic product detail and collection routes
- Persistent client cart, quick add, cart drawer and cart review page
- SEO metadata, sitemap, robots and health endpoint
- Central store configuration and typed mock catalog
- Supabase browser/server clients and environment validation
- Versioned PostgreSQL schema with catalog, customers, carts, orders, payments, fulfillment, discounts, CMS, webhooks, audit logs and initial RLS
- Email/password and Google authentication, SSR cookie refresh and auth callback
- Customer account and role-gated seller dashboard with credential-free demo states
- Checkout address form, server-authoritative pricing and Razorpay order creation
- Constant-time payment/webhook signature verification and idempotency-ready event schema

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The storefront, seller dashboard and a simulated checkout run without credentials. Add Supabase variables for real accounts and Razorpay test keys for test payments.

### Supabase setup

1. Create a free Supabase project and run both files in `supabase/migrations` in order.
2. Add the project URL and anon key to `.env.local`.
3. For Google login, enable the Google provider and add `/auth/callback` as an allowed redirect URL.
4. Create a store and add your user ID to `store_members` with the `owner` role.

### Razorpay test setup

1. Create Razorpay test-mode API keys and add them to `.env.local`.
2. Point a test webhook to `/api/webhooks/razorpay` and set its secret.
3. Subscribe to `payment.captured`, `payment.failed`, and `refund.processed` events.

## Customization

- Brand, navigation and copy: `src/config/store.ts`
- Global visual tokens: the `:root` block in `src/app/globals.css`
- Demo catalog: `src/data/products.ts`
- Home section composition: `src/app/page.tsx`
- Database: `supabase/migrations/0001_initial.sql`

## Next implementation phase

1. Replace the demo catalog with Supabase catalog queries and seller CRUD forms
2. Add server-backed carts and guest-to-user cart merge
3. Persist checkout orders, reserve stock transactionally, and process webhook events
4. Add shipment updates, refunds, transactional email and end-to-end tests
