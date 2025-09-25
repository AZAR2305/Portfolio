import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, Float, Line, Html, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import { usePerformanceOptimization } from '../../hooks/usePerformance';
import * as THREE from 'three';

const Enhanced3DTimeline = ({ experiences, scrollProgress = 0 }) => {
  const groupRef = useRef();
  const connectionLinesRef = useRef([]);
  const [hoveredExperience, setHoveredExperience] = useState(null);
  const { camera } = useThree();
  const { performanceLevel, isInViewport, elementRef, settings } = usePerformanceOptimization();

  // Performance-aware configuration
  const config = useMemo(() => ({
    particleCount: Math.floor(settings.particleCount * 0.7), // Fewer particles than skills wheel
    animationSpeed: settings.animationSpeed,
    showConnections: performanceLevel !== 'low',
    enableFloat: performanceLevel === 'high',
    maxRenderDistance: settings.renderDistance,
    showParticles: performanceLevel !== 'low',
    nodeDetail: performanceLevel === 'high' ? 32 : performanceLevel === 'medium' ? 16 : 8
  }), [settings, performanceLevel]);

  // Position experiences in 3D space along a curved timeline with performance optimization
  const timelinePositions = useMemo(() => {
    if (!experiences || experiences.length === 0) return [];
    
    return experiences.map((_, index) => {
      const t = index / (experiences.length - 1); // 0 to 1
      const radius = 3;
      const height = index * 2.5 - (experiences.length - 1) * 1.25; // Center vertically
      
      return {
        x: Math.cos(t * Math.PI * 1.5) * radius,
        y: height,
        z: Math.sin(t * Math.PI * 1.5) * radius,
        rotation: [0, -t * Math.PI * 1.5, 0]
      };
    });
  }, [experiences]);

  useFrame((state) => {
    if (!isInViewport) return; // Skip animation when not visible
    
    if (groupRef.current) {
      // Smooth rotation based on scroll and time (performance-aware)
      const time = state.clock.elapsedTime;
      const rotationSpeed = config.animationSpeed;
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5 + time * 0.02 * rotationSpeed;
      groupRef.current.position.y = Math.sin(time * 0.3 * rotationSpeed) * 0.1;
    }

    // Animate connection lines (only if enabled)
    if (config.showConnections) {
      connectionLinesRef.current.forEach((line, index) => {
        if (line) {
          const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2;
          line.material.opacity = opacity;
        }
      });
    }
  });

  const TimelineNode = ({ experience, position, rotation, index }) => {
    const nodeRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useFrame((state) => {
      if (!isInViewport || !nodeRef.current) return; // Performance optimization
      
      const time = state.clock.elapsedTime;
      const animationSpeed = config.animationSpeed;
      
      // Breathing animation (reduced intensity for performance)
      const breathe = 1 + Math.sin(time * 3 * animationSpeed + index) * 0.05;
      nodeRef.current.scale.setScalar(breathe);
      
      // Float animation (only for high performance)
      if (config.enableFloat) {
        nodeRef.current.position.y = position.y + Math.sin(time * 2 * animationSpeed + index) * 0.1;
      }
      
      // Check if node should be visible based on scroll
      const nodeProgress = index / Math.max(1, experiences.length - 1);
      setIsVisible(scrollProgress >= nodeProgress * 0.8);
    });

    const getExperienceGeometry = () => {
      switch (experience.type) {
        case 'senior':
          return (
            <group>
              {/* Main platform */}
              <Box args={[1.5, 0.3, 1.5]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#00ff41"
                  emissive="#00ff41"
                  emissiveIntensity={isHovered ? 0.6 : 0.4}
                />
              </Box>
              {/* Upper level */}
              <Box args={[1.2, 0.2, 1.2]} position={[0, 0.4, 0]}>
                <meshStandardMaterial
                  color="#39ff14"
                  emissive="#39ff14"
                  emissiveIntensity={0.5}
                />
              </Box>
              {/* Crown/achievement indicators */}
              {Array.from({ length: 4 }, (_, i) => (
                <Float key={i} speed={2} rotationIntensity={0.3}>
                  <Sphere
                    args={[0.08, 8, 8]}
                    position={[
                      Math.cos(i * Math.PI / 2) * 0.8,
                      0.8,
                      Math.sin(i * Math.PI / 2) * 0.8
                    ]}
                  >
                    <meshStandardMaterial
                      color="#ffff00"
                      emissive="#ffff00"
                      emissiveIntensity={0.8}
                    />
                  </Sphere>
                </Float>
              ))}
            </group>
          );
        case 'lead':
          return (
            <group>
              {/* Base platform */}
              <Box args={[1.3, 0.25, 1.3]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#39ff14"
                  emissive="#39ff14"
                  emissiveIntensity={isHovered ? 0.6 : 0.4}
                />
              </Box>
              {/* Leadership pillars */}
              {Array.from({ length: 3 }, (_, i) => (
                <Cylinder
                  key={i}
                  args={[0.05, 0.05, 0.6, 8]}
                  position={[
                    Math.cos(i * (Math.PI * 2) / 3) * 0.4,
                    0.5,
                    Math.sin(i * (Math.PI * 2) / 3) * 0.4
                  ]}
                >
                  <meshStandardMaterial
                    color="#00cc33"
                    emissive="#00cc33"
                    emissiveIntensity={0.5}
                  />
                </Cylinder>
              ))}
            </group>
          );
        case 'developer':
          return (
            <group>
              {/* Code block structure */}
              <Box args={[1.0, 0.2, 1.0]} position={[0, 0, 0]}>
                <meshStandardMaterial
                  color="#00cc33"
                  emissive="#00cc33"
                  emissiveIntensity={isHovered ? 0.6 : 0.4}
                />
              </Box>
              {/* Code elements */}
              {Array.from({ length: 6 }, (_, i) => (
                <Box
                  key={i}
                  args={[0.15, 0.05, 0.05]}
                  position={[
                    (i % 3 - 1) * 0.2,
                    0.3 + Math.floor(i / 3) * 0.1,
                    0
                  ]}
                >
                  <meshStandardMaterial
                    color="#66ff66"
                    emissive="#66ff66"
                    emissiveIntensity={0.7}
                  />
                </Box>
              ))}
            </group>
          );
        default:
          return (
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial color="#00ff41" wireframe />
            </Box>
          );
      }
    };

    return (
      <group
        ref={nodeRef}
        position={[position.x, position.y, position.z]}
        rotation={rotation}
        visible={isVisible}
        onPointerEnter={() => {
          setIsHovered(true);
          setHoveredExperience(experience);
        }}
        onPointerLeave={() => {
          setIsHovered(false);
          setHoveredExperience(null);
        }}
      >
        {getExperienceGeometry()}
        
        {/* Company name text */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.15}
          color="#00ff41"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {experience.company}
        </Text>
        
        {/* Position title */}
        <Text
          position={[0, -1.0, 0]}
          fontSize={0.12}
          color="#39ff14"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {experience.position}
        </Text>
        
        {/* Period */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.1}
          color="rgba(255,255,255,0.8)"
          anchorX="center"
          anchorY="middle"
        >
          {experience.period}
        </Text>
        
        {/* Hover glow effect */}
        {isHovered && (
          <Sphere args={[1.5, 16, 16]}>
            <meshStandardMaterial
              color="#00ff41"
              transparent
              opacity={0.1}
              emissive="#00ff41"
              emissiveIntensity={0.2}
            />
          </Sphere>
        )}
      </group>
    );
  };

  // Generate connection lines between timeline nodes
  const connectionLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < timelinePositions.length - 1; i++) {
      const start = timelinePositions[i];
      const end = timelinePositions[i + 1];
      lines.push({
        points: [
          new THREE.Vector3(start.x, start.y, start.z),
          new THREE.Vector3(end.x, end.y, end.z)
        ],
        index: i
      });
    }
    return lines;
  }, [timelinePositions]);

  return (
    <group ref={elementRef}>
      <group ref={groupRef}>
        {/* Central timeline core - only render if performance allows */}
        {config.showConnections && (
          <Cylinder args={[0.02, 0.02, experiences.length * 2.5, config.nodeDetail]}>
            <meshStandardMaterial
              color="#00ff41"
              emissive="#00ff41"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </Cylinder>
        )}
      
        {/* Timeline nodes */}
      {experiences.map((experience, index) => (
        <TimelineNode
          key={experience.id}
          experience={experience}
          position={timelinePositions[index]}
          rotation={timelinePositions[index].rotation}
          index={index}
        />
      ))}
      
      {/* Connection lines */}
      {connectionLines.map((line, index) => (
        <Line
          key={index}
          ref={el => connectionLinesRef.current[index] = el}
          points={line.points}
          color="#00ff41"
          transparent
          opacity={0.4}
          lineWidth={2}
        />
      ))}
      
      {/* Data particles flowing along timeline */}
      {Array.from({ length: 15 }, (_, i) => (
        <Float key={i} speed={3 + i * 0.1} rotationIntensity={0.2}>
          <Sphere
            args={[0.02, 4, 4]}
            position={[
              Math.cos(i * 0.5) * 4,
              (i - 7.5) * 0.5,
              Math.sin(i * 0.5) * 4
            ]}
          >
            <meshStandardMaterial
              color="#39ff14"
              emissive="#39ff14"
              emissiveIntensity={0.9}
            />
          </Sphere>
        </Float>
      ))}

      {/* Experience detail tooltip */}
      {hoveredExperience && (
        <Html position={[0, 3, 0]} style={{ pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              color: '#00ff41',
              padding: '15px 20px',
              borderRadius: '15px',
              border: '1px solid #00ff41',
              fontSize: '12px',
              maxWidth: '300px',
              textAlign: 'left',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#39ff14' }}>
              {hoveredExperience.position}
            </h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '11px', opacity: 0.9 }}>
              {hoveredExperience.description}
            </p>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>
              Key Technologies: {hoveredExperience.tech.slice(0, 4).join(', ')}
              {hoveredExperience.tech.length > 4 && '...'}
            </div>
          </motion.div>
        </Html>
      )}
      </group>
    </group>
  );
};

export default Enhanced3DTimeline;