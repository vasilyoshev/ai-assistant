export const getMaxDifferenceRadius = (level: number) => {
  const x1 = 1; // level 1
  const x2 = 10; // level 10
  const y1 = 150; // radius at level 1
  const y2 = 30; // radius at level 10

  // use linear interpolation based on the level
  return y1 + (level - x1) * ((y2 - y1) / (x2 - x1));
};
