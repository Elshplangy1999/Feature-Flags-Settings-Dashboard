import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { initialFeatureFlagState } from "../initials/featureFlags";
import { FeatureFlagFilters, FeatureFlagsResponse } from "../../interfaces/featureFlags";
import { indexFeatureFlags } from "../../services/indexFeatureFlagsService";

export const fetchFeatureFlags = createAsyncThunk<
  FeatureFlagsResponse & { isFiltered?: boolean },
  { page?: number; data?: Record<string, unknown>; perPage?: number; isFiltered?: boolean }
>(
  "featureFlags/fetchFeatureFlags",
  async ({ page = 1, data, perPage = 10, isFiltered = false }, { rejectWithValue }) => {
    try {
      const response = await indexFeatureFlags(page, data, perPage);
      return { ...response, isFiltered };
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error?.response?.data?.message ?? "Failed to fetch feature flags",
      );
    }
  },
);

const indexFeatureFlagsSlice = createSlice({
  name: "indexFeatureFlags",
  initialState: initialFeatureFlagState,
  reducers: {
    changeFeatureFlagStatusStatic: (
      state,
      action: PayloadAction<{ id: number | string; status: "enabled" | "disabled" }>,
    ) => {
      const flag = state.flags.find((f) => f.id === action.payload.id);
      if (flag) flag.status = action.payload.status;
      const searchFlag = state.searchResults.find((f) => f.id === action.payload.id);
      if (searchFlag) searchFlag.status = action.payload.status;
    },
    setActiveFilters: (state, action: PayloadAction<FeatureFlagFilters>) => {
      state.activeFilters = action.payload;
      state.isFilterActive = Object.values(action.payload).some((v) => v !== "");
    },
    clearFilters: (state) => {
      state.activeFilters = { environment: "", status: "", search: "" };
      state.isFilterActive = false;
      state.searchResults = [];
      state.searchPagination = undefined;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchLoading = "idle";
      state.isFilterActive = false;
      state.searchPagination = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureFlags.pending, (state, action) => {
        if (action.meta.arg.isFiltered) {
          state.searchLoading = "pending";
        } else {
          state.loading = "pending";
        }
        state.error = null;
      })
      .addCase(fetchFeatureFlags.fulfilled, (state, action) => {
        if (action.payload.isFiltered) {
          state.searchLoading = "succeeded";
          state.searchResults = action.payload.data;
          state.searchPagination = action.payload.pagination ?? state.searchPagination;
        } else {
          state.loading = "succeeded";
          state.flags = action.payload.data;
          state.pagination = action.payload.pagination ?? state.pagination;
        }
      })
      .addCase(fetchFeatureFlags.rejected, (state, action) => {
        state.loading = "failed";
        state.searchLoading = "idle";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? null;
      });
  },
});

export const {
  changeFeatureFlagStatusStatic,
  setActiveFilters,
  clearFilters,
  clearSearchResults,
} = indexFeatureFlagsSlice.actions;

export default indexFeatureFlagsSlice.reducer;