import { Language } from "@/types/i18n/i18n";
import Cookies from "js-cookie";

export const getLanguageCookie = (): Language => {
  if (typeof window === "undefined") {
    return "en";
  }
  return (Cookies.get("language") as Language) || "en";
};

export const setLanguageCookie = (lang: Language) => {
  Cookies.set("language", lang, { expires: 365 });
};
