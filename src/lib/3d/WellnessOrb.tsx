import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

type WellnessOrbProps = {
  position?: [number, number, number];
  scale?: number;
  variant?: 'default' | 'bubblegum' | 'sunflower' | 'peach';
  speed?: number;
};

export const WellnessOrb: React.FC<WellnessOrbProps> = ({ 
  position = [0, 0, 0], 
  scale = 1,
  variant = 'default',
  speed = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Set color based on variant
  let color;
  switch(variant) {
    case 'bubblegum':
      color = '#FC91D5';
      break;
    case 'sunflower':
      color = '#F5CD2F';
      break;
    case 'peach':
      color = '#F9D581';
      break;
    default:
      // Default is a gradient-like material that catches light
      color = '#FBDDEF';
  }
  
  // Animate the sphere's distortion
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Use simple rotation based on time
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2 * speed;
    }
  });
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale}
      >
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={0.3}
            opacity={0.9}
            transparent={true}
          />
        </Sphere>
      </mesh>
      
      {/* Add a subtle glow effect */}
      <mesh scale={[scale * 1.2, scale * 1.2, scale * 1.2]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

export default WellnessOrb;
