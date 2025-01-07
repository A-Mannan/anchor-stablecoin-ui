import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";
import { Link } from "react-router-dom";

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

const RedemptionProviderPage: React.FC = () => {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBorrowers(dummyBorrowers);
  }, []);


  return (
    <div className="flex flex-col items-center justify-start max-w-5xl mx-auto w-full">
       {/* Back Button */}
       <div className="self-start p-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="text-lightBlue transition-all duration-300 border border-lightBlue hover:text-primary hover:bg-lightBlue rounded-lg px-4 py-2"
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
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

      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8">
        <div className="grid grid-cols-3 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Address</div>
          <div>Debt (USD)</div>
          <div>Collateral (USD)</div>
        </div>

        {borrowers.length > 0 ? (
          borrowers.map((borrower) => (
            <div
              key={borrower.id}
              className="grid grid-cols-3 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 hover:bg-primary hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <div className="text-accent truncate text-center text-sm font-medium">
                {borrower.id}
              </div>
              <div className="text-red-500 text-center text-sm font-semibold">
                ${borrower.debt.toLocaleString()}
              </div>
              <div className="text-green-500 text-center text-sm font-semibold">
                ${borrower.collateral.toLocaleString()}
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
