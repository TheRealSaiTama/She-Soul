
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import { Calendar, Thermometer, Activity, Heart, Utensils } from "lucide-react";

interface SymptomItem {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

interface ResourceItem {
  id: string;
  title: string;
  type: "exercise" | "diet" | "yoga" | "article";
  duration?: string;
  level?: string;
  description: string;
}

const Menopause: React.FC = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  
  const symptoms: SymptomItem[] = [
    {
      id: "hot-flashes",
      name: "Hot Flashes",
      color: "#FC91D5",
      icon: <Thermometer className="h-5 w-5" />,
      description: "Sudden feelings of warmth that spread over your body, often accompanied by sweating and flushing."
    },
    {
      id: "night-sweats",
      name: "Night Sweats",
      color: "#FEBAED",
      icon: <Thermometer className="h-5 w-5" />,
      description: "Hot flashes that occur at night, causing excessive sweating that can disrupt sleep."
    },
    {
      id: "mood-changes",
      name: "Mood Changes",
      color: "#F5CD2F",
      icon: <Heart className="h-5 w-5" />,
      description: "Fluctuations in mood, including irritability, anxiety, and feelings of sadness."
    },
    {
      id: "sleep-problems",
      name: "Sleep Problems",
      color: "#F9D581",
      icon: <Activity className="h-5 w-5" />,
      description: "Difficulty falling asleep or staying asleep throughout the night."
    }
  ];
  
