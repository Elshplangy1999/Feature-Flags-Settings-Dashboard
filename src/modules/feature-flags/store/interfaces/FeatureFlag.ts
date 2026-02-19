import { FeatureFlag, FeatureFlagFilters } from "../../interfaces/featureFlags";

export interface FeatureFlagState {
  flags: FeatureFlag[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  pagination: {
    current_page: number;
    from: number;
    last_page: number;
    total: number;
    to: number;
    per_page: number;
  };
  activeFilters: FeatureFlagFilters;
  isFilterActive: boolean;
  searchResults: FeatureFlag[];
  searchPagination?: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
  searchLoading: "idle" | "pending" | "succeeded" | "failed";
}
