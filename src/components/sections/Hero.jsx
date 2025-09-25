import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, NeonText, NeonButton } from '../../styles/GlobalStyles';
import TypewriterEffect from '../TypewriterEffect';

const HeroContainer = styled(Section)`
  background: ${props => props.theme.colors.dark};
  overflow: hidden;
  position: relative;
`;

const HeroContent = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 10;
  max-width: 700px;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 580px;
  font-weight: 400;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 400px;
  height: 500px;
  z-index: 5;
  
  @media (max-width: 1024px) {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    width: 100%;
    height: 400px;
    margin-top: 40px;
  }
`;

const Hero = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer id="hero">
      {/* 3D elements now handled by MasterCanvas */}

      <HeroContent>
        {showTypewriter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypewriterEffect
              text="Hello, I'm Thameemul Azarudeen"
              speed={60}
              fontSize="1.4rem"
              color="#32CD32"
              delay={0}
            />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showTypewriter ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <TypewriterEffect
            text="Full Stack Developer | Creative Technologist | Problem Solver"
            speed={40}
            fontSize="1rem"
            color="#EAEAEA"
            delay={2000}
          />
        </motion.div>
        
        <NeonText
          size="4.5rem"
          mobileSize="2.8rem"
          as={motion.h1}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Building Digital Experiences
        </NeonText>
        
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          I craft modern web applications with clean code, innovative design, and seamless user experiences. 
          Specializing in React, Node.js, and 3D web technologies, I transform ideas into interactive 
          digital solutions that make a difference.
        </Description>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <NeonButton onClick={scrollToAbout}>View My Work</NeonButton>
          <NeonButton>Get In Touch</NeonButton>
        </ButtonGroup>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
