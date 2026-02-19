import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enMessages from "@/messages/en";
import arMessages from "@/messages/ar";

const resources = {
  en: {
    translation: enMessages,
  },
  ar: {
    translation: arMessages,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng:
      typeof window !== "undefined"
        ? localStorage.getItem("language") || "en"
        : "en",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
