import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import Header from "./components/ui/Header";
import { LanguageProvider } from "./contexts/languageContext/LanguageContext";

function App() {
  return (
     <LanguageProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 p-4">
          <Header />
          <main className="mt-6">
          </main>
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
