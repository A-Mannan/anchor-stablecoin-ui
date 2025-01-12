import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "urql";
import { useEthPriceInUsd } from "../hooks/useEthPriceInUsd";
import { formatUnits } from "viem";
import { calculateCollateralRatio } from "../utils/collateralRatio";
import { formatNumber } from "../utils/formatNumber";

interface SubgraphBorrower {
  id: string;
  debt: string;
  collateral: string;
  collateralRatio: string;
}

const LiquidationPage: React.FC = () => {
  const { ethPriceInUsd } = useEthPriceInUsd(); // Fetch ETH price in USD
  const navigate = useNavigate();

  // Once ETH price is fetched, construct the query
  const liquidationThreshold = ethPriceInUsd
    ? 1.2 / Number(formatUnits(ethPriceInUsd, 18))
    : 0;

  const GET_BORROWERS = gql`
    query GetBorrowers($threshold: BigDecimal!) {
      borrowers(where: { collateralRatio_lt: $threshold }) {
        id
        debt
        collateral
      }
    }
  `;

  const [result] = useQuery({
    query: GET_BORROWERS,
    variables: { threshold: liquidationThreshold },
    pause: !ethPriceInUsd, // Only execute query after ETH price is fetched
  });

  const { data, fetching, error } = result;

  return (
    <div className="flex flex-col items-center justify-start max-w-5xl mx-auto w-full h-full">
      <div className="self-start p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lightBlue transition-all duration-300 border border-lightBlue hover:text-primary hover:bg-lightBlue rounded-lg px-4 py-2"
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
        Liquidate Positions
      </h1>

      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8">
        <div className="grid grid-cols-4 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Address</div>
          <div>Debt (USD)</div>
          <div>Collateral (ETH)</div>
          <div>Collateral Ratio</div>
        </div>

        {data && data.borrowers.length > 0 ? (
          data.borrowers.map((borrower: SubgraphBorrower) => (
            <Link
              key={borrower.id}
              className="group relative grid grid-cols-4 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 overflow-hidden cursor-pointer"
              to={`/earn/liquidation/${borrower.id}`}
            >
              <span className="absolute inset-0 flex items-center justify-center bg-primary/80 text-white text-lg font-bold duration-300 -translate-x-full group-hover:translate-x-0 ease">
                Click to liquidate position &rarr;
              </span>
              <div className="relative text-accent truncate text-center text-sm font-medium group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                {borrower.id}
              </div>
              <div className="relative text-red-500 text-center text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                ${formatUnits(BigInt(borrower.debt), 18)}
              </div>
              <div className="relative text-green-500 text-center text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                {formatUnits(BigInt(borrower.collateral), 18)} ETH
              </div>
              <div className="relative text-blue-500 text-center text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                {formatNumber(formatUnits(
                  calculateCollateralRatio(
                    BigInt(borrower.collateral),
                    BigInt(borrower.debt),
                    ethPriceInUsd
                  ),
                  18
                ))}
                %
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-6 text-gray-300 text-lg">
            No Positions to liquidate
          </div>
        )}
      </div>
    </div>
  );
};

export default LiquidationPage;
