
import React from "react";
import Layout from "@/components/Layout";
import CycleCalendar from "@/components/CycleCalendar";
import StatsOverview from "@/components/StatsOverview";
import { motion } from "framer-motion";

const CycleTracking = () => {
  return (
    <Layout>
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="font-serif text-3xl font-bold mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Cycle <span className="text-gradient">Tracking</span>
        </motion.h1>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatsOverview />
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CycleCalendar />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default CycleTracking;
