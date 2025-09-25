import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import styled from 'styled-components';

// Import all 3D components
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';
import CustomCharacter from './CustomCharacter';
import InteractiveSkillsWheel from './InteractiveSkillsWheel';
import Enhanced3DTimeline from './Enhanced3DTimeline';
import Canvas3DErrorBoundary from '../Canvas3DErrorBoundary';

const MasterCanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
`;

const CanvasWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'enableInteraction'
})`
  width: 100%;
  height: 100%;
  pointer-events: ${props => props.enableInteraction ? 'auto' : 'none'};
`;

// Professional background elements
const ProfessionalElements = () => {
  const meshRef = useRef();
  
  return (
    <group>
      {/* Blockchain nodes network */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * Math.PI / 4) * 6,
            Math.sin(i * 0.7) * 2,
            Math.sin(i * Math.PI / 4) * 4
          ]}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial 
            color="#32CD32" 
            emissive="#32CD32" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh 
          key={`line-${i}`}
          position={[0, 0, 0]}
          rotation={[0, i * Math.PI / 3, 0]}
        >
          <cylinderGeometry args={[0.01, 0.01, 8]} />
          <meshStandardMaterial 
            color="#00FF88" 
            transparent 
            opacity={0.3}
            emissive="#00FF88"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles for contact section
const FloatingParticles = ({ count = 50 }) => {
  const particlesRef = useRef();
  
  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }, (_, i) => (
        <mesh 
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color="#32CD32"
            emissive="#32CD32"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Master lighting setup
const UnifiedLighting = () => (
  <>
    <ambientLight intensity={0.4} color="#ffffff" />
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
    <pointLight position={[5, 5, 5]} intensity={1} color="#32CD32" />
    <pointLight position={[-5, -5, -5]} intensity={0.6} color="#228B22" />
    <spotLight 
      position={[0, 15, 0]} 
      angle={Math.PI / 4} 
      penumbra={0.5} 
      intensity={2} 
      color="#00ff41"
    />
  </>
);

const MasterCanvas = ({ 
  currentSection = 'hero',
  scrollProgress = 0,
  mousePosition = { x: 0, y: 0 },
  experiences = [],
  useCustomCharacter = false, // Toggle between custom character and Ready Player Me
  customCharacterUrl = "/models/your-character.glb" // Path to your 3D model
}) => {
  const containerRef = useRef();
  const [enableInteraction, setEnableInteraction] = useState(false);
  
  // Enable interaction only when needed
  useEffect(() => {
    setEnableInteraction(['hero', 'about'].includes(currentSection));
  }, [currentSection]);

  return (
    <MasterCanvasContainer ref={containerRef}>
      <CanvasWrapper enableInteraction={enableInteraction}>
        <Canvas3DErrorBoundary>
          <Canvas
            camera={{ 
              position: [0, 2, 12], 
              fov: 75,
              near: 0.1,
              far: 1000
            }}
            gl={{ 
              antialias: false, // Disable for better compatibility
              alpha: true,
              powerPreference: "default", // Changed from high-performance
              stencil: false,
              depth: true,
              preserveDrawingBuffer: true, // Help prevent context loss
              failIfMajorPerformanceCaveat: false
            }}
            dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio
            performance={{ min: 0.1 }} // More lenient performance
            onCreated={({ gl, camera, scene }) => {
              // Optimize renderer settings
              gl.physicallyCorrectLights = false;
              gl.outputColorSpace = 'srgb';
              
              // Add error handling for WebGL context
              const canvas = gl.domElement;
              if (canvas && typeof canvas.addEventListener === 'function') {
                canvas.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('WebGL context lost in MasterCanvas');
                });
                canvas.addEventListener('webglcontextrestored', () => {
                  console.log('WebGL context restored in MasterCanvas');
                  // Reinitialize scene if needed
                });
              }
            }}
          >
            <Suspense fallback={null}>
              <UnifiedLighting />
              
              {/* Hero Section Elements */}
              {currentSection === 'hero' && (
                <group>
                  <ProfessionalElements />
                  {useCustomCharacter ? (
                    <CustomCharacter
                      modelUrl={customCharacterUrl}
                      position={[3, -1, 0]}
                      scale={1.8}
                      mousePosition={mousePosition}
                      currentAnimation="idle"
                      enableMouseTracking={true}
                      headTrackingStrength={0.3}
                    />
                  ) : (
                    <ReadyPlayerMeAvatar
                      position={[3, -1, 0]}
                      scale={1.8}
                      mousePosition={mousePosition}
                      currentAnimation="idle"
                      enableScrollAnimation={true}
                    />
                  )}
                </group>
              )}
              
              {/* About Section Elements */}
              {currentSection === 'about' && (
                <group position={[0, 0, 0]}>
                  <InteractiveSkillsWheel />
                </group>
              )}
              
              {/* Experience Section Elements */}
              {currentSection === 'experience' && (
                <group>
                  <Enhanced3DTimeline 
                    experiences={experiences}
                    scrollProgress={scrollProgress}
                  />
                </group>
              )}
              
              {/* Contact Section Elements */}
              {currentSection === 'contact' && (
                <group>
                  <FloatingParticles count={100} />
                  {/* Simple stars effect */}
                  {Array.from({ length: 200 }, (_, i) => (
                    <mesh 
                      key={i}
                      position={[
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 60,
                        (Math.random() - 0.5) * 100
                      ]}
                    >
                      <sphereGeometry args={[0.05]} />
                      <meshBasicMaterial color="#ffffff" />
                    </mesh>
                  ))}
                </group>
              )}
              
              <Environment preset="city" />
              <ContactShadows 
                opacity={0.4} 
                scale={10} 
                blur={1} 
                far={10} 
                resolution={256} 
              />
            </Suspense>
          </Canvas>
        </Canvas3DErrorBoundary>
      </CanvasWrapper>
    </MasterCanvasContainer>
  );
};

export default MasterCanvas;