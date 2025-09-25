import React from 'react';

/**
 * Character Configuration Helper
 * 
 * This file makes it easy to switch between different 3D characters
 * and adjust their settings without editing multiple files.
 */

export const CHARACTER_CONFIG = {
  // Choose which character to use
  USE_CUSTOM_CHARACTER: true, // Set to false to use Ready Player Me avatar
  
  // Custom Character Settings
  CUSTOM_CHARACTER: {
    modelUrl: "/models/your-character.glb", // Update this path to your model
    scale: 1.8,
    position: [3, -1, 0],
    animations: {
      idle: "idle",
      walking: "walk", 
      waving: "wave",
      talking: "talk"
    },
    mouseTracking: {
      enabled: true,
      strength: 0.3, // How much head follows mouse (0-1)
      rotationSpeed: 0.01 // Subtle idle movement
    }
  },
  
  // Ready Player Me Settings (fallback)
  READY_PLAYER_ME: {
    avatarUrl: "https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb",
    scale: 1.8,
    position: [3, -1, 0],
    enableScrollAnimation: true
  },
  
  // Alternative Character URLs (uncomment to use)
  ALTERNATIVE_CHARACTERS: {
    // Free Ready Player Me avatars:
    avatar1: "https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb",
    avatar2: "https://models.readyplayer.me/64cb1b0d58ad24a6f3e8c68c.glb",
    
    // Local file examples (place in public/models/):
    localCharacter1: "/models/my-character.glb",
    localCharacter2: "/models/business-avatar.glb",
    localCharacter3: "/models/casual-avatar.glb"
  }
};

/**
 * Quick Character Switcher Component
 * Use this in development to quickly test different characters
 */
export const CharacterSwitcher = ({ onCharacterChange }) => {
  const [currentCharacter, setCurrentCharacter] = React.useState('custom');
  
  const handleChange = (characterType, url) => {
    setCurrentCharacter(characterType);
    onCharacterChange(characterType === 'custom', url);
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      zIndex: 1000,
      fontSize: '12px'
    }}>
      <h4>Character Switcher</h4>
      
      <button 
        onClick={() => handleChange('custom', CHARACTER_CONFIG.CUSTOM_CHARACTER.modelUrl)}
        style={{ 
          margin: '5px', 
          padding: '5px 10px',
          background: currentCharacter === 'custom' ? '#00ff41' : '#333',
          color: currentCharacter === 'custom' ? '#000' : '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Custom Character
      </button>
      
      <button 
        onClick={() => handleChange('rpm', CHARACTER_CONFIG.READY_PLAYER_ME.avatarUrl)}
        style={{ 
          margin: '5px', 
          padding: '5px 10px',
          background: currentCharacter === 'rpm' ? '#00ff41' : '#333',
          color: currentCharacter === 'rpm' ? '#000' : '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Ready Player Me
      </button>
      
      {Object.entries(CHARACTER_CONFIG.ALTERNATIVE_CHARACTERS).map(([key, url]) => (
        <button 
          key={key}
          onClick={() => handleChange(key, url)}
          style={{ 
            margin: '5px', 
            padding: '5px 10px',
            background: currentCharacter === key ? '#00ff41' : '#333',
            color: currentCharacter === key ? '#000' : '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

/**
 * Helper function to get current character configuration
 */
export const getCurrentCharacterConfig = () => {
  return CHARACTER_CONFIG.USE_CUSTOM_CHARACTER 
    ? CHARACTER_CONFIG.CUSTOM_CHARACTER 
    : CHARACTER_CONFIG.READY_PLAYER_ME;
};

export default CHARACTER_CONFIG;