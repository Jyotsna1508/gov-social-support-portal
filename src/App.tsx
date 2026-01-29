import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import Header from "./components/layout/Header";
import { LanguageProvider } from "./contexts/languageContext/LanguageContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import { useTranslation } from "react-i18next";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { DIRECTION, LANGUAGE } from "./constants/constants";
import Footer from "./components/layout/Footer";

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
  // eslint-disable-next-line react-hooks/immutability
  document.body.dir = isRtl ? DIRECTION.RTL : DIRECTION.LTR;
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
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="mt-6 px-4 sm:px-0">
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
