import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

const StyledWaterCursor = styled(motion.div)`
  position: absolute;
  width: 28px;
  height: 28px;
  background: radial-gradient(
    circle at 35% 25%,
    rgba(173, 216, 230, 0.95) 0%,
    rgba(135, 206, 235, 0.85) 25%,
    rgba(70, 130, 180, 0.75) 60%,
    rgba(25, 25, 112, 0.6) 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    0 0 25px rgba(173, 216, 230, 0.7),
    0 0 50px rgba(135, 206, 235, 0.4),
    inset 0 0 15px rgba(255, 255, 255, 0.4),
    inset 2px 2px 8px rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(173, 216, 230, 0.4);
  filter: blur(0.2px);
`;

const WaterTrail = styled(motion.div)`
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(173, 216, 230, 0.6) 0%,
    rgba(135, 206, 235, 0.4) 40%,
    rgba(70, 130, 180, 0.2) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(1.5px);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.3);
`;

const WaterDroplet = styled(motion.div)`
  position: absolute;
  background: radial-gradient(
    circle at 40% 30%,
    rgba(173, 216, 230, 0.9) 0%,
    rgba(135, 206, 235, 0.7) 50%,
    rgba(70, 130, 180, 0.5) 80%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    inset 0 0 6px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(173, 216, 230, 0.4);
  border: 0.5px solid rgba(173, 216, 230, 0.3);
`;

const ContainerLiquid = styled(motion.div)`
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(173, 216, 230, 0.18) 0%,
    rgba(135, 206, 235, 0.15) 25%,
    rgba(70, 130, 180, 0.12) 50%,
    rgba(135, 206, 235, 0.15) 75%,
    rgba(173, 216, 230, 0.18) 100%
  );
  backdrop-filter: blur(3px) saturate(1.2);
  border: 1px solid rgba(173, 216, 230, 0.3);
  box-shadow: 
    inset 0 0 30px rgba(173, 216, 230, 0.15),
    inset 0 0 60px rgba(135, 206, 235, 0.1),
    0 0 40px rgba(135, 206, 235, 0.25),
    0 0 80px rgba(173, 216, 230, 0.15);
  pointer-events: none;
  border-radius: inherit;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.08) 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.08) 75%,
      transparent 100%
    );
    border-radius: inherit;
    animation: liquidShimmer 3s ease-in-out infinite;
  }
  
  @keyframes liquidShimmer {
    0%, 100% { opacity: 0.5; transform: translateX(-2px); }
    50% { opacity: 1; transform: translateX(2px); }
  }
`;

const LiquidParticle = styled(motion.div)`
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(173, 216, 230, 0.8) 0%,
    rgba(135, 206, 235, 0.6) 40%,
    rgba(70, 130, 180, 0.4) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(0.8px);
  box-shadow: 
    inset 0 0 4px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(173, 216, 230, 0.3);
`;

const WaterCursorComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [droplets, setDroplets] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [liquidParticles, setLiquidParticles] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  
  const trailId = useRef(0);
  const dropletId = useRef(0);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const moveTimeout = useRef();

  const createTrail = useCallback((x, y, intensity = 1) => {
    const newTrail = {
      id: trailId.current++,
      x,
      y,
      size: 15 + Math.random() * 10 * intensity,
      opacity: 0.4 + Math.random() * 0.3 * intensity,
      blur: 1 + Math.random() * 2,
      createdAt: Date.now()
    };
    
    setTrails(prev => [...prev.slice(-8), newTrail]);
  }, []);

  const createDroplet = useCallback((x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const targetX = x + Math.cos(angle) * distance;
    const targetY = y + Math.sin(angle) * distance;
    
    const newDroplet = {
      id: dropletId.current++,
      x,
      y,
      targetX,
      targetY,
      size: 4 + Math.random() * 6,
      createdAt: Date.now()
    };
    
    setDroplets(prev => [...prev.slice(-15), newDroplet]);
  }, []);

  const createLiquidParticles = useCallback((element) => {
    const rect = element.getBoundingClientRect();
    const particles = [];
    
    // Create floating particles within the container
    for (let i = 0; i < 8; i++) {
      particles.push({
        id: particleId.current++,
        x: rect.left + Math.random() * rect.width,
        y: rect.top + Math.random() * rect.height,
        size: 3 + Math.random() * 4,
        floatX: (Math.random() - 0.5) * 20,
        floatY: (Math.random() - 0.5) * 20,
        createdAt: Date.now()
      });
    }
    
    setLiquidParticles(particles);
  }, []);

  const getHoverableElement = useCallback((x, y) => {
    // Get elements that should have liquid effects
    const elements = document.elementsFromPoint(x, y);
    return elements.find(el => 
      el.tagName === 'BUTTON' ||
      el.tagName === 'A' ||
      el.classList.contains('liquid-hover') ||
      el.classList.contains('project-card') ||
      el.closest('.liquid-hover') ||
      el.closest('.card') ||
      el.closest('.section') ||
      el.closest('nav') ||
      el.closest('.hero-content') ||
      el.closest('.project-card') ||
      el.closest('.skill-item') ||
      el.closest('.contact-form') ||
      el.closest('button') ||
      el.closest('a')
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
      
      // Calculate movement intensity
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const intensity = Math.min(speed / 50, 2);
      
      setIsMoving(speed > 2);
      
      // Clear movement timeout
      clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 100);
      
      // Create trails based on movement
      if (speed > 3) {
        createTrail(x, y, intensity);
        
        // Create droplets occasionally when moving fast
        if (speed > 15 && Math.random() < 0.3) {
          createDroplet(x, y);
        }
      }
      
      // Check for hoverable elements
      const element = getHoverableElement(x, y);
      if (element !== hoveredElement) {
        setHoveredElement(element);
        if (element) {
          createLiquidParticles(element);
        } else {
          setLiquidParticles([]);
        }
      }
      
      lastPosition.current = { x, y };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [createTrail, createDroplet, createLiquidParticles, getHoverableElement, hoveredElement]);

  // Clean up old trails and droplets
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.createdAt < 1000));
      setDroplets(prev => prev.filter(droplet => now - droplet.createdAt < 2000));
      setLiquidParticles(prev => prev.filter(particle => now - particle.createdAt < 3000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <CursorContainer>
      {/* Main Water Cursor */}
      <StyledWaterCursor
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isMoving ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Water Trails */}
      <AnimatePresence>
        {trails.map((trail) => (
          <WaterTrail
            key={trail.id}
            initial={{ 
              x: trail.x, 
              y: trail.y, 
              scale: 0, 
              opacity: trail.opacity 
            }}
            animate={{ 
              scale: 1, 
              opacity: trail.opacity * 0.7 
            }}
            exit={{ 
              scale: 1.5, 
              opacity: 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: `${trail.size}px`,
              height: `${trail.size}px`,
              filter: `blur(${trail.blur}px)`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Water Droplets */}
      <AnimatePresence>
        {droplets.map((droplet) => (
          <WaterDroplet
            key={droplet.id}
            initial={{
              x: droplet.x,
              y: droplet.y,
              scale: 1,
              opacity: 0.8,
            }}
            animate={{
              x: droplet.targetX,
              y: droplet.targetY,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              width: `${droplet.size}px`,
              height: `${droplet.size}px`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Container Liquid Effect */}
      <AnimatePresence>
        {hoveredElement && (
          <ContainerLiquid
            key="container-liquid"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: hoveredElement.offsetLeft,
              y: hoveredElement.offsetTop,
              width: hoveredElement.offsetWidth,
              height: hoveredElement.offsetHeight,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
            style={{
              borderRadius: getComputedStyle(hoveredElement).borderRadius || '8px',
            }}
          />
        )}
      </AnimatePresence>

      {/* Liquid Particles */}
      <AnimatePresence>
        {liquidParticles.map((particle) => (
          <LiquidParticle
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: particle.x + particle.floatX,
              y: particle.y + particle.floatY,
              scale: 1,
              opacity: 0.6,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </AnimatePresence>
    </CursorContainer>
  );
};

export default WaterCursorComponent;