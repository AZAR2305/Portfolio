import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Modern Animation Keyframes
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

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

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

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: #9ca3af;
    line-height: 1.8;
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

export const theme = {
  colors: {
    primary: '#8b5cf6', // Purple
    secondary: '#06b6d4', // Cyan
    accent: '#f59e0b', // Amber
    success: '#10b981', // Emerald
    error: '#ef4444', // Red
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
  },
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  }
};

// Modern Container with responsive padding
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

// Modern Section with smooth transitions
export const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
  transition: all ${props => props.theme.animations.duration.slow} ${props => props.theme.animations.easing.smooth};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 0;
    min-height: auto;
  }
`;

// Animated Gradient Text
export const GradientText = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['size', 'animate'].includes(prop),
})`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.size || 'clamp(2.5rem, 5vw, 4rem)'};
  font-weight: 800;
  background: ${props => props.theme.gradients.animated};
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${props => props.animate ? gradientShift : 'none'} 3s ease infinite;
  line-height: 1.1;
  letter-spacing: -0.02em;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: clamp(2rem, 8vw, 3rem);
  }
`;

// Modern Card Component
export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hover', 'glow'].includes(prop),
})`
  background: ${props => props.theme.gradients.glass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.smooth};
  box-shadow: ${props => props.theme.shadows.card};
  
  ${props => props.hover && `
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: ${props.theme.shadows.xl}, ${props.glow ? props.theme.shadows.glow : 'none'};
      border-color: rgba(139, 92, 246, 0.3);
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

// Animated Button
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop),
})`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all ${props => props.theme.animations.duration.normal} ${props => props.theme.animations.easing.bounce};
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  /* Button Sizes */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}
  
  /* Button Variants */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${props.theme.gradients.primary};
          color: white;
          box-shadow: ${props.theme.shadows.medium};
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: ${props.theme.shadows.large};
          }
        `;
      case 'secondary':
        return `
          background: ${props.theme.colors.surface.secondary};
          color: ${props.theme.colors.text.primary};
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: ${props.theme.colors.surface.tertiary};
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${props.theme.colors.primary};
          border: 2px solid ${props.theme.colors.primary};
          
          &:hover {
            background: ${props.theme.colors.primary};
            color: white;
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${props.theme.gradients.primary};
          color: white;
        `;
    }
  }}
  
  &:active {
    transform: scale(0.98);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

// Floating Animation Component
export const FloatingElement = styled.div`
  animation: ${floatAnimation} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

// Text with smooth fade-in animation
export const AnimatedText = styled.p.withConfig({
  shouldForwardProp: (prop) => !['delay'].includes(prop),
})`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.125rem;
  line-height: 1.8;
  animation: ${fadeInUp} 0.8s ${props => props.theme.animations.easing.smooth} ${props => props.delay || '0s'} both;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

// Export animations for use in components
export { 
  floatAnimation, 
  gradientShift, 
  glow, 
  slideInFromLeft, 
  slideInFromRight, 
  fadeInUp, 
  scaleIn, 
  shimmer 
};