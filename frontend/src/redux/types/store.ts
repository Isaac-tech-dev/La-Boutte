import type { Tables } from "../../lib/database.types";

/** A menu item, exactly as stored in the `pizzas` table. */
export type Pizza = Pick<
  Tables<"pizzas">,
  "id" | "name" | "description" | "price" | "image_url" | "is_veg"
>;

export type FecthAllPizzaResponse = {
  message: string;
  data: Pizza[];
};
