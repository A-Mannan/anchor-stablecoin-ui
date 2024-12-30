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
// Type for data returned from the subgraph
interface SubgraphBorrower {
  id: string;
  debt: string;
  collateral: string;
  collateralRatio: string;
}

// Define the Borrower type according to the subgraph schema
interface Borrower {
  id: string;
  debt: string;
  collateral: string;
  collateralInUsd: string;
  collateralRatio: string;
}

const UserPositions: React.FC = () => {
  const { ethPriceInUsd } = useEthPriceInUsd(); // Fetch ETH price in USD
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [result] = useQuery({
    query: BORROWERS_QUERY,
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    if (data?.borrowers && ethPriceInUsd) {
      console.log(data);
      const transformedBorrowers = data.borrowers.map((borrower: SubgraphBorrower) => {
        const collateralInUsd =
          (BigInt(borrower.collateral) * ethPriceInUsd) / parseUnits("1", 18); // Calculate collateral in USD
        const collateralRatio = calculateCollateralRatio(
          BigInt(borrower.collateral),
          BigInt(borrower.debt),
          ethPriceInUsd
        );

        return {
          id: borrower.id,
          debt: formatUnits(BigInt(borrower.debt), 18),
          collateral: formatUnits(BigInt(borrower.collateral), 18),
          collateralInUsd: formatUnits(collateralInUsd, 18),
          collateralRatio: formatUnits(collateralRatio, 18),
        };
      });

      setBorrowers(transformedBorrowers);
    }
  }, [data, ethPriceInUsd]);

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-fit">
      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
        Borrowers' Positions
      </h1>
      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8 border border-lightBlue">
        {/* Table Header */}
        <div className="grid grid-cols-5 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Address</div>
          <div>Debt (USD)</div>
          <div>Collateral (ETH)</div>
          <div>Collateral (USD)</div>
          <div>Collateral Ratio</div>
        </div>
  
        {/* Scrollable Table Rows */}
        <div
          className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-lightBlue scrollbar-track-secondary"
        >
          {borrowers.length > 0 ? (
            borrowers.map((borrower) => (
              <div
                key={borrower.id}
                className="grid grid-cols-5 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 hover:bg-primary hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
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
                  {formatNumber(borrower.collateral)}
                </div>
  
                {/* Collateral (USD) */}
                <div className="text-green-500 text-center text-sm font-semibold">
                  ${formatNumber(borrower.collateralInUsd)}
                </div>
  
                {/* Collateral Ratio */}
                <div className="text-yellow-500 text-center text-sm font-semibold">
                  {formatNumber(borrower.collateralRatio)}%
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
  );
  
};

export default UserPositions;
