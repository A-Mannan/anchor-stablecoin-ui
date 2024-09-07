import { Tabs } from "../components/Tabs";
import DepositAndMintTab from "../components/DepositAndMintTab";
import WithdrawTab from "../components/WithdrawTab";
import RepayTab from "../components/RepayTab";
import RedeemTab from "../components/RedeemTab";
import React from "react";

const Position: React.FC<{}> = () => {
  const tabs = [
    {
      title: "Mint",
      value: "mint",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-3xl">
          <DepositAndMintTab />
        </div>
      ),
    },
    {
      title: "Withdraw",
      value: "withdraw",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-3xl">
          <WithdrawTab />
        </div>
      ),
    },
    {
      title: "Repay",
      value: "repay",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-3xl">
          <RepayTab />
        </div>
      ),
    },
    {
      title: "Redeem",
      value: "redeem",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-3xl p-10">
          <RedeemTab />
        </div>
      ),
    },
  ];

  return (
    <div className=" [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mt-16 mb-12">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Position;
