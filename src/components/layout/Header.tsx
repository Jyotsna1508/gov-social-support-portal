import { useTranslation } from "react-i18next";
import { LANGUAGE } from "../../constants/constants";
import { useLanguage } from "../../hooks/useLanguage";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header
      className={`flex items-center justify-between p-4 bg-blue-600 text-white`}
      dir={language === LANGUAGE.AR ? "flex-row-reverse" : "flex-row"}
    >
      <h1 className="text-xl font-bold">{t("common.socialSupport")}</h1>
      <button
        onClick={toggleLanguage}
        className="bg-white text-blue-600 px-3 py-1 rounded"
      >
        {language === LANGUAGE.EN ? 'العربية' : 'EN'}
      </button>
    </header>
  );
};

export default Header;
