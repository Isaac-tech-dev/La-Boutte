// Edge Function: import-pizzas
// Pulls the menu from RapidAPI and upserts it into public.pizzas.
// Replaces the old Express GET handler that had the RapidAPI key hard-coded.
//
// Secrets (set with `supabase secrets set ...`, never committed):
//   RAPIDAPI_KEY   - your RapidAPI key
//   IMPORT_SECRET  - any long random string; callers must send it as x-import-secret
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by Supabase.
//
// Invoke:
//   curl -X POST "$SUPABASE_URL/functions/v1/import-pizzas" -H "x-import-secret: $IMPORT_SECRET"

import { createClient } from "npm:@supabase/supabase-js@2";
import { toPizzaRows } from "./mapping.ts";

const RAPIDAPI_HOST = "pizza-and-desserts.p.rapidapi.com";
const RAPIDAPI_URL = `https://${RAPIDAPI_HOST}/pizzas`;

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Constant-time comparison so the secret can't be guessed via response timing. */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let importSecret: string, rapidApiKey: string, supabaseUrl: string, serviceRoleKey: string;
  try {
    importSecret = requireEnv("IMPORT_SECRET");
    rapidApiKey = requireEnv("RAPIDAPI_KEY");
    supabaseUrl = requireEnv("SUPABASE_URL");
    serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  } catch (err) {
    console.error(err);
    return json(500, { error: "Function is not configured" });
  }

  if (!safeEqual(req.headers.get("x-import-secret") ?? "", importSecret)) {
    return json(401, { error: "Unauthorized" });
  }

  let body: unknown;
  try {
    const res = await fetch(RAPIDAPI_URL, {
      headers: { "X-RapidAPI-Key": rapidApiKey, "X-RapidAPI-Host": RAPIDAPI_HOST },
    });
    if (!res.ok) {
      return json(502, { error: `RapidAPI responded with ${res.status}` });
    }
    body = await res.json();
  } catch (err) {
    console.error("RapidAPI request failed", err);
    return json(502, { error: "Could not reach RapidAPI" });
  }

  const { rows, skipped } = toPizzaRows(body);
  if (rows.length === 0) {
    return json(422, { error: "No valid pizzas in RapidAPI response", skipped });
  }

  // Service role bypasses RLS, which is what lets this function write the menu.
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("pizzas")
    .upsert(rows, { onConflict: "external_id" })
    .select("id");

  if (error) {
    console.error("Upsert failed", error);
    return json(500, { error: "Failed to save pizzas" });
  }

  return json(200, { imported: data?.length ?? 0, skipped });
});
