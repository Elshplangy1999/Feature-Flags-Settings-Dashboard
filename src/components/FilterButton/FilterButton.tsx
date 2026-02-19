"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterButtonProps } from "@/interfaces/FilterButton/FilterButtonProps";
import { useHasMounted } from "@/hooks/Usehasmounted";

const FilterButton: React.FC<FilterButtonProps> = ({
  activeFiltersCount,
  onClick,
}) => {
  const { t } = useTranslation();
  const mounted = useHasMounted();
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onClick}
        className={`
          relative flex sm:min-w-30 items-center justify-center gap-3 rounded-xl border-2 px-3 py-2.5
          text-sm font-medium transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          ${
            activeFiltersCount > 0
              ? "border-blue-500 bg-linear-to-r from-blue-500 to-indigo-500 text-white"
              : "border-gray-300 bg-white text-gray-700 shadow-sm hover:border-gray-400 hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          }
        `}
      >
        <SlidersHorizontal
          size={14}
          className={`transition-transform duration-200 ${
            activeFiltersCount > 0 ? "rotate-3" : ""
          }`}
        />
        <span>
          {mounted ? t("Filters") : "Filters"} 
        </span>

        {activeFiltersCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-blue-200 bg-white text-xs font-bold text-blue-500">
            {activeFiltersCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FilterButton;