// Run: deno test supabase/functions/import-pizzas/
import { deepStrictEqual as assertEquals } from "node:assert/strict";
import { toPizzaRow, toPizzaRows } from "./mapping.ts";

Deno.test("maps a RapidAPI pizza to a row", () => {
  assertEquals(
    toPizzaRow({
      id: 7,
      name: " Pepperoni ",
      description: "Spicy",
      price: "12.5",
      img: "https://example.com/p.png",
      veg: false,
    }),
    {
      external_id: "rapidapi-7",
      name: "Pepperoni",
      description: "Spicy",
      price: 12.5,
      image_url: "https://example.com/p.png",
      is_veg: false,
    },
  );
});

Deno.test("rejects items without id, name or a valid price", () => {
  assertEquals(toPizzaRow({ name: "No id", price: 1 }), null);
  assertEquals(toPizzaRow({ id: 1, name: "  ", price: 1 }), null);
  assertEquals(toPizzaRow({ id: 1, name: "Bad price", price: "abc" }), null);
  assertEquals(toPizzaRow({ id: 1, name: "Negative", price: -3 }), null);
  assertEquals(toPizzaRow(null), null);
});

Deno.test("drops non-http image values", () => {
  assertEquals(toPizzaRow({ id: 1, name: "X", price: 1, img: "javascript:alert(1)" })?.image_url, null);
});

Deno.test("accepts a single object or a list", () => {
  assertEquals(toPizzaRows({ id: 1, name: "A", price: 1 }).rows.length, 1);
  const many = toPizzaRows([{ id: 1, name: "A", price: 1 }, { name: "bad" }]);
  assertEquals(many.rows.length, 1);
  assertEquals(many.skipped, 1);
});
