import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Section, Container, NeonText, GlassCard } from '../../styles/GlobalStyles';
import Enhanced3DTimeline from '../3d/Enhanced3DTimeline';
import Canvas3DErrorBoundary from '../Canvas3DErrorBoundary';

const ExperienceContainer = styled(Section)`
  background: #000000;
  padding: 120px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 40% 20%, rgba(0, 255, 65, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 60% 80%, rgba(57, 255, 20, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 0 40px;
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 100px;
  
  &:nth-child(even) {
    grid-template-columns: 1fr 300px;
    direction: rtl;
    
    > * {
      direction: ltr;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 60px;
    
    &:nth-child(even) {
      grid-template-columns: 1fr;
      direction: ltr;
    }
  }
`;

const Timeline3D = styled.div`
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ExperienceCard = styled(GlassCard)`
  .company {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .position {
    color: ${props => props.theme.colors.secondary};
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .period {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    margin-bottom: 20px;
    font-style: italic;
  }
  
  .description {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .achievements {
    list-style: none;
    padding: 0;
    
    li {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
      
      &::before {
        content: '→';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.primary};
      }
    }
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    
    .tech {
      background: ${props => props.theme.gradients.primary};
      color: ${props => props.theme.colors.dark};
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
`;

// 3D Experience Block Component
const ExperienceBlock = ({ type, isVisible }) => {
  const blockRef = useRef();
  const floatingRef = useRef();
  
  useFrame((state) => {
    if (blockRef.current && isVisible) {
      blockRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      blockRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    if (floatingRef.current) {
      floatingRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const getBlockStructure = () => {
    switch (type) {
      case 'senior':
        return (
          <group ref={blockRef}>
            <Box args={[2, 0.3, 1]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.4} />
            </Box>
            <Box args={[1.8, 0.3, 0.8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.4} />
            </Box>
            <Box args={[1.6, 0.3, 0.6]} position={[0, -0.5, 0]}>
              <meshStandardMaterial color="#00cc33" emissive="#00cc33" emissiveIntensity={0.4} />
            </Box>
            {/* Floating elements */}
            <Float speed={2} rotationIntensity={0.3}>
              <Box args={[0.3, 0.3, 0.3]} position={[1.5, 1, 0]} ref={floatingRef}>
                <meshStandardMaterial color="#00ff41" emissive="#00ff41" emissiveIntensity={0.6} />
              </Box>
            </Float>
          </group>
        );
      case 'lead':
        return (
          <group ref={blockRef}>
            <Box args={[1.8, 0.3, 0.9]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.4} />
            </Box>
            <Box args={[1.6, 0.3, 0.7]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color="#00cc33" emissive="#00cc33" emissiveIntensity={0.4} />
            </Box>
            {[...Array(4)].map((_, i) => (
              <Float key={i} speed={1.5} rotationIntensity={0.2}>
                <Box 
                  args={[0.2, 0.2, 0.2]} 
                  position={[
                    Math.cos(i * Math.PI / 2) * 1.2,
                    0.8,
                    Math.sin(i * Math.PI / 2) * 1.2
                  ]}
                >
                  <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} />
                </Box>
              </Float>
            ))}
          </group>
        );
      case 'developer':
        return (
          <group ref={blockRef}>
            <Box args={[1.5, 0.3, 0.8]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#00cc33" emissive="#00cc33" emissiveIntensity={0.4} />
            </Box>
            <Box args={[0.5, 0.5, 0.5]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.4} />
            </Box>
          </group>
        );
      default:
        return (
          <Box ref={blockRef} args={[1, 1, 1]}>
            <meshStandardMaterial color="#00ff41" wireframe />
          </Box>
        );
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#00ff41" />
      <pointLight position={[-3, -3, -3]} intensity={0.8} color="#39ff14" />
      {getBlockStructure()}
    </>
  );
};

const Experience = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef();

  // Track scroll progress for 3D timeline animation
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate progress (0 to 1) as element comes into view and scrolls through
        const startTrigger = windowHeight;
        const endTrigger = -elementHeight;
        const scrollRange = startTrigger - endTrigger;
        const currentProgress = Math.min(Math.max((startTrigger - elementTop) / scrollRange, 0), 1);
        
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      id: 1,
      company: 'BlockTech Solutions',
      position: 'Senior Blockchain Developer',
      period: '2023 - Present',
      type: 'senior',
      description: 'Leading the development of next-generation DeFi protocols and smart contract architectures. Spearheading the integration of Layer 2 solutions and cross-chain interoperability.',
      achievements: [
        'Architected and deployed 5+ DeFi protocols with $10M+ TVL',
        'Reduced gas costs by 40% through optimized smart contract design',
        'Led a team of 6 developers in agile development practices',
        'Implemented comprehensive security auditing procedures'
      ],
      tech: ['Solidity', 'Hardhat', 'React', 'Web3.js', 'Polygon', 'Chainlink']
    },
    {
      id: 2,
      company: 'CryptoVerse Inc.',
      position: 'Lead Frontend Developer',
      period: '2022 - 2023',
      type: 'lead',
      description: 'Directed the frontend development of innovative Web3 applications, focusing on user experience and blockchain integration. Built responsive, accessible interfaces for complex DeFi protocols.',
      achievements: [
        'Developed 3D NFT marketplace with AR visualization',
        'Increased user engagement by 60% through UX improvements',
        'Mentored junior developers and established coding standards',
        'Implemented comprehensive testing strategies'
      ],
      tech: ['React', 'Three.js', 'TypeScript', 'Web3.js', 'IPFS', 'GraphQL']
    },
    {
      id: 3,
      company: 'Web3 Innovations',
      position: 'Full Stack Developer',
      period: '2021 - 2022',
      type: 'developer',
      description: 'Developed end-to-end blockchain applications, from smart contract deployment to frontend interfaces. Focused on creating seamless user experiences for decentralized applications.',
      achievements: [
        'Built and deployed 8+ smart contracts on Ethereum mainnet',
        'Created responsive web applications with 99.9% uptime',
        'Integrated multiple blockchain networks and protocols',
        'Optimized application performance and scalability'
      ],
      tech: ['Solidity', 'Node.js', 'React', 'MongoDB', 'AWS', 'Docker']
    }
  ];

  return (
    <ExperienceContainer ref={containerRef} id="experience">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <NeonText size="3rem" mobileSize="2rem">Professional Journey</NeonText>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '20px' }}>
            Building the future of decentralized technology through innovative 3D experiences
          </p>
        </motion.div>

        {/* Enhanced 3D Timeline */}
        <motion.div
          style={{
            height: '80vh',
            minHeight: '600px',
            margin: '80px 0',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'rgba(0, 255, 65, 0.02)',
            border: '1px solid rgba(0, 255, 65, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 50px rgba(0, 255, 65, 0.1)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* 3D timeline now handled by MasterCanvas */}
        </motion.div>
      </Container>
    </ExperienceContainer>
  );
};

export default Experience;