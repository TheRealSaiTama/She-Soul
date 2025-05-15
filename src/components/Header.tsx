
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white bg-opacity-70 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-shesoul-bubblegum" />
          <span className="font-serif text-2xl font-bold text-foreground">She<span className="text-shesoul-bubblegum">&</span>Soul</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
            Log In
          </Button>
          <Button className="rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90">
            Sign Up
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden py-0"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <nav className="flex flex-col space-y-2">
            <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
          </nav>
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
            <Button variant="outline" className="w-full rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
              Log In
            </Button>
            <Button className="w-full rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
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
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={cn(
            "nav-item",
            mobile ? "block w-full py-3 hover:bg-gray-50 rounded-md" : ""
          )}
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Header;
