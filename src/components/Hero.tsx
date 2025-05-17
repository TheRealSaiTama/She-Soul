
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div 
      className="relative overflow-hidden pt-16 lg:pt-24 pb-32 lg:pb-48"
      ref={containerRef}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-bubble opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-peach opacity-30"></div>
      
      {/* Animated floating elements */}
      <motion.div 
        className="absolute top-20 right-36 w-24 h-24 rounded-full bg-shesoul-bubblegum opacity-10"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-36 w-32 h-32 rounded-full bg-shesoul-sunflower opacity-10"
        animate={{ 
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={0}
            >
              Your Complete Women's<br />
              <span className="text-gradient">Wellness</span> Journey
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={1}
            >
              Personalized health tracking, education, and support for every stage 
              of your life. Take control of your health with She&Soul.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              custom={2}
            >
              <Button className="rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
              <Button variant="outline" className="rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white px-8 py-6 text-lg transition-all">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden lg:block h-[500px] relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Simplified hero right side without 3D */}
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-gradient-to-br from-shesoul-blush to-white p-6 shadow-xl">
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-shesoul-bubblegum bg-opacity-30"></div>
              <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-shesoul-sunflower bg-opacity-30"></div>
              
              {/* Central avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-shesoul-bubblegum via-shesoul-pastel to-shesoul-peach bg-opacity-70 flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full bg-white bg-opacity-40 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-tl from-shesoul-bubblegum to-shesoul-sunflower bg-opacity-50"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating widgets */}
              <motion.div 
                className="absolute top-10 right-10 bg-white bg-opacity-70 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="w-4 h-4 rounded-full bg-shesoul-bubblegum"></div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 left-10 bg-white bg-opacity-70 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="w-4 h-4 rounded-full bg-shesoul-sunflower"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="w-full absolute bottom-0 left-0" 
        style={{ y, opacity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </motion.div>
    </div>
  );
};

export default Hero;
