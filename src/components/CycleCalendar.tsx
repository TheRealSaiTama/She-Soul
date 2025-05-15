
import React, { useState, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import { Calendar3D } from "@/lib/3d/3DCalendar";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Check, Plus, Activity } from "lucide-react";

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
  
  const handleViewSwitch = () => {
    setViewMode(viewMode === "2d" ? "3d" : "2d");
  };
  
  return (
    <GlassMorphism 
      className="shadow-lg border-none overflow-hidden"
      opacity="medium"
      blurStrength="medium"
    >
      <CardHeader className="border-b border-white border-opacity-20">
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif text-2xl">Cycle Tracking</CardTitle>
          <Button 
            variant="ghost" 
            onClick={handleViewSwitch} 
            className="text-shesoul-bubblegum hover:text-shesoul-bubblegum hover:bg-white hover:bg-opacity-20"
          >
            Switch to {viewMode === "2d" ? "3D" : "2D"} View
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="calendar" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 mb-6 glass-panel">
              <TabsTrigger value="calendar" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">Calendar</TabsTrigger>
              <TabsTrigger value="symptoms" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">Symptoms</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">Insights</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calendar" className="space-y-6 px-6 pb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    {viewMode === "2d" ? (
                      <GlassMorphism className="p-4 rounded-xl">
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
                      <div className="w-full h-[400px]">
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
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex-1">
                <GlassMorphism className="p-6 rounded-lg mb-4" blurStrength="light">
                  <h3 className="font-medium mb-2">Legend</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-shesoul-bubblegum rounded mr-2 animate-pulse-gentle"></div>
                      <span className="text-sm">Period days</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-shesoul-sunflower rounded mr-2 animate-pulse-gentle"></div>
                      <span className="text-sm">Ovulation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-shesoul-pastel bg-transparent rounded mr-2 animate-pulse-gentle"></div>
                      <span className="text-sm">Symptoms recorded</span>
                    </div>
                  </div>
                </GlassMorphism>
                
                {date && (
                  <GlassMorphism className="p-6 rounded-lg" borderGlow={true} animate={true}>
                    <h3 className="font-serif text-lg font-medium mb-3">
                      {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    
                    <div className="space-y-4">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group">
                          <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Period
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group">
                          <Activity className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Symptoms
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="outline" className="w-full justify-start border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white group">
                          <CalendarIcon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Log Mood
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
              <GlassMorphism className="p-6 rounded-lg" blurStrength="strong">
                <h3 className="font-serif text-xl mb-4">Symptom Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Track your symptoms to identify patterns and better understand your cycle.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90 animate-pulse-gentle">Coming Soon</Button>
                </div>
              </GlassMorphism>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="p-6">
              <GlassMorphism className="p-6 rounded-lg" blurStrength="strong">
                <h3 className="font-serif text-xl mb-4">Cycle Insights</h3>
                <p className="text-gray-600 mb-4">
                  Your personalized insights will appear here once you've tracked a few cycles.
                </p>
                <div className="space-y-4">
                  <Button className="w-full bg-shesoul-pastel text-foreground hover:bg-opacity-90 animate-pulse-gentle">Coming Soon</Button>
                </div>
              </GlassMorphism>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </GlassMorphism>
  );
};

export default CycleCalendar;
