"use client";

import { useHasMounted } from "@/hooks/Usehasmounted";
import { useTranslation } from "@/hooks/useTranslation";
import GeneralSearch from "@/components/GeneralSearch/GeneralSearch";
import FilterButton from "@/components/FilterButton/FilterButton";
import {
  environmentOptions,
  statusOptions,
} from "@/modules/feature-flags/constants/environmentOptions";
import { FeatureFlagToolbarProps } from "../interfaces/featureFlags";

const FeatureFlagToolbar = ({
  searchTerm,
  onSearchChange,
  onBackendSearch,
  onResetBackendSearch,
  backendSearchLoading,
  quickEnvironment,
  onQuickEnvironmentChange,
  quickStatus,
  onQuickStatusChange,
  activeFiltersCount,
  onFilterOpen,
}: FeatureFlagToolbarProps) => {
  const { t } = useTranslation();
  const mounted = useHasMounted();

  return (
    <div className="mb-4 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
      {/* Filters and controls */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:flex-1 lg:justify-end lg:gap-4">
        <GeneralSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder={
            mounted ? t("Search feature flags...") : "Search feature flags..."
          }
          onBackendSearch={onBackendSearch}
          onResetBackendSearch={onResetBackendSearch}
          backendSearchLoading={backendSearchLoading}
        />
        {/* Dropdown selects */}
        <div className="flex flex-1 gap-2 sm:flex-none">
          <select
            value={quickEnvironment}
            onChange={(e) => onQuickEnvironmentChange(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 focus:border-primary focus:outline-none hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:flex-none sm:w-40"
          >
            <option value="">
              {mounted ? t("All Environments") : "All Environments"}
            </option>
            {environmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {mounted ? t(opt.label) : opt.label}
              </option>
            ))}
          </select>

          <select
            value={quickStatus}
            onChange={(e) => onQuickStatusChange(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 focus:border-primary focus:outline-none hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 sm:flex-none sm:w-36"
          >
            <option value="">
              {mounted ? t("All Statuses") : "All Statuses"}
            </option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {mounted ? t(opt.label) : opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter button */}
        <div className="sm:flex-none">
          <FilterButton
            activeFiltersCount={activeFiltersCount}
            onClick={onFilterOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagToolbar;