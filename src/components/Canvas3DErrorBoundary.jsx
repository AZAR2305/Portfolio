import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 20px;
  border: 1px solid rgba(255, 0, 0, 0.3);
  padding: 40px;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #ff4444;
  font-family: 'Orbitron', monospace;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.6;
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #cc2222);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #ff6666, #ff4444);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3);
  }
`;

class Canvas3DErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Canvas Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Force re-render by updating the key
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>3D Rendering Error</ErrorTitle>
          <ErrorMessage>
            There was an issue loading the 3D content. This might be due to WebGL compatibility 
            or graphics driver issues.
          </ErrorMessage>
          <ErrorMessage style={{ fontSize: '0.9em', opacity: 0.7 }}>
            Try refreshing the page or updating your graphics drivers.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Retry 3D Content
          </RetryButton>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '100%' }}>
              <summary style={{ color: '#ff4444', cursor: 'pointer' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                color: '#ffcccc', 
                fontSize: '0.8em', 
                overflow: 'auto',
                maxHeight: '200px',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
                marginTop: '10px'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default Canvas3DErrorBoundary;