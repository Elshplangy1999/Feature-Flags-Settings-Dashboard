import React from "react";
import useIsRTL from "@/hooks/useIsRTL";
import { SidebarToggleButtonProps } from "@/interfaces/SidebarToggleButton/SidebarToggleButtonProps";

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  isOpen = false,
  className = "",
  onClick,
  variant = "relative",
  visibility = "all",
}) => {
  const isRTL = useIsRTL();

  /**
   * --------------------------------------------------
   * Variables
   * --------------------------------------------------
   */
  // Base classes
  const baseClasses =
    "group flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/50 bg-white/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg dark:border-gray-600/50 dark:bg-gray-800/70 dark:hover:bg-gray-700";

  // Rotation classes based on RTL and open state
  const rotationClasses = isRTL
    ? isOpen
      ? "rotate-180"
      : ""
    : isOpen
      ? ""
      : "rotate-180";

  // Position classes based on variant
  const positionClasses =
    variant === "absolute"
      ? `absolute ${isRTL ? "right-4" : "left-4"} top-1/2 z-10 -translate-y-1/2`
      : "";

  // Visibility classes
  const visibilityClasses = visibility === "mobile" ? "xl:hidden" : "";

  /**
   * --------------------------------------------------
   * Methods
   * --------------------------------------------------
   */
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${rotationClasses} ${positionClasses} ${visibilityClasses} ${className}`}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      <svg
        className="h-4 w-4 text-gray-600 transition-all duration-300 group-hover:text-green-600 dark:text-gray-300 dark:group-hover:text-green-400"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default SidebarToggleButton;
