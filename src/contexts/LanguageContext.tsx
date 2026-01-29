import { useEffect, useState, type ReactNode } from "react";
import { DIRECTION, LANGUAGE, type LanguageType } from "../constants/constants";
import i18n from "../i18n";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext({
  language: LANGUAGE.EN,
  toggleLanguage: () => {},
} as {
  language: LanguageType;
  toggleLanguage: () => void;
});
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>(LANGUAGE.EN);
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir =
      language === LANGUAGE.AR ? DIRECTION.RTL : DIRECTION.LTR;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === LANGUAGE.EN ? LANGUAGE.AR : LANGUAGE.EN));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
