# Ready Player Me Avatar Integration

## 🎯 Overview

This implementation provides a complete Ready Player Me avatar integration for React Three Fiber applications with professional-grade features including animation control, mouse tracking, and scroll interactions.

## 📁 File Structure

```
src/components/3d/
├── ReadyPlayerMeAvatar.jsx    # Core avatar component with animations
├── AvatarScene.jsx           # Complete scene with controls and UI
└── AvatarExamples.jsx        # Usage examples and demos
```

## 🚀 Quick Start

### Basic Usage

```jsx
import AvatarScene from './components/3d/AvatarScene';

function MyComponent() {
  return (
    <AvatarScene 
      initialAnimation="idle"
      showControls={true}
      enableScrollAnimation={true}
    />
  );
}
```

### Hero Section Integration

```jsx
// Already integrated in src/components/sections/Hero.jsx
<AvatarContainer>
  <AvatarScene
    initialAnimation="idle"
    enableScrollAnimation={true}
    showControls={false}
  />
</AvatarContainer>
```

## 🎮 Features

### ✅ Animation System
- **Idle**: Default standing pose with subtle breathing animation
- **Walking**: Triggered by scroll events or manual control
- **Sitting**: Sitting pose animation
- **Waving**: Friendly greeting animation
- **Hands Back**: Professional casual pose

### ✅ Mouse Tracking
- Avatar head follows cursor movement
- Smooth interpolation for natural movement
- Configurable sensitivity and limits

### ✅ Scroll Integration
- Automatically switches to walking animation when scrolling
- Returns to idle when scroll stops
- Configurable scroll threshold

### ✅ Professional Lighting
- Soft ambient lighting
- Directional key light
- Fill light and rim lighting
- Environment-based reflections

### ✅ Camera Controls
- OrbitControls with rotation only
- Disabled zoom and pan for focused interaction
- Constrained viewing angles

### ✅ Performance Optimizations
- Material cloning to prevent sharing
- Mipmap optimization
- Error boundaries for graceful failure
- Loading states and status indicators

## 🔧 Customization Guide

### Adding New Animations

1. **Update Animation Map** in `ReadyPlayerMeAvatar.jsx`:
```jsx
const animationMap = {
  idle: ['idle', 'Idle', 'T-Pose'],
  walking: ['walking', 'walk', 'Walk'],
  dancing: ['dance', 'dancing', 'Dance'], // NEW
  // Add more animations here
};
```

2. **Add to Control Panel** in `AvatarScene.jsx`:
```jsx
const animationOptions = [
  { key: 'idle', label: 'Idle', description: 'Default standing pose' },
  { key: 'walking', label: 'Walk', description: 'Walking animation' },
  { key: 'dancing', label: 'Dance', description: 'Dance animation' }, // NEW
  // Add more options here
];
```

### Adjusting Mouse Sensitivity

In `ReadyPlayerMeAvatar.jsx`:
```jsx
// Increase values for more sensitivity
const targetRotationY = mousePosition.x * 0.5; // Default: 0.3
const targetRotationX = -mousePosition.y * 0.4; // Default: 0.2

// Adjust smoothness (lower = smoother)
headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
  headBoneRef.current.rotation.y,
  targetRotationY,
  0.08 // Default: 0.05
);
```

### Customizing Lighting

In `AvatarScene.jsx`:
```jsx
const AvatarLighting = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" /> {/* Brighter ambient */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5} {/* Brighter key light */}
        color="#ffffff"
      />
      {/* Add more lights as needed */}
    </>
  );
};
```

### Camera Settings

```jsx
<OrbitControls
  enablePan={false}
  enableZoom={false}
  enableRotate={true}
  minPolarAngle={Math.PI / 3}     // Higher viewing angle
  maxPolarAngle={Math.PI / 1.5}   // Lower bounds
  minAzimuthAngle={-Math.PI / 2}  // Left rotation limit
  maxAzimuthAngle={Math.PI / 2}   // Right rotation limit
/>
```

## 🎨 Styling and Themes

The components use styled-components with your existing theme:

```jsx
// Customize button styles
const AnimationButton = styled(motion.button)`
  background: ${props => props.active ? '#32CD32' : 'rgba(50, 205, 50, 0.1)'};
  color: ${props => props.active ? '#0D0D0D' : '#32CD32'};
  // Customize colors to match your theme
`;
```

## 🐛 Troubleshooting

### Avatar Not Loading
- Check network connection to Ready Player Me CDN
- Verify avatar URL is correct
- Check browser console for CORS errors

### Animations Not Working
- Verify your avatar has the required animations
- Check animation names in browser console
- Update `animationMap` with correct names

### Performance Issues
- Reduce particle count in background elements
- Lower animation quality in `ReadyPlayerMeAvatar.jsx`
- Disable shadows if needed

### Mouse Tracking Not Working
- Ensure container has proper dimensions
- Check mouse event listeners are attached
- Verify head bone is found in avatar

## 📋 Dependencies

```json
{
  "@react-three/fiber": "^8.x.x",
  "@react-three/drei": "^9.x.x",
  "three": "^0.x.x",
  "framer-motion": "^10.x.x",
  "styled-components": "^6.x.x"
}
```

## 🌟 Advanced Features

### Custom Avatar URLs
Replace the default URL with your own Ready Player Me avatar:

```jsx
const ReadyPlayerMeAvatar = ({ 
  avatarUrl = "https://models.readyplayer.me/YOUR_AVATAR_ID.glb",
  // ... other props
}) => {
  // Component implementation
};
```

### Multiple Avatars
You can render multiple avatars with different animations:

```jsx
<Canvas>
  <ReadyPlayerMeAvatar 
    avatarUrl="https://models.readyplayer.me/avatar1.glb"
    position={[-2, 0, 0]}
    currentAnimation="idle"
  />
  <ReadyPlayerMeAvatar 
    avatarUrl="https://models.readyplayer.me/avatar2.glb"
    position={[2, 0, 0]}
    currentAnimation="waving"
  />
</Canvas>
```

### Integration with State Management
```jsx
// Using React Context or Redux
const { currentAnimation, setCurrentAnimation } = useAnimationContext();

<AvatarScene 
  initialAnimation={currentAnimation}
  onAnimationChange={setCurrentAnimation}
/>
```

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure your Ready Player Me avatar has the required animations
4. Review the customization guide above

## 🎉 Ready to Use!

Your Ready Player Me avatar integration is now complete and ready for production use. The avatar will automatically load, respond to mouse movement, and provide smooth animation transitions with professional lighting and controls.

Navigate to `http://localhost:5173/` to see your avatar in action!