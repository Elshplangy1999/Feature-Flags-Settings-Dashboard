import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { sizeClasses } from "../../constants/AdvancedStatusBadge/sizeClasses";
import { AdvancedStatusBadgeProps } from "@/interfaces/AdvancedStatusBadge/AdvancedStatusBadgeProps";
import { variantStyles } from "@/constants/AdvancedStatusBadge/variantStyles";

export const AdvancedStatusBadge: React.FC<AdvancedStatusBadgeProps> = ({
  status,
  variant = "default",
  size = "md",
  animated = true,
}) => {
  const { t } = useTranslation();

  /**
   * --------------------------------------------------
   *  Normalize Status
   * --------------------------------------------------
   */
  const normalizedStatus = String(status).toLowerCase();
  const isActive = normalizedStatus === "1" || normalizedStatus === "active";

  const baseClasses = `
    inline-flex items-center justify-center rounded-full
    transition-all duration-300 ease-out
    ${sizeClasses[size]}
    ${animated ? "transform hover:scale-105 active:scale-95" : ""}
  `;

  const currentStyle = isActive
    ? variantStyles[variant].active
    : variantStyles[variant].inactive;

  return (
    <div className="group relative">
      <span className={`${baseClasses} ${currentStyle}`}>
        {isActive ? t("Enabled") : t("Disabled")}
      </span>

      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
        <div className="flex items-center gap-2 ">
          <span
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-green-400" : "bg-red-400"
            }`}
          />
          {t("Status")}: {isActive ? t("Enabled") : t("Disabled")}
        </div>
        <div className="absolute left-1/2 top-full -translate-x-1/2 transform border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};

export default AdvancedStatusBadge;
