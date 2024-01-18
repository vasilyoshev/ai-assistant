import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  economyMode: boolean; // if true use mocks instead of api calls
}

const initialState: AppState = {
  economyMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
