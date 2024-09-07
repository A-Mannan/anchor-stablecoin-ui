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
    { path: "/", label: "Home" },
    { path: "/position", label: "Position" },
    { path: "/earn", label: "Earn" },
    { path: "/docs", label: "Docs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center space-x-3">
          <Logo />
        </Link>
        <div className="flex md:order-2 space-x-3">
          <div className="text-xs">
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
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-10 md:mt-0 md:border-0">
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <motion.div
                  whileTap={{ scale: 0.95, backgroundColor: "#1e3a8a" }} // Animation on tap
                  transition={{ type: "spring", stiffness: 100 }}
                  className="rounded md:rounded-full px-2 py-1"
                >
                  <Link
                    to={path}
                    className={`block py-2 px-3 md:p-0 rounded ${
                      isActive(path) ? "text-blue-500" : "text-accent"
                    } hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent`}
                  >
                    {label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
