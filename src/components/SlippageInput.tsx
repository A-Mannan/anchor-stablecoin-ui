import React, { useState } from "react";

interface SlippageInputProps {
  slippage: number;
  setSlippage: (value: number) => void;
}

const SlippageInput: React.FC<SlippageInputProps> = ({ slippage, setSlippage }) => {
  const [slippageInput, setSlippageInput] = useState<string>(slippage.toString());

  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      setSlippageInput(inputValue);
      const parsedValue = parseFloat(inputValue);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setSlippage(parsedValue);
      }
    }
  };

  const handleSliderChange = (value: number) => {
    setSlippage(value);
    setSlippageInput(value.toString());
  };

  const handlePresetClick = (preset: number) => {
    setSlippage(preset);
    setSlippageInput(preset.toString());
  };

  return (
    <div className="flex flex-col border border-accent rounded-lg py-3 px-4 relative sm:w-11/12 mx-auto gap-1">
      <span className="text-xs text-accent absolute -top-2 bg-secondary px-2">
        Slippage Tolerance
      </span>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={100}
          step={0.01}
          value={slippage}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-1 cursor-pointer"
        />
        <input
          type="text"
          value={slippageInput}
          onChange={handleSlippageChange}
          className="w-14 p-1 border border-accent rounded-md text-center text-accent bg-secondary focus:outline-none"
        />
        <span className="text-lg text-accent">%</span>
      </div>
      <div className="flex gap-2">
        {[0, 25, 50, 75, 100].map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`rounded-md text-xs w-14 h-7 flex justify-center items-center ${
              slippage === preset
                ? "bg-accent text-primary"
                : "bg-primary text-accent"
            } transition-all duration-200`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlippageInput;
