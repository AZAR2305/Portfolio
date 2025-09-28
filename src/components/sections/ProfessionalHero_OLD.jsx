import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff08" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(ellipse at center, 
      rgba(102, 126, 234, 0.15) 0%,
      rgba(118, 75, 162, 0.1) 30%,
      transparent 60%);
    animation: float 20s ease-in-out infinite;
    border-radius: 50%;
  }
  
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg);
      opacity: 0.1;
    }
    50% { 
      transform: translateY(-30px) rotate(180deg);
      opacity: 0.2;
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  width: 100%;
  z-index: 2;
  position: relative;
  
  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: center;
  min-height: 80vh;
  
  @media (max-width: 1024px) {
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    min-height: 70vh;
  }
  
  @media (max-width: 480px) {
    gap: 2rem;
    min-height: 60vh;
  }
`;

const TextContent = styled(motion.div)`
  z-index: 3;
  position: relative;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  .first-name, .last-name {
    display: flex;
    justify-content: flex-start;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
  
  .letter {
    display: inline-block;
    margin-right: 0.05em;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-10px) scale(1.1);
      text-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }
  }
  
  .gradient {
    .gradient-letter {
      background: linear-gradient(
        135deg, 
        #667eea 0%, 
        #764ba2 25%, 
        #f093fb 50%, 
        #667eea 75%, 
        #764ba2 100%
      );
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 4s ease-in-out infinite;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        opacity: 0.1;
        filter: blur(20px);
        z-index: -1;
        animation: pulseGlow 3s ease-in-out infinite;
      }
      
      &:hover::after {
        opacity: 0.3;
        filter: blur(30px);
      }
    }
  }
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      opacity: 0.1;
      transform: scale(1);
    }
    50% {
      opacity: 0.2;
      transform: scale(1.05);
    }
  }
