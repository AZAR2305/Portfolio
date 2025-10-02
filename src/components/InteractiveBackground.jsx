import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, 
    rgba(102, 126, 234, 0.4), 
    rgba(118, 75, 162, 0.2), 
    transparent
  );
  filter: blur(1px);
  animation: float 15s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
      opacity: 0.4;
    }
    25% { 
      transform: translateY(-20px) rotate(90deg); 
      opacity: 0.7;
    }
    50% { 
      transform: translateY(-10px) rotate(180deg); 
      opacity: 0.4;
    }
    75% { 
      transform: translateY(-30px) rotate(270deg); 
      opacity: 0.6;
    }
  }
`;

const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles only once
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? 'rgba(102, 126, 234,' : 'rgba(118, 75, 162,',
        originalRadius: Math.random() * 2 + 1,
      });
    }
    setParticles(particleArray);

    let currentParticles = particleArray; // Use local reference

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      currentParticles.forEach((particle, index) => {
        // Calculate distance from mouse
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Mouse interaction
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.vx += dx * force * 0.0005;
          particle.vy += dy * force * 0.0005;
          particle.radius = particle.originalRadius * (1 + force * 2);
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.3);
        } else {
          particle.radius = particle.originalRadius;
          particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array to run only once

  return (
    <BackgroundContainer>
      <ParticleCanvas ref={canvasRef} />
      
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <FloatingOrb
          key={i}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default InteractiveParticles;