
import React from 'react';
import { motion } from 'framer-motion';

type PulsatingRingsProps = {
  size?: number;
  color?: string;
  opacity?: number;
  ringCount?: number;
  className?: string;
};

export const PulsatingRings: React.FC<PulsatingRingsProps> = ({
  size = 200,
  color = '#FC91D5',
  opacity = 0.2,
  ringCount = 3,
  className = '',
}) => {
  // Generate rings with different animation delays
  const rings = Array.from({ length: ringCount }, (_, index) => {
    const delay = index * 0.7;
    const duration = 3 + index * 0.5; // Slightly different durations for more organic feel
    
    return (
      <motion.div
        key={index}
        className="absolute rounded-full"
        style={{
          border: `1px solid ${color}`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          opacity: opacity,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [opacity, opacity * 0.3, opacity],
        }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          delay,
        }}
      />
    );
  });

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {rings}
      <div
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          height: '30%',
          opacity: opacity * 2,
        }}
      />
    </div>
  );
};

export default PulsatingRings;
