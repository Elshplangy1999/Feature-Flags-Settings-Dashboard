import { NextArrowIcon, PrevArrowIcon } from "@/Icons/ArrowIcon";
import { SystemPaginationProps } from "@/types/pagination/pagination";
import { useTranslation } from "@/hooks/useTranslation";
import React from "react";

const SystemPagination: React.FC<SystemPaginationProps> = ({
  currentPage,
  pageCount,
  totalItems,
  onPageChange,
  onPerPageChange,
  elementsPerPage,
}) => {
  const { t } = useTranslation();

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const getPageNumbers = () => {
    const pages = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(pageCount - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= pageCount - 1) {
        start = pageCount - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < pageCount - 1) {
        pages.push("...");
      }

      pages.push(pageCount);
    }

    return pages;
  };

  /**
   * --------------------------------------------------
   *  Variables
   * --------------------------------------------------
   */
  const pageNumbers = getPageNumbers();
  const pageElementsNumbers = [10, 20, 40, 60, 80, 100, 200, 400, 600, 800];

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="p-1 sm:p-6 xl:p-7.5">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm font-medium text-dark dark:text-white">
            {t("Showing page")} {currentPage} {t("of")} {pageCount} (
            {totalItems} {t("items")})
          </p>

          <div className="flex items-center gap-4">
            <nav dir="ltr">
              <ul className="inline-flex flex-wrap items-center gap-2 rounded-[5px] bg-white p-2.5 shadow-card-5 dark:bg-dark-2 dark:shadow-card">
                {elementsPerPage && (
                  <li className="flex items-center">
                    <select
                      className="rounded-[3px] border border-stroke bg-transparent p-1 text-sm outline-none dark:border-dark-3 dark:bg-dark-2"
                      value={elementsPerPage}
                      onChange={(e) =>
                        onPerPageChange &&
                        onPerPageChange(Number(e.target.value))
                      }
                    >
                      {pageElementsNumbers.map((pageNum) => (
                        <option key={pageNum} value={pageNum}>
                          {pageNum}
                        </option>
                      ))}
                    </select>
                  </li>
                )}

                <li>
                  <button
                    className={`flex items-center justify-center rounded-[3px] bg-[#EDEFF1] px-2.5 py-1 text-xs font-medium text-dark hover:bg-primary hover:text-white dark:bg-dark-4 dark:text-white dark:hover:bg-primary dark:hover:text-white ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <PrevArrowIcon />
                    <span className="ml-1">{t("Previous")}</span>
                  </button>
                </li>

                {pageNumbers.map((pageNum, idx) => {
                  if (pageNum === "...") {
                    return (
                      <li key={`ellipsis-${idx}`}>
                        <span className="flex items-center justify-center px-1.75">
                          ...
                        </span>
                      </li>
                    );
                  }

                  return (
                    <li key={`page-${pageNum}`}>
                      <button
                        onClick={() => onPageChange(pageNum as number)}
                        className={`flex items-center justify-center rounded-[3px] px-1.5 font-medium ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "hover:bg-primary hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}

                <li>
                  <button
                    className={`flex items-center justify-center rounded-[3px] bg-[#EDEFF1] px-2.5 py-1 text-xs font-medium text-dark hover:bg-primary hover:text-white dark:bg-dark-4 dark:text-white dark:hover:bg-primary dark:hover:text-white ${
                      currentPage === pageCount
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={() =>
                      onPageChange(Math.min(currentPage + 1, pageCount))
                    }
                    disabled={currentPage === pageCount}
                  >
                    <span className="mr-1">{t("Next")}</span>
                    <NextArrowIcon />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPagination;
