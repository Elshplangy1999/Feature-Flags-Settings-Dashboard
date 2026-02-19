"use client";

import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { languages } from "@/constants/languages";
import { useHasMounted } from "@/hooks/Usehasmounted";

export const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useTranslation();

  /**
   * --------------------------------------------------
   * Variables
   * --------------------------------------------------
   */
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const mounted = useHasMounted();

  const currentLang = languages.find((lang) => lang.code === language);

  /**
   * --------------------------------------------------
   * Conditional Rendering
   * --------------------------------------------------
   */
  if (!mounted) {
    return (
      <div className="h-11 w-28 rounded-2xl border border-gray-200/60 bg-white/80 animate-pulse dark:border-gray-700/60 dark:bg-gray-800/80" />
    );
  }

  return (
    <div className="relative">
      {/* Ultra-Enhanced Trigger Button */}
      <button
        dir="ltr"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-11 items-center justify-center gap-2.5 rounded-2xl border border-gray-200/60 bg-white/80 px-4 py-2.5 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:bg-linear-to-br hover:from-primary/10 hover:via-purple-500/5 hover:to-pink-500/10 hover:shadow-2xl hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-white active:scale-95 dark:border-gray-700/60 dark:bg-gray-800/80 dark:hover:border-primary/50 dark:focus:ring-offset-gray-900"
      >
        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 rounded-2xl bg-linear-to-r ${currentLang?.gradient} opacity-0 transition-all duration-500 ${isOpen ? "animate-pulse opacity-20" : "group-hover:opacity-10"}`}
        />

        {/* Flag with Advanced Animation */}
        <div className="relative">
          <span className="text-lg filter transition-all duration-300 group-hover:rotate-12 group-hover:scale-125 group-hover:drop-shadow-lg">
            {currentLang?.flag}
          </span>

          {/* Flag glow effect */}
          <div className="absolute inset-0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50">
            <span className="text-lg">{currentLang?.flag}</span>
          </div>
        </div>

        {/* Enhanced Language Info */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-bold leading-none text-gray-900 transition-all duration-300 group-hover:text-primary dark:text-white">
            {currentLang?.name}
          </span>
          <span className="mt-0.5 text-xs leading-none text-gray-500 transition-all duration-300 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
            {currentLang?.nativeName.slice(0, 6)}...
          </span>
        </div>

        {/* Ultra-Enhanced Chevron */}
        <div className="relative">
          <svg
            className={`h-4 w-4 text-gray-500 transition-all duration-500 group-hover:text-primary dark:text-gray-400 ${
              isOpen ? "rotate-180 scale-125 text-primary" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {/* Chevron glow */}
          <div className="absolute inset-0 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60">
            <svg
              className={`h-4 w-4 text-primary ${isOpen ? "rotate-180 scale-125" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Multi-layer glow effects */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60" />
        <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-primary/10 to-purple-500/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />

        {/* Ripple effect on click */}
        <div className="absolute inset-0 scale-0 rounded-2xl bg-linear-to-r from-primary/30 via-purple-500/30 to-pink-500/30 opacity-0 transition-all duration-300 group-active:scale-150 group-active:opacity-100" />
      </button>

      {/* Ultra-Modern Dropdown Menu */}
      {isOpen && (
        <>
          {/* Enhanced Backdrop with Gradient */}
          <div
            className="fixed z-10 bg-white bg-linear-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-md transition-all duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Premium Dropdown Container */}
          <div className="animate-in fade-in slide-in-from-top-4 zoom-in-95 absolute -right-6 z-20 mt-3 w-64 origin-top-right duration-500">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-gray-700/50 dark:bg-gray-900 dark:shadow-black/40">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="animate-float-1 absolute -right-6 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-linear-to-bl from-primary/20 to-transparent" />
                <div className="animate-float-2 absolute bottom-0 left-0 h-20 w-20 -translate-x-6 translate-y-6 rounded-full bg-linear-to-tr from-purple-500/20 to-transparent" />
              </div>

              {/* Header Section */}
              <div className="relative z-10 border-b border-gray-200/50 p-4 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-sm font-bold text-transparent dark:from-white dark:to-gray-300">
                      {t("Language")}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {t("Choose your language")}
                    </p>
                  </div>

                  {/* Language count indicator */}
                  <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="text-xs font-medium text-primary">
                      {languages.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages List */}
              <div className="relative z-10 space-y-1 p-2">
                {languages.map((lang, index) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHoveredLang(lang.code)}
                    onMouseLeave={() => setHoveredLang(null)}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-all duration-300 ${
                      language === lang.code
                        ? "scale-105 border border-primary/20 bg-linear-to-r from-primary/15 to-primary/10 text-primary shadow-lg shadow-primary/10"
                        : "hover:scale-102 text-gray-700 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-xl hover:shadow-black/5 dark:text-gray-300 dark:hover:bg-gray-800/80"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Background Pattern */}
                    <div
                      className={`absolute inset-0 ${lang.bgPattern} opacity-0 transition-all duration-500 ${hoveredLang === lang.code ? "opacity-100" : ""}`}
                    />

                    {/* Selection indicator */}
                    {language === lang.code && (
                      <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-primary to-purple-500" />
                    )}

                    {/* Flag with Enhanced Animation */}
                    <div className="relative shrink-0">
                      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 dark:bg-gray-800">
                        <span className="text-2xl filter transition-all duration-300 group-hover:drop-shadow-lg">
                          {lang.flag}
                        </span>

                        {/* Flag reflection effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Selection pulse */}
                      {language === lang.code && (
                        <div className="absolute inset-0 animate-pulse rounded-xl border-2 border-primary/50" />
                      )}
                    </div>

                    {/* Language Information */}
                    <div className="relative z-10 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-sm font-semibold transition-all duration-300">
                            {lang.fullName}
                          </span>
                          <span className="block text-xs opacity-70 transition-all duration-300">
                            {lang.nativeName}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono rounded-md bg-gray-200/80 px-2 py-0.5 text-xs font-bold text-gray-600 dark:bg-gray-700/80 dark:text-gray-300">
                            {lang.name}
                          </span>

                          {/* Active indicator */}
                          {language === lang.code && (
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                              <span className="text-xs font-medium text-primary">
                                {t("Active")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-linear-to-r ${lang.gradient} opacity-0 transition-all duration-300 ${hoveredLang === lang.code ? "opacity-10" : ""}`}
                    />

                    {/* Magnetic hover effect */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </button>
                ))}
              </div>

              {/* Bottom gradient decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
