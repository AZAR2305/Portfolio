# Adding Your Own 3D Character

## Step 1: Prepare Your 3D Model

### Supported Formats
- **GLB** (recommended) - Binary GLTF format, smaller file size
- **GLTF** - Text-based format with separate texture files

### Model Requirements
- **File size**: Keep under 10MB for web performance
- **Polygon count**: Aim for 5,000-20,000 triangles for good performance
- **Textures**: Use power-of-2 dimensions (512x512, 1024x1024, etc.)
- **Animations**: Optional but recommended (idle, walk, wave, etc.)

### Where to Get 3D Characters
1. **Ready Player Me**: https://readyplayer.me/ (free avatars)
2. **Sketchfab**: https://sketchfab.com/ (paid/free models)
3. **Mixamo**: https://mixamo.com/ (Adobe's free character service)
4. **TurboSquid**: https://turbosquid.com/ (professional models)
5. **CGTrader**: https://cgtrader.com/ (marketplace)
6. **Create your own**: Blender, Maya, 3ds Max, etc.

## Step 2: Add Your Model to the Project

1. **Copy your model file** (e.g., `my-character.glb`) to:
   ```
   src/assets/models/my-character.glb
   ```

2. **Update the public folder** (alternative location):
   ```
   public/models/my-character.glb
   ```

## Step 3: Configure the Character Component

Edit the `CustomCharacter.jsx` component and update the `modelUrl`:

```jsx
// For assets folder:
modelUrl = "/src/assets/models/my-character.glb"

// For public folder (recommended):
modelUrl = "/models/my-character.glb"
```

## Step 4: Character Settings

### Common Settings to Adjust

```jsx
<CustomCharacter
  modelUrl="/models/my-character.glb"
  scale={1.2}                    // Make character bigger/smaller
  position={[0, -1.5, 0]}        // Move character up/down/left/right
  currentAnimation="idle"         // Set default animation
  enableMouseTracking={true}      // Enable head tracking
  headTrackingStrength={0.3}      // How much head follows mouse
  rotationSpeed={0.01}           // Subtle idle movement
/>
```

### Animation Names
The component will automatically try to find animations with these names:
- **Idle**: idle, rest, breathe, stand, default
- **Walking**: walk, walking, run, running
- **Sitting**: sit, sitting, seated
- **Waving**: wave, waving, hello, greeting
- **Talking**: talk, talking, speak, speaking
- **Dancing**: dance, dancing

## Step 5: Model Optimization Tips

### Using Blender (Free)
1. **Reduce polygon count**: Use the Decimate modifier
2. **Optimize textures**: Resize to appropriate dimensions
3. **Export settings**: 
   - Format: GLB
   - Include animations
   - Apply transforms
   - Limit precision to reduce file size

### Using Ready Player Me (Easiest)
1. Visit https://readyplayer.me/
2. Create your avatar
3. Download as GLB
4. Place in `public/models/` folder

## Step 6: Testing Your Character

1. **Check browser console** for loading errors
2. **Verify animations** are working
3. **Test mouse tracking** by moving cursor
4. **Adjust scale and position** as needed

## Troubleshooting

### Model Won't Load
- Check file path is correct
- Verify model file isn't corrupted
- Check browser console for errors
- Try a different model format

### Animations Not Working
- Check if model has animations
- Verify animation names in console
- Try different animation names
- Use browser dev tools to inspect model

### Performance Issues
- Reduce polygon count
- Compress textures
- Use LOD (Level of Detail) models
- Optimize materials

## Example Configuration

```jsx
// In MasterCanvas.jsx, replace ReadyPlayerMeAvatar with:
<CustomCharacter
  modelUrl="/models/your-character.glb"
  scale={1.5}
  position={[2, -1, 0]}
  currentAnimation={currentSection === 'hero' ? 'waving' : 'idle'}
  mousePosition={mousePosition}
  enableMouseTracking={true}
/>
```

Ready to add your character? Just follow these steps!