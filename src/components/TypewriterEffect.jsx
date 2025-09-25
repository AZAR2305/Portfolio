import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TypewriterContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fontSize', 'color'].includes(prop),
})`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.fontSize || '1.8rem'};
  color: ${props => props.color || props.theme.colors.primary};
  margin-bottom: 20px;
  font-weight: 500;
  min-height: ${props => props.fontSize || '1.8rem'};
  text-shadow: 0 0 10px ${props => props.color || props.theme.colors.primary};
`;

const Cursor = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})`
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: ${props => props.color || props.theme.colors.primary};
  animation: ${blink} 1s infinite;
  margin-left: 2px;
`;

const TypewriterEffect = ({ 
  text, 
  speed = 50, 
  showCursor = true, 
  fontSize,
  color,
  delay = 0,
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDelaying, setIsDelaying] = useState(delay > 0);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsDelaying(false);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
  }, [delay]);

  useEffect(() => {
    if (isDelaying || currentIndex >= text.length) return;
    
    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDelaying]);

  useEffect(() => {
    if (!isDelaying && currentIndex >= text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text.length, onComplete, isDelaying]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  if (isDelaying) return <TypewriterContainer fontSize={fontSize} color={color} />;

  return (
    <TypewriterContainer fontSize={fontSize} color={color}>
      {displayText}
      {showCursor && <Cursor color={color} />}
    </TypewriterContainer>
  );
};

export default TypewriterEffect;