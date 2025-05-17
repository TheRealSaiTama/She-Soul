import React, { useRef, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeatureModule from "@/components/FeatureModule";
import { Calendar, Thermometer, Heart, Activity, User, Users } from "lucide-react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";
import Scene3D from "@/lib/3d/Scene3D";
import Avatar3D from "@/lib/3d/Avatar3D";
import { WellnessOrb } from "@/lib/3d/WellnessOrb";
import { PulsatingRings } from "@/components/PulsatingRings";
import { FloatingParticles } from "@/components/FloatingParticles";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  
  const features = [
    {
      title: "Cycle Tracking",
      description: "Track your period, symptoms, and get personalized predictions to understand your body better.",
      icon: Calendar,
      color: "bg-shesoul-bubblegum",
      path: "/cycle"
    },
    {
      title: "Menopause Management",
      description: "Navigate this transition with symptom tracking, personalized recommendations, and expert resources.",
      icon: Thermometer,
      color: "bg-shesoul-pastel",
      path: "/menopause"
    },
    {
      title: "Breast Health",
      description: "Access risk assessments, self-examination guides, and personalized care plans for breast health.",
      icon: Heart,
      color: "bg-shesoul-sunflower",
      path: "/breast-health"
    },
    {
      title: "Reproductive Health",
      description: "Comprehensive resources and tracking for all aspects of your reproductive wellbeing.",
      icon: Activity,
      color: "bg-shesoul-peach",
      path: "/reproductive-health"
    },
    {
      title: "Workplace Wellness",
      description: "Tools and resources for managing women's health in workplace settings and self-advocacy.",
      icon: User,
      color: "bg-shesoul-bubblegum",
      path: "/workplace"
    },
    {
      title: "Doctor Consultation",
      description: "Connect with verified specialists through secure video consultations and appointment scheduling.",
      icon: Users,
      color: "bg-shesoul-pastel",
      path: "/doctors"
    }
  ];
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const inViewFeatures = useInView(featuresRef, { once: true, amount: 0.2 });
  const featureControls = useAnimation();
  
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const inViewWhyChoose = useInView(whyChooseRef, { once: true, amount: 0.2 });
  
  const formRef = useRef<HTMLDivElement>(null);
  const inViewForm = useInView(formRef, { once: true, amount: 0.2 });
  
  // Handle feature hover for 3D effect
  const handleFeatureHover = (index: number | null) => {
    setActiveFeature(index);
  };

  // Show welcome toast on first visit
  useEffect(() => {
    if (showWelcomeMessage) {
      setTimeout(() => {
        toast({
          title: "Welcome to She&Soul",
          description: "Your comprehensive women's wellness journey begins here.",
          duration: 5000,
        });
        setShowWelcomeMessage(false);
      }, 1500);
    }
  }, [toast, showWelcomeMessage]);
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (inViewFeatures) {
      featureControls.start("visible");
    }
  }, [inViewFeatures, featureControls]);

  return (
    <Layout>
      <Hero />
      
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Floating particles background */}
        <FloatingParticles count={30} colors={['#FC91D5', '#F5CD2F', '#FBDDEF']} />
        
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 70%, rgba(252, 145, 213, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(245, 205, 47, 0.4) 0%, transparent 50%)"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <PulsatingRings size={220} color="#FC91D5" opacity={0.15} className="mx-auto" />
              <div className="relative -mt-48">
                <Scene3D height="200px" controls={false} autoRotate={true}>
                  <WellnessOrb scale={1.5} />
                </Scene3D>
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-serif text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Your Complete Women's Health <span className="text-gradient bg-gradient-to-r from-shesoul-bubblegum via-shesoul-peach to-shesoul-sunflower">Companion</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              She&Soul provides personalized tracking, education, and support for every aspect 
              of women's health throughout your life journey.
            </motion.p>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            ref={featuresRef}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inViewFeatures ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => handleFeatureHover(index)}
                onHoverEnd={() => handleFeatureHover(null)}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.3 },
                  boxShadow: "0 10px 30px rgba(252, 145, 213, 0.3)"
                }}
              >
                <FeatureModule
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                  path={feature.path}
                  isActive={activeFeature === index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-shesoul-blush via-white to-shesoul-blush opacity-70"></div>
        
        {/* Animated background shapes */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-shesoul-bubblegum opacity-10"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-36 h-36 rounded-full bg-shesoul-sunflower opacity-10"
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <motion.div 
          className="absolute top-40 right-1/4 w-24 h-24 rounded-full bg-shesoul-peach opacity-10"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" ref={whyChooseRef}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inViewWhyChoose ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-gradient bg-gradient-to-r from-shesoul-bubblegum to-shesoul-sunflower">She&Soul</span>?
              </h2>
              <div className="space-y-6">
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inViewWhyChoose ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="circle-icon bg-shesoul-bubblegum shrink-0 animate-pulse-gentle">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Personalized Care</h3>
                    <p className="text-gray-600">Advanced algorithms create a unique health profile based on your data.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inViewWhyChoose ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="circle-icon bg-shesoul-pastel shrink-0 animate-float">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Expert Resources</h3>
                    <p className="text-gray-600">Access medically verified content and tools created by women's health specialists.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inViewWhyChoose ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="circle-icon bg-shesoul-sunflower shrink-0 animate-pulse-gentle">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Privacy First</h3>
                    <p className="text-gray-600">Your health data is encrypted and never sold to third parties.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inViewWhyChoose ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="circle-icon bg-shesoul-peach shrink-0 animate-float">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-1">Holistic Approach</h3>
                    <p className="text-gray-600">Supporting your physical, emotional, and social wellbeing at every life stage.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={inViewForm ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <GlassMorphism className="p-8 overflow-hidden" borderGlow>
                <div className="absolute -top-20 -right-20 w-40 h-40">
                  <Scene3D height="100%" background="transparent">
                    <Avatar3D 
                      scale={0.6} 
                      position={[0, 0, 0]} 
                      opacity={0.4}
                    />
                  </Scene3D>
                </div>
                
                <div className="text-center mb-6 relative z-10">
                  <h3 className="font-serif text-2xl font-bold mb-2">Join Our Community</h3>
                  <p className="text-gray-600">Join thousands of women taking control of their health journey.</p>
                </div>
                
                <form className="space-y-4 relative">
                  <div className="grid grid-cols-1 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full px-4 py-3 rounded-full border border-shesoul-pastel focus:outline-none focus:ring-2 focus:ring-shesoul-bubblegum bg-white bg-opacity-70"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full px-4 py-3 rounded-full border border-shesoul-pastel focus:outline-none focus:ring-2 focus:ring-shesoul-bubblegum bg-white bg-opacity-70"
                      />
                    </motion.div>
                    
                    <motion.button 
                      type="button"
                      onClick={() => toast({
                        title: "Welcome aboard!",
                        description: "Thank you for joining She&Soul. Your wellness journey begins now!",
                      })}
                      className="w-full bg-gradient-to-r from-shesoul-bubblegum to-shesoul-pastel text-white py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 8px 20px rgba(252, 145, 213, 0.4)"
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                  <motion.p 
                    className="text-xs text-gray-500 text-center mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </motion.p>
                </form>
              </GlassMorphism>
              
              <motion.div 
                className="absolute -bottom-10 -left-10 w-20 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Scene3D height="100%" background="transparent" controls={false} autoRotate={true}>
                  <WellnessOrb scale={0.8} variant="sunflower" />
                </Scene3D>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <motion.section 
        className="py-16 bg-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="mb-8" 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PulsatingRings size={160} color="#F5CD2F" opacity={0.2} className="mx-auto" />
            </motion.div>
            
            <motion.h2 
              className="font-serif text-3xl md:text-4xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Start Your <span className="text-gradient bg-gradient-to-r from-shesoul-bubblegum to-shesoul-sunflower">Wellness</span> Journey Today
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of women who are taking control of their health with personalized tracking and support.
            </motion.p>
            
            <motion.button 
              className="bg-gradient-to-r from-shesoul-bubblegum to-shesoul-sunflower text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(252, 145, 213, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast({
                title: "Welcome to She&Soul",
                description: "Your account is being created. Your wellness journey begins now!",
              })}
            >
              Create Free Account
            </motion.button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
