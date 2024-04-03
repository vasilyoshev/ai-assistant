import { Difficulty } from "enums";

export const getNumberOfDifferences = (level: number, difficulty: Difficulty) => {
  if (difficulty === Difficulty.Easy) return 4;
  if (difficulty === Difficulty.Hard) return 8;

  // start from 4 and increment by 1 every 2 levels
  return Math.floor((level - 1) / 2) + 4;
};
