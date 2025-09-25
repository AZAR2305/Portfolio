import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

/**
 * Ready Player Me Avatar Component
 * 
 * Features:
 * - Loads RPM avatar from URL
 * - Animation system with idle, walking, sitting, waving animations
 * - Head tracking that follows mouse cursor
 * - Smooth animation transitions
 * - Professional lighting setup
 */
const ReadyPlayerMeAvatar = ({ 
  avatarUrl = "https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb",
  currentAnimation = "idle",
  mousePosition = { x: 0, y: 0 },
  scale = 1,
  position = [0, -1, 0]
}) => {
  const avatarRef = useRef();
  const headBoneRef = useRef();
  const mixerRef = useRef();
  
  // Load the GLTF model
  const { scene, animations } = useGLTF(avatarUrl);
  const { actions, mixer } = useAnimations(animations, avatarRef);
  
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
  
  // Find head bone for mouse tracking
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        // Common head bone names in RPM avatars
        if (child.isBone && (
          child.name.toLowerCase().includes('head') ||
          child.name.toLowerCase().includes('neck') ||
          child.name === 'Head' ||
          child.name === 'head'
        )) {
          headBoneRef.current = child;
        }
      });
    }
  }, [scene]);
  
  // Animation management
  useEffect(() => {
    if (!actions || !mixer) return;
    
    // Stop previous animation
    if (currentAction) {
      currentAction.fadeOut(0.3);
    }
    
    // Find and play new animation
    let newAction = null;
    
    // Map animation names (customize these based on your avatar's animations)
    const animationMap = {
      idle: ['idle', 'Idle', 'T-Pose', 'TPose'],
      walking: ['walking', 'walk', 'Walk', 'Running', 'run'],
      sitting: ['sitting', 'sit', 'Sit', 'seated'],
      waving: ['waving', 'wave', 'Wave', 'hello'],
      handsBack: ['hands_back', 'handsBack', 'casual', 'standing']
    };
    
    // Try to find matching animation
    const possibleNames = animationMap[currentAnimation] || [currentAnimation];
    
    for (const name of possibleNames) {
      if (actions[name]) {
        newAction = actions[name];
        break;
      }
    }
    
    // Fallback to first available animation if none found
    if (!newAction && Object.keys(actions).length > 0) {
      newAction = actions[Object.keys(actions)[0]];
      console.warn(`Animation "${currentAnimation}" not found, using fallback: ${Object.keys(actions)[0]}`);
    }
    
    if (newAction) {
      newAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(0.3)
        .play();
      
      setCurrentAction(newAction);
    }
    
    setPreviousAnimation(currentAnimation);
    
  }, [currentAnimation, actions, mixer]);
  
  // Mouse tracking and animation updates
  useFrame((state, delta) => {
    // Update animation mixer
    if (mixer) {
      mixer.update(delta);
    }
    
    // Head tracking - smooth mouse following
    if (headBoneRef.current && mousePosition) {
      const targetRotationY = mousePosition.x * 0.3; // Horizontal tracking
      const targetRotationX = -mousePosition.y * 0.2; // Vertical tracking (inverted)
      
      // Smooth interpolation
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
    
    // Optional: Add subtle breathing animation when idle
    if (currentAnimation === 'idle' && avatarRef.current) {
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
      avatarRef.current.scale.y = scale * breathingScale;
    }
  });
  
  // Clone scene to avoid sharing materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    // Ensure materials are not shared
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        
        // Optimize materials for better performance
        if (child.material.map) {
          child.material.map.generateMipmaps = false;
          child.material.map.minFilter = THREE.LinearFilter;
        }
      }
    });
    
    return clone;
  }, [scene]);
  
  return (
    <group ref={avatarRef} position={position} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the avatar for better performance
useGLTF.preload("https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb");

export default ReadyPlayerMeAvatar;