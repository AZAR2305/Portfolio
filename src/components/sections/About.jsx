import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { Section, NeonText, Card } from '../../styles/GlobalStyles';

const AboutContainer = styled(Section)`
  background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
  overflow: hidden;
  position: relative;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1400px;
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

const AboutText = styled.div`
  max-width: 600px;
`;

const AboutDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  margin-bottom: 30px;
  font-weight: 400;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const SkillCard = styled(Card)`
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  background: rgba(0, 255, 255, 0.05);
  border-color: rgba(0, 255, 255, 0.2);

  &:hover {
    transform: translateY(-10px);
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 20px 40px rgba(0, 255, 255, 0.2);
  }

  h3 {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }

  p {
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    line-height: 1.6;
    opacity: 0.9;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
  padding: 30px;
  background: rgba(50, 205, 50, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(50, 205, 50, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: 8px;
    font-weight: 700;
  }
  
  p {
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const SkillsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 255, 255, 0.05);
    transform: translateY(-5px);
  }

  h4 {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    padding: 5px 0;
    opacity: 0.9;
    font-size: 0.9rem;
    
    &:before {
      content: "▸";
      color: ${props => props.theme.colors.primary};
      margin-right: 8px;
    }
  }
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const skills = {
    frontend: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs'],
    blockchain: ['Ethereum', 'Solidity', 'Web3.js', 'Smart Contracts', 'DeFi'],
    tools: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL']
  };

  return (
    <AboutContainer ref={ref}>
      <AboutContent>
        <AboutText>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <NeonText>About Me</NeonText>
            <AboutDescription>
              I'm a passionate full-stack developer specializing in blockchain technology 
              and modern web applications. With expertise in React, Node.js, and Web3 
              technologies, I create innovative solutions that bridge traditional development 
              with cutting-edge blockchain applications.
            </AboutDescription>
            <AboutDescription>
              My journey in technology spans over 5 years, during which I've worked on 
              diverse projects ranging from e-commerce platforms to decentralized 
              applications. I'm particularly excited about the potential of blockchain 
              technology to revolutionize how we interact with digital systems.
            </AboutDescription>
          </motion.div>

          <StatsContainer>
            <StatItem>
              <h3>5+</h3>
              <p>Years Experience</p>
            </StatItem>
            <StatItem>
              <h3>50+</h3>
              <p>Projects Completed</p>
            </StatItem>
            <StatItem>
              <h3>20+</h3>
              <p>Technologies Mastered</p>
            </StatItem>
          </StatsContainer>
        </AboutText>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SkillsSection>
            {Object.entries(skills).map(([category, skillList], index) => (
              <SkillCategory
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <SkillsList>
                  {skillList.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </SkillsList>
              </SkillCategory>
            ))}
          </SkillsSection>
        </motion.div>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;