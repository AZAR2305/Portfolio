import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import {
  LiquidBlob,
  LiquidContainer,
  CRTScreen,
  CRTText,
  Particle,
  ParticleField,
  AnimatedBackground,
  InteractiveElement,
  GlitchContainer,
  liquidMorph,
  particleFloat,
  crtGlow,
  dataStream
} from '../../styles/ModernStyles.js';

// Enhanced Hero with Liquid Background and CRT Effects
const EnhancedHeroContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  cursor: none; /* Hide default cursor for custom effect */
  
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #8b5cf6, #06b6d4);
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    z-index: 9999;
    transition: transform 0.1s ease;
  }
  
  .cursor-trail {
    position: fixed;
    width: 6px;
    height: 6px;
    background: #8b5cf6;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.7;
    z-index: 9998;
  }
`;

const LiquidBlobInteractive = styled(LiquidBlob)`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.cursor-near {
    transform: scale(1.2);
    opacity: 0.3;
    filter: blur(40px);
  }
  
  &.breaking {
    animation: ${liquidMorph} 2s ease-in-out, 
               ${keyframes`
                 0% { transform: scale(1); }
                 50% { transform: scale(0.8) rotate(180deg); }
                 100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
               `} 1s ease-out;
  }
`;

const MatrixRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.1;
`;

const DataColumn = styled.div`
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #00ff00;
  white-space: pre;
  animation: ${dataStream} ${props => props.speed || '10s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const GlitchText = styled(motion.div)`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: #00ff00;
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor;
  
  &.glitch-active {
    animation: ${crtGlow} 0.1s ease-in-out;
    
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: #ff0000;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
      transform: translateX(-2px);
    }
    
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: #0000ff;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
      transform: translateX(2px);
    }
  }
`;

const EnhancedHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrails, setCursorTrails] = useState([]);
  const [liquidBlobs, setLiquidBlobs] = useState([]);
  const [particles, setParticles] = useState([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const heroRef = useRef(null);

  // Mouse tracking and cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add cursor trail
      setCursorTrails(prev => [...prev.slice(-10), { 
        x: e.clientX, 
        y: e.clientY, 
        id: Date.now() 
      }]);
      
      // Check if cursor is near liquid blobs and make them "break"
      setLiquidBlobs(prev => prev.map(blob => {
        const distance = Math.sqrt(
          Math.pow(e.clientX - blob.x, 2) + Math.pow(e.clientY - blob.y, 2)
        );
        return {
          ...blob,
          cursorNear: distance < 200,
          breaking: distance < 100
        };
      }));
    };

    const handleClick = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Initialize liquid blobs
  useEffect(() => {
    const blobs = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 400 + 200,
      speed: Math.random() * 20 + 10,
      cursorNear: false,
      breaking: false
    }));
    setLiquidBlobs(blobs);
  }, []);

  // Initialize particles
  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 10 + 5,
      delay: Math.random() * 10
    }));
    setParticles(particleArray);
  }, []);

  // Generate matrix rain data
  const generateMatrixData = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    return Array.from({ length: Math.floor(Math.random() * 20) + 5 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('\n');
  };

  return (
    <EnhancedHeroContainer ref={heroRef}>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: glitchActive ? 'scale(2)' : 'scale(1)'
        }}
      />
      
      {/* Cursor Trails */}
      {cursorTrails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: (index / cursorTrails.length) * 0.5,
            transform: `scale(${index / cursorTrails.length})`
          }}
        />
      ))}

      {/* Animated Background */}
      <AnimatedBackground />

      {/* CRT Screen Effect */}
      <CRTScreen />

      {/* Liquid Background Container */}
      <LiquidContainer>
        {liquidBlobs.map(blob => (
          <LiquidBlobInteractive
            key={blob.id}
            size={`${blob.size}px`}
            speed={`${blob.speed}s`}
            className={`${blob.cursorNear ? 'cursor-near' : ''} ${blob.breaking ? 'breaking' : ''}`}
            style={{
              left: blob.x,
              top: blob.y,
            }}
          />
        ))}
      </LiquidContainer>

      {/* Particle Field */}
      <ParticleField>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            size={`${particle.size}px`}
            speed={`${particle.speed}s`}
            delay={`${particle.delay}s`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </ParticleField>

      {/* Matrix Rain Effect */}
      <MatrixRain>
        {Array.from({ length: 20 }).map((_, i) => (
          <DataColumn
            key={i}
            speed={`${Math.random() * 5 + 8}s`}
            delay={`${Math.random() * 10}s`}
            style={{
              left: `${(i * 5) + Math.random() * 5}%`,
            }}
          >
            {generateMatrixData()}
          </DataColumn>
        ))}
      </MatrixRain>

      {/* Main Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 100, 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <GlitchContainer className={glitchActive ? 'active' : ''}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #8b5cf6, #06b6d4, #10b981)',
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 3s ease infinite',
              marginBottom: '2rem'
            }}
          >
            THAMEEMUL AZARUDEEN
          </motion.h1>
        </GlitchContainer>

        <GlitchText
          className={glitchActive ? 'glitch-active' : ''}
          data-text="BLOCKCHAIN DEVELOPER"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          BLOCKCHAIN DEVELOPER
        </GlitchText>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ marginTop: '3rem' }}
        >
          <InteractiveElement>
            <button style={{
              background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
              transition: 'all 0.3s ease'
            }}>
              ENTER THE MATRIX
            </button>
          </InteractiveElement>
        </motion.div>

        <CRTText style={{ 
          position: 'absolute', 
          bottom: '2rem', 
          fontSize: '0.9rem',
          opacity: 0.7 
        }}>
          &gt; SYSTEM INITIALIZED_
        </CRTText>
      </div>
    </EnhancedHeroContainer>
  );
};

export default EnhancedHeroSection;