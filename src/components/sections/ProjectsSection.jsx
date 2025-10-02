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

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your actual project data
  const projectsData = [
    {
      id: 1,
      name: 'DeFi Trading Platform',
      description: 'Advanced decentralized finance platform with automated trading algorithms, yield farming, and liquidity mining features.',
      detailedDescription: 'A comprehensive DeFi platform built with React and Solidity, featuring smart contract integration, real-time price feeds, automated trading strategies, and advanced portfolio management tools. Implements cutting-edge DeFi protocols with security audits and gas optimization.',
      icon: '💰',
      category: 'Blockchain',
      techStack: ['Solidity', 'React', 'Web3.js', 'Node.js', 'MongoDB'],
      stargazers_count: 45,
      forks_count: 12,
      html_url: 'https://github.com/AZAR2305/defi-platform',
      homepage: 'https://defi-platform-demo.vercel.app'
    },
    {
      id: 2,
      name: 'NFT Marketplace',
      description: 'Full-featured NFT marketplace with minting, trading, auction functionality, and royalty management system.',
      detailedDescription: 'Complete NFT ecosystem allowing artists to mint, showcase, and sell digital creations. Features include Dutch auctions, English auctions, royalty distribution, IPFS integration for metadata storage, and social features for creators and collectors.',
      icon: '🎨',
      category: 'Blockchain',
      techStack: ['Solidity', 'React', 'IPFS', 'Ethereum', 'TypeScript'],
      stargazers_count: 67,
      forks_count: 23,
      html_url: 'https://github.com/AZAR2305/nft-marketplace',
      homepage: 'https://nft-marketplace-demo.vercel.app'
    },
    {
      id: 3,
      name: 'Blockchain Voting System',
      description: 'Transparent and secure voting system built on blockchain technology with immutable vote records.',
      detailedDescription: 'Tamper-proof voting system ensuring transparency and security in elections. Features real-time results, comprehensive audit trails, voter verification, administrative dashboard, and multi-signature governance for enhanced security.',
      icon: '🗳️',
      category: 'Blockchain',
      techStack: ['Solidity', 'Vue.js', 'Truffle', 'PostgreSQL', 'Express'],
      stargazers_count: 34,
      forks_count: 8,
      html_url: 'https://github.com/AZAR2305/blockchain-voting',
      homepage: 'https://blockchain-voting-demo.vercel.app'
    },
    {
      id: 4,
      name: 'Crypto Portfolio Tracker',
      description: 'Advanced portfolio management tool with real-time price tracking, analytics, and automated rebalancing.',
      detailedDescription: 'Comprehensive portfolio tracking application helping users monitor cryptocurrency investments with advanced analytics, profit/loss calculations, historical data visualization, custom alerts, and automated portfolio rebalancing strategies.',
      icon: '📊',
      category: 'Web App',
      techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express'],
      stargazers_count: 52,
      forks_count: 15,
      html_url: 'https://github.com/AZAR2305/crypto-portfolio',
      homepage: 'https://crypto-portfolio-demo.vercel.app'
    },
    {
      id: 5,
      name: 'Smart Contract Auditor',
      description: 'Automated smart contract vulnerability detection and security analysis tool for Ethereum.',
      detailedDescription: 'Advanced security analysis tool for smart contracts featuring automated vulnerability detection, gas optimization suggestions, code quality metrics, and comprehensive security reports with recommendations for developers.',
      icon: '🔒',
      category: 'Security',
      techStack: ['Python', 'Solidity', 'Flask', 'Docker', 'PostgreSQL'],
      stargazers_count: 28,
      forks_count: 6,
      html_url: 'https://github.com/AZAR2305/smart-contract-auditor',
      homepage: null
    },
    {
      id: 6,
      name: 'Decentralized Social Network',
      description: 'Web3 social platform with tokenized content, DAO governance, and decentralized identity management.',
      detailedDescription: 'Revolutionary social network built on blockchain technology featuring decentralized content storage, tokenized engagement rewards, DAO-based governance, NFT profile systems, and censorship-resistant communication protocols.',
      icon: '🌐',
      category: 'Web3',
      techStack: ['React', 'Solidity', 'IPFS', 'Next.js', 'Tailwind'],
      stargazers_count: 89,
      forks_count: 31,
      html_url: 'https://github.com/AZAR2305/web3-social',
      homepage: 'https://web3-social-demo.vercel.app'
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
                className="liquid-hover project-card"
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
                whileHover={{
                  y: -30,
                  rotateX: 8,
                  rotateY: -8,
                  scale: 1.05,
                  z: 50,
                  transition: { 
                    duration: 0.5, 
                    type: "spring", 
                    stiffness: 400,
                    damping: 25
                  }
                }}
                whileTap={{
                  scale: 0.96,
                  transition: { duration: 0.15 }
                }}
              >
                <motion.div 
                  className="project-image"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.6 }
                  }}
                >
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
                </motion.div>
                
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
    </ProjectsContainer>
  );
};

export default ProjectsSection;