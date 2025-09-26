import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Import all existing components
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const PortfolioPage = () => {
  return (
    <>
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