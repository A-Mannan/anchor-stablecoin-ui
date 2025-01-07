const MAX_BASIS_POINTS = BigInt(10000);
export function calculatePercentage(value: bigint, bps: bigint): bigint {
  return (value * bps) / MAX_BASIS_POINTS;
}
