import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePickerTest: React.FC = () => {
  const [age, setAge] = useState(27);
  const minAge = 0;
  const maxAge = 100;
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("Selected age:", age);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-shesoul-sunflower to-shesoul-bubblegum p-4 select-none">
      
      {/* Age Display Area */}
      <div className="relative flex flex-col items-center justify-center mb-8"> {/* Increased bottom margin */}
        {/* Outer transparent ring - even larger */}
        <div className="absolute w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-white/10"></div>
        {/* Inner white circle with age */}
        <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full bg-white flex items-center justify-center shadow-2xl z-10">
          <span className="text-7xl md:text-8xl font-bold text-black font-sans">{age}</span>
        </div>
        {/* "Have a nice day!" text - positioned below the circle */}
        <p className="text-white text-md mt-4 font-sans z-10">Have a nice day!</p>
      </div>

      {/* Slider - Full width track */}
      <div className="relative w-full max-w-lg mb-12"> {/* Increased bottom margin */} 
        <input
          type="range"
          min={minAge}
          max={maxAge}
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="w-full h-1.5 bg-white rounded-full appearance-none focus:outline-none cursor-pointer"
          style={{ WebkitAppearance: 'none' as const }}
        />
      </div>

      {/* Custom thumb styling */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: white;
          transform: rotate(45deg);
          border: 2px solid #333;
          border-radius: 3px;
          cursor: pointer;
          margin-top: -12px; 
          position: relative;
          z-index: 20; 
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: white;
          transform: rotate(45deg);
          border: 2px solid #333;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
          z-index: 20;
        }
      `}</style>

      {/* Confirm button section */}
      <div className="text-center">
        <button 
          onClick={handleConfirm}
          className="px-10 py-3 bg-black text-white font-semibold rounded-full shadow-xl hover:bg-gray-800 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DatePickerTest;