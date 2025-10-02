import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.scrolled ? '1rem 0' : '1.2rem 0'};
  min-height: 80px;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;


const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  &:hover {
    color: #667eea;
  }
  
  &.active {
    color: #667eea;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 1px;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 999;
  
  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      color: #667eea;
      transform: scale(1.1);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DynamicName = styled(motion.div)`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 800;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
  cursor: pointer;
  
  .first-name {
    color: #ffffff;
    margin-right: 0.5rem;
    display: inline-block;
  }
  
  .last-name {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    animation: gradientShift 4s ease-in-out infinite;
  }
  
  &:hover {
    .first-name {
      color: #e2e8f0;
      text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
    }
    
    .last-name {
      filter: brightness(1.2);
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

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Intersection Observer for Hero Section Name Visibility
  useEffect(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show name in nav when hero name is NOT visible (less than 30% visible)
        setShowName(!entry.isIntersecting || entry.intersectionRatio < 0.3);
      },
      {
        threshold: [0, 0.3, 0.7], // Multiple thresholds for smooth transition
        rootMargin: '-150px 0px 0px 0px' // Trigger when hero is 150px from top
      }
    );
    
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <NavContainer 
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContent>
          <AnimatePresence>
            {showName && (
              <DynamicName
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20 
                }}
                onClick={scrollToTop}
              >
                <span className="first-name">THAMEEMUL</span>
                <span className="last-name">AZARUDEEN</span>
              </DynamicName>
            )}
          </AnimatePresence>
          
          <NavLinks>
            {navItems.map(item => (
              <NavLink
                key={item.id}
                href={`#${item.id}`}
                className={`liquid-hover ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>
          
          <CTAButton onClick={() => scrollToSection('contact')}>
            Hire Me
          </CTAButton>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            ☰
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setMobileMenuOpen(false)}>
              ✕
            </CloseButton>
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;