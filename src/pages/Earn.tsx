import React from "react";
import { CustomCard, CustomCardProps } from "../components/CustomCard";

const Earn: React.FC = () => {
  const cardsDetails: CustomCardProps[] = [
    {
      name: "Become Redemption Provider",
      path: "/earn/redemption-provider",
      description:
        "Register yourself as a redemption provider and earn redemption fees at your rate",
    },
    {
      name: "Liquidate Users",
      path: "/earn/liquidation",
      description:
        "Earn liquidation rewards by liquidating users and maintain protocol stability",
    },
  ];

  return (
    <div className="flex-grow flex flex-wrap justify-around items-center md:px-10 h-full">
      {cardsDetails.map((card, index) => (
        <CustomCard key={index} {...card} />
      ))}
    </div>
  );
};

export default Earn;
