import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const LandingPage: React.FC = () => {
  const splineSceneUrl = '/scene.splinecode';
  const noisePatternUrl = "url('data:image/svg+xml,%3Csvg%20width%3D%224%22%20height%3D%224%22%20viewBox%3D%220%200%204%204%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201h1v1H1V1zm2%202h1v1H3V3z%22%20fill%3D%22%23FFF%22%20fill-opacity%3D%220.05%22%2F%3E%3C%2Fsvg%3E')";
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Left side: Spline 3D */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-100 flex justify-center items-center">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-shesoul-bubblegum">Loading 3D Scene...</div>}>
          <Spline scene={splineSceneUrl} style={{ width: '100%', height: '100%' }}/>
        </Suspense>
      </div>
      
      {/* Right side: Welcome Text - Refined Vibe */}
      <div 
        className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center p-8 sm:p-12 bg-gradient-to-r from-shesoul-sunflower to-shesoul-bubblegum text-white relative overflow-hidden"
      >
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: noisePatternUrl, mixBlendMode: 'overlay' }}
        ></div>
        <div className="text-center space-y-6 z-10">
          <p 
            className="text-2xl md:text-3xl font-sans font-light opacity-0 animate-fade-in"
            style={{ animationFillMode: 'forwards' }}
          >
            Welcome To
          </p>
          <h1 
            className="text-6xl md:text-8xl font-serif font-bold drop-shadow-md opacity-0 animate-fade-in"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            She&Soul
          </h1>
          <p 
            className="text-md md:text-lg font-sans max-w-sm opacity-80 leading-relaxed mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            A community dedicated to women's health and wellness, empowering you through every stage of life.
          </p>
          <button 
            className="bg-white text-shesoul-bubblegum font-sans font-semibold py-3 px-10 rounded-lg shadow-lg hover:bg-shesoul-blush/90 hover:text-shesoul-bubblegum/90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 opacity-0 animate-fade-in"
            style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 