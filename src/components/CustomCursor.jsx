import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const MainCursor = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, 
    rgba(102, 126, 234, 0.8) 0%, 
    rgba(118, 75, 162, 0.6) 50%, 
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(1px);
`;

const CursorTrail = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, 
    rgba(102, 126, 234, ${props => props.opacity}) 0%, 
    rgba(118, 75, 162, ${props => props.opacity * 0.7}) 30%, 
    transparent 70%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(${props => props.blur}px);
`;

const RippleEffect = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const InteractiveBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
      rgba(102, 126, 234, 0.03) 0%, 
      rgba(118, 75, 162, 0.02) 25%, 
      transparent 50%
    );
    transition: all 0.3s ease;
    animation: backgroundPulse 8s ease-in-out infinite;
  }
  
  @keyframes backgroundPulse {
    0%, 100% {
      opacity: 0.5;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;

const WaterDroplet = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle at 30% 30%, 
    rgba(102, 126, 234, 0.6), 
    rgba(118, 75, 162, 0.4), 
    transparent
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(0.5px);
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrails, setCursorTrails] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update CSS custom properties for background
      if (backgroundRef.current) {
        backgroundRef.current.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        backgroundRef.current.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
      }
      
      // Add trail effect
      const newTrail = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 10,
        opacity: Math.random() * 0.5 + 0.3,
        blur: Math.random() * 2 + 1
      };
      
      setCursorTrails(prev => [...prev.slice(-8), newTrail]);
    };

    const handleClick = (e) => {
      setIsClicking(true);
      
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Create water droplets
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const droplet = {
            id: Date.now() + i,
            x: e.clientX + (Math.random() - 0.5) * 100,
            y: e.clientY + (Math.random() - 0.5) * 100,
            size: Math.random() * 8 + 4
          };
          
          setCursorTrails(prev => [...prev, droplet]);
        }, i * 50);
      }
      
      setTimeout(() => setIsClicking(false), 150);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Clean up old trails and ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrails(prev => prev.slice(-15));
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.id < 2000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <InteractiveBackground ref={backgroundRef} />
      
      <CursorContainer>
        {/* Main cursor */}
        <MainCursor
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isClicking ? 1.5 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
          }}
        />

        {/* Cursor trails */}
        {cursorTrails.map((trail, index) => (
          <CursorTrail
            key={trail.id}
            size={trail.size}
            opacity={trail.opacity}
            blur={trail.blur}
            initial={{
              x: trail.x,
              y: trail.y,
              scale: 0,
              opacity: trail.opacity
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [trail.opacity, trail.opacity * 0.5, 0]
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Water droplets */}
        {cursorTrails.filter(item => item.size < 10).map((droplet) => (
          <WaterDroplet
            key={droplet.id}
            size={droplet.size}
            initial={{
              x: droplet.x,
              y: droplet.y,
              scale: 0,
              opacity: 0.8
            }}
            animate={{
              y: droplet.y + 200,
              scale: [0, 1, 0.5],
              opacity: [0.8, 0.4, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeIn"
            }}
          />
        ))}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <RippleEffect
            key={ripple.id}
            initial={{
              x: ripple.x,
              y: ripple.y,
              scale: 0,
              opacity: 0.6
            }}
            animate={{
              scale: [0, 1, 2],
              opacity: [0.6, 0.3, 0]
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
          />
        ))}
      </CursorContainer>
    </>
  );
};

export default CustomCursor;