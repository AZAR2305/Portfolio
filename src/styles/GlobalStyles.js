import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #0D0D0D;
    color: #EAEAEA;
    overflow-x: hidden;
    line-height: 1.6;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 1px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #32CD32, #00FF88);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #00FF88, #32CD32);
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.7);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(50, 205, 50, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(50, 205, 50, 0);
    }
  }
`;

export const theme = {
  colors: {
    primary: '#32CD32', // Soft Green
    secondary: '#00FF88', // Bright Green Accent
    accent: '#6A5ACD', // Muted Purple
    dark: '#0D0D0D', // Deep Black/Charcoal
    darkGray: '#1A1A1A',
    lightGray: '#2A2A2A',
    white: '#FFFFFF',
    text: '#EAEAEA', // Light Gray for readability
    textSecondary: '#CCCCCC',
    transparent: 'rgba(50, 205, 50, 0.1)',
  },
  gradients: {
    primary: 'linear-gradient(45deg, #32CD32, #00FF88)',
    secondary: 'linear-gradient(135deg, #00FF88, #32CD32)',
    accent: 'linear-gradient(90deg, #6A5ACD, #9370DB)',
    glass: 'linear-gradient(135deg, rgba(50,205,50,0.08), rgba(50,205,50,0.02))',
    dark: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
  },
  fonts: {
    heading: "'Orbitron', monospace",
    body: "'Inter', sans-serif",
  },
  shadows: {
    green: '0 0 20px rgba(50, 205, 50, 0.3)',
    greenGlow: '0 0 30px rgba(0, 255, 136, 0.4)',
    purple: '0 0 20px rgba(106, 90, 205, 0.3)',
    glass: '0 8px 32px 0 rgba(50, 205, 50, 0.1)',
    card: '0 4px 20px rgba(0, 0, 0, 0.3)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 15px;
  }
`;

export const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
`;

export const NeonText = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['size', 'mobileSize'].includes(prop),
})`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.size || '4rem'};
  font-weight: 700;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(50, 205, 50, 0.3);
  margin: 20px 0;
  letter-spacing: 2px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.mobileSize || '2.5rem'};
  }
`;

export const GlassCard = styled.div`
  background: ${props => props.theme.gradients.glass};
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(50, 205, 50, 0.1);
  box-shadow: ${props => props.theme.shadows.card};
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.green};
    border-color: rgba(50, 205, 50, 0.2);
  }
`;

export const Card = styled.div`
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  border: 1px solid rgba(50, 205, 50, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 30px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(50, 205, 50, 0.1);
    border-color: rgba(50, 205, 50, 0.2);
  }
`;

export const NeonButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.dark};
    box-shadow: ${props => props.theme.shadows.green};
    transform: translateY(-1px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.3s;
  }

  &:hover::before {
    left: 100%;
  }
`;