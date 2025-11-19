// components/ui/button.tsx
"use client";

import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={`px-4 py-2 rounded ${className}`}>
      {children}
    </button>
  );
};
