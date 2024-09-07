import React from "react";

interface LabeledNumberInputProps {
  value: string;
  setValue: (value: string) => void;
  description: string;
  id: string;
  isDisabled?: boolean;
}

const LabeledNumberInput: React.FC<LabeledNumberInputProps> = ({
  value,
  setValue,
  description,
  id,
  isDisabled,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Allow the input to contain a decimal point and numbers without immediate conversion
    if (inputValue === "" || /^-?\d*\.?\d*$/.test(inputValue)) {
      // Remove leading zeros, but keep a single zero if the input is just "0"
      if (
        inputValue.startsWith("0") &&
        inputValue !== "0" &&
        !inputValue.startsWith("0.")
      ) {
        inputValue = inputValue.replace(/^0+/, "");
      }

      // Update the state with the cleaned input value
      setValue(inputValue);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none border-accent focus:border-primary text-accent focus:outline-none focus:ring-0 peer"
        placeholder=""
      />
      {/* <span className="absolute right-2 top-2 text-gray-400 text-xs">
        Balance: 0
      </span>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs"
        disabled={isDisabled}
      >
        MAX
      </button> */}
      <label
        htmlFor={id}
        className="absolute text-sm text-accent bg-secondary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:bg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:-translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {description}
      </label>
    </div>
  );
};

export default LabeledNumberInput;
