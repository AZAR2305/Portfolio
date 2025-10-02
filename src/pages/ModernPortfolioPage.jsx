import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import ProfessionalHero from '../components/sections/ProfessionalHero';
import ProfessionalAbout from '../components/sections/ProfessionalAbout';
import ProjectsSection from '../components/sections/ProjectsSection';
import ProfessionalContact from '../components/sections/ProfessionalContact';
import WaterCursor from '../components/WaterCursor';
import InteractiveBackground from '../components/InteractiveBackground';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  cursor: none; /* Hide default cursor */
  
  * {
    cursor: none !important; /* Hide cursor on all child elements */
  }
  
  /* Show cursor on form inputs */
  input, textarea, button {
    cursor: pointer !important;
  }
  
  a, button {
    cursor: pointer !important;
  }
`;

const ModernPortfolioPage = () => {
  return (
    <PageWrapper>
      <InteractiveBackground />
      <WaterCursor />
      <Navigation />
      <section id="home">
        <ProfessionalHero />
      </section>
      <section id="about">
        <ProfessionalAbout />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="contact">
        <ProfessionalContact />
      </section>
    </PageWrapper>
  );
};

export default ModernPortfolioPage;