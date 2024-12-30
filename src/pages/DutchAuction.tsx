import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import LabeledNumberInput from "../components/LabeledNumberInput";

// Constants for auction configuration
const INITIAL_PRICE = 5000; // Initial price of StETH in USD
const PRICE_DROP_INTERVAL = 10000; // Time in ms for each price drop (10 seconds)
const PRICE_DROP_AMOUNT = 100; // Amount by which the price drops each interval
const MIN_PRICE = 1000; // Minimum price before the auction stops

const DutchAuctionPage: React.FC = () => {
  const [price, setPrice] = useState(INITIAL_PRICE);
  const [timeLeft, setTimeLeft] = useState(PRICE_DROP_INTERVAL / 1000);
  const [amount, setAmount] = useState<number | "">("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const priceDropInterval = setInterval(() => {
      setPrice((prevPrice) =>
        Math.max(prevPrice - PRICE_DROP_AMOUNT, MIN_PRICE)
      );
      setTimeLeft(PRICE_DROP_INTERVAL / 1000);
    }, PRICE_DROP_INTERVAL);

    return () => clearInterval(priceDropInterval);
  }, []);

  useEffect(() => {
    if (price === MIN_PRICE) {
      setTimeLeft(0);
    } else {
      const countdownInterval = setInterval(() => {
        setTimeLeft((prevTime) =>
          prevTime > 0 ? prevTime - 1 : PRICE_DROP_INTERVAL / 1000
        );
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [price]);

  const handleBuy = () => {
    if (amount && price) {
      const calculatedTotalPrice = amount * price;
      setTotalPrice(calculatedTotalPrice);
      console.log(`User bought ${amount} StETH for $${calculatedTotalPrice}`);
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-accent">
      <h1 className="text-4xl font-bold mb-4">Dutch Auction for StETH</h1>
      <div className="max-w-lg w-full bg-secondary shadow-2xl rounded-xl p-8 text-center border border-lightBlue">
        <p className="text-sm mb-6">
          Harvested StETH is on sale in a Dutch Auction. Get it before the price
          drops to the minimum!
        </p>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-semibold">Current Price:</span>
            <motion.span
              className="text-3xl font-bold text-lightBlue"
              animate={{ opacity: [0.8, 1], scale: [1, 1.1] }}
              transition={{ duration: 1, yoyo: Infinity }}
            >
              ${price}
            </motion.span>
          </div>
          <div className="text-sm text-gray-400">
            Next price drop in:{" "}
            <span className="text-lg font-semibold">{timeLeft}s</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <LabeledNumberInput
            value={amount.toString()}
            setValue={() => {}}
            description="Buy Lido StETH"
            id="deposit"
            isDisabled={false}
          />
          {/* <input
            type="number"
            placeholder="Enter amount of StETH"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-2/3 p-2 text-black rounded-lg mb-4 text-center"
          /> */}
          <AnimatedButton>Buy Now</AnimatedButton>
        </div>

        {totalPrice > 0 && (
          <div className="mt-6 text-lg text-center">
            <span className="font-semibold">Total Cost:</span> $
            {totalPrice.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DutchAuctionPage;
