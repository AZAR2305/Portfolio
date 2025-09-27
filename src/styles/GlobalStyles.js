// Legacy GlobalStyles.js - This file is kept for backward compatibility
// The new modern styles are in ModernStyles.js

import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #000;
    color: #fff;
  }
`;

export const theme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
  }
};

// Legacy styled components - use ModernStyles.js for new components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Section = styled.section`
  min-height: 100vh;
  padding: 2rem 0;
`;