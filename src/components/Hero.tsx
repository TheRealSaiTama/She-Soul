
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-shesoul-blush to-white py-16 lg:py-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-bubble opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-peach opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Your Complete Women's<br />
            <span className="text-shesoul-bubblegum">Wellness</span> Journey
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Personalized health tracking, education, and support for every stage 
            of your life. Take control of your health with She&Soul.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button className="rounded-full bg-shesoul-bubblegum text-white hover:bg-opacity-90 px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="rounded-full border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      <div className="w-full absolute bottom-0 left-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
