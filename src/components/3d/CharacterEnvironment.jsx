import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, Circle, Float } from '@react-three/drei';
import * as THREE from 'three';

// Professional Character Environment
const CharacterEnvironment = ({ characterPosition = [0, 0, 0] }) => {
  const gridRef = useRef();
  const particlesRef = useRef();
  const lightRingRef = useRef();
  
  // Create futuristic grid floor
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    return geometry;
  }, []);
  
  const gridMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#001100',
      emissive: '#00ff41',
      emissiveIntensity: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
  }, []);
  
  // Floating data particles
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        Math.random() * 8 + 1,
        (Math.random() - 0.5) * 15
      ],
      scale: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate grid
    if (gridRef.current) {
      gridRef.current.material.emissiveIntensity = 
        0.1 + Math.sin(time * 0.5) * 0.05;
    }
    
    // Animate light ring
    if (lightRingRef.current) {
      lightRingRef.current.rotation.y = time * 0.3;
      lightRingRef.current.position.y = Math.sin(time * 0.8) * 0.2;
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const particleData = particles[i];
        if (particleData) {
          particle.position.y = 
            particleData.position[1] + Math.sin(time * particleData.speed + particleData.phase) * 0.5;
          particle.rotation.y = time * particleData.speed;
          if (particle.material && particle.material.emissiveIntensity !== undefined) {
            particle.material.emissiveIntensity = 
              0.5 + Math.sin(time * 2 + i) * 0.3;
          }
        }
      });
    }
  });
  
  return (
    <group>
      {/* Futuristic Grid Floor */}
      <mesh 
        ref={gridRef}
        geometry={gridGeometry}
        material={gridMaterial}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      />
      
      {/* Central Light Ring */}
      <group ref={lightRingRef} position={characterPosition}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2, 0.02, 8, 32]} />
          <meshStandardMaterial 
            color="#00ff41"
            emissive="#00ff41"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        
        {/* Inner energy rings */}
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[1.5, 0.01, 6, 24]} />
          <meshStandardMaterial 
            color="#39ff14"
            emissive="#39ff14"
            emissiveIntensity={1}
            transparent
            opacity={0.4}
          />
        </mesh>
        
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[1, 0.01, 6, 24]} />
          <meshStandardMaterial 
            color="#00cc33"
            emissive="#00cc33"
            emissiveIntensity={1.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
      
      {/* Floating Data Particles */}
      <group ref={particlesRef}>
        {particles.map((particle, index) => (
          <Float 
            key={index} 
            speed={particle.speed}
            rotationIntensity={0.2}
            floatIntensity={0.5}
          >
            <mesh position={particle.position} scale={particle.scale}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial 
                color="#39ff14"
                emissive="#39ff14"
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      {/* Ambient Light Columns */}
      {Array.from({ length: 4 }, (_, i) => (
        <group key={i} position={[
          Math.cos(i * Math.PI / 2) * 8,
          0,
          Math.sin(i * Math.PI / 2) * 8
        ]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 4]} />
            <meshStandardMaterial 
              color="#00ff41"
              emissive="#00ff41"
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
      
      {/* Professional Lighting Setup */}
      <group>
        {/* Key Light */}
        <pointLight 
          position={[3, 4, 3]} 
          intensity={1.2}
          color="#00ff41"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
        />
        
        {/* Fill Light */}
        <pointLight 
          position={[-2, 3, 2]} 
          intensity={0.8}
          color="#39ff14"
        />
        
        {/* Back Light */}
        <pointLight 
          position={[0, 4, -4]} 
          intensity={0.6}
          color="#ffffff"
        />
        
        {/* Rim Light */}
        <pointLight 
          position={[4, 2, -2]} 
          intensity={0.4}
          color="#00cc33"
        />
        
        {/* Ambient Light */}
        <ambientLight intensity={0.2} color="#001100" />
        
        {/* Character-focused Spotlight */}
        <spotLight
          position={[0, 8, 5]}
          target-position={characterPosition}
          angle={Math.PI / 6}
          penumbra={0.5}
          intensity={0.8}
          color="#ffffff"
          castShadow
        />
      </group>
    </group>
  );
};

export default CharacterEnvironment;