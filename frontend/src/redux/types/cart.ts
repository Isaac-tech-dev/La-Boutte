import type { Pizza } from "./store";

export interface CartItem {
  id: string;
  quantity: number;
  pizza: Pizza;
}

export type FetchAllCartResponse = {
  message: string;
  items: CartItem[];
};

/** Add (positive delta) or remove (negative delta) quantity of a pizza. */
export type AdjustCartItemAttribute = {
  pizzaId: string;
  delta: number;
};
export type AdjustCartItemResponse = {
  message: string;
  pizzaId: string;
  /** new quantity in the cart; 0 means the line was removed */
  quantity: number;
};

export type RemoveCartItemAttribute = {
  pizzaId: string;
};
export type RemoveCartItemResponse = {
  message: string;
};
