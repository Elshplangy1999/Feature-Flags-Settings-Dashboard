"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { DynamicColumnsProps, Column } from "@/interfaces/GeneralTable/DynamicColumnsProps";

const DynamicColumns: React.FC<DynamicColumnsProps> = ({
  data,
  className,
  onSort,
  sortConfig
}) => {
  const { t } = useTranslation();

  return (
    <>
      {data.map((column: Column) => {
        const isActive = sortConfig?.key === column.key;

        return (
          <th
            key={column.key}
            suppressHydrationWarning
            className={`px-4 py-4 text-center font-semibold text-dark dark:text-white ${column.className || ""} ${className || ""}`}
          >
            <div
              suppressHydrationWarning
              className={`flex items-center justify-center gap-2 ${
                column.sortable ? "cursor-pointer select-none" : ""
              }`}
              onClick={() => column.sortable && onSort?.(column.key)}
            >
              <span suppressHydrationWarning>{t(column.label)}</span>

              {column.sortable && (
                <div className="flex flex-col leading-none">
                  <svg
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="currentColor"
                    className={`${
                      isActive && sortConfig?.direction === "asc"
                        ? "text-black dark:text-white"
                        : "text-gray-400"
                    }`}
                  >
                    <path d="M5 0L0 5H10L5 0Z" />
                  </svg>
                  <svg
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="currentColor"
                    className={`mt-1 rotate-180 ${
                      isActive && sortConfig?.direction === "desc"
                        ? "text-black dark:text-white"
                        : "text-gray-400"
                    }`}
                  >
                    <path d="M5 0L0 5H10L5 0Z" />
                  </svg>
                </div>
              )}
            </div>
          </th>
        );
      })}
    </>
  );
};

export default DynamicColumns;