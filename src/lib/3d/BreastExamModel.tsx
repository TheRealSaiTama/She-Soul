
import React, { useState } from 'react';
import { Html } from '@react-three/drei';

// In a real implementation, we'd need an actual 3D model of a torso
// For now, we'll create a simplified placeholder model

type RegionData = {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  guideText: string;
};

const examRegions: RegionData[] = [
  {
    id: 'upper-outer',
    name: 'Upper Outer Quadrant',
    position: [0.7, 0.7, 0.4],
    color: '#FC91D5', // Bubblegum Pink
    guideText: 'Use 3 fingers to apply firm pressure in circular motions'
  },
  {
    id: 'upper-inner',
    name: 'Upper Inner Quadrant',
    position: [-0.7, 0.7, 0.4],
    color: '#F5CD2F', // Sunflower Yellow
    guideText: 'Move fingers in vertical lines from collarbone to top of breast'
  },
  {
    id: 'lower-outer',
    name: 'Lower Outer Quadrant',
    position: [0.7, -0.3, 0.4],
    color: '#FEBAED', // Pastel Pink
    guideText: 'Use circular motions with increasing pressure'
  },
  {
    id: 'lower-inner',
    name: 'Lower Inner Quadrant',
    position: [-0.7, -0.3, 0.4],
    color: '#F9D581', // Peach
    guideText: 'Cover entire area with small circles moving inward'
  },
  {
    id: 'areola',
    name: 'Nipple and Areola',
    position: [0, 0.2, 0.6],
    color: '#FBDDEF', // Blush Pink
    guideText: 'Check for discharge or changes in appearance'
  },
];

type BreastExamModelProps = {
  onRegionSelect: (region: RegionData) => void;
};

export const BreastExamModel: React.FC<BreastExamModelProps> = ({ 
  onRegionSelect 
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <group>
      {/* Basic torso shape */}
      <mesh position={[0, 0, 0]} scale={[1.2, 1.5, 0.8]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#FBDDEF" // Blush Pink
          transparent={true}
          opacity={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Breast regions */}
      {examRegions.map((region) => (
        <mesh
          key={region.id}
          position={region.position}
          scale={hoveredRegion === region.id ? [1.2, 1.2, 1.2] : [1, 1, 1]}
          onPointerOver={() => setHoveredRegion(region.id)}
          onPointerOut={() => setHoveredRegion(null)}
          onClick={() => onRegionSelect(region)}
        >
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color={region.color}
            transparent={true}
            opacity={hoveredRegion === region.id ? 0.9 : 0.5}
            roughness={0.3}
            metalness={hoveredRegion === region.id ? 0.2 : 0}
            emissive={region.color}
            emissiveIntensity={hoveredRegion === region.id ? 0.3 : 0}
          />
        </mesh>
      ))}
    </group>
  );
};

export default BreastExamModel;
