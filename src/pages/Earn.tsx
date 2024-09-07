import React from "react";
import { CustomCard } from "../components/CustomCard";

const Earn: React.FC = () => {
  return (
    <div className="flex items-center justify-around flex-wrap">
      <CustomCard name="Become Redemption Provider"/>
      <CustomCard name="Liquidate Users"/>
    </div>
  );
};

export default Earn;
