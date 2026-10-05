# La-Boutte

Pizza ordering app: **Expo SDK 57 / React Native 0.86 (TypeScript)** frontend backed by **Supabase** (Auth + Postgres + Edge Functions).

```
frontend/                 Expo app — talks to Supabase directly
supabase/
  migrations/             database schema + Row Level Security (the "backend")
  seed.sql                sample menu
  functions/import-pizzas TypeScript Edge Function that imports the menu from RapidAPI
backend/                  OLD Express + MongoDB server — no longer used, kept for reference
```

## How the backend works now

| Old Express route | Now |
|---|---|
| `POST /api/auth/signup` | `supabase.auth.signUp()` — a database trigger creates the `profiles` row |
| `POST /api/auth/signin` | `supabase.auth.signInWithPassword()` — session saved, so users stay logged in |
| `GET /api/pizza` | `select` on `pizzas` (public, read-only) |
| `POST /api/cart/addToCart` | `rpc('adjust_cart_item')` — atomic add/remove |
| `GET /api/cart/fetch-cart/:userId` | `select` on `cart_items` joined to `pizzas` |
| `DELETE /api/cart/delete-product/:id` | `delete` on `cart_items` |
| RapidAPI import (key hard-coded) | `import-pizzas` Edge Function (key stored as a Supabase secret) |

Security lives in the database: Row Level Security means each user can only read and change **their own** cart and profile, the menu is read-only from the app, and only the Edge Function (service role) can write it.

## Setup

### 1. Create the Supabase project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Pick the closest region and save the database password somewhere safe.
2. **SQL Editor** → paste all of `supabase/migrations/20261005120000_init_schema.sql` → **Run**.
3. **SQL Editor** → paste `supabase/seed.sql` → **Run** (gives you 6 sample pizzas).
4. **Authentication** settings → **Email** provider: email confirmation is on by default. For quick local testing you can turn **Confirm email** off; turn it back on before real users sign up.

### 2. Point the app at it
```bash
cd frontend
cp .env.example .env
# fill in EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
# from Project Settings → API (use the anon / publishable key, NEVER the service_role / secret key)
rm -rf node_modules .expo && yarn install   # fresh install after the SDK 57 upgrade
npx expo start -c
```

### 3. (Optional) Import the real menu from RapidAPI
```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase secrets set RAPIDAPI_KEY=<new rapidapi key> IMPORT_SECRET=<long random string>
npx supabase functions deploy import-pizzas --no-verify-jwt
curl -X POST "https://<your-project-ref>.supabase.co/functions/v1/import-pizzas" \
     -H "x-import-secret: <same IMPORT_SECRET>"
```

## Developing

- **Schema changes:** add a new file in `supabase/migrations/` (never edit an applied one), then `npx supabase db push`.
- **Regenerate TypeScript types after schema changes:**
  `npx supabase gen types typescript --linked > frontend/src/lib/database.types.ts`
- **Edge Function tests:** `deno test supabase/functions/import-pizzas/`
- **Type-check the app:** `cd frontend && npx tsc --noEmit`
- **Local Supabase (needs Docker):** `npx supabase start` then `npx supabase db reset` applies migrations + seed.
