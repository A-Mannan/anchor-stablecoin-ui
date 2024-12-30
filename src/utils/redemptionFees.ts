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
