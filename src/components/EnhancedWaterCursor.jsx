import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Main cursor component
const MainCursor = styled(motion.div)`
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(
    circle,
    rgba(173, 216, 230, 0.9) 0%,
    rgba(135, 206, 235, 0.7) 40%,
    rgba(70, 130, 180, 0.5) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
  filter: blur(0.5px);
  box-shadow: 
    0 0 10px rgba(173, 216, 230, 0.6),
    inset 0 0 5px rgba(255, 255, 255, 0.3);
`;

// Water trail effects
const WaterTrail = styled(motion.div)`
  position: fixed;
  background: radial-gradient(
    circle,
    rgba(173, 216, 230, 0.6) 0%,
    rgba(135, 206, 235, 0.4) 40%,
    rgba(70, 130, 180, 0.2) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9998;
  filter: blur(1px);
`;

// Water droplets that break away
const WaterDroplet = styled(motion.div)`
  position: fixed;
  background: radial-gradient(
    circle at 40% 30%,
    rgba(173, 216, 230, 0.9) 0%,
    rgba(135, 206, 235, 0.7) 50%,
    rgba(70, 130, 180, 0.5) 80%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9997;
  box-shadow: 
    inset 0 0 6px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(173, 216, 230, 0.4);
  border: 0.5px solid rgba(173, 216, 230, 0.3);
`;

// Water border that flows around container edges
const WaterBorder = styled(motion.div)`
  position: fixed;
  pointer-events: none;
  z-index: 9996;
  border-radius: inherit;
  
  /* Top border water */
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(173, 216, 230, 0.8) 20%,
      rgba(135, 206, 235, 0.9) 50%,
      rgba(173, 216, 230, 0.8) 80%,
      transparent 100%
    );
    border-radius: 20px;
    filter: blur(1px);
    animation: waterFlowTop 2s ease-in-out infinite;
  }
  
  /* Bottom border water */
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(173, 216, 230, 0.8) 20%,
      rgba(135, 206, 235, 0.9) 50%,
      rgba(173, 216, 230, 0.8) 80%,
      transparent 100%
    );
    border-radius: 20px;
    filter: blur(1px);
    animation: waterFlowBottom 2s ease-in-out infinite reverse;
  }
  
  @keyframes waterFlowTop {
    0%, 100% { 
      transform: scaleX(0.3) translateX(-50%);
      opacity: 0.5;
    }
    50% { 
      transform: scaleX(1) translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes waterFlowBottom {
    0%, 100% { 
      transform: scaleX(0.3) translateX(50%);
      opacity: 0.5;
    }
    50% { 
      transform: scaleX(1) translateX(0);
      opacity: 1;
    }
  }
`;

