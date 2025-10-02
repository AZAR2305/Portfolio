import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    animation: pulseBackground 10s ease-in-out infinite alternate;
    pointer-events: none;
  }
  
  @keyframes pulseBackground {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.7;
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  position: relative;
  z-index: 1;
  width: 100%;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 2px;
    opacity: 0;
    animation: slideInFromTop 1s ease-out 0.5s forwards;
  }
  
  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      animation: expandLine 1.5s ease-out 1s forwards;
    }
    
    .highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientFlow 3s ease-in-out infinite;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        opacity: 0.1;
        filter: blur(15px);
        z-index: -1;
        animation: pulseGlow 2s ease-in-out infinite;
      }
    }
  }
  
  p {
    font-size: 1.125rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 0;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 2px;
      animation: expandHeight 1s ease-out 1.2s forwards;
    }
    
    &::after {
      content: '';
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 0;
      background: linear-gradient(135deg, #764ba2, #f093fb);
      border-radius: 2px;
      animation: expandHeight 1s ease-out 1.4s forwards;
    }
  }
  
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes expandLine {
    to {
      width: 100%;
    }
  }
  
  @keyframes expandHeight {
    to {
      height: 60px;
    }
  }
  
  @keyframes gradientFlow {
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutContent = styled.div`
  h3 {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1rem;
    color: #94a3b8;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  .highlight-text {
    color: #667eea;
    font-weight: 600;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const SkillCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(102, 126, 234, 0.02));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent,
      rgba(102, 126, 234, 0.15),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(102, 126, 234, 0.05));
    
    &::before {
      left: 100%;
    }
    
    .icon {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }
  }
  
  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    color: white;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    
    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
      border-radius: 14px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  
  h4 {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    position: relative;
    z-index: 2;
    transition: color 0.3s ease;
  }
  
  p {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.7;
    position: relative;
    z-index: 2;
    transition: color 0.3s ease;
  }
  
  &:hover {
    h4 {
      color: #e2e8f0;
    }
    
    p {
      color: #cbd5e1;
    }
  }
`;

const TechStack = styled(motion.div)`
  margin-top: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -20px;
    right: -20px;
    bottom: -10px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), transparent);
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  h4 {
    color: #ffffff;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    
    &:hover::after {
      width: 80px;
    }
  }
  
  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  
  .tech-item {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
    color: #e2e8f0;
    padding: 1rem 1.5rem;
    border-radius: 30px;
    font-size: 0.95rem;
    font-weight: 600;
    border: 1px solid rgba(102, 126, 234, 0.2);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transform-style: preserve-3d;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent,
        rgba(100, 255, 218, 0.3),
        transparent
      );
      transition: left 0.6s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(100, 255, 218, 0.2), transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
      z-index: -1;
    }
    
    &:hover {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
      border-color: rgba(100, 255, 218, 0.6);
      transform: translateY(-5px) rotateY(10deg) scale(1.08);
      box-shadow: 
        0 12px 30px rgba(100, 255, 218, 0.3),
        0 0 20px rgba(102, 126, 234, 0.2);
      color: #64ffda;
      text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
      
      &::before {
        left: 100%;
      }
      
      &::after {
        width: 100px;
        height: 100px;
      }
    }
  }
`;

const ProfessionalAbout = () => {
  const skills = [
    {
      icon: '🔗',
      title: 'Blockchain Development',
      description: 'Smart contracts, DApps, and blockchain architecture'
    },
    {
      icon: '⚡',
      title: 'Web3 Integration',
      description: 'Wallet connectivity, DeFi protocols, and NFT marketplaces'
    },
    {
      icon: '🔒',
      title: 'Security Auditing',
      description: 'Smart contract security analysis and vulnerability assessment'
    },
    {
      icon: '🚀',
      title: 'Full-Stack Development',
      description: 'Modern web applications with React, Node.js, and databases'
    }
  ];

  const techStack = [
    'Solidity', 'Web3.js', 'Ethers.js', 'React', 'Node.js', 'TypeScript',
    'Python', 'Hardhat', 'Supabase', 'Firebase', 'Javascript', 'Next.js', 'MongoDB', 'PostgreSQL'
  ];

  return (
    <AboutSection id="about">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="highlight">Me</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Passionate blockchain developer with expertise in creating innovative 
              decentralized solutions and smart contract development.
            </motion.p>
          </SectionHeader>
        </motion.div>

        <ContentGrid>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AboutContent>
              <h3>My Journey</h3>
              <p>
                I'm a dedicated <span className="highlight-text">blockchain developer</span> with 
                over 3 years of experience in building decentralized applications and smart contracts. 
                My passion lies in creating innovative solutions that leverage the power of blockchain technology.
              </p>
              <p>
                I specialize in <span className="highlight-text">Ethereum development</span>, 
                smart contract security, and full-stack Web3 applications. I've worked with various 
                clients to deliver secure, scalable, and user-friendly blockchain solutions.
              </p>
              <p>
                When I'm not coding, I enjoy staying up-to-date with the latest blockchain trends, 
                contributing to open-source projects, and sharing knowledge with the developer community.
              </p>
            </AboutContent>

            <TechStack>
              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Technologies I Work With
              </motion.h4>
              <div className="tech-list">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="tech-item"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.6, 
                      rotateY: -90,
                      z: -50
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      z: 0
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + (index * 0.08),
                      type: "spring",
                      stiffness: 150,
                      damping: 12
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateY: 5,
                      z: 20,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </TechStack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="icon">{skill.icon}</div>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </SkillCard>
              ))}
            </SkillsGrid>
          </motion.div>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};

export default ProfessionalAbout;