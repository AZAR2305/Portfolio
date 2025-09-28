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
`;

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

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 3rem;
  width: 100%;
  z-index: 2;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 5rem;
  align-items: center;
  min-height: 80vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  z-index: 3;
  position: relative;
`;

const AnimatedName = styled.h1`
  font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
  
  .first-name {
    display: block;
    margin-bottom: 0.2rem;
  }
  
  .last-name {
    display: block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease-in-out infinite;
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
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Role = styled.div`
  font-size: clamp(1.25rem, 2.5vw, 1.8rem);
  color: #64748b;
  margin-bottom: 2rem;
  font-weight: 600;
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
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #e2e8f0;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  
  .stat {
    text-align: center;
    
    .number {
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      display: block;
    }
    
    .label {
      font-size: 0.9rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 2rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  
  img {
    width: clamp(200px, 25vw, 300px);
    height: clamp(200px, 25vw, 300px);
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
    transition: all 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
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

// NameAnimation component
const NameAnimation = ({ firstName, lastName }) => {
  return (
    <AnimatedName>
      <div className="first-name">
        {firstName.split('').map((letter, index) => (
          <motion.span
            key={`first-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="letter"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="last-name">
        {lastName.split('').map((letter, index) => (
          <motion.span
            key={`last-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: (firstName.length * 0.1) + (index * 0.1) + 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="letter"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </AnimatedName>
  );
};

const ProfessionalHero = () => {
  return (
    <HeroContainer id="home">
      <FloatingElements>
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </FloatingElements>
      
      <Container>
        <HeroContent>
          <TextContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NameAnimation firstName="THAMEEMUL" lastName="AZARUDEEN" />
            
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
                  VIEW MY WORK
                </PrimaryButton>
                <SecondaryButton
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DOWNLOAD CV
                </SecondaryButton>
              </ButtonGroup>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <StatsContainer>
                <div className="stat">
                  <span className="number">50+</span>
                  <span className="label">Projects</span>
                </div>
                <div className="stat">
                  <span className="number">3+</span>
                  <span className="label">Years Exp</span>
                </div>
                <div className="stat">
                  <span className="number">100%</span>
                  <span className="label">Client Satisfaction</span>
                </div>
              </StatsContainer>
            </motion.div>
          </TextContent>
          
          <ImageContainer
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProfileCard
              whileHover={{ scale: 1.02, rotateY: 5 }}
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