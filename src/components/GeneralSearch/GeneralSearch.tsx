import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "@/hooks/useTranslation";
import { AppDispatch } from "@/store/store";
import useIsRTL from "@/hooks/useIsRTL";
import { GeneralSearchProps } from "@/interfaces/GeneralSearch/GeneralSearchProps";
import { openSearchModal } from "@/modules/general-search/store/slices/globalSearchModalSlice";

const GeneralSearch: React.FC<GeneralSearchProps> = ({
  searchTerm = "",
  onSearchChange,
  enableModal = false,
  onModalOpen,
  placeholder,
  className = "",
  customWidth = "",
  isHeader,
  customClassName = "",
  onBackendSearch,
  onResetBackendSearch,
  backendSearchLoading = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isRTL = useIsRTL();

  /**
   * --------------------------------------------------
   *  Variables & State
   * --------------------------------------------------
   */
  const [isFocused, setIsFocused] = useState(false);
  const [isBackendSearchActive, setIsBackendSearchActive] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const defaultPlaceholder = enableModal
    ? t("Search anything...")
    : isBackendSearchActive
      ? t("Search with backend...")
      : t("Search here...");
  const finalPlaceholder = placeholder || defaultPlaceholder;

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const handleClick = () => {
    if (enableModal) {
      dispatch(openSearchModal());
      onModalOpen?.();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);

    if (!enableModal) {
      if (isBackendSearchActive) {
        if (onBackendSearch) {
          onBackendSearch(value);
        }
      } else {
        onSearchChange?.(value);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (enableModal) {
      handleClick();
    }
  };

  const handleSearchButtonClick = async () => {
    if (!isBackendSearchActive && onBackendSearch) {
      setIsBackendSearchActive(true);
      if (localSearchTerm.trim()) {
        await onBackendSearch(localSearchTerm);
      }
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isBackendSearchActive && onBackendSearch) {
      await onBackendSearch(localSearchTerm);
    }
  };

  const handleResetToFrontend = () => {
    setIsBackendSearchActive(false);
    setLocalSearchTerm("");

    if (onResetBackendSearch) {
      onResetBackendSearch();
    } else {
      onSearchChange?.("");
    }
  };

  /**
   * --------------------------------------------------
   *  Mutations & Effects
   * --------------------------------------------------
   */
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <div
        className={`${isHeader ? "mt-0" : ""} w-full ${
          enableModal ? "cursor-pointer" : ""
        } ${className}`}
        onClick={enableModal ? handleClick : undefined}
      >
        <div
          className={`relative ${
            customWidth
              ? customWidth
              : enableModal
                ? " w-full"
                : `w-full ${customClassName ? `sm:!${customClassName}` : "sm:w-103.5"}`
          } group ${isFocused ? "scale-[1.02]" : ""} transition-transform duration-200`}
        >
          <div className={`relative flex items-center ${customClassName}`}>
            {/* Search Icon */}
            <div
              className={`absolute ${
                isRTL ? "right-4" : "left-4"
              } z-10 flex items-center justify-center`}
            >
              <div className="relative">
                <svg
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isBackendSearchActive
                      ? "text-primary dark:text-primary"
                      : "text-gray-500 group-hover:text-primary dark:text-gray-400 dark:group-hover:text-primary"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-100" />
              </div>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder={finalPlaceholder}
              value={localSearchTerm}
              readOnly={enableModal}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              className={`
                h-11 w-full text-base ${isRTL ? "pl-4 pr-8 lg:pr-20" : "pl-12 pr-20"}
                rounded-xl border ${
                  isBackendSearchActive
                    ? "border-primary/60 bg-linear-to-r from-primary/5 to-primary/10"
                    : "border-gray-200/60 bg-linear-to-r from-gray-50 to-gray-100/80"
                }
                text-gray-700 placeholder-gray-500
                backdrop-blur-sm
                transition-all duration-300
                ease-out hover:border-primary/40
                hover:bg-linear-to-r
                hover:from-white hover:to-gray-50 hover:shadow-lg
                hover:shadow-primary/10 focus:border-primary/60 focus:outline-none
                focus:ring-2 focus:ring-primary/20 group-hover:scale-[1.01]
                dark:border-gray-700/60 dark:from-gray-800/50
                dark:to-gray-700/50 dark:text-gray-300 dark:placeholder-gray-400 dark:hover:from-gray-700/70
                dark:hover:to-gray-600/70
                ${isFocused ? "border-primary shadow-lg shadow-primary/20" : ""}
                ${enableModal ? "cursor-pointer" : ""}
                ${customClassName}
              `}
            />

            {/* Action Buttons */}
            {!enableModal && onBackendSearch && (
              <div
                className={`absolute ${
                  isRTL ? "left-3" : "right-3"
                } flex items-center gap-1`}
              >
                {isBackendSearchActive && (
                  <button
                    onClick={handleResetToFrontend}
                    className="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                    title={t("Switch to frontend search")}
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                <button
                  onClick={handleSearchButtonClick}
                  disabled={backendSearchLoading || isBackendSearchActive}
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-all duration-200 ${
                    isBackendSearchActive
                      ? "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20"
                      : "border border-gray-200 bg-gray-100 text-gray-600 hover:border-primary/30 hover:bg-primary/10 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary/20"
                  } ${backendSearchLoading || isBackendSearchActive ? "cursor-not-allowed opacity-50" : ""}`}
                  title={
                    isBackendSearchActive
                      ? t("Backend search active")
                      : t("Enable backend search")
                  }
                >
                  {backendSearchLoading ? (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      <svg
                        className="mr-1 h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            isBackendSearchActive
                              ? "M13 10V3L4 14h7v7l9-11h-7z"
                              : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          }
                        />
                      </svg>
                      {t("API")}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Keyboard Shortcut Hint */}
            {enableModal && (
              <div
                className={`absolute ${
                  isRTL ? "left-3" : "right-3"
                } hidden items-center gap-1 md:flex`}
              >
                <kbd className="inline-flex items-center rounded border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-primary/20">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 -z-10 rounded-xl bg-linear-to-r opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 ${
          isBackendSearchActive
            ? "from-primary/30 via-primary/20 to-primary/30"
            : "from-primary/20 via-purple-500/20 to-primary/20"
        }`}
      />
    </>
  );
};

export default GeneralSearch;
