"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation as useI18nTranslation } from "react-i18next";
import "@/libs/i18n";
import { Language } from "@/types/i18n/i18n";
import { LanguageContextType } from "@/interfaces/LanguageContext/LanguageContextType";
import { getLanguageCookie, setLanguageCookie } from "@/utils/language-cookie";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageState {
  language: Language;
  isRTL: boolean;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t: i18nT, i18n } = useI18nTranslation();

  const [{ language, isRTL }, setLanguageState] = useState<LanguageState>({
    language: "en",
    isRTL: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = getLanguageCookie();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguageState({
      language: savedLang,
      isRTL: savedLang === "ar",
    });
    setMounted(true);

    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLang;
  }, [i18n]);

  // Before mount, always return the English key to match SSR output
  const t = (key: string, options?: Record<string, unknown>): string => {
    if (!mounted) return key;
    return i18nT(key, options) as string;
  };

  const changeLanguage = (lang: Language) => {
    setLanguageState({ language: lang, isRTL: lang === "ar" });
    setLanguageCookie(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};