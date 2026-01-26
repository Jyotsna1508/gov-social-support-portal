import { createContext } from "react";
import { LANGUAGE, type LanguageType } from "../../constants/constants";

export const LanguageContext = createContext({
  language: LANGUAGE.EN,
  toggleLanguage: () => {},
} as {
  language: LanguageType;
  toggleLanguage: () => void;
});