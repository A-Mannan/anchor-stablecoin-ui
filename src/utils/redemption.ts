import { RedemptionProvider } from "../types";

export const calculateRedemptionFees = (
  providers: RedemptionProvider[],
  redeemAmount: bigint
) => {
  let remainingAmount = redeemAmount;
  let totalFeePaid = 0n;
  let totalAmountRedeemed = 0n;

  for (const provider of providers) {
    const providerAmount = BigInt(provider.redemptionAmount);
    const providerFeeRate = BigInt(provider.redemptionFeeRate); // Fee rate in basis points (e.g., 1% = 100)

    if (remainingAmount === 0n) break;

    // Take the smaller of the remaining amount or provider's amount
    const amountFromProvider =
      remainingAmount < providerAmount ? remainingAmount : providerAmount;

    // Calculate fee for this portion
    const fee = (amountFromProvider * providerFeeRate) / 10_000n; // Convert basis points to percentage
    totalFeePaid += fee;

    // Update remaining amount and total redeemed
    remainingAmount -= amountFromProvider;
    totalAmountRedeemed += amountFromProvider;
  }

  return {
    totalFeePaid,
    averageFeeRate:
      totalAmountRedeemed > 0n
        ? (totalFeePaid * 10_000n) / totalAmountRedeemed
        : 0n, // Average fee rate in basis points
  };
};

export const calculateEthOutOnRedemption = (
  borrowers: RedemptionProvider[],
  redeemAmount: bigint, // In wei
  ethPrice: bigint // In wei
): bigint => {
  let remainingAmount = redeemAmount;
  let totalEthOut = 0n;

  for (const borrower of borrowers) {
    if (remainingAmount === 0n) break;

    const providerOfferAmount = BigInt(borrower.redemptionAmount);
    const redeemableAmount =
      remainingAmount < providerOfferAmount
        ? remainingAmount
        : providerOfferAmount;

    const feeRate = BigInt(borrower.redemptionFeeRate); // Fee rate in basis points

    // Calculate ETH out for this provider
    const ethOutForProvider =
      (redeemableAmount *
        (10000n - feeRate) * // (10000 - feeRate)
        10n ** 18n) / // Scale up
      (ethPrice * 10000n); // Divide by ETH price and 10000 basis points

    totalEthOut += ethOutForProvider;
    remainingAmount -= redeemableAmount;
  }

  return totalEthOut;
};

const MAX_BASIS_POINTS = BigInt(10000);
export const calculateAmountWithSlippage = (
  amount: bigint,
  slippage: number
): bigint => {
  if (slippage < 0 || slippage > 100) {
    throw new Error("Slippage must be between 0 and 100.");
  }
  const slippageFactorBps = MAX_BASIS_POINTS - BigInt(slippage * 100);
  return (amount * slippageFactorBps) / MAX_BASIS_POINTS; // Divide by 100.00 to adjust for percentage
};
