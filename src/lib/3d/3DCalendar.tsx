
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { Group } from 'three';
import { format } from 'date-fns';

type Day3DProps = {
  date: Date;
  selected?: boolean;
  isPeriod?: boolean;
  isOvulation?: boolean;
  hasSymptoms?: boolean;
  onClick?: () => void;
  position: [number, number, number];
};

const Day3D: React.FC<Day3DProps> = ({ 
  date, 
  selected = false, 
  isPeriod = false, 
  isOvulation = false,
  hasSymptoms = false,
  onClick,
  position
}) => {
  const color = isPeriod ? '#FC91D5' : isOvulation ? '#F5CD2F' : hasSymptoms ? '#FEBAED' : '#FBDDEF';
  const opacity = selected ? 0.9 : 0.6;

  return (
    <motion.group 
      position={position}
      whileHover={{ scale: 1.2 }}
      onClick={onClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <meshPhysicalMaterial 
          color={color}
          transparent={true}
          opacity={opacity}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0, 0.06]} 
        fontSize={0.3}
        color="#333333"
        anchorX="center" 
        anchorY="middle"
      >
        {format(date, 'd')}
      </Text>
    </motion.group>
  );
};

type Calendar3DProps = {
  month: Date;
  periodDays?: Date[];
  ovulationDay?: Date;
  symptomDays?: Date[];
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
};

export const Calendar3D: React.FC<Calendar3DProps> = ({
  month,
  periodDays = [],
  ovulationDay,
  symptomDays = [],
  selectedDate,
  onSelectDate
}) => {
  const groupRef = useRef<Group>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);

  // Generate days for the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = getDaysInMonth(year, monthIndex);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => 
    new Date(year, monthIndex, i + 1)
  );

  const isSameDay = (date1: Date | undefined, date2: Date | undefined) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isPeriodDay = (date: Date) => 
    periodDays.some(periodDate => isSameDay(periodDate, date));

  const isSymptomDay = (date: Date) =>
    symptomDays.some(symptomDate => isSameDay(symptomDate, date));

  // Create floating animation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {days.map((day, index) => {
        // Layout in a grid, 7 days per week
        const row = Math.floor(index / 7);
        const col = index % 7;
        
        return (
          <Day3D
            key={index}
            date={day}
            selected={isSameDay(selectedDate, day)}
            isPeriod={isPeriodDay(day)}
            isOvulation={isSameDay(ovulationDay, day)}
            hasSymptoms={isSymptomDay(day)}
            onClick={() => onSelectDate?.(day)}
            position={[col - 3, -row + 1.5, 0]}
          />
        );
      })}
    </group>
  );
};

export default Calendar3D;
