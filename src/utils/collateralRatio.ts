export const INFINITY_BIGINT = 2n ** 256n - 1n; // A very large bigint to represent infinity

export const calculateCollateralRatio = (
  collateralAmount: bigint,
  debtAmount: bigint,
  ethPriceInUsd: bigint | undefined
): bigint => {
  if (collateralAmount === 0n || !ethPriceInUsd) {
    return 0n;
  }

  if (debtAmount === 0n) {
    return INFINITY_BIGINT; // Return a large bigint representing infinity
  }

  return (collateralAmount * ethPriceInUsd * 100n) / debtAmount;
};
