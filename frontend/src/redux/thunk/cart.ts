import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Console, getBaseUrl, getcartBaseUrl } from "../../utils";
import {
  FetchAllCartResponse,
  FetchAllCartAttribute,
  AddToCartResponse,
  AddToCartAttribute,
  CartItem,
  DeleteCartResponse,
  DeleteCartAttribute,
} from "../types/cart";
import { RootState } from "../store/store";
import { ErrorResponse } from "../types/auth";

export const fecthallcart = createAsyncThunk<
  FetchAllCartResponse, // Return type of the thunk
  FetchAllCartAttribute, // Type of the payload passed to the thunk
  { state: RootState; rejectValue: ErrorResponse }
>("qjumpa/fetchCart", async (param, thunkApi) => {
  try {
    const store = thunkApi.getState();
    const result = await axios.get(
      `${getBaseUrl()}/cart/fetch-cart/${param.userId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      }
    );

    let data = result.data as FetchAllCartResponse;

    return thunkApi.fulfillWithValue(data);
  } catch (err) {
    Console.log("---fetchCart err1----", err);
    // Handle error appropriately, e.g., rethrow or return rejection
    throw err;
  }
});

export const addCart = createAsyncThunk<
  AddToCartResponse, // Return type of the thunk
  AddToCartAttribute, // Type of the payload passed to the thunk
  { state: RootState; rejectValue: ErrorResponse }
>("qjumpa/addToCart", async (param, thunkApi) => {
  try {
    Console.log("Param: ", param);
    const store = thunkApi.getState();
    const result = await axios.post(`${getBaseUrl()}/cart/addToCart`, param, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${store.user.accessToken}`,
      },
    });

    Console.log("result_data: ", result.data);
    let data = result.data as AddToCartResponse;

    return thunkApi.fulfillWithValue(data);
  } catch (err) {
    Console.log("---addToCart err1----", JSON.stringify(err));
    // Handle error appropriately, e.g., rethrow or return rejection
    throw err;
  }
});

export const deleteCartItem = createAsyncThunk<
  DeleteCartResponse, // Return type of the thunk
  DeleteCartAttribute, // Type of the payload passed to the thunk
  { state: RootState; rejectValue: ErrorResponse }
>("qjumpa/deleteCart", async (param, thunkApi) => {
  try {
    const store = thunkApi.getState();
    console.log(param.productId);
    const result = await axios.delete(`${getBaseUrl()}/cart/delete-product/${param.productId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${store.user.accessToken}`,
      },
      data: param, // Pass the param as the data property
    });

    console.log("result_data: ", result.data);
    let data = result.data as DeleteCartResponse;

    return thunkApi.fulfillWithValue(data);
  } catch (err) {
    Console.log("---deleteCart err1----", JSON.stringify(err));
    // Handle error appropriately, e.g., rethrow or return rejection
    throw err;
  }
});
