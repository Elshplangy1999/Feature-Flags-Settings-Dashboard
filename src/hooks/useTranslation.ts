"use client";

import { useLanguage } from "@/context/LanguageContext";

export const useTranslation = () => {
  const { t, language, changeLanguage, isRTL } = useLanguage();

  return {
    t,
    language,
    changeLanguage,
    isRTL,
  };
};
