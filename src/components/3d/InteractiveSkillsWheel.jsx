import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, Float, Html } from '@react-three/drei';
import { usePerformanceOptimization } from '../../hooks/usePerformance';
import * as THREE from 'three';

const InteractiveSkillsWheel = () => {
  const groupRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const { camera } = useThree();
  const { performanceLevel, isInViewport, elementRef, settings } = usePerformanceOptimization();
  
  // Professional skills data with clean structure
  const skillsData = useMemo(() => [
    // Core Development Skills (Inner Ring)
    { 
      name: 'React.js', 
      category: 'Frontend', 
      proficiency: 95,
      position: [0, 2.2, 0], 
      color: '#61DAFB',
      description: 'Modern component-based UI development with hooks and state management'
    },
    { 
      name: 'Node.js', 
      category: 'Backend', 
      proficiency: 90,
      position: [2.2, 0, 0], 
      color: '#68A063',
      description: 'Server-side JavaScript development with Express.js and API design'
    },
    { 
      name: 'MongoDB', 
      category: 'Database', 
      proficiency: 88,
      position: [0, 0, 2.2], 
      color: '#47A248',
      description: 'NoSQL database design, optimization, and data management'
    },
    { 
      name: 'Three.js', 
      category: '3D Graphics', 
      proficiency: 85,
      position: [-2.2, 0, 0], 
      color: '#000000',
      description: 'Interactive 3D web experiences and data visualization'
    },
    { 
      name: 'AWS Cloud', 
      category: 'DevOps', 
      proficiency: 92,
      position: [0, -2.2, 0], 
      color: '#FF9900',
      description: 'Cloud infrastructure management and scalable application deployment'
    },
    { 
      name: 'TypeScript', 
      category: 'Language', 
      proficiency: 93,
      position: [0, 0, -2.2], 
      color: '#3178C6',
      description: 'Type-safe JavaScript development with enhanced IDE support'
    },
    
    // Extended Technologies (Outer Ring)
    { 
      name: 'Next.js', 
      category: 'Framework', 
      proficiency: 89,
      position: [1.8, 1.8, 0], 
      color: '#000000',
      description: 'Full-stack React framework with server-side rendering and optimization'
    },
    { 
      name: 'PostgreSQL', 
      category: 'Database', 
      proficiency: 75,
      position: [-1.8, -1.8, 0], 
      color: '#336791',
      description: 'Relational database design with complex queries and performance tuning'
    },
    { 
      name: 'GraphQL', 
      category: 'API', 
      proficiency: 87,
      position: [1.8, -1.8, 0], 
      color: '#E10098',
      description: 'Efficient data fetching with strongly-typed query language'
    },
    { 
      name: 'Python', 
      category: 'Language', 
      proficiency: 82,
      position: [-1.8, 1.8, 0], 
      color: '#3776AB',
      description: 'Backend development, data analysis, and machine learning applications'
    },
    { 
      name: 'Docker', 
      category: 'DevOps', 
      proficiency: 80,
      position: [1.5, 0, 1.5], 
      color: '#2496ED',
      description: 'Containerization and microservices deployment with Docker'
    },
    { 
      name: 'Git', 
      category: 'Version Control', 
      proficiency: 78,
      position: [-1.5, 0, -1.5], 
      color: '#F05032',
      description: 'Version control, branching strategies, and collaborative development'
    }
  ], []);

  // Generate connections between related skills
  const connections = useMemo(() => {
    const lines = [];
    const relatedSkills = {
      'React.js': ['Next.js', 'TypeScript', 'GraphQL'],
      'Node.js': ['GraphQL', 'Docker', 'AWS Cloud'],
      'MongoDB': ['Node.js', 'AWS Cloud', 'Docker'],
      'Three.js': ['React.js', 'TypeScript', 'Next.js'],
      'TypeScript': ['React.js', 'Node.js', 'Next.js']
    };

    skillsData.forEach(skill => {
      const related = relatedSkills[skill.name] || [];
      related.forEach(relatedName => {
        const relatedSkill = skillsData.find(s => s.name === relatedName);
        if (relatedSkill) {
          lines.push({
            start: skill.position,
            end: relatedSkill.position,
            color: '#32CD32'
          });
        }
      });
    });
    
    return lines;
  }, [skillsData]);

  useFrame((state) => {
    // Only animate if in viewport for better performance
    if (!isInViewport || !groupRef.current) return;
    
    // Smooth rotation based on mouse position and time
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
  });

  const SkillNode = ({ skill, index }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    
    useFrame((state) => {
      if (meshRef.current) {
        const time = state.clock.elapsedTime;
        // Individual skill node animations
        meshRef.current.position.y += Math.sin(time * 2 + index) * 0.01;
        
        if (hovered) {
          meshRef.current.scale.setScalar(1.2);
        } else {
          meshRef.current.scale.setScalar(1);
        }
      }
    });

    return (
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <group
          ref={meshRef}
          position={skill.position}
          onPointerEnter={() => {
            setHovered(true);
            setHoveredSkill(skill);
          }}
          onPointerLeave={() => {
            setHovered(false);
            setHoveredSkill(null);
          }}
        >
          {/* Skill Node */}
          <Sphere args={[0.15, 16, 16]}>
            <meshStandardMaterial
              color={hovered ? '#32CD32' : skill.color}
              emissive={hovered ? '#32CD32' : skill.color}
              emissiveIntensity={hovered ? 0.6 : 0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
          
          {/* Skill Name */}
          <Text
            position={[0, -0.4, 0]}
            fontSize={0.12}
            color={hovered ? '#32CD32' : '#EAEAEA'}
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
          
          {/* Proficiency Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry 
              args={[0.25, 0.01, 8, Math.floor((skill.proficiency / 100) * 32)]} 
            />
            <meshStandardMaterial
              color={hovered ? '#32CD32' : skill.color}
              emissive={hovered ? '#32CD32' : skill.color}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
          
          {/* Glow effect */}
          <Sphere args={[0.3, 16, 16]}>
            <meshStandardMaterial
              color={hovered ? '#32CD32' : skill.color}
              transparent
              opacity={hovered ? 0.15 : 0.05}
              emissive={hovered ? '#32CD32' : skill.color}
              emissiveIntensity={0.2}
            />
          </Sphere>
        </group>
      </Float>
    );
  };

  return (
    <group ref={elementRef}>
      <group ref={groupRef}>
        {/* Central Core */}
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial
            color="#32CD32"
            emissive="#32CD32"
            emissiveIntensity={0.4}
            wireframe={true}
          />
        </Sphere>
      
      {/* Energy Core */}
      <Sphere args={[0.2, 16, 16]}>
        <meshStandardMaterial
          color="#32CD32"
          emissive="#32CD32"
          emissiveIntensity={0.8}
        />
      </Sphere>

      {/* Skill Nodes */}
      {skillsData.map((skill, index) => (
        <SkillNode key={skill.name} skill={skill} index={index} />
      ))}

      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...connection.start,
                ...connection.end
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#32CD32" 
            transparent
            opacity={0.3}
          />
        </line>
      ))}

      {/* Orbital Rings */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 0.5, 0.005, 8, 64]} />
          <meshStandardMaterial
            color="#32CD32"
            emissive="#32CD32"
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}

      {/* Floating particles */}
      {Array.from({ length: settings.particleCount }, (_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={0.5}>
          <Box
            args={[0.01, 0.01, 0.01]}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}
          >
            <meshStandardMaterial
              color="#39ff14"
              emissive="#39ff14"
              emissiveIntensity={0.8}
            />
          </Box>
        </Float>
      ))}

      {/* Skill description tooltip */}
      {hoveredSkill && (
        <Html position={[hoveredSkill.position[0], hoveredSkill.position[1] + 0.8, hoveredSkill.position[2]]}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#00ff41',
            padding: '10px 15px',
            borderRadius: '10px',
            border: '1px solid #00ff41',
            fontSize: '12px',
            maxWidth: '200px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {hoveredSkill.name}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>
              {hoveredSkill.category} • {hoveredSkill.proficiency}% Proficiency
            </div>
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
              {hoveredSkill.description}
            </div>
          </div>
        </Html>
      )}
      </group>
    </group>
  );
};

export default InteractiveSkillsWheel;