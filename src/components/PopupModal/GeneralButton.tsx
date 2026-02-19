"use client";

import { GeneralButtonProps } from "@/interfaces/PopupModal/GeneralButton";
import React from "react";

const GeneralButton: React.FC<GeneralButtonProps> = ({
  onClick,
  Icon,
  className = "",
  size = 20,
  ariaLabel = "button",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group rounded-xl p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-white/50 hover:text-gray-600 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 ${className}`}
    >
      {Icon && (
        <Icon
          className="transition-transform duration-200 group-hover:rotate-90"
          size={size}
        />
      )}
    </button>
  );
};

export default GeneralButton;
