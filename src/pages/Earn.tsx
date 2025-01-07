import React from "react";
import { CustomCard } from "../components/CustomCard";

const Earn: React.FC = () => {
  return (
    <div className="flex-grow flex justify-around items-center p-8">
      <CustomCard name="Become Redemption Provider" path="/earn/redemption-provider"/>
      <CustomCard name="Liquidate Users" path="/earn/liquidation"/>
    </div>
    
  );
};

export default Earn;
