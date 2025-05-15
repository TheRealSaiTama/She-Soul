
import React, { useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";

interface LayoutProps {
  children: React.ReactNode;
}

const FuturisticBackground: React.FC = () => {
  // Random positions for floating elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 20,
      duration: 15 + Math.random() * 30,
      delay: Math.random() * 5,
    }));
  };

  const floatingElements = generateRandomPositions(10);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 opacity-70">
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            background: index % 2 === 0 ? '#FC91D5' : '#F5CD2F',
            opacity: 0.1 + Math.random() * 0.2,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: el.delay,
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-shesoul-blush opacity-30" />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.scroll-animate');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const offset = element.offsetTop - window.innerHeight;
        
        if (scrollY > offset) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-shesoul-blush to-white">
      <FuturisticBackground />
      
      <Header />
      
      <AnimatePresence>
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
          ref={contentRef}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-shesoul-blush to-transparent z-10"
      />
      
      <Footer />
    </div>
  );
};

export default Layout;
