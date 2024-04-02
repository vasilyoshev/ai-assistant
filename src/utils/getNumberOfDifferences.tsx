export const getNumberOfDifferences = (level: number) => {
  // start from 4 and increment by 1 every 2 levels
  return Math.floor((level - 1) / 2) + 4;
};
