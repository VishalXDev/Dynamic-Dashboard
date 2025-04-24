// File: src/components/common/Input.tsx
import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input"; // To give the component a proper display name in React DevTools

export default Input;
