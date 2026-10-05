import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { toErrorResponse } from "../../lib/errors";
import { FecthAllPizzaResponse } from "../types/store";
import { ErrorResponse } from "../types/auth";

export const fetchAllPizza = createAsyncThunk<
  FecthAllPizzaResponse,
  void,
  { rejectValue: ErrorResponse }
>("laboutte/fetchStore", async (_, thunkApi) => {
  try {
    const { data, error } = await supabase
      .from("pizzas")
      .select("id, name, description, price, image_url, is_veg")
      .order("name");

    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Unable to load the menu"));
    }
    return { message: "Products Fetch Successfully", data: data ?? [] };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Unable to load the menu"));
  }
});
