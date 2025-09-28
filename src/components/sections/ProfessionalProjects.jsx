import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled.section`
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

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border: 1px solid ${props => props.active ? 'transparent' : '#334155'};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667eea;
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
    
    .project-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.5rem;
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
        
        &:hover {
          color: #764ba2;
          transform: translateY(-1px);
        }
      }
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #1e293b;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  
  .modal-header {
    padding: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    h3 {
      color: #ffffff;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #94a3b8;
    }
  }
  
  .modal-body {
    padding: 2rem;
    
    .project-details {
      color: #94a3b8;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    
    .features-list {
      margin: 2rem 0;
      
      h4 {
        color: #ffffff;
        margin-bottom: 1rem;
      }
      
      ul {
        list-style: none;
        padding: 0;
        
        li {
          color: #94a3b8;
          padding: 0.5rem 0;
          position: relative;
          padding-left: 1.5rem;
          
          &::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
          }
        }
      }
    }
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    
    &:hover {
      color: #ffffff;
    }
  }
`;

const ProfessionalProjects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'DeFi Trading Platform',
      description: 'A comprehensive decentralized trading platform with automated market making and yield farming capabilities.',
      fullDescription: 'Built a full-featured DeFi platform that enables users to trade tokens, provide liquidity, and earn yields. Implemented automated market maker algorithms and integrated with multiple blockchain networks.',
      tech: ['Solidity', 'React', 'Web3.js', 'Node.js'],
      category: 'DeFi',
      icon: '💰',
      features: [
        'Automated Market Maker (AMM)',
        'Liquidity Pool Management',
        'Yield Farming Rewards',
        'Multi-chain Support',
        'Advanced Trading Interface'
      ],
      links: {
        demo: '#',
        github: '#'
      }
    },
    {
      id: 2,
      title: 'NFT Marketplace',
      description: 'Full-featured NFT marketplace with minting, trading, and auction functionality.',
      fullDescription: 'Developed a complete NFT ecosystem allowing artists to mint, showcase, and sell their digital creations. Includes auction mechanisms, royalty systems, and social features.',
      tech: ['Solidity', 'React', 'IPFS', 'MongoDB'],
      category: 'NFT',
      icon: '🎨',
      features: [
        'NFT Minting & Trading',
        'Auction System',
        'Royalty Management',
        'IPFS Integration',
        'Artist Profiles'
      ],
      links: {
        demo: '#',
        github: '#'
      }
    },
    {
      id: 3,
      title: 'Blockchain Voting System',
      description: 'Transparent and secure voting system built on blockchain technology.',
      fullDescription: 'Created a tamper-proof voting system that ensures transparency and security in elections. Features real-time results and comprehensive audit trails.',
      tech: ['Solidity', 'Vue.js', 'Truffle', 'PostgreSQL'],
      category: 'dApp',
      icon: '🗳️',
      features: [
        'Secure Voting Mechanism',
        'Real-time Results',
        'Audit Trail',
        'Voter Verification',
        'Administrative Dashboard'
      ],
      links: {
        demo: '#',
        github: '#'
      }
    },
    {
      id: 4,
      title: 'Crypto Portfolio Tracker',
      description: 'Advanced portfolio management tool with real-time price tracking and analytics.',
      fullDescription: 'Built a comprehensive portfolio tracking application that helps users monitor their cryptocurrency investments with advanced analytics and reporting features.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      category: 'Web App',
      icon: '📊',
      features: [
        'Real-time Price Tracking',
        'Portfolio Analytics',
        'Profit/Loss Calculations',
        'Historical Data',
        'Custom Alerts'
      ],
      links: {
        demo: '#',
        github: '#'
      }
    }
  ];

  const categories = ['All', 'DeFi', 'NFT', 'dApp', 'Web App'];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' || project.category === activeFilter
  );

  return (
    <ProjectsSection id="projects">
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
              Explore some of my recent work in blockchain development, 
              DeFi applications, and Web3 solutions.
            </motion.p>
          </SectionHeader>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FilterButtons>
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              >
                <FilterButton
                  active={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </FilterButton>
              </motion.div>
            ))}
          </FilterButtons>
        </motion.div>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ 
                  opacity: 0, 
                  y: 80, 
                  rotateX: -15,
                  scale: 0.8
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1
                }}
                exit={{ 
                  opacity: 0, 
                  y: -50, 
                  rotateX: 15,
                  scale: 0.8,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  y: -25,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.03,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  <span>{project.icon}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.links.demo} onClick={(e) => e.stopPropagation()}>
                      🔗 Live Demo
                    </a>
                    <a href={project.links.github} onClick={(e) => e.stopPropagation()}>
                      📁 GitHub
                    </a>
                  </div>
                </div>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </Container>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-button"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <div className="modal-header">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
              </div>
              <div className="modal-body">
                <div className="project-details">
                  {selectedProject.fullDescription}
                </div>
                <div className="features-list">
                  <h4>Key Features</h4>
                  <ul>
                    {selectedProject.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default ProfessionalProjects;