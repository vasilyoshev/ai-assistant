import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameStatus, Style } from "enums";
import { MaskCircle } from "interfaces";
import { RootState } from "store";

export interface FtdState {
  gameStatus: GameStatus;
  level: number;
  lives: number;
  differences: MaskCircle[];
  maxDifferenceRadius: number;
  differencesCount: number;
  style: Style;
  topic: string;
}

const initialState: FtdState = {
  gameStatus: GameStatus.Waiting,
  level: 1,
  lives: 3,
  differences: [],
  maxDifferenceRadius: 150,
  differencesCount: 3,
  style: Style.DigitalArt,
  topic: undefined,
};

export const ftdSlice = createSlice({
  name: "ftd",
  initialState,
  reducers: {
    saveDifferences: (state, action: PayloadAction<MaskCircle[]>) => {
      state.differences = action.payload;
    },
    setDifferenceClickedById: (state, action: PayloadAction<number>) => {
      const circle = state.differences.find((circle) => circle.id === action.payload);
      if (circle) {
        circle.isClicked = true;
      }
    },
  },
});

export const { saveDifferences, setDifferenceClickedById } = ftdSlice.actions;

export const selectDifferences = (state: RootState) => state.ftd.differences;
export const selectGameStatus = (state: RootState) => state.ftd.gameStatus;
export const selectLevel = (state: RootState) => state.ftd.level;
export const selectLives = (state: RootState) => state.ftd.lives;
export const selectMaxDifferenceRadius = (state: RootState) => state.ftd.maxDifferenceRadius;
export const selectDifferencesCount = (state: RootState) => state.ftd.differencesCount;
export const selectStyle = (state: RootState) => state.ftd.style;
export const selectTopic = (state: RootState) => state.ftd.topic;

export default ftdSlice.reducer;
