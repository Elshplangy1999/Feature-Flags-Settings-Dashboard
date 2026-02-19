import { ReactNode } from "react";
import { SortConfig } from "./GeneralTableProps";

export interface DynamicColumnsProps {
  data: Column[];
  className?: string;
  onSort?: (key: string) => void;
  sortConfig?: SortConfig | null;
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
}

export interface CellData {
  value?: string | number | boolean | null;
  className?: string;
  options?: Record<string, unknown>;
  element?: ReactNode;
}

export interface DynamicTDProps {
  data: CellData[];
}