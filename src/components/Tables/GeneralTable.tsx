"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SwitchStateIcon } from "../../Icons/SwitchStateIcon";
import {
  GeneralTableProps,
  SortConfig,
} from "@/interfaces/GeneralTable/GeneralTableProps";
import DynamicColumns from "./DynamicColumns";
import TableNoResultsFound from "./TableNoResultsFound";
import DynamicTD from "./DynamicTD";
import { getSortedData, handleSortService } from "@/utils/handleSort/handleSort";

const GeneralTable = <T extends Record<string, unknown>>({
  data,
  columns,
  renderRow,
  onView,
  onChangeStatus,
  customActions = [],
  enableSort = true,
  getItemId = (item) => item.id as string | number,
}: GeneralTableProps<T>) => {
  const { t } = useTranslation();

  /**
   * --------------------------------------------------
   *  Variables & State
   * --------------------------------------------------
   */
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const handleSort = (key: string) => {
    if (enableSort) {
      handleSortService(key, sortConfig, setSortConfig);
    }
  };

  // Calculate colspan for empty state
  const totalColumns =
    columns.length +
    (onView || onChangeStatus || customActions.length > 0 ? 1 : 0);

  /**
   * --------------------------------------------------
   *  Mutations & Effects
   * --------------------------------------------------
   */
  const sortedData = useMemo(
    () => (enableSort ? getSortedData(data, sortConfig) : data),
    [data, sortConfig, enableSort],
  );

  return (
    <div className="bg-white p-1 md:p-2 dark:bg-gray-dark sm:pb-7.5">
      <div className="max-w-full overflow-x-auto shadow-1 dark:shadow-card">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b text-left dark:bg-dark-2">
              {/* Dynamic Columns */}
              <DynamicColumns
                data={columns}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {/* Actions Column */}
              {(onView || onChangeStatus || customActions.length > 0) && (
                <th className="px-4 py-4 text-center font-semibold text-dark dark:text-white">
                  {t("Actions")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={totalColumns} className="p-5 text-center">
                  <TableNoResultsFound />
                </td>
              </tr>
            ) : (
              sortedData.map((item) => {
                const itemId = getItemId(item);
                const rowData = renderRow(item);

                return (
                  <tr key={itemId}>
                    {/* Dynamic Row Data */}
                    <DynamicTD data={rowData} />

                    {/* Actions */}
                    {(onView || onChangeStatus || customActions.length > 0) && (
                      <td className="border-b border-[#eee] px-4 py-4 dark:border-dark-3">
                        <div className="flex justify-center gap-2">
                          {/* Status Toggle Action */}
                          {onChangeStatus && (
                            <button
                              className="hover:text-primary"
                              onClick={() => onChangeStatus(item)}
                              title={t("Toggle Status")}
                            >
                              <SwitchStateIcon />
                            </button>
                          )}

                          {/* Custom Actions */}
                          {customActions.map((action, index) => (
                            <button
                              key={index}
                              className={
                                typeof action.className === "function"
                                  ? action.className(item)
                                  : (action.className ?? "hover:text-primary")
                              }
                              onClick={() => action.onClick(item)}
                              title={action.title}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralTable;
