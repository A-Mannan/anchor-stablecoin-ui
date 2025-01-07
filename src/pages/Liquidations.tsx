import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define the Borrower type according to the subgraph schema
interface Borrower {
  id: string;
  debt: number;
  collateral: number;
}

// Dummy data to simulate fetching from the subgraph
const dummyBorrowers: Borrower[] = [
  {
    id: "0x1234567890abcdef1234567890abcdef12345678",
    debt: 5000,
    collateral: 15000,
  },
  {
    id: "0xabcdef1234567890abcdef1234567890abcdef12",
    debt: 3000,
    collateral: 10000,
  },
  {
    id: "0x7890abcdef1234567890abcdef1234567890abcd",
    debt: 7000,
    collateral: 20000,
  },
];

const LiquidationPage: React.FC = () => {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBorrowers(dummyBorrowers);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start max-w-5xl mx-auto w-full">
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
        <div className="grid grid-cols-3 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Address</div>
          <div>Debt (USD)</div>
          <div>Collateral (USD)</div>
        </div>

        {borrowers.length > 0 ? (
          borrowers.map((borrower) => (
            <Link
              key={borrower.id}
              className="group relative grid grid-cols-3 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 overflow-hidden cursor-pointer"
              to={`/earn/liquidation/${borrower.id}`}
            >
              <span className="absolute inset-0 flex items-center justify-center bg-primary/80 text-white text-lg font-bold duration-300 -translate-x-full group-hover:translate-x-0 ease">
                Click to liquidate position &rarr;
              </span>
              <div className="relative text-accent truncate text-center text-sm font-medium group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                {borrower.id}
              </div>
              <div className="relative text-red-500 text-center text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                ${borrower.debt.toLocaleString()}
              </div>
              <div className="relative text-green-500 text-center text-sm font-semibold group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
                ${borrower.collateral.toLocaleString()}
              </div>
            </Link>
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

export default LiquidationPage;
