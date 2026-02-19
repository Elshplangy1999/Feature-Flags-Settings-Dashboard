import { FeatureFlagState } from "../interfaces/FeatureFlag";

export const initialFeatureFlagState: FeatureFlagState = {
  flags: [],
  loading: "idle",
  error: null,
  pagination: {
    current_page: 1,
    from: 0,
    last_page: 1,
    per_page: 10,
    to: 0,
    total: 0,
  },
  activeFilters: {
    environment: "",
    status: "",
    search: "",
  },
  isFilterActive: false,
  searchResults: [],
  searchPagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  },
  searchLoading: "idle",
};
