import React from 'react';
import styled from 'styled-components';
import ModernHero from '../components/sections/ModernHero';
import ModernAbout from '../components/sections/ModernAbout';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  background-attachment: fixed;
`;

const ModernPortfolioPage = () => {
  return (
    <PageWrapper>
      <ModernHero />
      <ModernAbout />
    </PageWrapper>
  );
};

export default ModernPortfolioPage;