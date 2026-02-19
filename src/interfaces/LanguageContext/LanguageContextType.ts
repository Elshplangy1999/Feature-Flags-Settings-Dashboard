import { Language } from "@/types/i18n/i18n";

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}
