import { parseUnits } from "viem";
import { INFINITY_BIGINT } from "./collateralRatio";

export function calculateEthOutOnLiquidation(
  ethPriceInUsd: bigint,
  debtPaymentAmount: bigint,
  collateralRatio: bigint
): bigint {
  if (ethPriceInUsd === 0n || collateralRatio === INFINITY_BIGINT) {
    return 0n;
  }
  const ethAmount =
    (debtPaymentAmount * parseUnits("1", 18)) / (ethPriceInUsd * 100n);

  if (collateralRatio > parseUnits("100", 18)) {
    return (ethAmount * collateralRatio) / parseUnits("100", 18);
  }
  return ethAmount;
}
