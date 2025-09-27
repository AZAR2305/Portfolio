import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/ModernStyles';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const ModernPortfolioPage = lazy(() => import('./pages/ModernPortfolioPage'));

// Fallback component for lazy loading
const SectionLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#8b5cf6'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '60px', 
        height: '60px', 
        border: '3px solid rgba(139, 92, 246, 0.3)',
        borderTop: '3px solid #8b5cf6',
        borderRadius: '50%',
        margin: '0 auto 20px',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem' }}>
        Loading Modern Experience...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Main App Content Component  
const AppContent = () => {
  return (
    <div className="App">
      <Routes>
        {/* Main Portfolio Route */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<SectionLoader />}>
              <ModernPortfolioPage />
            </Suspense>
          } 
        />
      </Routes>
    </div>
  );
};

// Main App Component with loading
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Preload critical assets and simulate loading progress
    const preloadAssets = async () => {
      // Simulate loading time for modern components
      const loadingSteps = [
        'Loading modern design system...',
        'Initializing animations...',
        'Preparing components...',
        'Almost ready...'
      ];

      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingProgress(((i + 1) / loadingSteps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      setIsLoading(false);
    };

    preloadAssets();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        {isLoading ? (
          <LoadingScreen progress={loadingProgress} />
        ) : (
          <AppContent />
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
