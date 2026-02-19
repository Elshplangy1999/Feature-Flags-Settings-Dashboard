"use client";

import { useEffect, useState } from "react";
import useColorMode from "@/hooks/useColorMode";
import useIsRTL from "@/hooks/useIsRTL";

const DarkModeSwitcher = () => {
  const isRTL = useIsRTL();
  const [colorMode, setColorMode] = useColorMode();

  /**
   * --------------------------------------------------
   *  Variables & State
   * --------------------------------------------------
   */
  const [mounted, setMounted] = useState(false);

  /**
   * --------------------------------------------------
   *  Mutations & Effects
   * --------------------------------------------------
   */
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /**
   * --------------------------------------------------
   *  Conditional Rendering
   * --------------------------------------------------
   */
  if (!mounted) return null;

  return (
    <i className="relative">
      <div
        onClick={() => {
          if (typeof setColorMode === "function") {
            const newMode = colorMode === "light" ? "dark" : "light";
            setColorMode(newMode);
            document.documentElement.style.colorScheme = newMode;
          }
        }}
        className="group relative z-10 border border-gray-200/30 flex h-11 w-20 cursor-pointer items-center rounded-xl bg-linear-to-r from-gray-100 to-gray-200 p-1 transition-all duration-300 hover:shadow-lg hover:shadow-gray-300/50 dark:from-gray-800 dark:to-gray-700 dark:hover:shadow-gray-900/50 xsm:w-22"
      >
        {/* Toggle Ball */}
        <div
          className={`absolute z-20 h-9 w-9 rounded-lg bg-white shadow-lg transition-all duration-500 ease-out dark:bg-gray-900 ${
            colorMode === "dark"
              ? isRTL
                ? "-translate-x-10"
                : "translate-x-10 xsm:translate-x-11"
              : isRTL
                ? "translate-x-10 xsm:-translate-x-1"
                : "translate-x-1"
          } group-hover:shadow-xl`}
        >
          <div className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Sun Icon */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center transition-all duration-300">
          <div
            className={`transition-all duration-300 ${
              colorMode === "light"
                ? "scale-110 text-amber-500"
                : "scale-90 text-gray-500"
            }`}
          >
            <svg
              className="h-5 w-5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" strokeWidth="2" />
              <path
                strokeWidth="2"
                d="M12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              />
            </svg>

            {/* Sun rays animation */}
            {colorMode === "light" && (
              <div className="animate-spin-slow absolute inset-0">
                <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-sm" />
              </div>
            )}
          </div>
        </span>

        {/* Moon Icon */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center transition-all duration-300">
          <div
            className={`transition-all duration-300 ${
              colorMode === "dark"
                ? "scale-110 text-blue-400"
                : "scale-90 text-gray-400"
            }`}
          >
            <svg
              className="h-5 w-5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              />
            </svg>

            {/* Moon glow animation */}
            {colorMode === "dark" && (
              <div className="absolute inset-0">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-blue-400/20 blur-sm" />
              </div>
            )}
          </div>
        </span>

        {/* Background gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </i>
  );
};

export default DarkModeSwitcher;
