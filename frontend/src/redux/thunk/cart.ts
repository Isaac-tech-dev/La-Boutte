import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { toErrorResponse } from "../../lib/errors";
import {
  AdjustCartItemAttribute,
  AdjustCartItemResponse,
  CartItem,
  FetchAllCartResponse,
  RemoveCartItemAttribute,
  RemoveCartItemResponse,
} from "../types/cart";
import { ErrorResponse } from "../types/auth";
import type { RootState } from "../store/store";

// Row Level Security limits every query below to the logged-in user's own rows,
// so no userId needs to be sent from the app.

export const fecthallcart = createAsyncThunk<
  FetchAllCartResponse,
  void,
  { rejectValue: ErrorResponse }
>("laboutte/fetchCart", async (_, thunkApi) => {
  try {
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, pizza:pizzas(id, name, description, price, image_url, is_veg)")
      .order("created_at");

    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Unable to load your cart"));
    }

    const items: CartItem[] = (data ?? []).flatMap((row) =>
      row.pizza ? [{ id: row.id, quantity: row.quantity, pizza: row.pizza }] : []
    );
    return { message: "Cart Fetched Successfully", items };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Unable to load your cart"));
  }
});

export const adjustCartItem = createAsyncThunk<
  AdjustCartItemResponse,
  AdjustCartItemAttribute,
  { rejectValue: ErrorResponse }
>("laboutte/adjustCartItem", async ({ pizzaId, delta }, thunkApi) => {
  try {
    const { data, error } = await supabase.rpc("adjust_cart_item", {
      p_pizza_id: pizzaId,
      p_delta: delta,
    });

    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Unable to update your cart"));
    }
    const quantity = data ?? 0;
    return {
      pizzaId,
      quantity,
      message: delta > 0 ? "Added to cart" : quantity === 0 ? "Removed from cart" : "Cart updated",
    };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Unable to update your cart"));
  }
});

export const removeCartItem = createAsyncThunk<
  RemoveCartItemResponse,
  RemoveCartItemAttribute,
  { rejectValue: ErrorResponse }
>("laboutte/removeCartItem", async ({ pizzaId }, thunkApi) => {
  try {
    const { error } = await supabase.from("cart_items").delete().eq("pizza_id", pizzaId);
    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Unable to remove item"));
    }
    return { message: "Item removed from cart" };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Unable to remove item"));
  }
});

/** Empties the logged-in user's cart. */
export const clearCart = createAsyncThunk<
  RemoveCartItemResponse,
  void,
  { state: RootState; rejectValue: ErrorResponse }
>("laboutte/clearCart", async (_, thunkApi) => {
  const userId = thunkApi.getState().user.uuid;
  if (!userId) {
    return thunkApi.rejectWithValue(toErrorResponse("You need to be logged in to do that"));
  }
  try {
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);
    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Couldn't clear your cart"));
    }
    return { message: "Cart cleared" };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Couldn't clear your cart"));
  }
});
