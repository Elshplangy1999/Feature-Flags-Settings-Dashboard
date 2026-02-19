"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronRight, Home } from "lucide-react";
import useIsRTL from "@/hooks/useIsRTL";
import { BreadcrumbProps } from "@/interfaces/Breadcrumbs/Breadcrumbs";
import { useHasMounted } from "@/hooks/Usehasmounted";

const Breadcrumb = ({
  pageName,
  secondPageName,
  thirdPageName,
  className = "",
  noDashboard = true,
}: BreadcrumbProps) => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const mounted = useHasMounted();

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {mounted ? t(pageName) : pageName} 
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            {noDashboard && (
              <>
                <li>
                  <Link
                    className="flex items-center gap-1 font-medium hover:text-primary"
                    href="/"
                  >
                    <Home className="h-4 w-4" />
                    {mounted ? t("Dashboard") : "Dashboard"} 
                  </Link>
                </li>
                <li>
                  <ChevronRight
                    className={`h-4 w-4 text-gray-500 ${isRTL ? "rotate-180" : ""}`}
                  />
                </li>
              </>
            )}

            {secondPageName && (
              <>
                <li>
                  <Link
                    className="font-medium hover:text-primary"
                    href={`/${secondPageName.toLowerCase()}`}
                  >
                    {mounted ? t(secondPageName) : secondPageName} 
                  </Link>
                </li>
                <li>
                  <ChevronRight
                    className={`h-4 w-4 text-gray-500 ${isRTL ? "rotate-180" : ""}`}
                  />
                </li>
              </>
            )}

            {thirdPageName && (
              <>
                <li>
                  <Link
                    className="font-medium hover:text-primary"
                    href={`/${thirdPageName.toLowerCase()}`}
                  >
                    {mounted ? t(thirdPageName) : thirdPageName} 
                  </Link>
                </li>
                <li>
                  <ChevronRight
                    className={`h-4 w-4 text-gray-500 ${isRTL ? "rotate-180" : ""}`}
                  />
                </li>
              </>
            )}

            <li className="font-medium text-primary">
              {mounted ? t(pageName) : pageName} 
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
