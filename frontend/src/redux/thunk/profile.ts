import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { toErrorResponse } from "../../lib/errors";
import { setUser } from "../slice/UserSlice";
import type { RootState } from "../store/store";
import type { ErrorResponse } from "../types/auth";

export type UpdateProfileAttributes = {
  firstName: string;
  lastName: string;
};

/**
 * Saves the user's name to the `profiles` table (RLS only lets them edit their own row)
 * and to their auth metadata, then updates Redux.
 */
export const updateProfile = createAsyncThunk<
  UpdateProfileAttributes,
  UpdateProfileAttributes,
  { state: RootState; rejectValue: ErrorResponse }
>("laboutte/updateProfile", async (param, thunkApi) => {
  const userId = thunkApi.getState().user.uuid;
  if (!userId) {
    return thunkApi.rejectWithValue(toErrorResponse("You need to be logged in to do that"));
  }

  const firstName = param.firstName.trim();
  const lastName = param.lastName.trim();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName })
      .eq("id", userId)
      .select("first_name, last_name")
      .single();

    if (error || !data) {
      return thunkApi.rejectWithValue(toErrorResponse(error, "Couldn't save your profile"));
    }

    // Keep the auth metadata in step, so a fresh login shows the new name straight away.
    await supabase.auth.updateUser({ data: { first_name: firstName, last_name: lastName } });

    thunkApi.dispatch(setUser({ firstname: data.first_name, lastname: data.last_name }));
    return { firstName: data.first_name, lastName: data.last_name };
  } catch (err) {
    return thunkApi.rejectWithValue(toErrorResponse(err, "Couldn't save your profile"));
  }
});
