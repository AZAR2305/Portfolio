import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import LoadingScreen from './components/LoadingScreen';
import MasterCanvas from './components/3d/MasterCanvas';

// Lazy load pages for better performance
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AnalyzerPage = lazy(() => import('./pages/AnalyzerPage'));
const AvatarStudioPage = lazy(() => import('./pages/AvatarStudioPage'));

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
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const isPortfolioPage = location.pathname === '/';

  // Track scroll and mouse position only on portfolio page
  useEffect(() => {
    if (!isPortfolioPage) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);

      // Determine current section based on scroll position
      const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
      const sectionIndex = Math.floor(scrollPercent * sections.length);
      setCurrentSection(sections[sectionIndex] || 'hero');
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPortfolioPage]);

  return (
    <div className="App">
      {/* Only render MasterCanvas on portfolio page to prevent WebGL conflicts */}
      {isPortfolioPage && (
        <MasterCanvas 
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          useCustomCharacter={false} // Set to true when you add your custom character
          customCharacterUrl="/models/your-character.glb" // Update with your model path
          experiences={[
            {
              title: "Senior Blockchain Developer",
              company: "Tech Innovation Labs",
              period: "2023 - Present",
              description: "Leading Web3 development initiatives"
            },
            {
              title: "Full Stack Developer",
              company: "Digital Solutions Inc",
              period: "2021 - 2023",
              description: "Built scalable web applications"
            },
            {
              title: "Frontend Developer",
              company: "Creative Agency",
              period: "2019 - 2021",
              description: "Developed responsive user interfaces"
            }
          ]}
        />
      )}
      
      <Routes>
        {/* Main Portfolio Route */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<SectionLoader />}>
              <PortfolioPage 
                currentSection={currentSection}
                scrollProgress={scrollProgress}
                mousePosition={mousePosition}
              />
            </Suspense>
          } 
        />
        {/* Avatar Analyzer Route */}
        <Route 
          path="/analyzer" 
          element={
            <Suspense fallback={<SectionLoader />}>
              <AnalyzerPage />
            </Suspense>
          } 
        />
        {/* Avatar Studio Route */}
        <Route 
          path="/avatar-studio" 
          element={
            <Suspense fallback={<SectionLoader />}>
              <AvatarStudioPage />
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
