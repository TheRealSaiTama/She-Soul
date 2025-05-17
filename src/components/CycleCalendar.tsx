import React, { useState, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import { Calendar3D } from "@/lib/3d/3DCalendar";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Calendar as CalendarIcon, Check, Plus, Activity, Heart, Moon, SunMedium, Droplets, Zap } from "lucide-react";
import { toast } from "sonner";

// Mock cycle data
const initialData = {
  periodStart: new Date(2023, 4, 5),
  periodEnd: new Date(2023, 4, 10),
  ovulationDate: new Date(2023, 4, 19),
  symptoms: [
    { date: new Date(2023, 4, 4), type: "cramps", intensity: "mild" },
    { date: new Date(2023, 4, 5), type: "cramps", intensity: "moderate" },
    { date: new Date(2023, 4, 6), type: "headache", intensity: "severe" },
    { date: new Date(2023, 4, 7), type: "fatigue", intensity: "moderate" },
  ]
};

const CycleCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [cycleData, setCycleData] = useState(initialData);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const calendarRef = useRef(null);
  
  const controls = useAnimation();
  const buttonControls = useAnimation();
  
  const handleViewSwitch = () => {
    setViewMode(viewMode === "2d" ? "3d" : "2d");
  };
  
  const handleAddEntry = (type: string) => {
    toast(`Successfully logged ${type}`, {
      description: "Your entry has been saved",
      action: {
        label: "Undo",
        onClick: () => toast("Action undone"),
      },
    });
    
    // Animate button press
    buttonControls.start({
      scale: [1, 0.9, 1],
      transition: { duration: 0.2 }
    });
    
    // Ripple effect on the calendar
    controls.start({
      opacity: [0, 0.2, 0],
      scale: [1, 1.5],
      transition: { duration: 0.8 }
    });
  };
  
  return (
    <GlassMorphism 
      className="shadow-lg border-none overflow-hidden"
      opacity="medium"
      blurStrength="medium"
    >
      <CardHeader className="border-b border-white border-opacity-20">
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif text-2xl bg-clip-text text-transparent bg-gradient-to-r from-shesoul-bubblegum to-shesoul-peach">Cycle Tracking</CardTitle>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              onClick={handleViewSwitch} 
              className="text-shesoul-bubblegum hover:text-shesoul-bubblegum hover:bg-white hover:bg-opacity-20"
            >
              <span className="relative overflow-hidden">
                <span className="relative z-10">Switch to {viewMode === "2d" ? "3D" : "2D"} View</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-shesoul-bubblegum"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="calendar" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 mb-6 glass-panel relative overflow-hidden">
              {["calendar", "symptoms", "insights"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white relative z-10"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="capitalize"
                  >
                    {tab}
                  </motion.span>
                </TabsTrigger>
              ))}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-shesoul-bubblegum to-shesoul-pastel"
                layoutId="tab-highlight"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="space-y-6 px-6 pb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <motion.div
                  animate={controls}
                  className="absolute inset-0 rounded-xl bg-shesoul-bubblegum z-0 pointer-events-none opacity-0"
                />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative z-10"
                  >
                    {viewMode === "2d" ? (
                      <GlassMorphism className="p-4 rounded-xl" borderGlow={true}>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md shadow-none"
                          modifiers={{
                            periodStart: [cycleData.periodStart],
                            periodEnd: [cycleData.periodEnd],
                            periodDay: { from: cycleData.periodStart, to: cycleData.periodEnd },
                            ovulation: [cycleData.ovulationDate],
                            symptomDay: cycleData.symptoms.map(s => s.date)
                          }}
                          modifiersClassNames={{
                            periodStart: "bg-shesoul-bubblegum text-white rounded-l-full",
                            periodEnd: "bg-shesoul-bubblegum text-white rounded-r-full",
                            periodDay: "bg-shesoul-bubblegum text-white",
                            ovulation: "bg-shesoul-sunflower text-foreground rounded-full border-2 border-shesoul-sunflower",
                            symptomDay: "border-2 border-shesoul-pastel"
                          }}
                          classNames={{
                            day_selected: "bg-shesoul-pastel text-foreground hover:bg-shesoul-pastel hover:text-foreground"
                          }}
                        />
                      </GlassMorphism>
                    ) : (
                      <motion.div 
                        className="w-full h-[400px]"
                        initial={{ rotateY: -90 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        <Scene3D height="400px" controls={true} autoRotate={true}>
                          <Calendar3D
                            month={new Date()}
                            periodDays={[cycleData.periodStart, new Date(2023, 4, 6), new Date(2023, 4, 7), new Date(2023, 4, 8), cycleData.periodEnd]}
                            ovulationDay={cycleData.ovulationDate}
                            symptomDays={cycleData.symptoms.map(s => s.date)}
                            selectedDate={date}
                            onSelectDate={setDate}
                          />
                        </Scene3D>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex-1">
                <GlassMorphism className="p-6 rounded-lg mb-6" blurStrength="light" borderGlow={true}>
                  <h3 className="font-medium mb-4 flex items-center">
                    <span className="mr-2 text-shesoul-bubblegum">
                      <CalendarIcon size={18} />
                    </span>
                    Legend
                  </h3>
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center" 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-4 h-4 bg-shesoul-bubblegum rounded-full mr-3 animate-pulse-gentle"></div>
                      <span className="text-sm">Period days</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-4 h-4 bg-shesoul-sunflower rounded-full mr-3 animate-pulse-gentle"></div>
                      <span className="text-sm">Ovulation</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-4 h-4 border-2 border-shesoul-pastel bg-transparent rounded-full mr-3 animate-pulse-gentle"></div>
                      <span className="text-sm">Symptoms recorded</span>
                    </motion.div>
                  </div>
                </GlassMorphism>
                
                {date && (
                  <GlassMorphism className="p-6 rounded-lg" borderGlow={true} animate={true}>
                    <motion.h3 
                      className="font-serif text-lg font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-shesoul-bubblegum via-shesoul-peach to-shesoul-sunflower"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </motion.h3>
                    
                    <div className="space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.98 }}
                        animate={buttonControls}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group"
                          onClick={() => handleAddEntry("Period")}
                        >
                          <Droplets className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Period
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.98 }}
                        animate={buttonControls}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group"
                          onClick={() => handleAddEntry("Symptoms")}
                        >
                          <Activity className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Symptoms
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.98 }}
                        animate={buttonControls}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group"
                          onClick={() => handleAddEntry("Mood")}
                        >
                          <Moon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Mood
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }} 
                        whileTap={{ scale: 0.98 }}
                        animate={buttonControls}
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group"
                          onClick={() => handleAddEntry("Energy")}
                        >
                          <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Energy
                        </Button>
                      </motion.div>
                    </div>
                  </GlassMorphism>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="symptoms">
            <div className="p-6">
              <GlassMorphism className="p-8 rounded-xl relative overflow-hidden" blurStrength="strong">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-shesoul-bubblegum opacity-5"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-shesoul-sunflower opacity-5"></div>
                
                <motion.h3 
                  className="font-serif text-2xl mb-6 relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-shesoul-bubblegum to-shesoul-peach">
                    Symptom Tracking
                  </span>
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Track your symptoms to identify patterns and better understand your cycle.
                </motion.p>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button 
                    className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90 group relative overflow-hidden"
                    onClick={() => toast("Coming soon!", { description: "We're working on this feature" })}
                  >
                    <span className="relative z-10">Coming Soon</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-shesoul-bubblegum to-shesoul-pastel opacity-0 group-hover:opacity-20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </motion.div>
              </GlassMorphism>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="p-6">
              <GlassMorphism className="p-8 rounded-xl relative overflow-hidden" blurStrength="strong">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-shesoul-sunflower opacity-5"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-shesoul-bubblegum opacity-5"></div>
                
                <motion.h3 
                  className="font-serif text-2xl mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-shesoul-sunflower to-shesoul-peach">
                    Cycle Insights
                  </span>
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Your personalized insights will appear here once you've tracked a few cycles.
                </motion.p>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button 
                    className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90 group relative overflow-hidden"
                    onClick={() => toast("Coming soon!", { description: "We're working on this feature" })}
                  >
                    <span className="relative z-10">Coming Soon</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-shesoul-sunflower to-shesoul-peach opacity-0 group-hover:opacity-20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </motion.div>
              </GlassMorphism>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </GlassMorphism>
  );
};

export default CycleCalendar;
