import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import Header from "./components/layout/Header";
import { LanguageProvider } from "./contexts/languageContext/LanguageProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import { useTranslation } from "react-i18next";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { DIRECTION, LANGUAGE } from "./constants/constants";
import Footer from "./components/layout/Footer";
import { useEffect } from "react";

// Function to create RTL or LTR emotion cache
// this is used for MUI elements to adapt the language change
const createEmotionCache = (isRtl: boolean) =>
  createCache({
    key: isRtl ? "mui-rtl" : "mui-ltr",
    stylisPlugins: isRtl ? [stylisRTLPlugin] : [],
  });

function App() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === LANGUAGE.AR;

  // Set body direction
  useEffect(() => {
    document.body.dir = isRtl ? DIRECTION.RTL : DIRECTION.LTR;
  }, [isRtl]);
  const cache = createEmotionCache(isRtl);
  const theme = createTheme({
    direction: isRtl ? "rtl" : "ltr",
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <ErrorBoundary>
            <div className="min-h-dvh flex flex-col bg-gray-50 ">
              <Header />
              <main className="mt-6 mb-6 px-4 sm:px-0 flex-1">
                <Router>
                  <AppRoutes />
                </Router>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </LanguageProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
