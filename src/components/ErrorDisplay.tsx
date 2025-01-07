import React from "react";

const ErrorDisplay: React.FC<{ error: string | null }> = ({ error }) => {
  return (
    <div
      className={`p-4 text-xs rounded-lg bg-primary border border-red-500 text-red-500 h-8 w-11/12 mx-auto flex items-center justify-center ${error ? "" : "invisible"}`}
      role="alert"
    >
      {error}
    </div>
  );
};

export default ErrorDisplay;
