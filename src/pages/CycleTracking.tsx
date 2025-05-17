
import React from "react";
import Layout from "@/components/Layout";
import CycleCalendar from "@/components/CycleCalendar";
import StatsOverview from "@/components/StatsOverview";
import { motion } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import Avatar3D from "@/lib/3d/Avatar3D";
import { Calendar3D } from "@/lib/3d/3DCalendar";

const CycleTracking = () => {
  return (
    <Layout>
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative pb-8">
          {/* Background decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-shesoul-bubblegum opacity-10 animate-pulse-gentle"></div>
          <div className="absolute -bottom-8 left-20 w-40 h-40 rounded-full bg-shesoul-sunflower opacity-10 animate-float"></div>
          
          <motion.h1 
            className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center relative z-10"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
          >
            Your <span className="text-gradient bg-gradient-to-r from-shesoul-bubblegum to-shesoul-peach">Cycle Journey</span>
          </motion.h1>

          <motion.p
            className="text-lg text-center max-w-2xl mx-auto mb-12 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Track your cycle, understand your body's rhythm, and gain personalized insights 
            to support your wellness journey.
          </motion.p>
        </div>
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <StatsOverview />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="relative"
        >
          {/* 3D background element for visual flair */}
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-30 pointer-events-none hidden lg:block">
            <Scene3D height="100%" controls={false} autoRotate={true}>
              <Avatar3D scale={0.8} position={[0, 0, 0]} opacity={0.4} />
            </Scene3D>
          </div>
          
          <CycleCalendar />
        </motion.div>

        {/* Coming soon section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <GlassMorphism className="py-10 px-6 rounded-xl max-w-2xl mx-auto" borderGlow={true} blurStrength="medium">
            <h2 className="font-serif text-2xl mb-4">Advanced Insights Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're developing advanced AI-driven insights to give you even more personalized guidance.
              Stay tuned for mood correlation, symptom pattern recognition, and health recommendations.
            </p>
            
            <div className="w-full h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-shesoul-bubblegum to-shesoul-sunflower rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-sm mt-2 text-gray-500">Development progress: 65%</p>
          </GlassMorphism>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default CycleTracking;
