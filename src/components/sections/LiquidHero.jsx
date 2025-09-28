import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

// Liquid morphing animation
const liquidMorph = keyframes`
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    border-radius: 40% 60% 70% 30% / 50% 60% 30% 60%;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  50% {
    border-radius: 30% 70% 40% 60% / 40% 50% 60% 50%;
    transform: translate(-50%, -50%) rotate(180deg);
  }
  75% {
    border-radius: 70% 30% 60% 40% / 30% 40% 50% 70%;
    transform: translate(-50%, -50%) rotate(270deg);
  }
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

// Floating movement
const floatMove = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) translateX(0px) translateY(0px);
  }
  25% {
    transform: translate(-50%, -50%) translateX(100px) translateY(-50px);
  }
  50% {
    transform: translate(-50%, -50%) translateX(50px) translateY(100px);
  }
  75% {
    transform: translate(-50%, -50%) translateX(-100px) translateY(50px);
  }
`;

const LiquidContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const LiquidBlob = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  background: linear-gradient(45deg, 
    rgba(139, 92, 246, 0.3) 0%, 
    rgba(6, 182, 212, 0.3) 50%, 
    rgba(16, 185, 129, 0.3) 100%
  );
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: 
    ${liquidMorph} 20s ease-in-out infinite,
    ${floatMove} 30s ease-in-out infinite;
  filter: blur(2px);
  opacity: 0.7;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.cursor-interaction {
    filter: blur(1px);
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const LiquidCut = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(0, 0, 0, 0.4) 50%, 
    transparent 100%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: multiply;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle,
      rgba(139, 92, 246, 0.6) 0%,
      rgba(6, 182, 212, 0.4) 50%,
      transparent 100%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${keyframes`
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
      50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
    `} 2s ease-in-out infinite;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  
  /* Custom cursor */
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #8b5cf6, #06b6d4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
  }
  
  .cursor-ripple {
    position: fixed;
    width: 100px;
    height: 100px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 999;
    transform: translate(-50%, -50%);
    animation: ${keyframes`
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    `} 0.6s ease-out;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  
  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: bold;
    background: linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${keyframes`
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    `} 3s ease infinite;
    margin-bottom: 2rem;
  }
  
  .subtitle {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00;
    margin-bottom: 3rem;
  }
  
  button {
    background: linear-gradient(45deg, #8b5cf6, #06b6d4);
    border: none;
    padding: 1rem 3rem;
    border-radius: 50px;
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 40px rgba(139, 92, 246, 0.7);
    }
  }
`;

const LiquidHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [liquidCuts, setLiquidCuts] = useState([]);
  const [cursorRipples, setCursorRipples] = useState([]);
  const [liquidInteraction, setLiquidInteraction] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is near the center of screen (where liquid blob is)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      
      // If cursor is within liquid blob area (400px radius)
      if (distance < 400) {
        setLiquidInteraction(true);
        
        // Add liquid cut effect at cursor position
        const newCut = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 40 + 30
        };
        
        setLiquidCuts(prev => [...prev.slice(-10), newCut]);
        
        // Remove old cuts
        setTimeout(() => {
          setLiquidCuts(prev => prev.filter(cut => cut.id !== newCut.id));
        }, 2000);
      } else {
        setLiquidInteraction(false);
      }
    };

    const handleClick = (e) => {
      // Add ripple effect on click
      const ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setCursorRipples(prev => [...prev, ripple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setCursorRipples(prev => prev.filter(r => r.id !== ripple.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      {/* Cursor Ripples */}
      {cursorRipples.map(ripple => (
        <div
          key={ripple.id}
          className="cursor-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      {/* Liquid Background */}
      <LiquidContainer>
        <LiquidBlob className={liquidInteraction ? 'cursor-interaction' : ''} />
        
        {/* Liquid Cuts/Access Points */}
        {liquidCuts.map(cut => (
          <LiquidCut
            key={cut.id}
            style={{
              left: cut.x,
              top: cut.y,
              width: cut.size,
              height: cut.size,
            }}
          />
        ))}
      </LiquidContainer>

      {/* Main Content */}
      <ContentContainer>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          THAMEEMUL AZARUDEEN
        </motion.h1>
        
        <motion.div 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          &gt; BLOCKCHAIN DEVELOPER_
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          EXPLORE PORTFOLIO
        </motion.button>
      </ContentContainer>
    </HeroContainer>
  );
};

export default LiquidHero;