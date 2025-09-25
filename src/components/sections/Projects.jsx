import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Section, Container, NeonText, GlassCard, NeonButton } from '../../styles/GlobalStyles';

const ProjectsContainer = styled(Section)`
  background: ${props => props.theme.colors.dark};
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
      radial-gradient(circle at 30% 20%, rgba(50, 205, 50, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(106, 90, 205, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 50px;
  margin-top: 80px;
  perspective: 1000px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ProjectCard = styled(GlassCard).attrs({ as: motion.div })`
  position: relative;
  height: 520px;
  cursor: pointer;
  overflow: hidden;
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(50, 205, 50, 0.2);
  box-shadow: ${props => props.theme.shadows.card};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.green};
    border-color: rgba(50, 205, 50, 0.4);
  }
  
  .project-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 65%;
    border-radius: 20px 20px 0 0;
  }
  
  .project-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35%;
    padding: 25px;
    background: linear-gradient(
      135deg, 
      rgba(0, 0, 0, 0.9) 0%, 
      rgba(0, 255, 65, 0.05) 100%
    );
    border-radius: 0 0 20px 20px;
    backdrop-filter: blur(10px);
  }
  
  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: 1.4rem;
    margin-bottom: 12px;
    text-shadow: 0 0 10px ${props => props.theme.colors.primary};
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 0.95rem;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
  }
  
  .tech-tag {
    background: rgba(0, 255, 65, 0.1);
    border: 1px solid rgba(0, 255, 65, 0.3);
    color: #39ff14;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .project-links {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .project-link {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 8px 15px;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 20px;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${props => props.theme.colors.primary};
      color: #000000;
      box-shadow: 0 0 20px ${props => props.theme.colors.primary};
    }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40px;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.gradients.glass};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-family: ${props => props.theme.fonts.heading};
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    font-size: 2rem;
    cursor: pointer;
  }
