import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import {
  Section,
  Container,
  GradientText,
  Card,
  AnimatedText,
  FloatingElement
} from '../styles/ModernStyles';

const AboutSection = styled(Section)`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  z-index: 2;
`;

const VisualContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 2;
`;

const SkillCard = styled(Card)`
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
`;

const SkillTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
`;

const SkillDescription = styled.p`
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 1rem;
  font-size: 0.8rem;
  color: #a78bfa;
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #9ca3af;
  font-weight: 500;
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    {
      icon: '🚀',
      title: 'Frontend Development',
      description: 'Creating responsive, interactive user interfaces with modern frameworks and cutting-edge design principles.',
      tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
      icon: '⚡',
      title: 'Backend Development',
      description: 'Building robust, scalable server-side applications and APIs with security and performance in mind.',
      tags: ['Python', 'Node.js', 'Django', 'FastAPI', 'PostgreSQL']
    },
    {
      icon: '🔗',
      title: 'Blockchain & Web3',
      description: 'Developing decentralized applications and smart contracts for the future of web technology.',
      tags: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'DeFi']
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on cloud platforms with automated CI/CD pipelines.',
      tags: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '20+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' }
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
    hidden: { y: 50, opacity: 0 },
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
    <AboutSection ref={ref}>
      <Container>
        <AboutContent>
          <TextContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <GradientText size="clamp(2.5rem, 4vw, 3.5rem)">
                  About Me
                </GradientText>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedText delay="0.2s">
                  I'm a passionate full-stack developer with expertise in modern web technologies 
                  and blockchain development. I love creating innovative solutions that solve 
                  real-world problems and deliver exceptional user experiences.
                </AnimatedText>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedText delay="0.4s">
                  With a strong foundation in both frontend and backend technologies, I specialize 
                  in building scalable, performant applications that make a difference. My journey 
                  spans from traditional web development to cutting-edge blockchain solutions.
                </AnimatedText>
              </motion.div>
              
              <StatsGrid>
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </motion.div>
          </TextContent>

          <VisualContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SkillCard hover glow>
                    <SkillHeader>
                      <SkillIcon>{skill.icon}</SkillIcon>
                      <SkillTitle>{skill.title}</SkillTitle>
                    </SkillHeader>
                    <SkillDescription>{skill.description}</SkillDescription>
                    <SkillTags>
                      {skill.tags.map((tag, tagIndex) => (
                        <SkillTag key={tagIndex}>{tag}</SkillTag>
                      ))}
                    </SkillTags>
                  </SkillCard>
                </motion.div>
              ))}
            </motion.div>
          </VisualContent>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;