import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 8rem 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, rgba(102, 126, 234, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(118, 75, 162, 0.08) 0%, transparent 50%);
    animation: floatingBackground 15s ease-in-out infinite alternate;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    top: 10%;
    right: 10%;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: orbitalFloat 20s linear infinite;
    pointer-events: none;
  }
  
  @keyframes floatingBackground {
    0% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.5;
    }
    100% {
      transform: translateY(-20px) rotate(2deg);
      opacity: 0.8;
    }
  }
  
  @keyframes orbitalFloat {
    0% {
      transform: rotate(0deg) translateX(100px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      transform: rotate(360deg) translateX(100px) rotate(-360deg);
      opacity: 0.3;
    }
  }

  @media (max-width: 768px) {
    padding: 4rem 0;
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
  margin-bottom: 4rem;
  position: relative;
  
  &::before {
    content: '{ projects }';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    color: #667eea;
    font-family: 'Fira Code', monospace;
    opacity: 0;
    animation: codeAppear 1s ease-out 0.5s forwards;
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
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      animation: expandFromCenter 1.2s ease-out 0.8s forwards;
    }
    
    .highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%, #667eea 100%);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: dynamicGradient 4s ease-in-out infinite;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        opacity: 0.15;
        filter: blur(20px);
        z-index: -1;
        animation: breathingGlow 3s ease-in-out infinite;
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
      animation: textSweep 2s ease-out 1.5s;
    }
  }
  
  @keyframes codeAppear {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-10px);
    }
    to {
      opacity: 0.7;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  @keyframes expandFromCenter {
    to {
      width: 80px;
    }
  }
  
  @keyframes dynamicGradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
  }
  
  @keyframes breathingGlow {
    0%, 100% {
      opacity: 0.15;
      transform: scale(1);
    }
    50% {
      opacity: 0.25;
      transform: scale(1.1);
    }
  }
  
  @keyframes textSweep {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(102, 126, 234, 0.02));
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  
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
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    animation: particleFloat 3s ease-in-out infinite;
    z-index: 2;
  }
  
  &:hover {
    transform: translateY(-20px) rotateX(5deg) rotateY(-5deg) scale(1.03);
    border-color: rgba(102, 126, 234, 0.6);
    box-shadow: 
      0 30px 60px rgba(102, 126, 234, 0.4),
      0 0 100px rgba(102, 126, 234, 0.2),
      inset 0 0 0 1px rgba(102, 126, 234, 0.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(102, 126, 234, 0.08));
    
    &::after {
      opacity: 1;
      animation-duration: 1.5s;
    }
    
    &::before {
      left: 100%;
    }
    
    .project-image {
      transform: scale(1.05);
      
      &::after {
        opacity: 0.8;
      }
    }
    
    .project-title {
      color: #e2e8f0;
      text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
    }
    
    .tech-tag {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
    }
  }
  
  .project-image {
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    background-size: 400% 400%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
    animation: gradientShift 8s ease-in-out infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      opacity: 0.6;
      transition: all 0.3s ease;
    }
  }
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 100% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 0% 100%;
    }
  }
  
  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0px) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-10px) scale(1.2);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-5px) scale(0.8);
      opacity: 0.6;
    }
    75% {
      transform: translateY(-15px) scale(1.1);
      opacity: 0.9;
    }
  }
  
  .project-content {
    padding: 1.5rem;
    position: relative;
    z-index: 2;
    
    .project-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .project-description {
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .project-stats {
      display: flex;
      gap: 20px;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      color: #94a3b8;
      
      .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
      
      .tech-tag {
        background: rgba(102, 126, 234, 0.1);
        color: #667eea;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid rgba(102, 126, 234, 0.2);
        transition: all 0.3s ease;
      }
    }
    
    .project-links {
      display: flex;
      gap: 1rem;
      
      a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 8px;
        background: rgba(102, 126, 234, 0.1);
        
        &:hover {
          color: #764ba2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;



const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(102, 126, 234, 0.1);
  border-top: 3px solid #667eea;
  border-radius: 50%;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ef4444;
  font-size: 1.1rem;
  padding: 40px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  margin: 20px 0;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
  backdrop-filter: blur(20px);
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95));
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(25px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;
  
  &:hover {
    background: rgba(102, 126, 234, 0.3);
    border-color: rgba(102, 126, 234, 0.5);
    transform: scale(1.1);
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  
  .project-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .project-title {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .project-category {
    color: #667eea;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem 2rem;
  
  .description {
    color: #cbd5e1;
    line-height: 1.7;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .tech-stack {
    margin-bottom: 2rem;
    
    h4 {
      color: #ffffff;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      
      .tech-tag {
        background: rgba(102, 126, 234, 0.2);
        color: #667eea;
        padding: 0.5rem 1rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
        border: 1px solid rgba(102, 126, 234, 0.3);
      }
    }
  }
  
  .project-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    
    .stat {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
  
  .project-links {
    display: flex;
    gap: 1rem;
    
    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
      }
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal function
  const closeModal = () => {
    setSelectedProject(null);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  // Your actual project data
  const projectsData = [
    {
      id: 1,
      name: 'in-SEI-ght',
      description: 'A blockchain + AI powered insight tool built during the AI Accelathon hackathon, exploring zk-tech, Node.js, Solidity, combining data analytics and smart contracts.',
      detailedDescription: 'Developed during the AI Accelathon (Dorahacks), this innovative project combines blockchain technology with artificial intelligence to create powerful data insights. Features zero-knowledge proofs, smart contract integration, and advanced analytics capabilities.',
      icon: '🧠',
      category: 'AI + Blockchain',
      techStack: ['Node.js', 'Solidity', 'Web3', 'AI/ML', 'ZK-Tech'],
      stargazers_count: 42,
      forks_count: 18,
      html_url: 'https://github.com/AZAR2305/Sei',
      homepage: null
    },
    {
      id: 3,
      name: 'TracX',
      description: 'A decentralized supply chain tracking system ensuring transparency, immutability, and product verification using blockchain.',
      detailedDescription: 'Comprehensive supply chain solution leveraging blockchain technology to provide end-to-end traceability. Features QR code integration, real-time tracking, authenticity verification, and immutable audit trails for complete transparency.',
      icon: '�',
      category: 'Supply Chain',
      techStack: ['Ethereum', 'Solidity', 'React', 'Web3.js', 'IPFS'],
      stargazers_count: 56,
      forks_count: 23,
      html_url: 'https://github.com/AZAR2305/tracx',
      homepage: null
    },
    {
      id: 4,
      name: 'Kendo',
      description: 'A gamified learning platform that uses blockchain tokens as rewards for completing coding and problem-solving challenges.',
      detailedDescription: 'Interactive educational platform that gamifies programming education through blockchain-based rewards. Students earn tokens for completing challenges, solving problems, and mastering coding concepts, creating an engaging and incentivized learning environment.',
      icon: '🎯',
      category: 'EdTech',
      techStack: ['React', 'Node.js', 'Smart Contracts', 'MongoDB', 'Web3'],
      stargazers_count: 71,
      forks_count: 34,
      html_url: 'https://github.com/AZAR2305/KENDO',
      homepage: null
    },
    {
      id: 5,
      name: 'Nether-Quest',
      description: 'A blockchain-based adventure game combining NFTs and tokenized rewards with immersive storytelling.',
      detailedDescription: 'Immersive blockchain gaming experience built with Unity, featuring NFT-based characters, tokenized in-game assets, and decentralized storytelling. Players can own, trade, and monetize their gaming achievements through smart contracts.',
      icon: '⚔️',
      category: 'GameFi',
      techStack: ['Unity', 'Web3', 'Smart Contracts', 'NFTs', 'C#'],
      stargazers_count: 94,
      forks_count: 45,
      html_url: 'https://github.com/AZAR2305/Nether-Quest-2.0',
      homepage: null
    },
    {
      id: 6,
      name: 'DJs on Demand',
      description: 'A platform connecting DJs with event organizers, featuring booking, payments, and ratings secured via smart contracts.',
      detailedDescription: 'Decentralized marketplace for DJ services featuring smart contract-based bookings, automated payments, reputation systems, and dispute resolution. Eliminates intermediaries while ensuring secure transactions and fair compensation for artists.',
      icon: '�',
      category: 'Marketplace',
      techStack: ['React', 'Node.js', 'Firebase', 'Solidity', 'Web3'],
      stargazers_count: 48,
      forks_count: 19,
      html_url: 'https://github.com/AZAR2305/djsondemand',
      homepage: null
    }
  ];

  useEffect(() => {
    // Simulate loading for smooth UX
    setLoading(true);
    setTimeout(() => {
      setProjects(projectsData);
      setLoading(false);
    }, 1000);
  }, []);





  if (loading) {
    return (
      <ProjectsContainer>
        <Container>
          <SectionHeader>
            <h2>
              Featured <span className="highlight">Projects</span>
            </h2>
          </SectionHeader>
          <LoadingContainer>
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </LoadingContainer>
        </Container>
      </ProjectsContainer>
    );
  }

  if (error) {
    return (
      <ProjectsContainer>
        <Container>
          <SectionHeader>
            <h2>
              Featured <span className="highlight">Projects</span>
            </h2>
          </SectionHeader>
          <ErrorMessage>
            Failed to load projects: {error}
          </ErrorMessage>
        </Container>
      </ProjectsContainer>
    );
  }

  return (
    <ProjectsContainer id="projects">
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
              Featured <span className="highlight">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore my latest work in blockchain development, web applications, 
              and full-stack solutions built with cutting-edge technologies.
            </motion.p>
          </SectionHeader>
        </motion.div>

        <ProjectsGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                layout
className="project-card"
                onClick={() => {
                  try {
                    setSelectedProject(project);
                  } catch (error) {
                    console.error('Error selecting project:', error);
                  }
                }}
                style={{ cursor: 'pointer' }}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  rotateX: -20,
                  scale: 0.7,
                  z: -100
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1,
                  z: 0
                }}
                exit={{ 
                  opacity: 0, 
                  y: -80, 
                  rotateX: 20,
                  scale: 0.7,
                  z: -100,
                  transition: { duration: 0.4 }
                }}
                transition={{ 
                  duration: 0.9, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 120,
                  damping: 18
                }}

              >
                <div className="project-image">
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: 0.3 + (index * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {project.icon}
                  </motion.span>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">
                    {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  
                  <p className="project-description">
                    {project.detailedDescription}
                  </p>
                  
                  <div className="project-stats">
                    <div className="stat-item">
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                      </svg>
                      {project.stargazers_count}
                    </div>
                    <div className="stat-item">
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
                      </svg>
                      {project.forks_count}
                    </div>
                    <div className="stat-item">
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                      </svg>
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="project-tech">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                      View Code
                    </a>
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M10.5 2a.5.5 0 01.5.5v4a.5.5 0 01-1 0V3.707L4.854 8.854a.5.5 0 01-.708-.708L9.293 3H6.5a.5.5 0 010-1h4z"/>
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>
      
      <AnimatePresence>
        {selectedProject && selectedProject.name && (
          <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </CloseButton>
            
            <ModalHeader>
              <span className="project-icon">{selectedProject.icon}</span>
              <h2 className="project-title">{selectedProject.name}</h2>
              <p className="project-category">{selectedProject.category}</p>
            </ModalHeader>
            
            <ModalBody>
              <div className="description">
                {selectedProject.detailedDescription}
              </div>
              
              <div className="tech-stack">
                <h4>Technology Stack</h4>
                <div className="tech-tags">
                  {selectedProject.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-stats">
                <div className="stat">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{selectedProject.duration || "3-6 months"}</span>
                </div>
                <div className="stat">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{selectedProject.teamSize || "Solo Project"}</span>
                </div>
                <div className="stat">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{selectedProject.status || "Completed"}</span>
                </div>
              </div>
              
              <div className="project-links">
                {selectedProject.html_url && (
                  <a href={selectedProject.html_url} target="_blank" rel="noopener noreferrer">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </ModalBody>
          </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default ProjectsSection;