export const getRandomPercent = (minPercent: number, maxPercent: number) => {
  return `${Math.random() * (maxPercent - minPercent) + minPercent}%`;
};
