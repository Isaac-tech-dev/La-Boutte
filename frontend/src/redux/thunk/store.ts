import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Console, getBaseUrl, getcartBaseUrl } from "../../utils";
import { FecthAllPizzaAttribute, FecthAllPizzaResponse } from "../types/store";
import { RootState } from "../store/store";
import { ErrorResponse } from "../types/auth";

export const fetchAllPizza = createAsyncThunk<
  FecthAllPizzaResponse,
  FecthAllPizzaAttribute,
  { state: RootState; rejectValue: ErrorResponse }
>("qjumpa/fetchStore", async (param, thunkApi) => {
  try {
    const store = thunkApi.getState();
    const result = await axios.get(`${getBaseUrl()}/`, {
      headers: {
        Accept: "application/json",
      },
    });

    let res_data = result.data as FecthAllPizzaResponse;
    Console.info("fetchStore data", res_data);
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log("---Store err1----", param);
    // Handle error appropriately, e.g., rethrow or return rejection
    throw err;
  }
});
