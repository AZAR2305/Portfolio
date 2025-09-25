import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, Container, NeonText, NeonButton } from '../styles/GlobalStyles';

// Import all existing components
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const AnalyzerButton = styled(Link)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: linear-gradient(135deg, #32CD32, #00FF88);
  color: #000;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(50, 205, 50, 0.5);
    background: linear-gradient(135deg, #00FF88, #32CD32);
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 0.8rem;
  }
`;

const StudioButton = styled(Link)`
  position: fixed;
  top: 20px;
  right: 180px;
  z-index: 1000;
  background: linear-gradient(135deg, #00BFFF, #00FF88);
  color: #000;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-family: 'Orbitron', monospace;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 191, 255, 0.5);
    background: linear-gradient(135deg, #00FF88, #00BFFF);
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 120px;
    padding: 8px 16px;
    font-size: 0.8rem;
  }
`;

const PortfolioPage = ({ 
  currentSection, 
  scrollProgress, 
  mousePosition 
}) => {
  return (
    <>
      {/* Avatar Analyzer Access Button */}
      <AnalyzerButton to="/analyzer">
        🔬 Avatar Analyzer
      </AnalyzerButton>

      {/* Avatar Studio Access Button */}
      <StudioButton to="/avatar-studio">
        🧑‍🎨 Avatar Studio
      </StudioButton>

      {/* Main Portfolio Content */}
      <Hero />
      <About />
      <Projects />
      <Experience />  
      <Contact />
    </>
  );
};

export default PortfolioPage;