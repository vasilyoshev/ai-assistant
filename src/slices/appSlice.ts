import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MaskCircle } from "interfaces";
import { RootState } from "store";

export interface AppState {
  currentCircles: MaskCircle[];
  mocksEnabled: boolean;
  isInitialLoad: boolean;
}

const initialState: AppState = {
  currentCircles: [],
  mocksEnabled: process.env.NODE_ENV === "development",
  isInitialLoad: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveCircles: (state, action: PayloadAction<MaskCircle[]>) => {
      state.currentCircles = action.payload;
    },
    setCircleClickedById: (state, action: PayloadAction<number>) => {
      const circle = state.currentCircles.find(circle => circle.id === action.payload);
      if (circle) {
        circle.isClicked = true;
      }
    },
    toggleMocksEnabled: (state) => {
      state.mocksEnabled = !state.mocksEnabled;
    },
    toggleOffIsInitialLoad: (state) => {
      state.isInitialLoad = false;
    },
  },
});

export const { saveCircles, toggleMocksEnabled, toggleOffIsInitialLoad, setCircleClickedById } = appSlice.actions;

export const selectCurrentCircles = (state: RootState) => state.app.currentCircles;
export const selectMocksEnabled = (state: RootState) => state.app.mocksEnabled;
export const selectIsInitialLoad = (state: RootState) => state.app.isInitialLoad;

export default appSlice.reducer;
