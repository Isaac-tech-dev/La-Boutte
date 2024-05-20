import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Response } from "../types";
import {
  RegisterUserAttributes,
  RegisterUserResponse,
  LogUserInAttributes,
  LogUserInResponse,
  ErrorResponse,
} from "../types/auth";
import { Console, getAuthBaseUrl } from "../../utils";
import { RootState } from "../store/store";
import { ERROR_CODE_TYPES } from "../../constants/error";

export const register = createAsyncThunk<
  RegisterUserResponse, // Return type of the thunk
  RegisterUserAttributes // Type of the payload passed to the thunk
>("qjumpa/register", async (param, thunkApi) => {
  try {
    let d = param;
    Console.log("----RegisterUserIn---", d); // Use Console.log instead of Console.log

    const result = await axios.post(`${getAuthBaseUrl()}/signup`, param, {
      headers: {
        Accept: "application/json",
      },
    });
    //Console.log("--------------------", d);

    console.log("result_data: ", result.data);
    let data = result.data as RegisterUserResponse;

    return thunkApi.fulfillWithValue(data);
  } catch (err) {
    Console.log("---RegisterUserIn err1----", err);
    if (axios.isAxiosError(err)) {
      // If it's an AxiosError, extract the error message and return it in the ErrorResponse format
      const errorResponse: ErrorResponse = {
        success: false,
        status_code: err.response?.status || 500,
        message: err.response?.data.message || "An error occurred",
        data: [],
        errorCode: undefined
      };

      return thunkApi.rejectWithValue(errorResponse);
    } else {
      // If it's not an AxiosError, return a generic error response
      const errorResponse: ErrorResponse = {
        success: false,
        status_code: 500,
        message: "An error occurred",
        data: [],
        errorCode: undefined
      };

      return thunkApi.rejectWithValue(errorResponse);
    }
  }
});

export const login = createAsyncThunk<
  LogUserInResponse, // Return type of the thunk
  LogUserInAttributes // Type of the payload passed to the thunk
>("qjumpa/login", async (param, thunkApi) => {
  try {
    let d = param;
    Console.log("----logUserIn---", d); // Use Console.log instead of Console.log

    const result = await axios.post(`${getAuthBaseUrl()}/signin`, param, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("result_data: ", result.data);
    let data = result.data as LogUserInResponse;

    // if (data.status_code != parseInt("00")) {
    //   return thunkApi.rejectWithValue({
    //     errorCode: data.message || ERROR_CODE_TYPES["GENERAL_ERROR"],
    //     errorMsg: data.message || "Request failed please try again",
    //   });
    // }

    return thunkApi.fulfillWithValue(data);
  } catch (err) {
    Console.log("---loginUserIn err1----", err);
    if (axios.isAxiosError(err)) {
      // If it's an AxiosError, extract the error message and return it in the ErrorResponse format
      const errorResponse: ErrorResponse = {
        success: false,
        status_code: err.response?.status || 500,
        message: err.response?.data.message || "An error occurred",
        data: [],
        errorCode: undefined
      };

      return thunkApi.rejectWithValue(errorResponse);
    } else {
      // If it's not an AxiosError, return a generic error response
      const errorResponse: ErrorResponse = {
        success: false,
        status_code: 500,
        message: "An error occurred",
        data: [],
        errorCode: undefined
      };

      return thunkApi.rejectWithValue(errorResponse);
    }
  }
});
