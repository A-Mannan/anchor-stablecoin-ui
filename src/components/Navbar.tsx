import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"; // Import Framer Motion

const Navbar: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "My Position" },
    { path: "/position", label: "All Positions" },
    { path: "/auction", label: "Dutch Auction" },
    { path: "/earn", label: "Earn" },
    {
      path: "https://anchorstablecoin.gitbook.io/anchor/background/stablecoins-on-the-market",
      label: "Docs",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center space-x-3">
          <Logo />
        </Link>
        <div className="flex md:order-2 space-x-3">
          <div className="text-xs ">
            <ConnectButton />
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bars3Icon className="w-4 h-4" />
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-primary md:gap-3 md:bg-transparent border  border-accent md:border-transparent md:flex-row md:space-x-7 md:mt-0 md:border-0">
            {navLinks.map(({ path, label }) => (
              <li key={path} className="relative">
                <Link
                  to={path}
                  className={`block py-2 px-3 md:p-0 rounded transition-all duration-300 ${
                    isActive(path) ? "text-lightBlue" : "text-accent"
                  } hover:text-lightBlue`}
                >
                  {label}
                </Link>
                {isActive(path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 md:bg-lightBlue rounded-full w-1/2 mx-auto"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
