import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  Section, 
  Container, 
  GradientText, 
  Button, 
  FloatingElement, 
  AnimatedText,
  fadeInUp,
  slideInFromLeft,
  slideInFromRight,
  scaleIn
} from '../../styles/ModernStyles.js';

const HeroSection = styled(Section)`
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  gap: 4rem;
  z-index: 2;
  position: relative;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

const VisualSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SubTitle = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Description = styled(AnimatedText)`
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  margin: 2rem 0;
  max-width: 500px;
  color: #9ca3af;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FloatingCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const TechItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
  }
`;

const TechIcon = styled.span`
  font-size: 1.2rem;
`;

const TechName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #e5e7eb;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Orb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.gradient};
  filter: blur(40px);
  opacity: 0.6;
`;

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = [
    { icon: '⚛️', name: 'React' },
    { icon: '🟦', name: 'TypeScript' },
    { icon: '🅿️', name: 'Python' },
    { icon: '🔗', name: 'Blockchain' },
    { icon: '☁️', name: 'AWS' },
    { icon: '🐳', name: 'Docker' },
    { icon: '🔥', name: 'Firebase' },
    { icon: '📊', name: 'Analytics' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeroSection>
      <FloatingOrbs>
        <Orb
          gradient="linear-gradient(135deg, #8b5cf6, #06b6d4)"
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '10%',
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
          }}
        />
        <Orb
          gradient="linear-gradient(135deg, #10b981, #f59e0b)"
          style={{
            width: '200px',
            height: '200px',
            top: '60%',
            right: '10%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
          }}
        />
      </FloatingOrbs>

      <Container>
        <HeroContent>
          <TextSection>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SubTitle variants={itemVariants}>
                Full Stack Developer
              </SubTitle>
              
              <GradientText animate size="clamp(3rem, 6vw, 5rem)">
                <motion.span variants={itemVariants}>
                  Thameemul Azarudeen
                </motion.span>
              </GradientText>
              
              <Description delay="0.4s">
                Crafting innovative digital experiences with cutting-edge technology. 
                Specialized in React, Python, and Blockchain development with a passion 
                for creating scalable, user-centric solutions.
              </Description>
              
              <ButtonGroup
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <Button variant="primary" size="lg">
                  View My Work
                  <span>🚀</span>
                </Button>
                <Button variant="outline" size="lg">
                  Contact Me
                  <span>💬</span>
                </Button>
              </ButtonGroup>
            </motion.div>
          </TextSection>

          <VisualSection>
            <FloatingCard
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <motion.h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Tech Stack
              </motion.h3>
              
              <TechGrid>
                {techStack.map((tech, index) => (
                  <TechItem
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <TechIcon>{tech.icon}</TechIcon>
                    <TechName>{tech.name}</TechName>
                  </TechItem>
                ))}
              </TechGrid>
            </FloatingCard>
          </VisualSection>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;