
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import GlassMorphism from "@/lib/3d/GlassMorphism";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header 
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GlassMorphism 
        className="container mx-auto px-4 py-3 flex items-center justify-between"
        blurStrength="medium"
        opacity="low"
        borderGlow
      >
        <Link to="/" className="flex items-center space-x-2 z-10">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.7 }}
          >
            <Heart className="h-8 w-8 text-shesoul-bubblegum drop-shadow-md" />
          </motion.div>
          <motion.span 
            className="font-serif text-2xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            She<span className="text-shesoul-bubblegum">&</span>Soul
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
            Log In
          </Button>
          <Button className="rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90 shadow-md hover:shadow-lg transition-all">
            Sign Up
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </motion.button>
      </GlassMorphism>
      
      {/* Mobile Menu */}
      <motion.div 
        className={cn(
          "md:hidden absolute w-full shadow-md transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden py-0"
        )}
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto", marginTop: 0 },
          closed: { opacity: 0, height: 0, marginTop: -20 }
        }}
      >
        <GlassMorphism 
          className="container mx-auto px-4 py-4 flex flex-col space-y-4"
          blurStrength="strong"
          opacity="medium"
          hoverEffect={false}
        >
          <nav className="flex flex-col space-y-2">
            <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
          </nav>
          <div className="flex flex-col space-y-2 pt-2 border-t border-white border-opacity-20">
            <Button variant="outline" className="w-full rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
              Log In
            </Button>
            <Button className="w-full rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90 shadow-md hover:shadow-lg transition-all">
              Sign Up
            </Button>
          </div>
        </GlassMorphism>
      </motion.div>
    </motion.header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile = false, onClick }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Cycle Tracking", path: "/cycle" },
    { name: "Menopause", path: "/menopause" },
    { name: "Breast Health", path: "/breast-health" },
    { name: "Reproductive Health", path: "/reproductive-health" },
    { name: "Workplace Wellness", path: "/workplace" },
  ];
  
  const location = useLocation();
  
  return (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        
        return (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={link.path}
              className={cn(
                "nav-item relative",
                mobile ? "block w-full py-3 hover:bg-white hover:bg-opacity-30 rounded-md" : "",
                isActive ? "font-bold" : ""
              )}
              onClick={onClick}
            >
              {link.name}
              {isActive && (
                <motion.span
                  layoutId="navbar-active-indicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-shesoul-bubblegum"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </>
  );
};

export default Header;
