import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import Header from "./components/layout/Header";
import { LanguageProvider } from "./contexts/languageContext/LanguageContext";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 p-4">
          <Header />
          <main className="mt-6">
            <Router>
              <AppRoutes />
            </Router>
          </main>
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