`;

// Lightweight CSS-based Project Preview (eliminates WebGL context issues)
const ProjectPreview = ({ type, isHovered }) => {
  const getProjectVisual = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '20px 20px 0 0',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    };

    switch (type) {
      case 'fullstack':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(135deg, 
              rgba(0, 255, 65, 0.1) 0%, 
              rgba(0, 255, 65, 0.3) 50%, 
              rgba(0, 255, 65, 0.1) 100%
            )`,
            boxShadow: isHovered ? '0 0 40px rgba(0, 255, 65, 0.5)' : '0 0 20px rgba(0, 255, 65, 0.2)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px solid #00ff41',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: '#00ff41',
              background: 'rgba(0, 255, 65, 0.1)',
              animation: isHovered ? 'pulse 2s infinite' : 'none',
            }}>
              🛒
            </div>
          </div>
        );
      case 'webapp':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(135deg, 
              rgba(106, 90, 205, 0.1) 0%, 
              rgba(106, 90, 205, 0.3) 50%, 
              rgba(106, 90, 205, 0.1) 100%
            )`,
            boxShadow: isHovered ? '0 0 40px rgba(106, 90, 205, 0.5)' : '0 0 20px rgba(106, 90, 205, 0.2)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px solid #6a5acd',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: '#6a5acd',
              background: 'rgba(106, 90, 205, 0.1)',
              animation: isHovered ? 'pulse 2s infinite' : 'none',
            }}>
              📋
            </div>
          </div>
        );
      case '3d':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(135deg, 
              rgba(255, 20, 147, 0.1) 0%, 
              rgba(255, 20, 147, 0.3) 50%, 
              rgba(255, 20, 147, 0.1) 100%
            )`,
            boxShadow: isHovered ? '0 0 40px rgba(255, 20, 147, 0.5)' : '0 0 20px rgba(255, 20, 147, 0.2)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px solid #ff1493',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: '#ff1493',
              background: 'rgba(255, 20, 147, 0.1)',
              animation: isHovered ? 'pulse 2s infinite' : 'none',
            }}>
              🎨
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(135deg, 
              rgba(255, 215, 0, 0.1) 0%, 
              rgba(255, 215, 0, 0.3) 50%, 
              rgba(255, 215, 0, 0.1) 100%
            )`,
            boxShadow: isHovered ? '0 0 40px rgba(255, 215, 0, 0.5)' : '0 0 20px rgba(255, 215, 0, 0.2)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px solid #ffd700',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: '#ffd700',
              background: 'rgba(255, 215, 0, 0.1)',
              animation: isHovered ? 'pulse 2s infinite' : 'none',
            }}>
              📊
            </div>
          </div>
        );
      default:
        return (
          <div style={{
            ...baseStyle,
            background: `linear-gradient(135deg, 
              rgba(0, 255, 65, 0.1) 0%, 
              rgba(0, 255, 65, 0.3) 50%, 
              rgba(0, 255, 65, 0.1) 100%
            )`,
            boxShadow: isHovered ? '0 0 40px rgba(0, 255, 65, 0.5)' : '0 0 20px rgba(0, 255, 65, 0.2)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '3px solid #00ff41',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: '#00ff41',
              background: 'rgba(0, 255, 65, 0.1)',
              animation: isHovered ? 'pulse 2s infinite' : 'none',
            }}>
              💻
            </div>
          </div>
        );
    }
  };

  return getProjectVisual();
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern full-stack e-commerce solution with real-time inventory, payment processing, and advanced analytics.',
      longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, advanced analytics dashboard, and responsive design. Includes admin panel, customer reviews, and automated email notifications.',
      type: 'fullstack',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API', 'Socket.io'],
      github: 'https://github.com/thameemul',
      demo: 'https://ecommerce.demo.com',
      features: ['Real-time Inventory', 'Payment Processing', 'Analytics Dashboard', 'Admin Panel', 'Review System'],
      impact: '1000+ products managed, $50K+ in transactions processed'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team collaboration, and advanced scheduling.',
      longDescription: 'A sophisticated task management application designed for modern teams. Features real-time collaboration, Kanban boards, Gantt charts, time tracking, and automated reporting. Built with modern technologies for optimal performance.',
      type: 'webapp',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redux Toolkit', 'Material-UI'],
      github: 'https://github.com/thameemul',
      demo: 'https://taskmanager.demo.com',
      features: ['Real-time Collaboration', 'Kanban Boards', 'Time Tracking', 'Team Analytics', 'Automated Reports'],
      impact: '500+ teams organized, 10K+ tasks completed'
    },
    {
      id: 3,
      title: '3D Portfolio Website',
      description: 'Interactive 3D portfolio showcasing modern web development with Three.js and immersive user experience.',
      longDescription: 'A cutting-edge portfolio website featuring interactive 3D elements, smooth animations, and responsive design. Built with React, Three.js, and modern web technologies to create an engaging and memorable user experience.',
      type: '3d',
      tech: ['React', 'Three.js', 'Framer Motion', 'Styled Components', 'WebGL', 'GLSL'],
      github: 'https://github.com/thameemul',
      demo: 'https://portfolio3d.demo.com',
      features: ['3D Character Animation', 'Interactive Elements', 'Smooth Transitions', 'Mobile Responsive', 'Modern Design'],
      impact: '95% visitor engagement rate, 40% increase in contact inquiries'
    },
    {
      id: 4,
      title: 'Data Analytics Dashboard',
      description: 'Comprehensive analytics platform with real-time data visualization and business intelligence insights.',
      longDescription: 'Advanced data analytics platform providing real-time insights through interactive visualizations. Features custom dashboards, automated reporting, and machine learning predictions for business intelligence.',
      type: 'analytics',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      github: 'https://github.com/thameemul',
      demo: 'https://analytics.demo.com',
      features: ['Real-time Visualization', 'Custom Dashboards', 'ML Predictions', 'Automated Reports', 'Data Export'],
      impact: '1TB+ data processed, 99.9% uptime achieved'
    }
  ];

  return (
    <ProjectsContainer id="projects">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <NeonText size="3rem" mobileSize="2rem">Featured Projects</NeonText>
          <p style={{ fontSize: '1.1rem', color: '#CCCCCC', marginTop: '20px' }}>
            Showcasing modern web applications and innovative digital solutions
          </p>
        </motion.div>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-canvas">
                <ProjectPreview 
                  type={project.type} 
                  isHovered={hoveredProject === project.id}
                />
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <NeonButton 
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    GitHub
                  </NeonButton>
                  <NeonButton 
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.demo, '_blank');
                    }}
                  >
                    Live Demo
                  </NeonButton>
                </div>
              </div>
            </ProjectCard>
          ))}
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
                ×
              </button>
              
              <h2>{selectedProject.title}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
                {selectedProject.longDescription}
              </p>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#00f5ff', marginBottom: '15px' }}>Key Features:</h3>
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="project-links">
                <NeonButton onClick={() => window.open(selectedProject.github, '_blank')}>
                  View on GitHub
                </NeonButton>
                <NeonButton onClick={() => window.open(selectedProject.demo, '_blank')}>
                  Live Demo
                </NeonButton>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;