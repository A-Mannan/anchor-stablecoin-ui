import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useQuery } from "urql";
import { formatUnits } from "viem";
import { formatNumber } from "../utils/formatNumber";

const REDEMPTION_PROVIDERS_QUERY = gql`
  query {
    borrowers(
      where: { isRedemptionProvider: true }
      orderBy: redemptionFeeRate
    ) {
      id
      redemptionFeeRate
      redemptionAmount
    }
  }
`;

interface SubgraphRedemptionProvider {
  id: string;
  redemptionFeeRate: string;
  redemptionAmount: string;
}

interface RedemptionProvider {
  id: string;
  redemptionFeeRate: string;
  redemptionAmount: string;
}

const RedemptionProviderPage: React.FC = () => {
  const [providers, setProviders] = useState<RedemptionProvider[]>([]);
  const [result] = useQuery({
    query: REDEMPTION_PROVIDERS_QUERY,
  });

  const { data } = result;
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.borrowers) {
      const transformedProviders = data.borrowers.map(
        (provider: SubgraphRedemptionProvider) => ({
          id: provider.id,
          redemptionFeeRate: formatUnits(BigInt(provider.redemptionFeeRate), 2),
          redemptionAmount: formatUnits(BigInt(provider.redemptionAmount), 18),
        })
      );

      setProviders(transformedProviders);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-start w-full pt-6 h-full overflow-auto">
      {/* Back Button */}
      <div className="self-start p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lightBlue transition-all duration-300 border border-lightBlue hover:text-primary hover:bg-lightBlue rounded-lg px-4 py-2"
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold text-accent mb-8 text-center">
        Redemption Providers
      </h1>

      <div className="mb-6">
        <Link
          to="/earn/redemption-provider/manage"
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-lightBlue transition duration-300 ease-out border-2 border-lightBlue rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-primary duration-300 -translate-x-full bg-lightBlue group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-lightBlue font-semibold transition-all duration-300 transform group-hover:translate-x-full ease text-md">
            Manage Redemption
          </span>
          <span className="relative invisible">Manage Redemption</span>
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8 text-sm md:text-base">
        <div className="grid grid-cols-4 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Rank</div>
          <div>Provider Address</div>
          <div>Fee Rate</div>
          <div>Redemption Amount (USD)</div>
        </div>

        {providers.length > 0 ? (
          providers.map((provider, index) => (
            <div
              key={provider.id}
              className="grid grid-cols-4 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 hover:bg-primary hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <div className="text-accent text-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="text-accent truncate text-center text-sm font-medium">
                {provider.id}
              </div>
              <div className="text-red-500 text-center text-sm font-semibold">
                {formatNumber(provider.redemptionFeeRate)}%
              </div>
              <div className="text-green-500 text-center text-sm font-semibold">
                ${formatNumber(provider.redemptionAmount)}
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
  );
};

export default RedemptionProviderPage;
