import { NestedRecord } from "@/types/handleSearch/handleSearch";

export interface SearchParams<T extends NestedRecord = NestedRecord> {
  items: T[];
  searchTerm: string;
  searchFields: (string | { key: string; type: "text" | "date" })[];
  customSearch?: (item: T, searchLower: string) => boolean;
}