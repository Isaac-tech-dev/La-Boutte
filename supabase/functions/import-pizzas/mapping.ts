// Maps a pizza from the RapidAPI "pizza-and-desserts" API to a row in public.pizzas.
// Kept separate from index.ts so it can be unit-tested without network or secrets.

export type RapidApiPizza = {
  id?: number | string;
  name?: string;
  description?: string;
  price?: number | string;
  img?: string;
  image?: string;
  veg?: boolean;
};

export type PizzaRow = {
  external_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_veg: boolean | null;
};

/** Returns null for anything that can't become a valid menu item. */
export function toPizzaRow(input: unknown): PizzaRow | null {
  if (!input || typeof input !== "object") return null;
  const p = input as RapidApiPizza;

  const name = typeof p.name === "string" ? p.name.trim() : "";
  const price = typeof p.price === "string" ? Number(p.price) : p.price;
  if (p.id === undefined || p.id === null || !name) return null;
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) return null;

  const image = p.img ?? p.image;
  return {
    external_id: `rapidapi-${p.id}`,
    name,
    description: typeof p.description === "string" ? p.description.trim() : "",
    price: Math.round(price * 100) / 100,
    image_url: typeof image === "string" && /^https?:\/\//.test(image) ? image : null,
    is_veg: typeof p.veg === "boolean" ? p.veg : null,
  };
}

/** The API returns either a list or a single pizza; normalise to a list of rows. */
export function toPizzaRows(body: unknown): { rows: PizzaRow[]; skipped: number } {
  const list = Array.isArray(body) ? body : [body];
  const rows = list.map(toPizzaRow).filter((r): r is PizzaRow => r !== null);
  return { rows, skipped: list.length - rows.length };
}
