import { SearchParams } from "@/interfaces/HandleSearch/SearchParams";
import { NestedRecord, NestedValue } from "@/types/handleSearch/handleSearch";
import { formatDateWithTime } from "@/utils/formatDateWithTime/formatDateWithTime";


const generateDateVariants = (rawDate: string | Date): string[] => {
  const date = new Date(rawDate);
  if (isNaN(date.getTime())) return [];

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const hh12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const hh12Str = String(hh12).padStart(2, "0");

  const time24 = `${hh}:${min}:${ss}`;
  const timeShort24 = `${hh}:${min}`;
  const time12 = `${hh12Str}:${min} ${ampm}`;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const fullMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];
  const fullMonthName = fullMonthNames[date.getMonth()];

  return [
    `${monthName} ${Number(dd)}, ${yyyy}, ${time12}`,
    `${monthName} ${Number(dd)}, ${yyyy}`,
    `${fullMonthName} ${Number(dd)}, ${yyyy}, ${time12}`,
    `${fullMonthName} ${Number(dd)}, ${yyyy}`,
    `${yyyy}`,
    `${monthName} ${yyyy}`,
    `${monthName} ${Number(dd)}`,
    `${fullMonthName} ${yyyy}`,
    `${fullMonthName} ${Number(dd)}`,
    `${yyyy}-${mm}-${dd}`,
    `${dd}-${mm}-${yyyy}`,
    `${mm}-${dd}-${yyyy}`,
    `${dd}/${mm}/${yyyy}`,
    `${yyyy}/${mm}/${dd}`,
    `${mm}/${dd}/${yyyy}`,
    `${yyyy}-${mm}-${dd} ${time24}`,
    `${yyyy}-${mm}-${dd} ${timeShort24}`,
    `${dd}-${mm}-${yyyy} ${timeShort24}`,
    `${mm}-${dd}-${yyyy} ${timeShort24}`,
    `${yyyy}-${mm}-${dd} ${time12}`,
    `${dd}-${mm}-${yyyy} ${time12}`,
    `${mm}-${dd}-${yyyy} ${time12}`,
    `${time12}`,
    `${timeShort24}`,
    `${hh12}:${min}`,
    `${ampm}`,
    `${dd} ${monthName}`,
    `${monthName} ${dd}`,
    `${dd}${mm}${yyyy}`,
    `${yyyy}${mm}${dd}`,
  ];
};

const resolveNestedValue = (item: NestedRecord, key: string): NestedValue => {
  const parts = key.split(".");
  let current: NestedValue = item;

  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object" ||
      Array.isArray(current)
    ) {
      return undefined;
    }
    current = (current as NestedRecord)[part];
  }

  return current;
};

export const handleSearch = <T extends NestedRecord>({
  items,
  searchTerm,
  searchFields,
  customSearch,
}: SearchParams<T>): T[] => {
  if (!items || items.length === 0 || searchTerm.trim() === "") {
    return items;
  }

  const searchLower = searchTerm.trim().toLowerCase();

  return items.filter((item) => {
    if (customSearch) {
      return customSearch(item, searchLower);
    }

    return searchFields.some((fieldConfig) => {
      const field =
        typeof fieldConfig === "string"
          ? { key: fieldConfig, type: "text" }
          : fieldConfig;

      const value = resolveNestedValue(item, field.key);

      if (value === undefined || value === null) return false;

      if (field.type === "date") {
        const dateValue = value as string | Date;
        const allVariants = [
          formatDateWithTime(dateValue),
          ...generateDateVariants(dateValue),
        ];
        return allVariants.some((dateStr) =>
          dateStr.toLowerCase().includes(searchLower),
        );
      } else {
        const valueString = String(value).toLowerCase();
        if (
          field.key === "status" &&
          (searchLower === "active" || searchLower === "inactive")
        ) {
          return valueString === searchLower;
        }
        return valueString.includes(searchLower);
      }
    });
  });
};
