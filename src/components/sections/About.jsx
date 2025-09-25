import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Line } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { Section, NeonText, Card } from '../../styles/GlobalStyles';
import Canvas3DErrorBoundary from '../Canvas3DErrorBoundary';

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
  padding: 25px;
  background: rgba(50, 205, 50, 0.03);
  border: 1px solid rgba(50, 205, 50, 0.1);
  
  h4 {
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: ${props => props.theme.colors.text};
      font-family: ${props => props.theme.fonts.body};
      padding: 8px 0;
      position: relative;
      padding-left: 20px;
      font-size: 0.95rem;
      
      &:before {
        content: '▶';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.primary};
        font-size: 0.8rem;
      }
    }
  }
`;

const CanvasContainer = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(13, 13, 13, 0.3);
  border: 1px solid rgba(50, 205, 50, 0.1);
`;

const Stats = styled(motion.div)`
  display: flex;
  justify-content: space-between;
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

// Interactive 3D Skills Visualization
const InteractiveSkills = () => {
  const groupRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  const skills = [
    { name: 'React', position: [0, 0, 0], color: '#61DAFB' },
    { name: 'Node.js', position: [2, 1, 1], color: '#68A063' },
    { name: 'JavaScript', position: [-2, 0.5, 1], color: '#F7DF1E' },
    { name: 'Three.js', position: [1, -1, -1], color: '#000000' },
    { name: 'Python', position: [-1, -1.5, 0], color: '#3776AB' },
    { name: 'MongoDB', position: [1.5, 1.5, -1], color: '#47A248' },
    { name: 'AWS', position: [-1.5, 1, -1], color: '#FF9900' },
    { name: 'Docker', position: [0, -2, 1], color: '#2496ED' }
  ];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      
      {skills.map((skill, index) => (
        <group key={skill.name} position={skill.position}>
          <Sphere 
            args={[0.3]} 
            onPointerOver={() => setHoveredSkill(skill.name)}
            onPointerOut={() => setHoveredSkill(null)}
          >
            <meshStandardMaterial 
              color={hoveredSkill === skill.name ? '#32CD32' : skill.color}
              emissive={hoveredSkill === skill.name ? '#32CD32' : '#000000'}
              emissiveIntensity={hoveredSkill === skill.name ? 0.3 : 0}
              roughness={0.3}
              metalness={0.7}
            />
          </Sphere>
          
          <Text
            position={[0, -0.6, 0]}
            fontSize={0.15}
            color="#EAEAEA"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
          
          {/* Connecting lines to center */}
          <Line
            points={[[0, 0, 0], [0, 0, 0]]}
            color="#32CD32"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        </group>
      ))}
      
      {/* Central core */}
      <Sphere args={[0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#32CD32"
          emissive="#32CD32"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const skillsData = [
    {
      category: "Frontend Development",
      skills: ["React.js", "Next.js", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend Development", 
      skills: ["Node.js", "Express.js", "Python", "Django", "RESTful APIs", "GraphQL"]
    },
    {
      category: "Database & Cloud",
      skills: ["MongoDB", "PostgreSQL", "AWS", "Docker", "Firebase", "Vercel"]
    }
  ];

  return (
    <AboutContainer id="about" ref={ref}>
      <AboutContent>
        <AboutText>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <NeonText size="3rem" mobileSize="2.2rem">
              About Me
            </NeonText>
            
            <AboutDescription>
              I'm a passionate full-stack developer with over 3 years of experience creating 
              digital experiences that blend functionality with aesthetic appeal. My journey 
              began with a curiosity about how websites work, and has evolved into a deep 
              expertise in modern web technologies.
            </AboutDescription>
            
            <AboutDescription>
              I specialize in building scalable web applications using React, Node.js, and 
              modern cloud technologies. My approach combines clean, maintainable code with 
              user-centered design principles to deliver solutions that not only work 
              flawlessly but also provide exceptional user experiences.
            </AboutDescription>
            
            <AboutDescription>
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community through 
              mentoring and technical writing.
            </AboutDescription>
          </motion.div>

          <Stats
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <StatItem>
              <h3>50+</h3>
              <p>Projects Completed</p>
            </StatItem>
            <StatItem>
              <h3>3+</h3>
              <p>Years Experience</p>
            </StatItem>
            <StatItem>
              <h3>20+</h3>
              <p>Technologies Mastered</p>
            </StatItem>
          </Stats>
        </AboutText>

        {/* 3D skills visualization now handled by MasterCanvas */}
      </AboutContent>

      <SkillsGrid
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {skillsData.map((skillGroup, index) => (
          <SkillCard key={skillGroup.category}>
            <h4>{skillGroup.category}</h4>
            <ul>
              {skillGroup.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </SkillCard>
        ))}
      </SkillsGrid>
    </AboutContainer>
  );
};

export default About;
