import { useState, useEffect, useRef } from 'react';

// Hook for managing 3D performance based on device capabilities
export const usePerformanceOptimization = () => {
  const [performanceLevel, setPerformanceLevel] = useState('high');
  const [isInViewport, setIsInViewport] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    // Detect device performance level
    const detectPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setPerformanceLevel('low');
        return;
      }

      const renderer = gl.getParameter(gl.RENDERER);
      const vendor = gl.getParameter(gl.VENDOR);
      
      // Check for high-end GPUs
      if (renderer.includes('RTX') || renderer.includes('GTX') || renderer.includes('Radeon RX')) {
        setPerformanceLevel('high');
      } else if (renderer.includes('Intel') || renderer.includes('Mali') || renderer.includes('Adreno')) {
        setPerformanceLevel('low');
      } else {
        setPerformanceLevel('medium');
      }

      // Also check hardware concurrency
      const cores = navigator.hardwareConcurrency || 4;
      if (cores < 4) {
        setPerformanceLevel('low');
      }

      // Check memory (if available)
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setPerformanceLevel('low');
      }
    };

    detectPerformance();
  }, []);

  useEffect(() => {
    // Intersection Observer for viewport detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '50px' // Start loading 50px before element enters viewport
      }
    );

    if (elementRef.current && elementRef.current instanceof Element) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current && elementRef.current instanceof Element) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Performance settings based on device capability
  const getOptimizedSettings = () => {
    switch (performanceLevel) {
      case 'high':
        return {
          antialias: true,
          shadowMap: true,
          particleCount: 20,
          animationQuality: 'high',
          renderDistance: 100,
          pixelRatio: Math.min(window.devicePixelRatio, 2)
        };
      case 'medium':
        return {
          antialias: true,
          shadowMap: false,
          particleCount: 10,
          animationQuality: 'medium',
          renderDistance: 50,
          pixelRatio: 1
        };
      case 'low':
        return {
          antialias: false,
          shadowMap: false,
          particleCount: 5,
          animationQuality: 'low',
          renderDistance: 25,
          pixelRatio: 1
        };
      default:
        return {
          antialias: true,
          shadowMap: true,
          particleCount: 15,
          animationQuality: 'medium',
          renderDistance: 75,
          pixelRatio: 1
        };
    }
  };

  return {
    performanceLevel,
    isInViewport,
    elementRef,
    settings: getOptimizedSettings()
  };
};

// Hook for frame rate monitoring and adaptive quality
export const useAdaptiveQuality = () => {
  const [fps, setFps] = useState(60);
  const [quality, setQuality] = useState(1);
  const frameTimeRef = useRef([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    let animationId;

    const measureFPS = (currentTime) => {
      if (lastTimeRef.current) {
        const delta = currentTime - lastTimeRef.current;
        frameTimeRef.current.push(delta);

        // Keep only last 60 frames
        if (frameTimeRef.current.length > 60) {
          frameTimeRef.current.shift();
        }

        // Calculate average FPS
        if (frameTimeRef.current.length >= 10) {
          const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b) / frameTimeRef.current.length;
          const currentFPS = 1000 / avgFrameTime;
          setFps(currentFPS);

          // Adjust quality based on FPS
          if (currentFPS < 30) {
            setQuality(prev => Math.max(prev - 0.1, 0.3));
          } else if (currentFPS > 50) {
            setQuality(prev => Math.min(prev + 0.05, 1));
          }
        }
      }

      lastTimeRef.current = currentTime;
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { fps: Math.round(fps), quality };
};

// Hook for memory usage monitoring
export const useMemoryMonitoring = () => {
  const [memoryUsage, setMemoryUsage] = useState(null);

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        setMemoryUsage({
          used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
        });
      }
    };

    // Check memory every 5 seconds
    const interval = setInterval(checkMemory, 5000);
    checkMemory(); // Initial check

    return () => clearInterval(interval);
  }, []);

  return memoryUsage;
};