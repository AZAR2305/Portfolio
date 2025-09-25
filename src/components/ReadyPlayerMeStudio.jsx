import React, { useState, Suspense } from "react";
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";
import { Link } from "react-router-dom";

const config = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none" };

const LoadingFallback = () => (
  <div style={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100%",
    background: "#222",
    color: "#00ff41",
    fontFamily: "Orbitron, monospace"
  }}>
    <div>Loading Avatar...</div>
  </div>
);

export default function ReadyPlayerMeStudio({ subdomain = "demo" }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleOnAvatarExported = (event) => {
    console.log(`Avatar URL: ${event.data.url}`);
    setAvatarUrl(event.data.url);
    setShowPreview(true);
  };

  const handleUseAvatar = () => {
    // Copy URL to clipboard for easy use
    navigator.clipboard.writeText(avatarUrl);
    alert(`Avatar URL copied to clipboard!\n\nTo use this avatar in your portfolio:\n1. Update customCharacterUrl in App.jsx\n2. Set useCustomCharacter to true\n\nURL: ${avatarUrl}`);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111", position: "relative" }}>
      {/* Back to Portfolio Button */}
      <Link 
        to="/" 
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "linear-gradient(135deg, #32CD32, #00FF88)",
          color: "#000",
          textDecoration: "none",
          padding: "12px 20px",
          borderRadius: "25px",
          fontFamily: "Orbitron, monospace",
          fontWeight: "600",
          fontSize: "0.9rem"
        }}
      >
        ← Back to Portfolio
      </Link>

      {/* Avatar Creator */}
      <div style={{ width: showPreview ? "70vw" : "100vw", height: "100vh", transition: "width 0.3s ease" }}>
        <AvatarCreator
          subdomain={subdomain}
          config={config}
          style={style}
          onAvatarExported={handleOnAvatarExported}
        />
      </div>

      {/* Avatar Info Panel - Simple text-based preview */}
      {showPreview && (
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          width: "30vw", 
          height: "100vh", 
          background: "#222",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxSizing: "border-box"
        }}>
          <h3 style={{ margin: "0 0 20px 0", color: "#00ff41", fontFamily: "Orbitron, monospace" }}>
            ✅ Avatar Created!
          </h3>
          
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            fontFamily: "Orbitron, monospace"
          }}>
            <div style={{ 
              width: "120px", 
              height: "120px", 
              background: "linear-gradient(135deg, #00ff41, #00bfff)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              marginBottom: "20px"
            }}>
              🧑‍🎨
            </div>
            
            <p style={{ fontSize: "0.9rem", marginBottom: "20px" }}>
              Your avatar has been successfully created and is ready to use in your portfolio!
            </p>
            
            <div style={{ 
              background: "#333", 
              padding: "15px", 
              borderRadius: "10px", 
              marginBottom: "20px",
              wordBreak: "break-all",
              fontSize: "0.7rem",
              maxHeight: "100px",
              overflow: "auto"
            }}>
              <strong>Avatar URL:</strong><br/>
              {avatarUrl}
            </div>
          </div>
          
          {/* Control Panel */}
          <div style={{ 
            borderTop: "1px solid #444",
            paddingTop: "20px"
          }}>
            <button
              onClick={handleUseAvatar}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #00BFFF, #00FF88)",
                color: "#000",
                border: "none",
                padding: "15px 20px",
                borderRadius: "20px",
                fontFamily: "Orbitron, monospace",
                fontWeight: "600",
                cursor: "pointer",
                marginBottom: "10px",
                fontSize: "1rem"
              }}
            >
              📋 Copy URL & Instructions
            </button>
            <button
              onClick={() => {
                setAvatarUrl("");
                setShowPreview(false);
              }}
              style={{
                width: "100%",
                background: "#666",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                fontFamily: "Orbitron, monospace",
                cursor: "pointer"
              }}
            >
              Create New Avatar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