`;

const Role = styled.div`
  font-size: clamp(1.25rem, 2.5vw, 1.8rem);
  color: #64748b;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(102, 126, 234, 0.2), 
      transparent
    );
    animation: typewriter 3s infinite;
  }
  
  @keyframes typewriter {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    background-position: 100% 0;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem 2rem;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #e2e8f0;
  border: 2px solid rgba(102, 126, 234, 0.3);
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: width 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    border-color: #667eea;
    color: #ffffff;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    
    &::before {
      width: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    right: -50px;
    bottom: -50px;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea);
    background-size: 400% 400%;
    border-radius: 50%;
    opacity: 0.1;
    animation: rotateGradient 8s linear infinite;
    z-index: -1;
  }
  
  .profile-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 30px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 100px rgba(102, 126, 234, 0.1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.1), 
        transparent
      );
      transition: left 0.8s;
    }
    
    &:hover {
      transform: translateY(-15px) scale(1.02);
      box-shadow: 
        0 30px 80px rgba(0, 0, 0, 0.5),
        0 0 150px rgba(102, 126, 234, 0.2);
      border-color: rgba(102, 126, 234, 0.4);
      
      &::before {
        left: 100%;
      }
      
      img {
        transform: scale(1.05);
        filter: brightness(1.1);
      }
    }
    
    img {
      width: clamp(200px, 25vw, 300px);
      height: clamp(200px, 25vw, 300px);
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
      border: 4px solid transparent;
      background: linear-gradient(45deg, #667eea, #764ba2) padding-box,
                  linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea) border-box;
      margin-bottom: 1.5rem;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      
      @media (max-width: 768px) {
        width: 200px;
        height: 200px;
      }
      
      @media (max-width: 480px) {
        width: 150px;
        height: 150px;
      }
    }
    
    .status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      color: #10b981;
      font-weight: 600;
      font-size: 1rem;
      
      .dot {
        width: 10px;
        height: 10px;
        background: #10b981;
        border-radius: 50%;
        animation: pulse 2s infinite;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: ripple 2s infinite;
        }
      }
    }
    
    @media (max-width: 768px) {
      padding: 2rem;
    }
    
    @media (max-width: 480px) {
      padding: 1.5rem;
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  
  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }
  
  @keyframes rotateGradient {
    0% { transform: rotate(0deg); background-position: 0% 50%; }
    100% { transform: rotate(360deg); background-position: 100% 50%; }
  }
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 100px rgba(102, 126, 234, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent,
      rgba(102, 126, 234, 0.1),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  img {
    width: clamp(200px, 25vw, 300px);
    height: clamp(200px, 25vw, 300px);
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
    transition: all 0.5s ease;
    position: relative;
    z-index: 2;
    
    &:hover {
      transform: scale(1.05);
      border-color: rgba(102, 126, 234, 0.5);
      box-shadow: 0 0 30px rgba(102, 126, 234, 0.4);
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    
    img {
      width: clamp(180px, 30vw, 250px);
      height: clamp(180px, 30vw, 250px);
    }
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    
    img {
      width: clamp(150px, 35vw, 200px);
      height: clamp(150px, 35vw, 200px);
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
  
  .stat {
    text-align: center;
    position: relative;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      background: rgba(102, 126, 234, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
      
      .number {
        transform: scale(1.1);
        text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
      }
    }
    
    .number {
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      font-weight: 800;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
      transition: all 0.3s ease;
      margin-bottom: 0.5rem;
    }
    
    .label {
      font-size: 0.9rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    
    .stat {
      padding: 0.8rem;
      
      .number {
        font-size: 1.5rem;
      }
      
      .label {
        font-size: 0.8rem;
      }
    }
  }
`;


// Floating elements component
const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  
  .floating-element {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: float 15s infinite linear;
    
    &.element-1 {
      width: 80px;
      height: 80px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &.element-2 {
      width: 120px;
      height: 120px;
      top: 20%;
      right: 15%;
      animation-delay: -5s;
    }
    
    &.element-3 {
      width: 60px;
      height: 60px;
      bottom: 30%;
      left: 5%;
      animation-delay: -10s;
    }
    
    &.element-4 {
      width: 100px;
      height: 100px;
      bottom: 10%;
      right: 20%;
      animation-delay: -3s;
    }
    
    &.element-5 {
      width: 40px;
      height: 40px;
      top: 60%;
      left: 80%;
      animation-delay: -7s;
      background: linear-gradient(135deg, rgba(240, 147, 251, 0.15), rgba(102, 126, 234, 0.1));
    }
    
    &.element-6 {
      width: 90px;
      height: 90px;
      top: 80%;
      left: 30%;
      animation-delay: -12s;
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.12), rgba(240, 147, 251, 0.08));
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) rotate(90deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
      opacity: 0.3;
    }
    75% {
      transform: translateY(-30px) rotate(270deg);
      opacity: 0.6;
    }
    100% {
      transform: translateY(0px) rotate(360deg);
      opacity: 0.3;
    }
  }
`;

// TypewriterText component
const TypewriterText = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

// AnimatedName component with letter-by-letter animation
const AnimatedName = ({ firstName, lastName, delay = 0 }) => {
  const firstNameLetters = firstName.split('');
  const lastNameLetters = lastName.split('');
  
  return (
    <Name>
      <div className="first-name">
        {firstNameLetters.map((letter, index) => (
          <motion.span
            key={`first-${index}`}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + (index * 0.1),
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="letter"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="last-name gradient">
        {lastNameLetters.map((letter, index) => (
          <motion.span
            key={`last-${index}`}
            initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + (firstNameLetters.length * 0.1) + (index * 0.12),
              type: "spring",
              stiffness: 120,
              damping: 8
            }}
            className="letter gradient-letter"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </Name>
  );
};

const ProfessionalHero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Blockchain Developer', 'Smart Contract Engineer', 'Web3 Developer', 'DeFi Specialist'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer id="home">
      <FloatingElements>
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
        <div className="floating-element element-5"></div>
        <div className="floating-element element-6"></div>
      </FloatingElements>
      
      <Container>
        <HeroContent>
          <TextContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedName 
              firstName="THAMEEMUL" 
              lastName="AZARUDEEN" 
              delay={0.3}
            />
            <Role>
              <TypewriterText
                text="Full Stack Developer & Blockchain Enthusiast"
                speed={100}
              />
            </Role>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Description>
                Passionate about creating innovative solutions with cutting-edge technologies. 
                Specialized in React, Node.js, and blockchain development with a focus on 
                user experience and scalable architecture.
              </Description>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <ButtonGroup>
                <PrimaryButton
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text">VIEW MY WORK</span>
                </PrimaryButton>
                <SecondaryButton
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text">DOWNLOAD CV</span>
                </SecondaryButton>
              </ButtonGroup>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <StatsContainer>
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="number">50+</span>
                  <span className="label">Projects</span>
                </motion.div>
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="number">3+</span>
                  <span className="label">Years Exp</span>
                </motion.div>
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="number">100%</span>
                  <span className="label">Client Satisfaction</span>
                </motion.div>
              </StatsContainer>
            </motion.div>
          </TextContent>
          
          <ImageContainer
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <ProfileCard
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.6 }
              }}
            >
              <img 
                src="/src/assets/thameemul-photo.jpg" 
                alt="Thameemul Azarudeen" 
              />
            </ProfileCard>
          </ImageContainer>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default ProfessionalHero;