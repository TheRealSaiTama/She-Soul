
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";

interface FeatureModuleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  className?: string;
}

const FeatureModule: React.FC<FeatureModuleProps> = ({
  title,
  description,
  icon: Icon,
  color,
  path,
  className
}) => {
  return (
    <GlassMorphism
      className={cn("h-full", className)}
      hoverEffect
      blurStrength="medium"
      opacity="medium"
    >
      <div className="p-6 flex flex-col h-full">
        <div className={`circle-icon ${color} mb-4 animate-pulse-gentle`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <motion.div
          className="mt-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            asChild
            className={cn(
              "w-full rounded-full mt-auto shadow-md hover:shadow-lg transition-all",
              color === "bg-shesoul-bubblegum" && "bg-shesoul-bubblegum hover:bg-opacity-90 text-white",
              color === "bg-shesoul-sunflower" && "bg-shesoul-sunflower hover:bg-opacity-90 text-foreground",
              color === "bg-shesoul-pastel" && "bg-shesoul-pastel hover:bg-opacity-90 text-foreground",
              color === "bg-shesoul-peach" && "bg-shesoul-peach hover:bg-opacity-90 text-foreground"
            )}
          >
            <Link to={path} className="flex items-center justify-center gap-2">
              <span>Explore</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </GlassMorphism>
  );
};

export default FeatureModule;
