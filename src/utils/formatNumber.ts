export const formatNumber = (num: string, decimals = 2): number =>
  Number(parseFloat(num).toFixed(decimals));
