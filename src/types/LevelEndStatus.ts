import { GameStatus } from "enums";

export type LevelEndStatus = GameStatus.LevelCleared | GameStatus.LevelFailed | GameStatus.GameWon;
