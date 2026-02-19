"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import useIsRTL from "@/hooks/useIsRTL";
import ClickOutside from "./ClickOutside";
import { SidebarProps } from "@/interfaces/Sidebar/SidebarProps";
import SidebarToggleButton from "../SidebarToggleButton/SidebarToggleButton";
import { Flag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHasMounted } from "@/hooks/Usehasmounted";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isRTL = useIsRTL();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useHasMounted();
  const menuItems = [
    {
      icon: <Flag className="h-5 w-5" />,
      label: t("Feature Flags"),
      route: "/",
    },
  ];

  /**
   * --------------------------------------------------
   *  Methods
   * --------------------------------------------------
   */
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  /**
   * --------------------------------------------------
   *  Mutations & Effects
   * --------------------------------------------------
   */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ClickOutside onClick={() => false}>
      <aside
        className={`scrollbar-thin fixed top-0 z-[9999] flex h-screen flex-col overflow-y-auto border-r border-gray-200/50 bg-white backdrop-blur-xl duration-300 ease-in-out dark:border-gray-700/50 dark:bg-gray-900/95 lg:static lg:translate-x-0 ${
          isRTL
            ? `right-0 ${sidebarOpen ? "w-72 translate-x-0 shadow-sm" : "w-26 translate-x-full"}`
            : `left-0 ${sidebarOpen ? "w-72 translate-x-0 shadow-sm" : "w-26 -translate-x-full"}`
        } ${scrolled ? "shadow-sm" : ""}`}
      >
        {!sidebarOpen && (
          <div
            className={`flex ${isRTL ? "" : "rotate-180"} items-center justify-center p-4`}
          >
            <button
              onClick={toggleSidebar}
              className="group flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/50 bg-white/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg dark:border-gray-600/50 dark:bg-gray-800/70 dark:hover:bg-gray-700"
            >
              <svg
                className="h-4 w-4 text-gray-600 transition-all duration-300 group-hover:text-green-600 dark:text-gray-300 dark:group-hover:text-green-400"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex flex-1 flex-col">
          {sidebarOpen && (
            <div className="border-b border-gray-200/30 bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-5 dark:border-gray-700/30 dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                    <span className="text-sm font-semibold text-white">AD</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-green-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-sm font-semibold text-gray-900 dark:text-white"
                    suppressHydrationWarning
                  >
                    {mounted ? t("Admin User") : "Admin User"}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    admin@company.com
                  </p>
                </div>

                <SidebarToggleButton
                  isOpen={sidebarOpen}
                  onClick={toggleSidebar}
                />
              </div>
            </div>
          )}

          <nav className="scrollbar-thin dark:scrollbar-thumb-gray-600 scrollbar-track-transparent flex-1 space-y-8 overflow-y-auto overflow-x-hidden bg-white px-4 py-6 dark:bg-gray-800">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.route;
                return (
                  <li key={index}>
                    <Link
                      href={item.route}
                      onClick={() => {
                        if (window.innerWidth < 1024) closeSidebar();
                      }}
                      className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span
                        className={isActive ? "text-white" : "text-gray-500"}
                      >
                        {item.icon}
                      </span>
                      {sidebarOpen && (
                        <span suppressHydrationWarning>
                          {mounted ? item.label : "Feature Flags"}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
