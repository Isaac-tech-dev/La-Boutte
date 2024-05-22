import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {logUserOut} from './UserSlice';

export type SettingsState = {
  displaymode?: 'dark' | 'light' | 'none';
};

const initialState: SettingsState = {
  displaymode: 'light',
};

const SettingsSlice = createSlice({
  name: 'user',
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  initialState,
  reducers: {
    setSettings: (
      state: SettingsState,
      action: PayloadAction<SettingsState>,
    ) => {
      return {...state, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSettings} = SettingsSlice.actions;

export default SettingsSlice.reducer;
