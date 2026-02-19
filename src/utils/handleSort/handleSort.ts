import { SortConfig } from "@/interfaces/GeneralTable/GeneralTableProps";
import { getNestedValue } from "./getNestedValue";

export const handleSortService = (
  key: string,
  currentSort: SortConfig | null,
  setSortConfig: (config: SortConfig) => void,
): void => {
  let direction: "asc" | "desc" = "asc";
  if (
    currentSort &&
    currentSort.key === key &&
    currentSort.direction === "asc"
  ) {
    direction = "desc";
  }
  setSortConfig({ key, direction });
};

export const getSortedData = <T extends Record<string, unknown>>(
  data: T[] | undefined | null,
  sortConfig: SortConfig | null,
): T[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  const sortable = [...data];

  if (sortConfig !== null) {
    sortable.sort((a: T, b: T) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const aString = String(aValue);
      const bString = String(bValue);

      return sortConfig.direction === "asc"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }

  return sortable;
};
