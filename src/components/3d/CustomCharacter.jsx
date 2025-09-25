import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

/**
 * Custom Character Component
 * 
 * Features:
 * - Loads your own 3D character model (GLB/GLTF)
 * - Animation system with support for various animations
 * - Head/body tracking that follows mouse cursor
 * - Smooth animation transitions
 * - Professional lighting setup
 * - Configurable positioning and scaling
 */
const CustomCharacter = ({ 
  modelUrl = "/models/your-character.glb", // Default path - replace with your model
  currentAnimation = "idle",
  mousePosition = { x: 0, y: 0 },
  scale = 1,
  position = [0, -1, 0],
  enableMouseTracking = true,
  rotationSpeed = 0.01,
  headTrackingStrength = 0.3
}) => {
  const characterRef = useRef();
  const headBoneRef = useRef();
  const mixerRef = useRef();
  
  // Load the GLTF model with error handling
  const [modelData, setModelData] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  
  useEffect(() => {
    const loader = new GLTFLoader();
    
    loader.load(
      modelUrl,
      (gltf) => {
        console.log('Custom character loaded:', gltf);
        setModelData(gltf);
        setLoadingError(null);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading custom character:', error);
        setLoadingError(error);
      }
    );
  }, [modelUrl]);
  
  // Use animations if available
  const { actions, mixer } = useAnimations(modelData?.animations || [], characterRef);
  
  // Animation state management
  const [currentAction, setCurrentAction] = useState(null);
  const [previousAnimation, setPreviousAnimation] = useState("");
  
  // Store mixer reference for cleanup
  useEffect(() => {
    mixerRef.current = mixer;
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [mixer]);
  
  // Find head/neck bone for mouse tracking
  useEffect(() => {
    if (modelData?.scene) {
      modelData.scene.traverse((child) => {
        // Look for head, neck, or spine bones for tracking
        if (child.isBone && (
          child.name.toLowerCase().includes('head') ||
          child.name.toLowerCase().includes('neck') ||
          child.name.toLowerCase().includes('spine') ||
          child.name === 'Head' ||
          child.name === 'head' ||
          child.name === 'Neck' ||
          child.name === 'neck'
        )) {
          headBoneRef.current = child;
          console.log('Found tracking bone:', child.name);
        }
      });
    }
  }, [modelData]);
  
  // Animation management
  useEffect(() => {
    if (!actions || !mixer || previousAnimation === currentAnimation) return;
    
    // Stop previous animation with fade out
    if (currentAction) {
      currentAction.fadeOut(0.5);
    }
    
    // Find and play new animation
    let newAction = null;
    
    // Extended animation mapping for various naming conventions
    const animationMap = {
      idle: [
        'idle', 'Idle', 'IDLE',
        'rest', 'Rest', 'REST',
        'breathe', 'Breathe', 'breathing',
        'stand', 'Stand', 'standing',
        'default', 'Default'
      ],
      walking: [
        'walk', 'Walk', 'WALK',
        'walking', 'Walking', 'WALKING',
        'run', 'Run', 'RUN',
        'running', 'Running', 'RUNNING'
      ],
      sitting: [
        'sit', 'Sit', 'SIT',
        'sitting', 'Sitting', 'SITTING',
        'seated', 'Seated', 'SEATED'
      ],
      waving: [
        'wave', 'Wave', 'WAVE',
        'waving', 'Waving', 'WAVING',
        'hello', 'Hello', 'HELLO',
        'greeting', 'Greeting'
      ],
      talking: [
        'talk', 'Talk', 'TALK',
        'talking', 'Talking', 'TALKING',
        'speak', 'Speaking', 'speaking'
      ],
      dancing: [
        'dance', 'Dance', 'DANCE',
        'dancing', 'Dancing', 'DANCING'
      ]
    };
    
    // Try to find matching animation
    const possibleNames = animationMap[currentAnimation] || [currentAnimation];
    
    for (const name of possibleNames) {
      if (actions[name]) {
        newAction = actions[name];
        console.log(`Playing animation: ${name}`);
        break;
      }
    }
    
    // Fallback to first available animation if none found
    if (!newAction && Object.keys(actions).length > 0) {
      const fallbackName = Object.keys(actions)[0];
      newAction = actions[fallbackName];
      console.warn(`Animation "${currentAnimation}" not found, using fallback: ${fallbackName}`);
    }
    
    if (newAction) {
      newAction.reset();
      newAction.fadeIn(0.5);
      newAction.play();
      setCurrentAction(newAction);
    }
    
    setPreviousAnimation(currentAnimation);
  }, [currentAnimation, actions, mixer, currentAction, previousAnimation]);
  
  // Mouse tracking and animation updates
  useFrame((state, delta) => {
    if (!characterRef.current) return;
    
    // Update animation mixer
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    // Mouse-based head tracking
    if (enableMouseTracking && headBoneRef.current && mousePosition) {
      const targetRotationY = (mousePosition.x - 0.5) * headTrackingStrength;
      const targetRotationX = (mousePosition.y - 0.5) * headTrackingStrength * 0.5;
      
      // Smooth interpolation
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        -targetRotationX,
        0.1
      );
    }
    
    // Subtle idle movement for the whole character
    if (currentAnimation === 'idle') {
      characterRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.5) * rotationSpeed;
      characterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });
  
  // Handle loading states
  if (loadingError) {
    console.error('Failed to load character model:', loadingError);
    return (
      <group position={position} scale={scale}>
        {/* Fallback placeholder */}
        <mesh>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#feca57" />
        </mesh>
      </group>
    );
  }
  
  if (!modelData) {
    return (
      <group position={position} scale={scale}>
        {/* Loading placeholder */}
        <mesh>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshStandardMaterial 
            color="#48cae4" 
            transparent 
            opacity={0.6}
            emissive="#48cae4"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    );
  }
  
  return (
    <group 
      ref={characterRef}
      position={position}
      scale={scale}
      dispose={null}
    >
      <primitive 
        object={modelData.scene} 
        scale={1}
      />
    </group>
  );
};

// Preload the default model
useGLTF.preload("/models/your-character.glb");

export default CustomCharacter;