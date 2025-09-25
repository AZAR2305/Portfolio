import React from 'react';
import AvatarScene from '../3d/AvatarScene';
import styled from 'styled-components';

/**
 * Example Usage Component for Ready Player Me Avatar
 * 
 * This demonstrates different ways to integrate the avatar into your app
 */

const ExampleContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ExampleSection = styled.div`
  margin-bottom: 60px;
  
  h2 {
    color: #32CD32;
    font-family: 'Orbitron', monospace;
    margin-bottom: 20px;
  }
  
  p {
    color: #EAEAEA;
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    margin-bottom: 20px;
  }
`;

const CodeBlock = styled.pre`
  background: rgba(13, 13, 13, 0.8);
  color: #32CD32;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(50, 205, 50, 0.2);
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const AvatarExamples = () => {
  return (
    <ExampleContainer>
      <ExampleSection>
        <h2>🎯 Basic Avatar Integration</h2>
        <p>
          Simple avatar with default settings - perfect for hero sections or about pages.
        </p>
        <CodeBlock>{`
// Basic usage
import AvatarScene from './components/3d/AvatarScene';

function MyComponent() {
  return (
    <AvatarScene 
      initialAnimation="idle"
      showControls={true}
    />
  );
}
        `}</CodeBlock>
        <AvatarScene 
          initialAnimation="idle"
          showControls={true}
        />
      </ExampleSection>

      <ExampleSection>
        <h2>🎮 Interactive Avatar with Controls</h2>
        <p>
          Full-featured avatar with animation controls and scroll interactions.
        </p>
        <CodeBlock>{`
// Interactive avatar
<AvatarScene 
  initialAnimation="waving"
  enableScrollAnimation={true}
  showControls={true}
/>
        `}</CodeBlock>
        <AvatarScene 
          initialAnimation="waving"
          enableScrollAnimation={true}
          showControls={true}
        />
      </ExampleSection>

      <ExampleSection>
        <h2>🎨 Clean Presentation Mode</h2>
        <p>
          Minimal avatar without controls - ideal for professional presentations.
        </p>
        <CodeBlock>{`
// Clean presentation
<AvatarScene 
  initialAnimation="handsBack"
  enableScrollAnimation={false}
  showControls={false}
/>
        `}</CodeBlock>
        <AvatarScene 
          initialAnimation="handsBack"
          enableScrollAnimation={false}
          showControls={false}
        />
      </ExampleSection>

      <ExampleSection>
        <h2>⚙️ Customization Options</h2>
        <p>Available props for the AvatarScene component:</p>
        <CodeBlock>{`
interface AvatarSceneProps {
  // Animation settings
  initialAnimation?: 'idle' | 'walking' | 'sitting' | 'waving' | 'handsBack';
  enableScrollAnimation?: boolean;
  
  // UI controls
  showControls?: boolean;
  
  // Styling
  className?: string;
}

// Available animations (customize based on your avatar):
const animations = {
  idle: 'Default standing pose',
  walking: 'Walking animation', 
  sitting: 'Sitting pose',
  waving: 'Friendly wave',
  handsBack: 'Hands behind back'
};
        `}</CodeBlock>
      </ExampleSection>

      <ExampleSection>
        <h2>🔧 Advanced Customization</h2>
        <p>
          For advanced customization, you can modify the ReadyPlayerMeAvatar component directly:
        </p>
        <CodeBlock>{`
// In ReadyPlayerMeAvatar.jsx

// 1. Add new animations to the animationMap:
const animationMap = {
  idle: ['idle', 'Idle', 'T-Pose'],
  walking: ['walking', 'walk', 'Walk'],
  dancing: ['dance', 'dancing', 'Dance'], // NEW
  // ... more animations
};

// 2. Customize head tracking sensitivity:
const targetRotationY = mousePosition.x * 0.5; // Increase for more movement
const targetRotationX = -mousePosition.y * 0.3;

// 3. Adjust lighting in AvatarScene.jsx:
<directionalLight
  position={[5, 8, 5]}
  intensity={1.5} // Brighter lighting
  color="#ffffff"
/>

// 4. Modify camera controls:
<OrbitControls
  minPolarAngle={Math.PI / 3}   // Higher viewing angle
  maxPolarAngle={Math.PI / 1.5} // Lower viewing angle
  // ... other settings
/>
        `}</CodeBlock>
      </ExampleSection>
    </ExampleContainer>
  );
};

export default AvatarExamples;