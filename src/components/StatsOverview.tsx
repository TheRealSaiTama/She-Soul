
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Activity, Clock } from "lucide-react";
import { motion } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <GlassMorphism className="h-full" hoverEffect borderGlow>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-gray-500 font-medium">{title}</CardTitle>
            <motion.div 
              className={`${color} rounded-full p-2`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon}
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            {value}
          </motion.div>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </CardContent>
      </GlassMorphism>
    </motion.div>
  );
};

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Next Period"
        value="In 12 Days"
        description="Expected on June 28"
        icon={<Calendar className="h-4 w-4 text-white" />}
        color="bg-shesoul-bubblegum"
        delay={0}
      />
      <StatCard
        title="Cycle Length"
        value="28 Days"
        description="Avg. over last 6 cycles"
        icon={<Clock className="h-4 w-4 text-white" />}
        color="bg-shesoul-sunflower"
        delay={0.1}
      />
      <StatCard
        title="Wellbeing Score"
        value="85%"
        description="Based on your tracking data"
        icon={<Heart className="h-4 w-4 text-white" />}
        color="bg-shesoul-pastel"
        delay={0.2}
      />
      <StatCard
        title="Active Tracking"
        value="42 Days"
        description="Keep up the good work!"
        icon={<Activity className="h-4 w-4 text-white" />}
        color="bg-shesoul-peach"
        delay={0.3}
      />
    </div>
  );
};

export default StatsOverview;
