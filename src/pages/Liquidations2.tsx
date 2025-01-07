import React, { useState, useEffect } from "react";

// Define the Borrower type according to the subgraph schema
interface Borrower {
  id: string;
  debt: number;
  collateral: number;
}

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
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [liquidationAmount, setLiquidationAmount] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching data (replace with actual GraphQL query)
    setBorrowers(dummyBorrowers);
  }, []);

  const handleLiquidation = (borrowerId: string) => {
    console.log(`Liquidating ${liquidationAmount} for borrower ${borrowerId}`);
    // Implement actual liquidation logic here
  };

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      <h1 className="text-3xl font-semibold text-accent mb-8 text-center">
        Liquidatable Positions
      </h1>
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
              onMouseEnter={() => setExpandedRow(borrower.id)}
              onMouseLeave={() => setExpandedRow(null)}
              className={`relative flex flex-col items-center rounded-lg p-4 mb-4 transition-all duration-700 ease-in-out ${
                expandedRow === borrower.id
                  ? "bg-primary/80 shadow-2xl"
                  : "bg-primary/60 shadow-lg"
              }`}
            >
              {/* First Div - Address, Debt, and Collateral */}
              <div className="flex w-full justify-between text-center text-sm font-medium">
                <div className="text-accent truncate w-1/3">{borrower.id}</div>
                <div className="text-red-500 w-1/3">${borrower.debt.toLocaleString()}</div>
                <div className="text-green-500 w-1/3">${borrower.collateral.toLocaleString()}</div>
              </div>

              {/* Second Div - Expanded Section */}
              <div
                className={`w-full flex justify-center items-center mt-2 transition-all duration-700 ease-in-out overflow-hidden ${
                  expandedRow === borrower.id ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  maxHeight: expandedRow === borrower.id ? "200px" : "0", // Adjust max-height as per content
                }}
              >
                <div className="flex w-full justify-center gap-4 bg-secondary rounded-lg p-4 shadow-lg">
                  <input
                    type="text"
                    placeholder="Amount to Liquidate"
                    value={liquidationAmount}
                    onChange={(e) =>
                      setLiquidationAmount(parseFloat(e.target.value) || 0)
                    }
                    className="w-3/4 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lightBlue"
                  />
                  <button
                    onClick={() => handleLiquidation(borrower.id)}
                    className="px-6 py-2 bg-lightBlue text-primary font-medium rounded-lg shadow-md hover:shadow-xl hover:bg-lightBlue/80 transition duration-700"
                  >
                    Liquidate
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-300 text-lg">
            No Positions Opened
          </div>
        )}
      </div>
    </div>
  );
};

export default LiquidationPage;
