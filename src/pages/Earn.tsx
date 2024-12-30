import React from "react";
import { CustomCard } from "../components/CustomCard";

const Earn: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-36 flex-wrap">
      <CustomCard name="Become Redemption Provider" path="/earn/redemption-provider"/>
      <CustomCard name="Liquidate Users" path="/earn/liquidation"/>
    </div>
    
  );
};

export default Earn;
