import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { usePerformanceOptimization } from '../../hooks/usePerformance';
import * as THREE from 'three';

// Advanced 3D Character Component for Thameemul Azarudeen using Ready Player Me model
const DigitalTwin = ({ 
  mousePosition = { x: 0, y: 0 }, 
  scrollProgress = 0,
  currentSection = 'hero',
  scale = 1,
  position = [0, 0, 0],
  enableControls = true 
}) => {
  const characterRef = useRef();
  const [animationState, setAnimationState] = useState('idle');
  const { performanceLevel, isInViewport, elementRef, settings } = usePerformanceOptimization();
  const [lookTarget, setLookTarget] = useState([0, 0, 0]);
  
  // Performance-aware configuration
  const config = useMemo(() => ({
    enableMorphTargets: performanceLevel === 'high',
    shadowMapSize: performanceLevel === 'high' ? 1024 : performanceLevel === 'medium' ? 512 : 256,
    animationSpeed: settings.animationSpeed,
    enableLighting: performanceLevel !== 'low',
    modelQuality: performanceLevel === 'high' ? 'high' : 'medium'
  }), [performanceLevel, settings]);
  
  // Load the Ready Player Me model with performance considerations
  const { scene, animations } = useGLTF('https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb');
  const { actions } = useAnimations(animations, characterRef);

  // Animation state management based on current section
  useEffect(() => {
    switch (currentSection) {
      case 'hero':
        setAnimationState('idle');
        break;
      case 'about':
        setAnimationState('pointing');
        break;
      case 'projects':
        setAnimationState('presenting');
        break;
      case 'experience':
        setAnimationState('walking');
        break;
      case 'contact':
        setAnimationState('wave');
        break;
      default:
        setAnimationState('idle');
    }
  }, [currentSection]);

  // Mouse tracking for head and eye movement
  useEffect(() => {
    if (mousePosition) {
      const targetX = (mousePosition.x - 0.5) * 0.5;
      const targetY = -(mousePosition.y - 0.5) * 0.3;
      setLookTarget([targetX, targetY, 0]);
    }
  }, [mousePosition]);

  // Play animations based on state
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Stop all actions first
      Object.values(actions).forEach(action => action.stop());
      
      // Play appropriate animation if available
      const animationNames = Object.keys(actions);
      let targetAnimation = 'Idle';
      
      if (animationState === 'wave' && actions['Wave']) {
        targetAnimation = 'Wave';
      } else if (animationState === 'walking' && actions['Walking']) {
        targetAnimation = 'Walking';
      } else if (actions['Idle']) {
        targetAnimation = 'Idle';
      } else if (animationNames.length > 0) {
        targetAnimation = animationNames[0];
      }
      
      if (actions[targetAnimation]) {
        actions[targetAnimation].play();
      }
    }
  }, [actions, animationState]);

  // Performance-optimized animation frame loop
  useFrame((state) => {
    if (!isInViewport || !characterRef.current) return; // Skip when not visible
    
    const time = state.clock.elapsedTime;
    const character = characterRef.current;
    const animationSpeed = config.animationSpeed;
    
    // Basic idle animations (performance-aware)
    if (animationState === 'idle') {
      // Subtle breathing animation
      character.scale.setScalar(scale + Math.sin(time * 2 * animationSpeed) * 0.005);
      
      // Slight body rotation (reduced for lower performance)
      if (config.enableLighting) {
        character.rotation.y = Math.sin(time * 0.5 * animationSpeed) * 0.05;
        character.rotation.x = Math.sin(time * 0.3 * animationSpeed) * 0.02;
      }
    }
    
    // Enhanced wave animation for contact section
    if (animationState === 'wave' && config.enableLighting) {
      character.rotation.y = Math.sin(time * 0.5 * animationSpeed) * 0.1;
    }
    
    // Walking animation for experience section
    if (animationState === 'walking') {
      character.position.z = Math.sin(time * 1.2) * 0.1;
      character.rotation.y = Math.sin(time * 0.8) * 0.05;
    }
    
    // Pointing gesture for about section
    if (animationState === 'pointing') {
      character.rotation.y = Math.sin(time * 0.4) * 0.08 + 0.2;
    }
    
    // Presenting gesture for projects section
    if (animationState === 'presenting') {
      character.rotation.y = Math.sin(time * 0.6) * 0.1;
      character.position.y = position[1] + Math.sin(time * 1.5) * 0.02;
    }
  });

  // Fix material properties for better visibility
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Ensure materials are properly lit
          if (child.material) {
            child.material.needsUpdate = true;
            // Add some emissive light to prevent complete darkness
            if (child.material.emissive) {
              child.material.emissive.setHex(0x222222);
              child.material.emissiveIntensity = 0.1;
            }
          }
        }
      });
    }
  }, [scene]);

  return (
    <group ref={elementRef}>
      {/* Enhanced lighting for better avatar visibility */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow 
      />
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.8} 
        color="#87CEEB"
      />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#FFD700" />
      
      <group 
        ref={characterRef} 
        position={position} 
        scale={[scale, scale, scale]}
        castShadow={config.enableLighting}
        receiveShadow={config.enableLighting}
      >
        {/* Ready Player Me Character Model - performance optimized */}
        {scene && (
          <primitive 
            object={scene} 
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
          />
        )}
      
      {/* One Piece themed accessories */}
      <group position={[0, 0, 0]}>
        {/* Ocean wave effect around character */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
          <meshStandardMaterial 
            color="#1E90FF"
            transparent
            opacity={0.2}
            emissive="#1E90FF"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Floating treasure particles around character */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * Math.PI / 4) * 1.2,
              Math.sin(i * 0.7) * 0.5 + 0.5,
              Math.sin(i * Math.PI / 4) * 1.2
            ]}
          >
            <octahedronGeometry args={[0.03]} />
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.7}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
        
        {/* Compass rings */}
        {Array.from({ length: 3 }, (_, i) => (
          <mesh key={`ring-${i}`} position={[0, i * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6 + i * 0.2, 0.01, 8, 32]} />
            <meshStandardMaterial 
              color="#DC143C"
              transparent
              opacity={0.4 - i * 0.1}
              emissive="#DC143C"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
      
      {/* Interactive Controls */}
      {enableControls && (
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={currentSection === 'hero'}
          autoRotateSpeed={0.5}
        />
      )}
      </group>
    </group>
  );
};// Preload the model for better performance
useGLTF.preload('https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb');

export default DigitalTwin;