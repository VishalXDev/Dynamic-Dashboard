import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled"; // Button style variants
  size?: "sm" | "md" | "lg"; // Button size variants
  loading?: boolean; // Optional loading state
  children: React.ReactNode; // Ensure children is correctly typed
}

const Button: React.FC<ButtonProps> = ({
  variant = "filled", // Default variant
  size = "md", // Default size
  className,
  disabled = false,
  loading = false, // Default loading to false
  children,
  ...props
}) => {
  const baseClasses = "rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    filled: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400",
  };
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children} {/* Display loading text if active */}
    </button>
  );
};

export default Button;