// Left and right water borders
const WaterSides = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  pointer-events: none;
  z-index: 9996;
  
  &.left {
    left: -3px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(173, 216, 230, 0.9) 20%,
      rgba(135, 206, 235, 0.8) 50%,
      rgba(173, 216, 230, 0.9) 80%,
      transparent 100%
    );
    border-radius: 20px;
    filter: blur(1px);
    animation: waterFlowLeft 2.5s ease-in-out infinite;
  }
  
  &.right {
    right: -3px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(173, 216, 230, 0.9) 20%,
      rgba(135, 206, 235, 0.8) 50%,
      rgba(173, 216, 230, 0.9) 80%,
      transparent 100%
    );
    border-radius: 20px;
    filter: blur(1px);
    animation: waterFlowRight 2.5s ease-in-out infinite reverse;
  }
  
  @keyframes waterFlowLeft {
    0%, 100% { 
      transform: scaleY(0.4) translateY(-30%);
      opacity: 0.6;
    }
    50% { 
      transform: scaleY(1) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes waterFlowRight {
    0%, 100% { 
      transform: scaleY(0.4) translateY(30%);
      opacity: 0.6;
    }
    50% { 
      transform: scaleY(1) translateY(0);
      opacity: 1;
    }
  }
`;

// Breaking water particles
const BreakingParticle = styled(motion.div)`
  position: fixed;
  background: radial-gradient(
    circle,
    rgba(173, 216, 230, 0.8) 0%,
    rgba(135, 206, 235, 0.6) 40%,
    rgba(70, 130, 180, 0.4) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9997;
  filter: blur(0.8px);
  box-shadow: 
    inset 0 0 4px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(173, 216, 230, 0.3);
`;

const EnhancedWaterCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [droplets, setDroplets] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [breakingParticles, setBreakingParticles] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  
  const trailId = useRef(0);
  const dropletId = useRef(0);
  const particleId = useRef(0);
  const moveTimeout = useRef();
  const lastHoverElement = useRef(null);

  // Create water trail
  const createTrail = useCallback((x, y, intensity = 1) => {
    const newTrail = {
      id: trailId.current++,
      x,
      y,
      size: 12 + Math.random() * 8 * intensity,
      opacity: 0.6 * intensity,
      createdAt: Date.now()
    };
    
    setTrails(prev => [...prev.slice(-15), newTrail]);
  }, []);

  // Create water droplets
  const createDroplet = useCallback((x, y) => {
    const count = Math.random() * 3 + 2;
    const newDroplets = [];
    
    for (let i = 0; i < count; i++) {
      newDroplets.push({
        id: dropletId.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        gravity: 0.1,
        opacity: 0.8,
        createdAt: Date.now()
      });
    }
    
    setDroplets(prev => [...prev, ...newDroplets].slice(-20));
  }, []);

  // Create breaking particles when entering/leaving containers
  const createBreakingEffect = useCallback((x, y, direction = 1) => {
    const particleCount = 12 + Math.random() * 8;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.8;
      const speed = 3 + Math.random() * 4;
      
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 2,
        vx: Math.cos(angle) * speed * direction,
        vy: Math.sin(angle) * speed * direction,
        opacity: 0.9 + Math.random() * 0.1,
        decay: 0.015,
        createdAt: Date.now()
      });
    }
    
    setBreakingParticles(prev => [...prev, ...newParticles].slice(-40));
  }, []);

  // Get hoverable elements
  const getHoverableElement = useCallback((x, y) => {
    const elements = document.elementsFromPoint(x, y);
    return elements.find(el => 
      el.classList.contains('liquid-hover') ||
      el.classList.contains('project-card') ||
      el.tagName === 'BUTTON' ||
      el.tagName === 'A' ||
      el.closest('.liquid-hover') ||
      el.closest('button') ||
      el.closest('a')
    );
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setMousePosition({ x, y });
      
      // Movement intensity based on speed
      const intensity = Math.min(Math.abs(e.movementX) + Math.abs(e.movementY), 20) / 20;
      
      if (intensity > 0.1) {
        setIsMoving(true);
        createTrail(x, y, intensity);
        
        // Create droplets on fast movement
        if (intensity > 0.7 && Math.random() > 0.7) {
          createDroplet(x, y);
        }
        
        clearTimeout(moveTimeout.current);
        moveTimeout.current = setTimeout(() => setIsMoving(false), 150);
      }
      
      // Check for hoverable elements
      const element = getHoverableElement(x, y);
      
      if (element !== lastHoverElement.current) {
        if (lastHoverElement.current) {
          // Breaking effect when leaving element
          createBreakingEffect(x, y, -1);
        }
        
        if (element) {
          // Breaking effect when entering element
          createBreakingEffect(x, y, 1);
          const rect = element.getBoundingClientRect();
          setHoveredElement({
            element,
            rect: {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
              borderRadius: getComputedStyle(element).borderRadius || '0px'
            }
          });
        } else {
          setHoveredElement(null);
        }
        
        lastHoverElement.current = element;
      }
    };

    const handleMouseLeave = () => {
      setHoveredElement(null);
      lastHoverElement.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(moveTimeout.current);
    };
  }, [createTrail, createDroplet, createBreakingEffect, getHoverableElement]);

  // Clean up old trails and droplets
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setTrails(prev => prev.filter(trail => now - trail.createdAt < 800));
      setDroplets(prev => prev.filter(droplet => now - droplet.createdAt < 2000));
      setBreakingParticles(prev => prev.filter(particle => now - particle.createdAt < 1500));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <MainCursor
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isMoving ? 1.3 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Water trails */}
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
              opacity: 0
            }}
            exit={{
              scale: 0.5,
              opacity: 0
            }}
            transition={{ duration: 0.8 }}
            style={{
              width: trail.size,
              height: trail.size
            }}
          />
        ))}
      </AnimatePresence>

      {/* Water droplets */}
      <AnimatePresence>
        {droplets.map((droplet) => (
          <WaterDroplet
            key={droplet.id}
            initial={{
              x: droplet.x,
              y: droplet.y,
              scale: 0,
              opacity: droplet.opacity
            }}
            animate={{
              x: droplet.x + droplet.vx * 100,
              y: droplet.y + droplet.vy * 100 + 50, // Gravity effect
              scale: [0, 1, 0.8, 0],
              opacity: [droplet.opacity, droplet.opacity * 0.8, droplet.opacity * 0.4, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
            style={{
              width: droplet.size,
              height: droplet.size
            }}
          />
        ))}
      </AnimatePresence>

      {/* Breaking particles */}
      <AnimatePresence>
        {breakingParticles.map((particle) => (
          <BreakingParticle
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: particle.opacity
            }}
            animate={{
              x: particle.x + particle.vx * 100,
              y: particle.y + particle.vy * 100 + 30, // Add gravity effect
              scale: [0, 1.2, 0.8, 0.4, 0],
              opacity: [particle.opacity, particle.opacity * 0.8, particle.opacity * 0.5, particle.opacity * 0.2, 0],
              rotate: [0, 180, 360] // Add rotation for more dynamic effect
            }}
            transition={{
              duration: 2,
              ease: [0.23, 1, 0.32, 1] // Custom easing for more natural movement
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </AnimatePresence>

      {/* Water borders around container */}
      <AnimatePresence>
        {hoveredElement && (
          <WaterBorder
            initial={{
              x: hoveredElement.rect.left,
              y: hoveredElement.rect.top,
              width: hoveredElement.rect.width,
              height: hoveredElement.rect.height,
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.3 }
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.5
            }}
            style={{
              borderRadius: hoveredElement.rect.borderRadius
            }}
          >
            {/* Left water side */}
            <WaterSides 
              className="left"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            />
            
            {/* Right water side */}
            <WaterSides 
              className="right"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            />
          </WaterBorder>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedWaterCursor;