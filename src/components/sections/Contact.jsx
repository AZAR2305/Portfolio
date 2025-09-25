import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Float, Stars } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { Section, Container, NeonText, NeonButton, Card } from '../../styles/GlobalStyles';
import Canvas3DErrorBoundary from '../Canvas3DErrorBoundary';

const ContactContainer = styled(Section)`
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
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
      radial-gradient(circle at 25% 25%, rgba(50, 205, 50, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(50, 205, 50, 0.04) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  z-index: 2;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 0 20px;
  }
`;

const ContactInfo = styled(motion.div)`
  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 25px;
    background: rgba(50, 205, 50, 0.03);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: 1px solid rgba(50, 205, 50, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(10px);
      border-color: rgba(50, 205, 50, 0.3);
      background: rgba(50, 205, 50, 0.05);
    }

    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #32CD32, #228B22);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      font-size: 1.5rem;
      color: #0D0D0D;
      font-weight: bold;
    }

    .content {
      .label {
        color: #32CD32;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: ${props => props.theme.fonts.heading};
      }

      .value {
        color: #EAEAEA;
        font-size: 1.1rem;
        margin-top: 5px;
        font-family: ${props => props.theme.fonts.body};
      }
    }
  }

  .description {
    color: #EAEAEA;
    font-family: ${props => props.theme.fonts.body};
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 40px;
  }

  .social-links {
    display: flex;
    gap: 20px;
    margin-top: 40px;

    a {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(50, 205, 50, 0.05);
      backdrop-filter: blur(10px);
      border: 2px solid #32CD32;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #32CD32;
      font-size: 1.5rem;
      transition: all 0.3s ease;
      text-decoration: none;

      &:hover {
        background: #32CD32;
        color: #0D0D0D;
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(50, 205, 50, 0.5);
      }
    }
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(13, 13, 13, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(50, 205, 50, 0.2);
  padding: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #32CD32, #228B22);
  }

  .form-group {
    margin-bottom: 25px;
    position: relative;

    label {
      display: block;
      color: #32CD32;
      font-size: 0.9rem;
      font-family: ${props => props.theme.fonts.heading};
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    input, textarea {
      width: 100%;
      padding: 15px 20px;
      background: rgba(234, 234, 234, 0.05);
      border: 2px solid rgba(50, 205, 50, 0.2);
      border-radius: 10px;
      color: #EAEAEA;
      font-family: ${props => props.theme.fonts.body};
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #32CD32;
        box-shadow: 0 0 20px rgba(50, 205, 50, 0.3);
        background: rgba(50, 205, 50, 0.05);
      }

      &::placeholder {
        color: rgba(234, 234, 234, 0.5);
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .submit-status {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-family: ${props => props.theme.fonts.body};
    text-align: center;
    
    &.success {
      background: rgba(50, 205, 50, 0.1);
      border: 1px solid rgba(50, 205, 50, 0.3);
      color: #32CD32;
    }
    
    &.error {
      background: rgba(255, 99, 99, 0.1);
      border: 1px solid rgba(255, 99, 99, 0.3);
      color: #ff6363;
    }
  }
`;

const BackgroundCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// 3D Background Animation
const FloatingParticles = () => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  const particles = Array.from({ length: 30 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    ],
    scale: Math.random() * 0.1 + 0.05,
    color: '#32CD32'
  }));

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <Float key={index} speed={Math.random() * 2 + 0.5} rotationIntensity={0.3}>
          <Sphere args={[particle.scale]} position={particle.position}>
            <meshStandardMaterial 
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isConnected, setIsConnected] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <ContactContainer id="contact">
      {/* 3D background elements now handled by MasterCanvas */}

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <NeonText size="3rem" mobileSize="2rem">Let's Connect</NeonText>
          <p style={{ fontSize: '1.2rem', color: '#EAEAEA', marginTop: '20px', fontFamily: 'Inter, sans-serif' }}>
            Ready to build something amazing together? Let's discuss your next project.
          </p>
        </motion.div>

        <ContactGrid>
          <ContactInfo
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 style={{ 
                color: '#32CD32', 
                fontSize: '2rem', 
                marginBottom: '30px',
                fontFamily: 'Orbitron, monospace'
              }}>
                Get In Touch
              </h3>
              
              <p className="description">
                I'm always open to discussing new opportunities, innovative projects, 
                and creative collaborations. Whether you're looking to build a new 
                application, need technical consulting, or want to explore cutting-edge 
                technologies, I'd love to hear from you.
              </p>
            </motion.div>

            <motion.div 
              className="contact-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="icon">📧</div>
              <div className="content">
                <div className="label">Email</div>
                <div className="value">thameemul.dev@gmail.com</div>
              </div>
            </motion.div>

            <motion.div 
              className="contact-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="icon">📍</div>
              <div className="content">
                <div className="label">Location</div>
                <div className="value">Remote / Global</div>
              </div>
            </motion.div>

            <motion.div 
              className="contact-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="icon">💼</div>
              <div className="content">
                <div className="label">Availability</div>
                <div className="value">Open for Opportunities</div>
              </div>
            </motion.div>

            <motion.div 
              className="social-links"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a href="https://github.com/thameemul" target="_blank" rel="noopener noreferrer">
                🐙
              </a>
              <a href="https://linkedin.com/in/thameemul" target="_blank" rel="noopener noreferrer">
                💼
              </a>
              <a href="https://twitter.com/thameemul" target="_blank" rel="noopener noreferrer">
                🐦
              </a>
              <a href="https://discord.gg/thameemul" target="_blank" rel="noopener noreferrer">
                💬
              </a>
            </motion.div>
          </ContactInfo>

          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >


            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project Inquiry"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <NeonButton type="submit" style={{ width: '100%' }}>
                Send Message 🚀
              </NeonButton>
            </motion.div>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;