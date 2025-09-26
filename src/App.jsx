import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for better performance
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

// Fallback component for lazy loading
const SectionLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000000',
    color: '#00ff41'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '50px', 
        height: '50px', 
        border: '3px solid #00ff41',
        borderTop: '3px solid transparent',
        borderRadius: '50%',
        margin: '0 auto 20px',
        animation: 'spin 1s linear infinite'
      }} />
      <p>Loading 3D Experience...</p>
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
              <PortfolioPage />
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
      const assets = [
        'https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb'
      ];

      let loadedCount = 0;
      const totalAssets = assets.length;

      // Simulate asset loading with progress
      for (const asset of assets) {
        try {
          if (asset.endsWith('.glb')) {
            // For GLB files, just simulate loading time
            await new Promise(resolve => setTimeout(resolve, 1000));
          } else if (asset.endsWith('.woff')) {
            // For fonts, create a temporary style element to preload
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset;
            link.as = 'font';
            link.type = 'font/woff';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.warn(`Failed to preload asset: ${asset}`, error);
        }

        loadedCount++;
        setLoadingProgress((loadedCount / totalAssets) * 100);
      }

      // Additional loading time for 3D components initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
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