  const resources: ResourceItem[] = [
    {
      id: "res1",
      title: "Cooling Breathing Exercise",
      type: "exercise",
      duration: "5 minutes",
      level: "Beginner",
      description: "A simple breathing technique to help cool down during hot flashes."
    },
    {
      id: "res2",
      title: "Anti-inflammatory Diet Plan",
      type: "diet",
      description: "A weekly meal plan focusing on foods that reduce inflammation and balance hormones."
    },
    {
      id: "res3",
      title: "Gentle Yoga for Menopause",
      type: "yoga",
      duration: "15 minutes",
      level: "Beginner",
      description: "Calming yoga poses that help reduce stress and hot flashes."
    },
    {
      id: "res4",
      title: "Understanding Menopause Stages",
      type: "article",
      description: "Comprehensive guide to the different stages of menopause and what to expect."
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="font-serif text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Menopause <span className="text-gradient">Management</span>
        </motion.h1>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="symptoms" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 glass-panel">
              <TabsTrigger value="symptoms" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">
                Symptom Tracker
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">
                Resources
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-shesoul-bubblegum data-[state=active]:text-white">
                Community
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="symptoms" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GlassMorphism className="p-6 mb-6">
                  <h2 className="font-serif text-2xl mb-4">Track Your Symptoms</h2>
                  <p className="text-gray-600 mb-6">
                    Keep track of your menopause symptoms to identify patterns and find effective management strategies.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {symptoms.map((symptom) => (
                      <motion.div 
                        key={symptom.id}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white bg-opacity-50 p-4 rounded-lg border-l-4 cursor-pointer"
                        style={{ borderColor: symptom.color }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="p-2 rounded-full mr-3" style={{ backgroundColor: symptom.color + "20" }}>
                            {symptom.icon}
                          </div>
                          <h3 className="font-medium">{symptom.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{symptom.description}</p>
                        
                        <div className="mt-3 flex items-center">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <button 
                                key={level}
                                className="w-6 h-6 rounded-full border transition-all"
                                style={{ 
                                  backgroundColor: level <= 3 ? symptom.color + "80" : "transparent",
                                  borderColor: symptom.color 
                                }}
                              ></button>
                            ))}
                          </div>
                          <span className="ml-2 text-xs text-gray-500">Mild to severe</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-shesoul-bubblegum text-white hover:bg-opacity-90">
                      Save Today's Log
                    </Button>
                  </div>
                </GlassMorphism>
                
                <GlassMorphism className="p-6">
                  <h2 className="font-serif text-2xl mb-4">Symptom History</h2>
                  
                  <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Weekly Overview</h3>
                      <span className="text-sm text-gray-500">May 10 - May 16</span>
                    </div>
                    
                    <div className="space-y-3">
                      {symptoms.map((symptom) => (
                        <div key={symptom.id}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{symptom.name}</span>
                            <span className="text-xs text-gray-500">Avg. 3.2/5</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${Math.random() * 40 + 30}%`, 
                                backgroundColor: symptom.color 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" className="border-shesoul-bubblegum text-shesoul-bubblegum">
                      Monthly Report
                    </Button>
                    <Button variant="outline" className="border-shesoul-bubblegum text-shesoul-bubblegum">
                      Export Data
                    </Button>
                  </div>
                </GlassMorphism>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="resources">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {resources.map((resource) => (
                    <GlassMorphism key={resource.id} className="p-6 h-full">
                      <div className="flex items-center mb-3">
                        {resource.type === "exercise" && (
                          <Activity className="h-5 w-5 text-shesoul-bubblegum mr-2" />
                        )}
                        {resource.type === "diet" && (
                          <Utensils className="h-5 w-5 text-shesoul-sunflower mr-2" />
                        )}
                        {resource.type === "yoga" && (
                          <Activity className="h-5 w-5 text-shesoul-peach mr-2" />
                        )}
                        {resource.type === "article" && (
                          <Calendar className="h-5 w-5 text-shesoul-pastel mr-2" />
                        )}
                        <h3 className="font-serif text-lg">{resource.title}</h3>
                      </div>
                      
                      {(resource.duration || resource.level) && (
                        <div className="flex space-x-2 mb-3">
                          {resource.duration && (
                            <span className="text-xs bg-shesoul-blush px-2 py-1 rounded">
                              {resource.duration}
                            </span>
                          )}
                          {resource.level && (
                            <span className="text-xs bg-shesoul-blush px-2 py-1 rounded">
                              {resource.level}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                      
                      <Button 
                        className="w-full bg-white text-shesoul-bubblegum border border-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white transition-colors"
                      >
                        View Details
                      </Button>
                    </GlassMorphism>
                  ))}
                </div>
                
                <GlassMorphism className="p-6 text-center" borderGlow animate>
                  <h3 className="font-serif text-xl mb-3">Need personalized advice?</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with a specialist who can provide tailored recommendations for your menopause journey.
                  </p>
                  <Button className="bg-shesoul-bubblegum text-white hover:bg-opacity-90">
                    Book Consultation
                  </Button>
                </GlassMorphism>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="community">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <GlassMorphism className="p-6 mb-6">
                  <h2 className="font-serif text-2xl mb-4">Join Our Community</h2>
                  <p className="text-gray-600 mb-6">
                    Connect with other women going through menopause to share experiences, tips, and support each other.
                  </p>
                  
                  <div className="bg-white bg-opacity-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-3">Discussion Groups</h3>
                    
                    <div className="space-y-3">
                      {["Hot Flash Management", "Sleep Solutions", "Mood & Mental Health", "Natural Remedies"].map((group, index) => (
                        <div key={index} className="p-3 border border-shesoul-blush rounded-lg flex justify-between items-center hover:bg-shesoul-blush hover:bg-opacity-10 cursor-pointer transition-colors">
                          <span>{group}</span>
                          <span className="text-xs bg-shesoul-bubblegum text-white px-2 py-1 rounded-full">
                            {Math.floor(Math.random() * 50) + 5} active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-shesoul-sunflower text-foreground hover:bg-opacity-90">
                    Create Account to Join
                  </Button>
                </GlassMorphism>
                
                <GlassMorphism className="p-6">
                  <h2 className="font-serif text-2xl mb-4">Success Stories</h2>
                  
                  <div className="space-y-4">
                    {[1, 2].map((story) => (
                      <div key={story} className="bg-white bg-opacity-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-shesoul-bubblegum to-shesoul-pastel flex items-center justify-center text-white font-medium">
                            {story === 1 ? "LM" : "JD"}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium">{story === 1 ? "Lisa M." : "Jane D."}</h4>
                            <p className="text-xs text-gray-500">{story === 1 ? "Age 52" : "Age 49"}</p>
                          </div>
                        </div>
                        <p className="text-sm">
                          {story === 1 
                            ? "The breathing exercises and diet changes recommended here have reduced my hot flashes by nearly 70%. I'm sleeping better and feeling more like myself again."
                            : "Joining the community has been life-changing. The support from other women going through the same experiences helped me feel less alone and more empowered."
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassMorphism>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Menopause;
