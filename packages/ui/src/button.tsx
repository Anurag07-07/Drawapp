"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      onClick={() => alert(`Hello from your ${appName} app! 🚀`)}
      className={clsx(
        "px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md",
        "hover:bg-blue-700 hover:shadow-lg transition duration-300",
        className
      )}
    >
      {children}
    </button>
  );
};
