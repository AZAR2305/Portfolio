import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { Section, NeonText, Card } from '../../styles/GlobalStyles';

const ExperienceContainer = styled(Section)`
  background: linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%);
  position: relative;
  overflow: hidden;
`;

const ExperienceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Timeline = styled.div`
  position: relative;
  margin-top: 60px;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.secondary}
    );
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 80px;
  width: 100%;

  &:nth-child(even) .timeline-content {
    left: auto;
    right: 55%;
    text-align: right;

    @media (max-width: 768px) {
      right: auto;
      left: 60px;
      text-align: left;
    }
  }

  &:nth-child(odd) .timeline-content {
    left: 55%;

    @media (max-width: 768px) {
      left: 60px;
    }
  }
`;

const TimelineContent = styled(Card)`
  position: relative;
  width: 45%;
  padding: 30px;
  background: rgba(0, 255, 255, 0.05);
  border-color: rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: calc(100% - 80px);
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(0, 255, 255, 0.1);
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 15px 30px rgba(0, 255, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border: 15px solid transparent;
  }

  .timeline-content:nth-child(even) &::before {
    right: -30px;
    border-left-color: rgba(0, 255, 255, 0.2);

    @media (max-width: 768px) {
      left: -30px;
      right: auto;
      border-left-color: transparent;
      border-right-color: rgba(0, 255, 255, 0.2);
    }
  }

  .timeline-content:nth-child(odd) &::before {
    left: -30px;
    border-right-color: rgba(0, 255, 255, 0.2);
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 0 20px ${props => props.theme.colors.primary};

  @media (max-width: 768px) {
    left: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    opacity: 0.3;
  }
`;

const JobTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Company = styled.h4`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.1rem;
  margin-bottom: 8px;
  opacity: 0.9;
  font-weight: 500;
`;

const Period = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  line-height: 1.6;
  margin-top: 15px;
  opacity: 0.9;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.text};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.body};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 255, 255, 0.1);
  }
`;

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const experiences = [
    {
      title: "Senior Blockchain Developer",
      company: "Tech Innovation Labs",
      period: "2023 - Present",
      description: "Leading the development of decentralized applications and smart contracts. Architecting blockchain solutions for enterprise clients and managing a team of developers.",
      technologies: ["Solidity", "React", "Web3.js", "Node.js", "MongoDB", "AWS"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Inc",
      period: "2021 - 2023",
      description: "Built scalable web applications using modern technologies. Developed RESTful APIs and implemented responsive front-end interfaces for various client projects.",
      technologies: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "Git"]
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency",
      period: "2019 - 2021",
      description: "Developed responsive user interfaces and interactive web experiences. Collaborated with designers to implement pixel-perfect designs and optimize performance.",
      technologies: ["JavaScript", "React", "CSS3", "HTML5", "Sass", "Webpack"]
    },
    {
      title: "Junior Developer",
      company: "StartUp Hub",
      period: "2018 - 2019",
      description: "Started my professional journey building web applications and learning industry best practices. Contributed to various projects and gained experience in agile development.",
      technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap", "jQuery", "Git"]
    }
  ];

  return (
    <ExperienceContainer ref={ref}>
      <ExperienceContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <NeonText>Experience</NeonText>
        </motion.div>

        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <TimelineDot />
              <TimelineContent className="timeline-content">
                <JobTitle>{exp.title}</JobTitle>
                <Company>{exp.company}</Company>
                <Period>{exp.period}</Period>
                <Description>{exp.description}</Description>
                <TechStack>
                  {exp.technologies.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </ExperienceContent>
    </ExperienceContainer>
  );
};

export default Experience;