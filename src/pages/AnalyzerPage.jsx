import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AvatarAnalyzerGenerator from '../components/AvatarAnalyzerGenerator';
import styled from 'styled-components';

const AnalyzerPageContainer = styled.div`
  min-height: 100vh;
  background: #0D0D0D;
  color: #EAEAEA;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(50, 205, 50, 0.2);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: 'Orbitron', monospace;
  font-size: 1.5rem;
  color: #32CD32;
  margin: 0;
`;

const BackButton = styled(Link)`
  color: #32CD32;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #32CD32;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;

  &:hover {
    background: #32CD32;
    color: #000;
    box-shadow: 0 0 20px rgba(50, 205, 50, 0.5);
  }
`;

const MainContent = styled.main`
  padding-top: 80px;
  height: 100vh;
`;

const AnalyzerPage = () => {
  return (
    <AnalyzerPageContainer>
      <Header>
        <Logo>Avatar Analyzer & Generator</Logo>
        <BackButton to="/">← Back to Portfolio</BackButton>
      </Header>
      <MainContent>
        <AvatarAnalyzerGenerator />
      </MainContent>
    </AnalyzerPageContainer>
  );
};

export default AnalyzerPage;