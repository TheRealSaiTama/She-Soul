
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassMorphism from "@/lib/3d/GlassMorphism";

interface FeatureModuleProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  path: string;
  isActive?: boolean;
}

const FeatureModule: React.FC<FeatureModuleProps> = ({
  title,
  description,
  icon: Icon,
  color,
  path,
  isActive = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  
  return (
    <motion.div
      className="h-full"
      animate={{ 
        y: isActive ? -5 : 0,
        scale: isActive ? 1.02 : 1,
        transition: { duration: 0.3 },
      }}
    >
      <GlassMorphism 
        className="p-6 h-full flex flex-col" 
        blurStrength={isActive ? "strong" : "medium"}
        opacity={isActive ? "high" : "medium"}
        borderGlow={isActive}
      >
        <div
          className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="font-serif text-xl font-medium mb-2">{title}</h3>
        
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        
        <motion.button
          onClick={handleClick}
          className={`mt-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
            isActive
              ? `bg-${color.split("-")[1]} text-white border-transparent`
              : `border-${color.split("-")[1]} text-${color.split("-")[1]} bg-transparent`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </GlassMorphism>
    </motion.div>
  );
};

export default FeatureModule;
