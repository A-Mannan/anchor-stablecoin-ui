import React, { useState } from "react";
import LabeledNumberInput from "./LabeledNumberInput";
import AnimatedButton from "./AnimatedButton";

const RedeemTab: React.FC = () => {
  const [redeemAmount, setRedeemAmount] = useState<string | "">("");

  const handleRedeemChange = (value: string) => {
    setRedeemAmount(value);
  };

  return (
    <div className="flex flex-col justify-between h-full gap">
      <LabeledNumberInput
        value={redeemAmount}
        setValue={handleRedeemChange}
        description="Redeem xUSD"
        id="redeem"
      />

      <AnimatedButton>Redeem</AnimatedButton>
    </div>
  );
};

export default RedeemTab;
