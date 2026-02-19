import { ReactNode } from "react";
import { Column } from "./DynamicColumnsProps";

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface RowData {
  value?: string | number | boolean | null;
  element?: ReactNode;
}

export interface CustomAction<T> {
  icon: ReactNode;
  onClick: (item: T) => void;
  title?: string;
  className?: string | ((item: T) => string);
}

export interface GeneralTableProps<T> {
  data: T[];
  columns: Column[];
  renderRow: (item: T) => RowData[];
  onView?: (item: T) => void;
  onChangeStatus?: (item: T) => void;
  customActions?: CustomAction<T>[];
  enableSort?: boolean;
  getItemId?: (item: T) => string | number;
}