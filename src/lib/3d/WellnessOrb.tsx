
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
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
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4 * speed) * 0.3;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3 * speed) * 0.3;
      meshRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.2 * speed) * 0.3;
    }
  });
  
  return (
    <group position={position}>
      <motion.mesh
        ref={meshRef}
        scale={scale}
        animate={{
          y: [0, 0.2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={3}
            roughness={0.5}
            metalness={0.3}
            opacity={0.9}
            transparent={true}
          />
        </Sphere>
      </motion.mesh>
      
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
