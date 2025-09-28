import styled, { createGlobalStyle, keyframes } from 'styled-components';

// ===== ANIMATION KEYFRAMES =====

// Basic Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(139, 69, 255, 0.3), 0 0 40px rgba(139, 69, 255, 0.1); }
  50% { box-shadow: 0 0 30px rgba(139, 69, 255, 0.5), 0 0 60px rgba(139, 69, 255, 0.2); }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInFromRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const fadeInUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// ===== ADVANCED LIQUID/FLUID ANIMATIONS =====

const liquidMorph = keyframes`
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 40% 60% 70% 30% / 50% 60% 30% 60%;
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    border-radius: 30% 70% 40% 60% / 40% 50% 60% 50%;
    transform: rotate(180deg) scale(0.9);
  }
  75% {
    border-radius: 70% 30% 60% 40% / 30% 40% 50% 70%;
    transform: rotate(270deg) scale(1.05);
  }
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(360deg) scale(1);
  }
`;

const liquidPulse = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  33% {
    transform: scale(1.2) rotate(120deg);
    opacity: 0.5;
  }
  66% {
    transform: scale(0.8) rotate(240deg);
    opacity: 0.2;
  }
`;

// ===== CRT SCREEN EFFECTS =====

const crtScanlines = keyframes`
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
`;

const crtFlicker = keyframes`
  0%, 100% { opacity: 1; }
  98% { opacity: 1; }
  99% { opacity: 0.98; }
  99.5% { opacity: 0.95; }
`;

const crtGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px #8b5cf6;
  }
  50% {
    text-shadow: 
      0 0 2px currentColor,
      0 0 5px currentColor,
      0 0 8px currentColor,
      0 0 12px #8b5cf6,
      0 0 18px #8b5cf6;
  }
`;

// ===== INTERACTIVE PARTICLE EFFECTS =====

const particleFloat = keyframes`
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(100px) rotate(360deg);
    opacity: 0;
  }
`;

const waveDistortion = keyframes`
  0%, 100% {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }
  25% {
    clip-path: polygon(0 0, 100% 10%, 100% 90%, 0 85%);
  }
  50% {
    clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 85%);
  }
  75% {
    clip-path: polygon(0 10%, 100% 15%, 100% 85%, 0 90%);
  }
`;

const dataStream = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const gradientWave = keyframes`
  0% {
    background-position: 0% 50%;
    background-size: 100% 100%;
  }
  25% {
    background-position: 100% 25%;
    background-size: 150% 150%;
  }
  50% {
    background-position: 50% 100%;
    background-size: 200% 100%;
  }
  75% {
    background-position: 25% 75%;
    background-size: 100% 200%;
  }
  100% {
    background-position: 0% 50%;
    background-size: 100% 100%;
  }
`;

// ===== EXPORT ANIMATIONS =====
export {
  floatAnimation,
  gradientShift,
  glow,
  slideInFromLeft,
  slideInFromRight,
  fadeInUp,
  scaleIn,
  shimmer,
  liquidMorph,
  liquidPulse,
  crtScanlines,
  crtFlicker,
  crtGlow,
  particleFloat,
  waveDistortion,
  dataStream,
  gradientWave
};

// ===== GLOBAL STYLES =====
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    background-attachment: fixed;
    color: #e5e7eb;
    overflow-x: hidden;
    line-height: 1.7;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #8b5cf6, #06b6d4);
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #a78bfa, #0891b2);
  }

  /* Selection Styles */
  ::selection {
    background: rgba(139, 92, 246, 0.3);
    color: #ffffff;
  }

  ::-moz-selection {
    background: rgba(139, 92, 246, 0.3);
    color: #ffffff;
  }
`;

// ===== THEME CONFIGURATION =====
export const theme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    success: '#10b981',
    error: '#ef4444',
    background: {
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      tertiary: '#16213e'
    },
    surface: {
      primary: 'rgba(255, 255, 255, 0.05)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      tertiary: 'rgba(139, 92, 246, 0.1)'
    },
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
      tertiary: '#9ca3af',
      muted: '#6b7280'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    dark: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
    animated: 'linear-gradient(-45deg, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
  },
  shadows: {
    small: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    large: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
    glowLarge: '0 0 40px rgba(139, 92, 246, 0.2)',
    card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

// ===== BASIC STYLED COMPONENTS =====

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const Section = styled.section`
  min-height: 100vh;
  padding: 5rem 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 3rem 0;
    min-height: auto;
  }
