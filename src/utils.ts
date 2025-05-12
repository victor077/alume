export const truncateToTwoDecimals = (value: number): number => {
  return Math.floor(value * 100) / 100;
};
