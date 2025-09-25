import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.dark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-right: 3px solid ${props => props.theme.colors.secondary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme.shadows.neon};
`;

const LoadingText = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  animation: ${pulse} 2s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProgressBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'progress',
})`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.gradients.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
    box-shadow: 0 0 10px ${props => props.theme.colors.primary};
  }
`;

const ProgressText = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 15px;
  text-align: center;
`;

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading 3D Portfolio...</LoadingText>
      <ProgressBar progress={progress} />
      <ProgressText>{Math.round(progress)}% Complete</ProgressText>
    </LoadingContainer>
  );
};

export default LoadingScreen;