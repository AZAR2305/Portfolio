import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { Section, NeonText, NeonButton, Card } from '../../styles/GlobalStyles';

const ContactContainer = styled(Section)`
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
  position: relative;
  overflow: hidden;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 10;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 20px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  margin-bottom: 30px;
  opacity: 0.9;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.4);
    transform: translateX(10px);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #000;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  h4 {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: 5px;
    font-size: 1.1rem;
  }

  p {
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    opacity: 0.9;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(NeonButton)`
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  margin-top: 10px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 255, 255, 0.1);
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Message sent! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'thameemul@example.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      details: '+1 (555) 123-4567'
    },
    {
      icon: '📍',
      title: 'Location',
      details: 'San Francisco, CA'
    },
    {
      icon: '🌐',
      title: 'Website',
      details: 'www.thameemul.dev'
    }
  ];

  return (
    <ContactContainer ref={ref}>
      <ContactContent>
        <ContactInfo>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <NeonText>Get In Touch</NeonText>
            <ContactDescription>
              I'm always interested in hearing about new opportunities and exciting projects. 
              Whether you're a company looking to hire, or you're a fellow developer wanting to 
              collaborate, I'd love to hear from you.
            </ContactDescription>
          </motion.div>

          {contactInfo.map((item, index) => (
            <ContactItem
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ContactIcon>{item.icon}</ContactIcon>
              <ContactDetails>
                <h4>{item.title}</h4>
                <p>{item.details}</p>
              </ContactDetails>
            </ContactItem>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                🐙
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                💼
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                🐦
              </SocialLink>
              <SocialLink href="mailto:thameemul@example.com">
                ✉️
              </SocialLink>
            </SocialLinks>
          </motion.div>
        </ContactInfo>

        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me more..."
              required
            />
          </FormGroup>

          <SubmitButton type="submit">
            Send Message
          </SubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;