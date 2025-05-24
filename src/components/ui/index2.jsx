import React from "react";

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className={
        `flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 
         focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`
      }
    />
  );
});

Input.displayName = "Input";

export default Input;
