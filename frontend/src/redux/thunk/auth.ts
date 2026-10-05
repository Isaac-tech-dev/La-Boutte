import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { toErrorResponse } from "../../lib/errors";
import {
  RegisterUserAttributes,
  RegisterUserResponse,
  LogUserInAttributes,
  LogUserInResponse,
  ErrorResponse,
} from "../types/auth";

export const register = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserAttributes,
  { rejectValue: ErrorResponse }
>("laboutte/register", async (param, thunkApi) => {
  if (param.password !== param.confirmpassword) {
    return thunkApi.rejectWithValue(toErrorResponse("Passwords don't match"));
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: param.email.trim(),
      password: param.password,
      options: {
        // Read by the handle_new_user() trigger to fill in the profiles table.
        data: { first_name: param.firstName.trim(), last_name: param.lastName.trim() },
      },
    });

    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Registration failed"));
    }

    // With email confirmation on, Supabase doesn't reveal whether the email is taken;
    // it returns a user with no identities instead of an error.
    if (data.user && data.user.identities?.length === 0) {
      return thunkApi.rejectWithValue(
        toErrorResponse("An account with this email already exists")
      );
    }

    const sessionCreated = Boolean(data.session);
    return {
      sessionCreated,
      message: sessionCreated
        ? "Account created successfully"
        : "Account created! Check your email to confirm, then log in.",
    };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Registration failed"));
  }
});

export const login = createAsyncThunk<
  LogUserInResponse,
  LogUserInAttributes,
  { rejectValue: ErrorResponse }
>("laboutte/login", async (param, thunkApi) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: param.email.trim(),
      password: param.password,
    });

    if (error || !data.session) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Login failed"));
    }

    const meta = data.user.user_metadata ?? {};
    return {
      message: "Login Successful",
      accessToken: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email ?? param.email,
        firstName: typeof meta.first_name === "string" ? meta.first_name : "",
        lastName: typeof meta.last_name === "string" ? meta.last_name : "",
      },
    };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Login failed"));
  }
});

/** Ends the Supabase session; authSync then clears the Redux user state. */
export const logout = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
  "laboutte/logout",
  async (_, thunkApi) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Logout failed"));
    }
  }
);
