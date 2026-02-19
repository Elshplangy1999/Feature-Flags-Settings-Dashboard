"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslation } from "@/hooks/useTranslation";
import { Filter } from "lucide-react";
import FeatureFlagTable from "@/modules/feature-flags/components/FeatureFlagTable";
import FeatureFlagFilterModal from "@/modules/feature-flags/components/FeatureFlagFilterModal";
import {
  fetchFeatureFlags,
  setActiveFilters,
  clearFilters,
  clearSearchResults,
} from "@/modules/feature-flags/store/slices/indexFeatureFlagsSlice";
import { handleChangeFeatureFlagStatusThunk } from "@/modules/feature-flags/store/slices/changeFeatureFlagStatusSlice";
import {
  FeatureFlag,
  FeatureFlagFilters,
} from "@/modules/feature-flags/interfaces/featureFlags";
import SystemPagination from "@/components/SystemPagination/SystemPagination";
import { useToast } from "@/components/Notify/ToastContext";
import PopupModal from "@/components/PopupModal/PopupModal";
import HandleReducer from "@/components/HandleReducer/HandleReducer";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { handleSearch } from "@/services/handleSearch";
import FeatureFlagToolbar from "@/modules/feature-flags/components/FeatureFlagToolbar";

const FeatureFlags = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();
  const isClearing = useRef(false);

  /**
   * --------------------------------------------------
   *  Reducers
   * --------------------------------------------------
   */
  const {
    flags,
    loading,
    error,
    pagination,
    searchResults,
    isFilterActive,
    activeFilters,
    searchLoading,
    searchPagination,
  } = useSelector((state: RootState) => state.indexFeatureFlags);

  /**
   * --------------------------------------------------
   *  Variables and State
   * --------------------------------------------------
   */
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(
    new Set(),
  );
  const [quickEnvironment, setQuickEnvironment] = useState("");
  const [quickStatus, setQuickStatus] = useState("");

  const activePagination = isFilterActive ? searchPagination : pagination;

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const buildFilterData = (
    filters: FeatureFlagFilters,
    search: string,
  ): Record<string, string> => {
    const data: Record<string, string> = {};
    if (filters.environment) data.environment = filters.environment;
    if (filters.status) data.status = filters.status;
    if (search.trim()) data.name_like = search.trim();
    return data;
  };

  const fetchWithFilters = (
    searchValue: string,
    filters: FeatureFlagFilters,
    page: number = 1,
  ) => {
    const data = buildFilterData(filters, searchValue);
    dispatch(
      fetchFeatureFlags({
        page,
        data,
        perPage: elementsPerPage,
        isFiltered: true,
      }),
    );
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (isFilterActive) setCurrentPage(1);

    if (!term.trim()) {
      const hasFilters = Object.values(activeFilters).some((v) => v !== "");
      if (!hasFilters) {
        isClearing.current = true;
        dispatch(clearSearchResults());
        dispatch(clearFilters());
        setFetchTrigger((prev) => prev + 1);
      }
    }
  };

  const handleBackendSearch = (term: string) => {
    if (!term.trim()) {
      const hasModalFilters =
        activeFilters.environment !== "" || activeFilters.status !== "";
      if (!hasModalFilters) {
        isClearing.current = true;
        dispatch(clearSearchResults());
        dispatch(clearFilters());
      } else {
        const newFilters = { ...activeFilters, search: "" };
        dispatch(setActiveFilters(newFilters));
        fetchWithFilters("", newFilters, 1);
      }
      return;
    }
    setCurrentPage(1);
    const newFilters = { ...activeFilters, search: term };
    dispatch(setActiveFilters(newFilters));
    fetchWithFilters(term, activeFilters, 1);
  };

  const handleResetBackendSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    const hasModalFilters =
      activeFilters.environment !== "" || activeFilters.status !== "";
    if (!hasModalFilters) {
      isClearing.current = true;
      dispatch(clearSearchResults());
      dispatch(clearFilters());
    } else {
      const newFilters = { ...activeFilters, search: "" };
      dispatch(setActiveFilters(newFilters));
      fetchWithFilters("", newFilters, 1);
    }
  };

  const handleApplyFilter = (newFilters: FeatureFlagFilters) => {
    const hasActive = Object.values(newFilters).some((v) => v !== "");
    if (hasActive || searchTerm.trim()) {
      dispatch(setActiveFilters(newFilters));
      fetchWithFilters(searchTerm, newFilters, 1);
    } else {
      isClearing.current = true;
      setSearchTerm("");
      dispatch(clearFilters());
      dispatch(clearSearchResults());
    }
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (isFilterActive) fetchWithFilters(searchTerm, activeFilters, page);
  };

  const handlePerPageChange = (perPage: number) => {
    setElementsPerPage(perPage);
    setCurrentPage(1);
    if (isFilterActive) fetchWithFilters(searchTerm, activeFilters, 1);
  };

  const handleToggleFlag = (flag: FeatureFlag) => {
    dispatch(handleChangeFeatureFlagStatusThunk(flag, t, showToast));
  };

  /**
   * --------------------------------------------------
   *  Mutations and Effects
   * --------------------------------------------------
   */

  const baseDisplayData = useMemo(
    () => (isFilterActive ? (searchResults ?? []) : (flags ?? [])),
    [flags, searchResults, isFilterActive],
  );

  const activeFiltersCount = useMemo(
    () =>
      [activeFilters.environment, activeFilters.status].filter(
        (value) => value !== "" && value !== undefined,
      ).length,
    [activeFilters.environment, activeFilters.status],
  );

  const displayData = useMemo(() => {
    let data = baseDisplayData;

    if (!isFilterActive && searchTerm.trim()) {
      data = handleSearch({
        items: Array.isArray(data) ? data : [],
        searchTerm,
        searchFields: [
          { key: "name", type: "text" },
          { key: "environment", type: "text" },
          { key: "status", type: "text" },
          { key: "created_at", type: "date" },
        ],
      });
    }

    if (quickEnvironment)
      data = data.filter((f) => f.environment === quickEnvironment);
    if (quickStatus) data = data.filter((f) => f.status === quickStatus);

    return data;
  }, [
    baseDisplayData,
    isFilterActive,
    searchTerm,
    quickEnvironment,
    quickStatus,
  ]);

  useEffect(() => {
    if (isClearing.current) {
      isClearing.current = false;
      return;
    }
    if (!isFilterActive) {
      dispatch(
        fetchFeatureFlags({
          page: currentPage,
          perPage: elementsPerPage,
          isFiltered: false,
        }),
      );
    }
  }, [dispatch, currentPage, elementsPerPage, isFilterActive, fetchTrigger]);

  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
      dispatch(clearFilters());
    };
  }, [dispatch]);

  /**
   * --------------------------------------------------
   *  Conditional Rendering
   * --------------------------------------------------
   */
  if (error && loading === "failed") {
    return (
      <HandleReducer
        error={error}
        message={t("Loading feature flags data...")}
      />
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Feature Flags"} />

      <div className="w-full bg-white px-2 lg:px-7 pb-5 pt-4 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <FeatureFlagToolbar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onBackendSearch={handleBackendSearch}
          onResetBackendSearch={handleResetBackendSearch}
          backendSearchLoading={searchLoading === "pending"}
          quickEnvironment={quickEnvironment}
          onQuickEnvironmentChange={setQuickEnvironment}
          quickStatus={quickStatus}
          onQuickStatusChange={setQuickStatus}
          activeFiltersCount={activeFiltersCount}
          onFilterOpen={() => setIsFilterModalOpen(true)}
        />

        {/* Table */}
        {loading === "pending" && !isFilterActive ? (
          <HandleReducer
            loading={loading}
            message={t("Loading feature flags data...")}
            className="h-100"
          />
        ) : (
          <FeatureFlagTable
            flags={displayData}
            onToggle={handleToggleFlag}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}

        {/* Pagination */}
        <div className="mt-4">
          <SystemPagination
            currentPage={activePagination?.current_page || 1}
            pageCount={activePagination?.last_page || 1}
            totalItems={activePagination?.total || 0}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            elementsPerPage={elementsPerPage}
          />
        </div>
      </div>

      <PopupModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title={t("Filter Feature Flags")}
        icon={Filter}
      >
        <FeatureFlagFilterModal
          onApplyFilter={handleApplyFilter}
          currentFilters={activeFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />
      </PopupModal>
    </DefaultLayout>
  );
};

export default FeatureFlags;
