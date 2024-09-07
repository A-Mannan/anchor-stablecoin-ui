import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

interface Stat {
  label: string;
  value: string;
  newValue?: string;
  deltaColor?: string;
  displayChange?: boolean;
}

interface StatsDisplayProps {
  stats: Stat[];
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="h-2/6 p-0.5">
      <div className="bg-primary text-center w-full py-0.5 font-semibold text-md text-accent">
        Stats
      </div>
      <div className="flex flex-col justify-center items-start p-2 text-sm text-accent">
        {stats.map(
          ({ label, value, newValue, deltaColor, displayChange }, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full px-4"
            >
              {/* Label on the left */}
              <span className="text-left w-1/2">{label}</span>

              {/* Value on the right */}
              <div className="flex items-center justify-end w-1/2">
                <span className="text-right">{value}</span>

                {/* Display change if applicable */}
                {newValue && displayChange && (
                  <>
                    <span>
                      <ArrowLongRightIcon className="w-5 h-5 mx-2" />
                    </span>
                    <span className={deltaColor}>{newValue}</span>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StatsDisplay;
