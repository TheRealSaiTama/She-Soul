
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group } from 'three';

export type WorkplaceExercise = {
  id: string;
  name: string;
  description: string;
  targetArea: string;
  highlightPosition: [number, number, number];
  highlightColor: string;
};

type WorkplaceAvatarProps = {
  selectedExercise?: WorkplaceExercise;
  onClick?: (exercise: WorkplaceExercise) => void;
};

export const WorkplaceAvatar: React.FC<WorkplaceAvatarProps> = ({
  selectedExercise,
  onClick
}) => {
  const groupRef = useRef<Group>(null);
  
  // Sample workplace exercises with stress zones
  const exercises: WorkplaceExercise[] = [
    {
      id: 'neck-stretch',
      name: 'Neck Stretch',
      description: 'Gently tilt your head to each side to relieve tension',
      targetArea: 'Neck and shoulders',
      highlightPosition: [0, 2, 0],
      highlightColor: '#FC91D5', // Bubblegum Pink
    },
    {
      id: 'shoulder-roll',
      name: 'Shoulder Rolls',
      description: 'Roll shoulders backward and forward to reduce stiffness',
      targetArea: 'Upper back and shoulders',
      highlightPosition: [0, 1.5, 0],
      highlightColor: '#F5CD2F', // Sunflower Yellow
    },
    {
      id: 'wrist-stretch',
      name: 'Wrist Stretch',
      description: 'Extend your arms and flex wrists to prevent carpal tunnel',
      targetArea: 'Wrists and forearms',
      highlightPosition: [-1, 0.5, 0.5],
      highlightColor: '#F9D581', // Peach
    },
    {
      id: 'back-stretch',
      name: 'Lower Back Stretch',
      description: 'Gentle twists while seated to relieve lower back tension',
      targetArea: 'Lower back',
      highlightPosition: [0, 0, 0],
      highlightColor: '#FEBAED', // Pastel Pink
    },
  ];
  
  // Create subtle breathing animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Simplified avatar body */}
      <mesh position={[0, 0, 0]} scale={[0.7, 1, 0.3]}>
        <capsuleGeometry args={[0.5, 1.5, 16, 16]} />
        <meshStandardMaterial
          color="#FBDDEF" // Blush Pink
          transparent
          opacity={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#FBDDEF" // Blush Pink
          transparent
          opacity={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.9, 0.6, 0]} rotation={[0, 0, -Math.PI / 3]} scale={[0.2, 0.6, 0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
        <meshStandardMaterial
          color="#FBDDEF" // Blush Pink
          transparent
          opacity={0.7}
          roughness={0.3}
        />
      </mesh>
      
      <mesh position={[0.9, 0.6, 0]} rotation={[0, 0, Math.PI / 3]} scale={[0.2, 0.6, 0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
        <meshStandardMaterial
          color="#FBDDEF" // Blush Pink
          transparent
          opacity={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Highlight stress zones */}
      {exercises.map((exercise) => (
        <mesh
          key={exercise.id}
          position={exercise.highlightPosition}
          onClick={() => onClick?.(exercise)}
          scale={selectedExercise?.id === exercise.id ? 0.25 : 0.2}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={exercise.highlightColor}
            transparent
            opacity={selectedExercise?.id === exercise.id ? 0.8 : 0.5}
            emissive={exercise.highlightColor}
            emissiveIntensity={selectedExercise?.id === exercise.id ? 0.5 : 0.2}
            roughness={0.2}
          />
          <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'none' }}>
            <div className="bg-white bg-opacity-80 px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm">
              {exercise.name}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
};

export default WorkplaceAvatar;
