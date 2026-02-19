import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { AdvLoaderProps } from "@/interfaces/HandleReducer/AdvLoaderProps";
import {
  colorConfig,
  sizeConfig,
  speedConfig,
} from "@/constants/AdvLoader/AdvLoader";

const AdvLoader: React.FC<AdvLoaderProps> = ({
  message = "Loading...",
  className = "",
  variant = "default",
  size = "md",
  color = "blue",
  speed = "normal",
}) => {
  const { t } = useTranslation();
  const colors = colorConfig[color];
  const sizeClass = sizeConfig[size];
  const speedClass = speedConfig[speed];

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const renderLoader = () => {
    switch (variant) {
      case "glow":
        return (
          <div className="relative">
            <div
              className={`${sizeClass} rounded-full border-t-transparent ${colors.border} ${speedClass} shadow-xl ${colors.glow}`}
              style={{ boxShadow: `0 0 20px currentColor` }}
            />
            <div
              className={`absolute inset-0 ${sizeClass} rounded-full animate-ping opacity-20 ${colors.bg}`}
            />
          </div>
        );

      case "pulse":
        return (
          <div
            className={`${sizeClass} rounded-full ${colors.bg} animate-pulse opacity-75`}
          />
        );

      case "spinner":
        return (
          <div
            className={`${sizeClass} rounded-full border-4 border-gray-200 border-t-${color}-500 ${speedClass}`}
          />
        );

      default:
        return (
          <div
            className={`${sizeClass} rounded-full border-4 border-gray-200 border-t-${color}-500 ${speedClass}`}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderLoader()}
      {message && (
        <p className={`mt-4 text-sm font-medium ${colors.text}`}>
          {t(message)}
        </p>
      )}
    </div>
  );
};

export default AdvLoader;
