import React from "react";
import { CustomCard } from "../components/CustomCard";

const Earn: React.FC = () => {
  return (
    <div className="flex-grow flex flex-wrap justify-around items-center p-14 h-full">
      <CustomCard name="Become Redemption Provider" path="/earn/redemption-provider"/>
      <CustomCard name="Liquidate Users" path="/earn/liquidation"/>
    </div>
    
  );
};

export default Earn;
