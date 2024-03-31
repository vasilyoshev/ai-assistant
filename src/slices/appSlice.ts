import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface AppState {
  mocksEnabled: boolean;
  isInitialLoad: boolean;
}

const initialState: AppState = {
  mocksEnabled: process.env.NODE_ENV === "development",
  isInitialLoad: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMocksEnabled: (state) => {
      state.mocksEnabled = !state.mocksEnabled;
    },
    toggleOffIsInitialLoad: (state) => {
      state.isInitialLoad = false;
    },
  },
});

export const { toggleMocksEnabled, toggleOffIsInitialLoad } = appSlice.actions;

export const selectMocksEnabled = (state: RootState) => state.app.mocksEnabled;
export const selectIsInitialLoad = (state: RootState) => state.app.isInitialLoad;

export default appSlice.reducer;
