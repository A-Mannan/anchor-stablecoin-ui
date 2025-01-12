import React, { useState, useEffect } from "react";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { gql, useQuery } from "urql";
import { formatUnits, parseUnits } from "viem";
import { calculateCollateralRatio } from "../utils/collateralRatio";
import { formatNumber } from "../utils/formatNumber";

// GraphQL query to fetch borrower data
const BORROWERS_QUERY = gql`
  query {
    borrowers(orderBy: collateralRatio, orderDirection: desc) {
      id
      debt
      collateral
      collateralRatio
    }
  }
`;

interface SubgraphBorrower {
  id: string;
  debt: string;
  collateral: string;
  collateralRatio: string;
}

interface Borrower {
  id: string;
  debt: string;
  collateral: string;
  collateralInUsd: string;
  collateralRatio: string;
  liquidationPrice: string;
}

const UserPositions: React.FC = () => {
  const { ethPriceInUsd } = useEthPriceInUsd(); // Fetch ETH price in USD
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [result] = useQuery({
    query: BORROWERS_QUERY,
  });

  const { data } = result;

  useEffect(() => {
    if (data?.borrowers && ethPriceInUsd) {
      const transformedBorrowers = data.borrowers.map((borrower: SubgraphBorrower) => {
        const collateralInUsd =
          (BigInt(borrower.collateral) * ethPriceInUsd) / parseUnits("1", 18); // Calculate collateral in USD
        const collateralRatio = calculateCollateralRatio(
          BigInt(borrower.collateral),
          BigInt(borrower.debt),
          ethPriceInUsd
        );
        const liquidationPrice = (BigInt(borrower.debt) * parseUnits("1.2", 18)) / BigInt(borrower.collateral);

        return {
          id: borrower.id,
          debt: formatUnits(BigInt(borrower.debt), 18),
          collateral: formatUnits(BigInt(borrower.collateral), 18),
          collateralInUsd: formatUnits(collateralInUsd, 18),
          collateralRatio: formatUnits(collateralRatio, 18),
          liquidationPrice: formatUnits(liquidationPrice, 18),
        };
      });

      setBorrowers(transformedBorrowers);
    }
  }, [data, ethPriceInUsd]);

  return (
    <div className="flex flex-col items-center justify-start flex-grow pt-12 h-full overflow-auto">
      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
        Borrowers' Positions
      </h1>
      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8 border border-lightBlue overflow-x-auto">
        {/* Scrollable Table Container */}
        <div className="min-w-[900px] md:min-w-fit">
          {/* Table Header */}
          <div className="grid grid-cols-7 text-primary text-center p-4 bg-lightBlue backdrop-blur-md rounded-lg mb-4 font-semibold">
            <div>Rank</div>
            <div>Address</div>
            <div>Debt (USD)</div>
            <div>Collateral (ETH)</div>
            <div>Collateral (USD)</div>
            <div>Collateral Ratio</div>
            <div>Liquidation Price (USD)</div>
          </div>
  
          {/* Scrollable Table Rows */}
          <div
            className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-lightBlue scrollbar-track-secondary"
          >
            {borrowers.length > 0 ? (
              borrowers.map((borrower, index) => (
                <div
                  key={borrower.id}
                  className="grid grid-cols-7 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 hover:bg-primary hover:shadow-2xl transition-all duration-300 ease-in-out"
                >
                  {/* Rank */}
                  <div className="text-accent text-center text-sm font-medium">
                    {index + 1}
                  </div>
  
                  {/* Address */}
                  <div className="text-accent truncate text-center text-sm font-medium">
                    {borrower.id}
                  </div>
  
                  {/* Debt */}
                  <div className="text-red-500 text-center text-sm font-semibold">
                    ${formatNumber(borrower.debt)}
                  </div>
  
                  {/* Collateral (ETH) */}
                  <div className="text-blue-500 text-center text-sm font-semibold">
                    {formatNumber(borrower.collateral)} ETH
                  </div>
  
                  {/* Collateral (USD) */}
                  <div className="text-green-500 text-center text-sm font-semibold">
                    ${formatNumber(borrower.collateralInUsd)}
                  </div>
  
                  {/* Collateral Ratio */}
                  <div className="text-yellow-500 text-center text-sm font-semibold">
                    {formatNumber(borrower.collateralRatio)}%
                  </div>
  
                  {/* Liquidation Price */}
                  <div className="text-orange-500 text-center text-sm font-semibold">
                    ${formatNumber(borrower.liquidationPrice)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-300 text-lg">
                No Positions opened
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default UserPositions;
