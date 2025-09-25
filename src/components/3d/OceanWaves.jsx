import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

const OceanWaves = ({ position = [0, -2, 0], scale = 10 }) => {
  const meshRef = useRef();
  
  // Create wave geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(scale, scale, 32, 32);
    const positions = geo.attributes.position.array;
    
    // Store original positions for wave animation
    geo.userData = { originalPositions: [...positions] };
    
    return geo;
  }, [scale]);

  // Animate waves
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array;
    const originalPositions = meshRef.current.geometry.userData.originalPositions;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      
      // Create wave pattern
      const waveHeight = Math.sin(x * 0.5 + time) * 0.1 +
                        Math.sin(y * 0.3 + time * 1.2) * 0.05 +
                        Math.sin((x + y) * 0.2 + time * 0.8) * 0.03;
      
      positions[i + 2] = waveHeight;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
      <meshStandardMaterial 
        color="#1E90FF"
        transparent
        opacity={0.6}
        roughness={0}
        metalness={0.8}
        emissive="#003366"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default OceanWaves;