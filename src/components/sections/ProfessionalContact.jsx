import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, 
      rgba(102, 126, 234, 0.08) 0%, 
      rgba(118, 75, 162, 0.05) 30%, 
      transparent 60%);
    animation: orbitalMotion 20s linear infinite;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(102, 126, 234, 0.5), 
      rgba(118, 75, 162, 0.5), 
      transparent);
    animation: lineGlow 3s ease-in-out infinite;
  }
  
  @keyframes orbitalMotion {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  
  @keyframes lineGlow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
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
  
  h2 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1rem;
    
    .highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  p {
    font-size: 1.125rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    color: #ffffff;
    margin-bottom: 2rem;
    font-weight: 600;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }
    
    .icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .info {
      .label {
        color: #94a3b8;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
      }
      
      .value {
        color: #ffffff;
        font-weight: 600;
      }
    }
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    
    a {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      text-decoration: none;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-3px);
        border-color: #667eea;
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
      }
    }
  }
`;

const ContactForm = styled.form`
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      color: #ffffff;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    input, textarea {
      width: 100%;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #ffffff;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.1);
      }
      
      &::placeholder {
        color: #64748b;
      }
    }
    
    textarea {
      height: 120px;
      resize: vertical;
    }
  }
  
  .submit-button {
    width: 100%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const ProfessionalContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <ContactSection id="contact">
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
              Get In <span className="highlight">Touch</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to bring your blockchain project to life? Let's discuss 
              how we can work together to create something amazing.
            </motion.p>
          </SectionHeader>
        </motion.div>

        <ContactContent>
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactInfo>
              <h3>Let's Connect</h3>
              
              <div className="contact-item">
                <div className="icon">📧</div>
                <div className="info">
                  <div className="label">Email</div>
                  <div className="value">thameemulazarudeen@gmail.com</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">📱</div>
                <div className="info">
                  <div className="label">Phone</div>
                  <div className="value">+91 9600167794</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">📍</div>
                <div className="info">
                  <div className="label">Location</div>
                  <div className="value">Remote</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">⏰</div>
                <div className="info">
                  <div className="label">Response Time</div>
                  <div className="value">Within 24 hours</div>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://github.com/AZAR2305" aria-label="GitHub">🐙</a>
                <a href="https://www.linkedin.com/in/thameemul-azarudeen-6b5097290" aria-label="LinkedIn">💼</a>
                <a href="https://www.instagram.com/_azar_verse" aria-label="Instagram">🐦</a>
                
              </div>
            </ContactInfo>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm onSubmit={handleSubmit}>
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Thanks for your message! I'll get back to you soon.
                </SuccessMessage>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="liquid-hover"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="liquid-hover"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="liquid-hover"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="liquid-hover"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-button liquid-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </ContactForm>
          </motion.div>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default ProfessionalContact;