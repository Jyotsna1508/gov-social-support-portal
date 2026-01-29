import { useTranslation } from "react-i18next";
import { LANGUAGE, languageBtnStyle } from "../../constants/constants";
import { useLanguage } from "../../hooks/useLanguage";
import { Button } from "@mui/material";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header
      role="banner"
      className={`flex items-center justify-between p-4 
        bg-linear-to-r from-blue-500 to-blue-700 
        text-white 
        shadow-md 
        transition-all duration-300`}
      dir={language === LANGUAGE.AR ? "flex-row-reverse" : "flex-row"}
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">{t("common.socialSupport")}</h1>
      <Button
        onClick={toggleLanguage}
        variant="outlined"
        size="small"
        color="inherit"
        sx={languageBtnStyle}
        aria-label={t("common.switchLanguage")}
      >
        العربية / EN
      </Button>
    </header>
  );
};

export default Header;
