import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
//import {FetchUserAccountsResponse} from '../types/account';
import { LogUserInResponse } from '../types/auth';
import {Console} from '../../utils';
import {logUserOut} from './UserSlice';

export type AccountState = LogUserInResponse[];

const initialState: AccountState = [];

const UserAccountsSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setUserAccounts: (
      state: AccountState,
      action: PayloadAction<AccountState>,
    ) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserAccounts} = UserAccountsSlice.actions;

export default UserAccountsSlice.reducer;
