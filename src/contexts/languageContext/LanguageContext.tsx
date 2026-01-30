import { LANGUAGE, type LanguageType } from "../../constants/constants";
import { createContext } from "react";

export const LanguageContext = createContext({
  language: LANGUAGE.EN,
  toggleLanguage: () => {},
} as {
  language: LanguageType;
  toggleLanguage: () => void;
});
