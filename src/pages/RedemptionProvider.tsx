import React, { useState, useEffect } from "react";

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
  // Add more as needed
];

const RedemptionProviderPage: React.FC = () => {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [amountToProvide, setAmountToProvide] = useState<number>(0);

  // Simulate fetching data (replace this with actual subgraph query)
  useEffect(() => {
    // This would be replaced by your GraphQL query to the subgraph
    setBorrowers(dummyBorrowers);
  }, []);

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Handle the confirmation action
  const handleConfirmRedemption = () => {
    if (amountToProvide > 0) {
      // Handle the action to provide redemption amount
      console.log(`Providing ${amountToProvide} for redemption`);
      setIsDrawerOpen(false); // Close drawer after action
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
        Redemption Providers
      </h1>

      {/* Manage Redemption Button */}
      <div className="mb-6">
        <button
          onClick={toggleDrawer}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Manage Redemption
        </button>
      </div>

      <div className="max-w-4xl w-full bg-secondary shadow-xl rounded-xl p-8">
        {/* Table Header */}
        <div className="grid grid-cols-3 text-primary text-center p-4 bg-lightBlue/80 backdrop-blur-md rounded-lg mb-4 font-semibold">
          <div>Address</div>
          <div>Debt (USD)</div>
          <div>Collateral (USD)</div>
        </div>

        {/* Table Rows */}
        {borrowers.length > 0 ? (
          borrowers.map((borrower) => (
            <div
              key={borrower.id}
              className="grid grid-cols-3 justify-between items-center bg-primary/60 backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4 hover:bg-primary hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              {/* Address */}
              <div className="text-accent truncate text-center text-sm font-medium">
                {borrower.id}
              </div>

              {/* Debt */}
              <div className="text-red-500 text-center text-sm font-semibold">
                ${borrower.debt.toLocaleString()}
              </div>

              {/* Collateral */}
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

      {/* Left-Side Drawer Component */}
      {isDrawerOpen && (
        <div className="fixed inset-0 flex justify-start bg-opacity-50 bg-gray-800 z-40">
          <div className="w-80 bg-primary p-6 flex flex-col justify-center gap-5">
            <h5 className="text-2xl font-bold text-gray-500 text-center mb-12">
              Manage Redemption
            </h5>
            <button
              onClick={toggleDrawer}
              className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1L7 7M1 7L7 1"
                />
              </svg>
            </button>

            <div className="mb-4">
              <input
                type="number"
                value={amountToProvide}
                onChange={(e) => setAmountToProvide(Number(e.target.value))}
                placeholder="Amount to Provide"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button
              onClick={handleConfirmRedemption}
              className="w-full px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              Confirm Redemption
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedemptionProviderPage;
