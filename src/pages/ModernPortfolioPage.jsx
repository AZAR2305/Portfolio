import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import ProfessionalHero from '../components/sections/ProfessionalHero';
import ProfessionalAbout from '../components/sections/ProfessionalAbout';
import ProfessionalProjects from '../components/sections/ProfessionalProjects';
import ProfessionalContact from '../components/sections/ProfessionalContact';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

const ModernPortfolioPage = () => {
  return (
    <PageWrapper>
      <Navigation />
      <section id="home">
        <ProfessionalHero />
      </section>
      <section id="about">
        <ProfessionalAbout />
      </section>
      <section id="projects">
        <ProfessionalProjects />
      </section>
      <section id="contact">
        <ProfessionalContact />
      </section>
    </PageWrapper>
  );
};

export default ModernPortfolioPage;