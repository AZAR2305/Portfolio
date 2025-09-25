import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';
import Canvas3DErrorBoundary from '../Canvas3DErrorBoundary';

/**
 * Professional Avatar Scene Component
 * 
 * Complete setup with:
 * - Ready Player Me avatar integration
 * - Animation controls via buttons
 * - Mouse tracking for head movement
 * - Professional lighting and shadows
 * - Scroll-based animation triggers
 * - OrbitControls with rotation only
 */

// Styled Components
const AvatarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(50, 205, 50, 0.1);
`;

const ControlPanel = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
  flex-wrap: wrap;
  justify-content: center;
`;

const AnimationButton = styled(motion.button)`
  background: ${props => props.active ? '#32CD32' : 'rgba(50, 205, 50, 0.1)'};
  color: ${props => props.active ? '#0D0D0D' : '#32CD32'};
  border: 2px solid #32CD32;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #32CD32;
    color: #0D0D0D;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(50, 205, 50, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StatusIndicator = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(13, 13, 13, 0.8);
  color: #32CD32;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  border: 1px solid rgba(50, 205, 50, 0.3);
`;

// Professional Lighting Setup
const AvatarLighting = () => {
  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Fill light from the left */}
      <directionalLight
        position={[-3, 4, 2]}
        intensity={0.6}
        color="#f0f8ff"
      />
      
      {/* Rim light for silhouette */}
      <directionalLight
        position={[0, 2, -5]}
        intensity={0.8}
        color="#32CD32"
      />
      
      {/* Environment lighting for reflections */}
      <Environment preset="studio" />
    </>
  );
};

// Main Avatar Scene Component
const AvatarScene = ({ 
  className,
  enableScrollAnimation = true,
  showControls = true,
  initialAnimation = "idle"
}) => {
  const [currentAnimation, setCurrentAnimation] = useState(initialAnimation);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef();
  
  // Animation options - customize these based on your avatar's available animations
  const animationOptions = [
    { key: 'idle', label: 'Idle', description: 'Default standing pose' },
    { key: 'walking', label: 'Walk', description: 'Walking animation' },
    { key: 'sitting', label: 'Sit', description: 'Sitting pose' },
    { key: 'waving', label: 'Wave', description: 'Friendly wave' },
    { key: 'handsBack', label: 'Casual', description: 'Hands behind back' }
  ];
  
  // Mouse tracking for head movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position (-1 to 1)
      const x = (event.clientX - centerX) / (rect.width / 2);
      const y = (event.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Scroll-based animation (optional)
  useEffect(() => {
    if (!enableScrollAnimation) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Switch to walking animation when scrolling
      if (Math.abs(currentScrollY - scrollY) > 10) {
        if (currentAnimation === 'idle') {
          setCurrentAnimation('walking');
          
          // Return to idle after scroll stops
          setTimeout(() => {
            setCurrentAnimation('idle');
          }, 1000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollAnimation, currentAnimation, scrollY]);
  
  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AvatarContainer ref={containerRef} className={className}>
      <Canvas3DErrorBoundary>
        <Canvas
          camera={{ 
            position: [0, 0, 4], 
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          shadows
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* Professional Lighting Setup */}
          <AvatarLighting />
          
          {/* Ready Player Me Avatar */}
          <ReadyPlayerMeAvatar
            currentAnimation={currentAnimation}
            mousePosition={mousePosition}
            position={[0, -1.5, 0]}
            scale={1.8}
          />
          
          {/* Ground shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            resolution={256}
            color="#000000"
          />
          
          {/* Camera Controls - Rotation only */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 3}
            maxAzimuthAngle={Math.PI / 3}
            target={[0, 0, 0]}
          />
        </Canvas>
      </Canvas3DErrorBoundary>
      
      {/* Loading Indicator */}
      {isLoading && (
        <StatusIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Loading Avatar...
        </StatusIndicator>
      )}
      
      {/* Animation Status */}
      {!isLoading && (
        <StatusIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Animation: {animationOptions.find(opt => opt.key === currentAnimation)?.label || currentAnimation}
        </StatusIndicator>
      )}
      
      {/* Animation Control Buttons */}
      {showControls && !isLoading && (
        <ControlPanel
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {animationOptions.map((option) => (
            <AnimationButton
              key={option.key}
              active={currentAnimation === option.key}
              onClick={() => setCurrentAnimation(option.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={option.description}
            >
              {option.label}
            </AnimationButton>
          ))}
        </ControlPanel>
      )}
    </AvatarContainer>
  );
};

export default AvatarScene;

/**
 * CUSTOMIZATION GUIDE:
 * 
 * 1. Adding New Animations:
 *    - Add to animationOptions array
 *    - Update animationMap in ReadyPlayerMeAvatar.jsx
 * 
 * 2. Customizing Lighting:
 *    - Modify AvatarLighting component
 *    - Adjust intensity, color, and position values
 * 
 * 3. Camera Controls:
 *    - Modify OrbitControls props for different limits
 *    - Change camera position and fov in Canvas
 * 
 * 4. Mouse Sensitivity:
 *    - Adjust multipliers in head tracking (0.3, 0.2)
 *    - Modify lerp speed (0.05) for smoothness
 * 
 * 5. Scroll Animation:
 *    - Customize scroll threshold (10)
 *    - Modify return-to-idle timeout (1000ms)
 */