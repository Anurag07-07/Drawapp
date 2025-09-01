"use client";

import { type JSX, ReactNode } from "react";
import clsx from "clsx";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("p-6", className)}>{children}</div>;
}
