
import React, { useState } from "react";
import Layout from "@/components/Layout";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import WorkplaceAvatar, { WorkplaceExercise } from "@/lib/3d/WorkplaceAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity, Check, Clock, Download } from "lucide-react";

const WorkplaceWellness = () => {
  const [selectedExercise, setSelectedExercise] = useState<WorkplaceExercise | undefined>();
  
  const handleExerciseSelect = (exercise: WorkplaceExercise) => {
    setSelectedExercise(exercise);
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
          Workplace <span className="text-gradient">Wellness</span>
        </motion.h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassMorphism className="h-[500px] relative overflow-hidden">
                <div className="absolute inset-0">
                  <Scene3D height="100%" controls={true} autoRotate={false}>
                    <WorkplaceAvatar 
                      selectedExercise={selectedExercise}
                      onClick={handleExerciseSelect}
                    />
                  </Scene3D>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4 text-white">
                  <p className="text-sm">Interactive 3D Workplace Exercise Guide</p>
                  <p className="text-xs opacity-80">Click on highlighted areas to learn exercises</p>
                </div>
              </GlassMorphism>
              
              <motion.div 
                className="mt-4 grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <GlassMorphism className="p-4" opacity="low" blurStrength="light">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-shesoul-bubblegum mr-2" />
                    <h3 className="font-medium text-sm">Break Timer</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold">25:00</span>
                    <Button variant="outline" size="sm" className="border-shesoul-bubblegum text-shesoul-bubblegum">
                      Start
                    </Button>
                  </div>
                </GlassMorphism>
                
                <GlassMorphism className="p-4" opacity="low" blurStrength="light">
                  <div className="flex items-center mb-2">
                    <Activity className="h-4 w-4 text-shesoul-sunflower mr-2" />
                    <h3 className="font-medium text-sm">Daily Progress</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-shesoul-sunflower"></div>
                      ))}
                      {[4, 5].map((i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-gray-200"></div>
                      ))}
                    </div>
                    <span className="text-xs">3/5 breaks</span>
                  </div>
                </GlassMorphism>
              </motion.div>
            </motion.div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassMorphism className="mb-6">
                  <div className="p-6">
                    <h2 className="font-serif text-2xl mb-4">Workplace Wellness Guide</h2>
                    
                    <AnimatePresence mode="wait">
                      {selectedExercise ? (
                        <motion.div
                          key={selectedExercise.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div 
                            className="bg-white bg-opacity-50 p-4 rounded-lg mb-4 border-l-4"
                            style={{ borderColor: selectedExercise.highlightColor }}
                          >
                            <h3 className="font-bold mb-1">{selectedExercise.name}</h3>
                            <p className="text-gray-700 mb-2">{selectedExercise.description}</p>
                            <div className="text-sm bg-white bg-opacity-50 py-1 px-2 rounded inline-block">
                              Target: {selectedExercise.targetArea}
                            </div>
                          </div>
                          
                          <div className="space-y-4 mb-6">
                            <div className="bg-white bg-opacity-30 p-4 rounded-lg">
                              <h4 className="font-medium flex items-center mb-2">
                                <Clock className="h-4 w-4 mr-2 text-shesoul-bubblegum" />
                                How to perform
                              </h4>
                              <ol className="text-sm text-gray-700 space-y-2 list-decimal pl-5">
                                <li>Start in a comfortable seated position</li>
                                <li>Take a deep breath and relax your shoulders</li>
                                <li>Perform the motion slowly and with control</li>
                                <li>Hold each position for 15-30 seconds</li>
                                <li>Repeat 3-5 times on each side</li>
                              </ol>
                            </div>
                            
                            <div className="bg-white bg-opacity-30 p-4 rounded-lg">
                              <h4 className="font-medium flex items-center mb-2">
                                <Check className="h-4 w-4 mr-2 text-green-500" />
                                Benefits
                              </h4>
                              <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Reduces muscle tension</li>
                                <li>• Improves circulation</li>
                                <li>• Prevents repetitive strain injuries</li>
                                <li>• Increases energy and focus</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedExercise(undefined)}>
                              Back to Overview
                            </Button>
                            <Button className="bg-shesoul-bubblegum text-white">
                              Add to Routine
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="text-gray-600 mb-6">
                            Our workplace wellness resources help you maintain health and comfort in office environments.
                            Click on the highlighted areas of the 3D model to discover exercises and wellness techniques.
                          </p>
                          
                          <div className="bg-white bg-opacity-40 p-4 rounded-lg mb-6">
                            <h3 className="font-medium text-lg mb-2">Why workplace wellness matters</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Many women spend 8+ hours daily at a desk, leading to unique health challenges:
                            </p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-shesoul-bubblegum text-white flex items-center justify-center mr-2 shrink-0 mt-0.5">1</div>
                                <p>Office environments can intensify menstrual discomfort and symptoms</p>
                              </li>
                              <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-shesoul-pastel text-white flex items-center justify-center mr-2 shrink-0 mt-0.5">2</div>
                                <p>Prolonged sitting affects pelvic floor health and circulation</p>
                              </li>
                              <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-shesoul-sunflower text-white flex items-center justify-center mr-2 shrink-0 mt-0.5">3</div>
                                <p>Stress management is essential for hormonal balance</p>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-gray-500 mb-4">Click the highlighted areas on the 3D model to explore exercises</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </GlassMorphism>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <GlassMorphism className="p-6" borderGlow animate>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-xl mb-1">Workplace Wellness Guide</h3>
                      <p className="text-gray-600 text-sm">Comprehensive resources for your office environment</p>
                    </div>
                    <Button className="bg-shesoul-sunflower text-foreground hover:bg-opacity-90 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </GlassMorphism>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default WorkplaceWellness;