`;

export const GradientText = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['size', 'animate'].includes(prop),
})`
  font-family: ${theme.fonts.heading};
  font-size: ${props => props.size || 'clamp(2.5rem, 5vw, 4rem)'};
  font-weight: 800;
  background: ${theme.gradients.animated};
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${props => props.animate ? gradientShift : 'none'} 3s ease infinite;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
`;

export const Button = styled.button`
  background: ${theme.gradients.primary};
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: ${theme.fonts.body};
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.glow};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glowLarge};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.card};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.glow}, ${theme.shadows.card};
    border-color: ${theme.colors.primary}50;
  }
`;

// ===== ADVANCED ANIMATED COMPONENTS =====

// Liquid Background Blob
export const LiquidBlob = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'color', 'speed'].includes(prop),
})`
  position: absolute;
  width: ${props => props.size || '600px'};
  height: ${props => props.size || '600px'};
  background: ${props => props.color || theme.gradients.primary};
  opacity: 0.1;
  animation: ${liquidMorph} ${props => props.speed || '20s'} ease-in-out infinite;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  
  &.interactive {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Interactive Liquid Container
export const LiquidContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

// CRT Screen Effect
export const CRTScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 50%, 
      rgba(0, 255, 0, 0.03) 50%
    );
    background-size: 100% 4px;
    animation: ${crtScanlines} 0.1s linear infinite;
    pointer-events: none;
    z-index: 1000;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      transparent 70%,
      rgba(0, 0, 0, 0.3)
    );
    animation: ${crtFlicker} 0.15s linear infinite;
    pointer-events: none;
    z-index: 999;
  }
`;

// CRT Text Effect
export const CRTText = styled.div`
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  animation: ${crtGlow} 2s ease-in-out infinite alternate;
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor,
    0 0 20px #00ff00;
  
  &.glitch {
    position: relative;
    
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    &::before {
      color: #ff0000;
      animation: ${crtFlicker} 0.3s infinite;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
      transform: translateX(-2px);
    }
    
    &::after {
      color: #0000ff;
      animation: ${crtFlicker} 0.25s infinite reverse;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
      transform: translateX(2px);
    }
  }
`;

// Particle System
export const Particle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['delay', 'size', 'color', 'speed'].includes(prop),
})`
  position: absolute;
  width: ${props => props.size || '4px'};
  height: ${props => props.size || '4px'};
  background: ${props => props.color || '#8b5cf6'};
  border-radius: 50%;
  animation: ${particleFloat} ${props => props.speed || '10s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  box-shadow: 0 0 10px currentColor;
  
  &.data-stream {
    width: 2px;
    height: 20px;
    border-radius: 1px;
    background: linear-gradient(to bottom, transparent, currentColor, transparent);
    animation: ${dataStream} ${props => props.speed || '8s'} linear infinite;
  }
`;

// Particle Container
export const ParticleField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

// Advanced Gradient Background
export const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    #0f0f23,
    #1a1a2e,
    #16213e,
    #2d1b69,
    #0f0f23
  );
  background-size: 400% 400%;
  animation: ${gradientWave} 15s ease infinite;
  z-index: -2;
`;

// Wave Distortion Effect
export const WaveContainer = styled.div`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.primary};
    opacity: 0.1;
    animation: ${waveDistortion} 8s ease-in-out infinite;
    z-index: -1;
  }
`;

// Interactive Hover Effect
export const InteractiveElement = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    z-index: -1;
  }
  
  &:hover::before {
    width: 300px;
    height: 300px;
  }
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

// Glitch Effect Container
export const GlitchContainer = styled.div`
  position: relative;
  display: inline-block;
  
  &.active {
    animation: ${crtFlicker} 0.3s ease-in-out;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 0, 0, 0.1),
        transparent
      );
      animation: ${shimmer} 0.5s ease-in-out;
    }
  }
`;

// Legacy exports for compatibility
export const FloatingElement = styled.div`
  animation: ${floatAnimation} 6s ease-in-out infinite;
`;

export const AnimatedText = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
`;