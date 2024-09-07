import React from "react";
import LogoIcon from "./LogoIcon";

const Logo: React.FC<{}> = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="sm:h-11 sm:w-11 h-8 w-8 flex items-center justify-center rounded-full ring-2 overflow-hidden m-1  ring-accent text-accent">
        <LogoIcon />
      </div>
      <span className="self-center sm:text-3xl text-2xl font-bold  text-accent whitespace-nowrap">
        Anchor.
      </span>
    </div>
  );
};

export default Logo;
