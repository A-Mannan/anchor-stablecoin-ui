export const formatNumber = (num: string, decimals = 3): number =>
  Number(parseFloat(num).toFixed(decimals));
