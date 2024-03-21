import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MaskCircle } from "interfaces";
import { RootState } from "store";

export interface AppState {
  currentCircles: MaskCircle[];
  mocksEnabled: boolean;
}

const initialState: AppState = {
  currentCircles: [],
  mocksEnabled: process.env.NODE_ENV === "development",
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
  },
});

export const { saveCircles, toggleMocksEnabled, setCircleClickedById } = appSlice.actions;

export const selectCurrentCircles = (state: RootState) => state.app.currentCircles;
export const selectMocksEnabled = (state: RootState) => state.app.mocksEnabled;

export default appSlice.reducer;
