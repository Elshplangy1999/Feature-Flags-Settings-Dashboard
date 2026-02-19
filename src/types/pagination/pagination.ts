export interface PaginationData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export type SystemPaginationProps = {
  currentPage: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  elementsPerPage?: number;
  small?: boolean;
};
