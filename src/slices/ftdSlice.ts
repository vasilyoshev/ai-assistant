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
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setStyle: (state, action: PayloadAction<Style>) => {
      state.style = action.payload;
    },
    loseLife: (state) => {
      state.lives--;
    },
  },
});

export const { saveDifferences, setDifferenceClickedById, setGameStatus, setTopic, setStyle, loseLife } =
  ftdSlice.actions;

export const selectGameStatus = (state: RootState) => state.ftd.gameStatus;
export const selectLevel = (state: RootState) => state.ftd.level;
export const selectLives = (state: RootState) => state.ftd.lives;
export const selectDifferences = (state: RootState) => state.ftd.differences;
export const selectMaxDifferenceRadius = (state: RootState) => state.ftd.maxDifferenceRadius;
export const selectDifferencesCount = (state: RootState) => state.ftd.differencesCount;
export const selectStyle = (state: RootState) => state.ftd.style;
export const selectTopic = (state: RootState) => state.ftd.topic;

export default ftdSlice.reducer;
