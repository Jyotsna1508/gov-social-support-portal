import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 text-gray-700 py-6 px-4 sm:px-6 md:px-8 mt-12 border-t">
      <div className="max-w-8xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Left side: copyright */}
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} {t("common.uaeGovernment")}
        </p>

        {/* Right side: links */}
        <div className="flex space-x-4 sm:space-x-6">
          <a
            href="https://u.ae/en/about-the-uae/government"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base hover:underline"
          >
            {t("common.aboutUaeGovernment")}
          </a>
          <a
            href="https://u.ae/en/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base hover:underline"
          >
            {t("common.contactUs")}
          </a>
          <a
            href="https://u.ae/en/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base hover:underline"
          >
            {t("common.privacyPolicy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
