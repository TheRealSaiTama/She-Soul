
import React, { useState, useRef } from "react";
import Layout from "@/components/Layout";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import { BreastExamModel } from "@/lib/3d/BreastExamModel";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Calendar, AlertCircle } from "lucide-react";

const BreastHealth = () => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);
  const modelRef = useRef(null);

  const handleRegionSelect = (region: any) => {
    setSelectedRegion(region);
    setShowGuide(true);
  };

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
          Breast <span className="text-gradient">Health</span>
        </motion.h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassMorphism className="mb-8 overflow-hidden h-[500px] relative">
                  <div className="absolute inset-0">
                    <Scene3D height="100%" controls={true} autoRotate={false}>
                      <BreastExamModel onRegionSelect={handleRegionSelect} />
                    </Scene3D>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4 text-white">
                    <p className="text-sm">Interactive 3D Breast Examination Guide</p>
                    <p className="text-xs opacity-80">Click on highlighted regions to learn examination techniques</p>
                  </div>
                </GlassMorphism>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassMorphism className="mb-6 p-6">
                  <h2 className="font-serif text-2xl mb-4">Self-Examination Guide</h2>
                  
                  {!selectedRegion ? (
                    <div className="text-center py-12">
                      <div className="mb-6 flex justify-center">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Heart className="h-16 w-16 text-shesoul-bubblegum opacity-60" />
                        </motion.div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Select a region on the 3D model to see detailed examination instructions.
                      </p>
                      <Button className="bg-shesoul-bubblegum text-white hover:bg-opacity-90">
                        Start Full Guide
                      </Button>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedRegion.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-4 border-l-4" style={{ borderColor: selectedRegion.color }}>
                          <h3 className="font-bold mb-1">{selectedRegion.name}</h3>
                          <p className="text-gray-700">{selectedRegion.guideText}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="bg-white bg-opacity-30 p-4 rounded-lg">
                            <h4 className="font-medium flex items-center mb-2">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              What to Feel For
                            </h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Lumps or thickening</li>
                              <li>• Changes in texture</li>
                              <li>• Unusual firmness</li>
                            </ul>
                          </div>
                          <div className="bg-white bg-opacity-30 p-4 rounded-lg">
                            <h4 className="font-medium flex items-center mb-2">
                              <AlertCircle className="h-4 w-4 mr-2 text-shesoul-bubblegum" />
                              When to Consult Doctor
                            </h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Persistent lumps</li>
                              <li>• Unusual pain</li>
                              <li>• Visual changes</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" onClick={() => setSelectedRegion(null)}>
                            Back to Overview
                          </Button>
                          <Button className="bg-shesoul-bubblegum text-white">
                            Next Step
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <GlassMorphism className="p-6" borderGlow animate>
                  <h3 className="font-serif text-xl mb-3">Schedule a Reminder</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Regular breast self-examinations are recommended monthly.
                  </p>
                  <Button className="w-full bg-shesoul-sunflower text-foreground hover:bg-opacity-90 flex items-center justify-center gap-2 group">
                    <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Set Monthly Reminder
                  </Button>
                </GlassMorphism>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default BreastHealth;
