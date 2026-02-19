export interface FeatureFlag {
  id: number | string;
  name: string;
  environment: "development" | "staging" | "production";
  status: "enabled" | "disabled";
  created_at: string;
  description?: string;
  last_modified?: string;
  [key: string]: unknown;
}

export interface FeatureFlagsResponse {
  data: FeatureFlag[];
  pagination: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FeatureFlagFilters {
  environment: string;
  status: string;
  search?: string;
}

export interface FeatureFlagTableProps {
  flags: FeatureFlag[];
  onToggle: (flag: FeatureFlag) => void;
  onMultiDelete?: (ids: (string | number)[]) => void;
  selectedItems: Set<string | number>;
  setSelectedItems: (items: Set<string | number>) => void;
}

export interface FeatureFlagFilters {
  environment: string;
  status: string;
}

export interface FeatureFlagFilterModalProps {
  onApplyFilter: (filters: FeatureFlagFilters) => void;
  currentFilters: FeatureFlagFilters;
  onClose: () => void;
}

export interface FeatureFlagToolbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onBackendSearch: (term: string) => void;
  onResetBackendSearch: () => void;
  backendSearchLoading: boolean;
  quickEnvironment: string;
  onQuickEnvironmentChange: (val: string) => void;
  quickStatus: string;
  onQuickStatusChange: (val: string) => void;
  activeFiltersCount: number;
  onFilterOpen: () => void;
}
