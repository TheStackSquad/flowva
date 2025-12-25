// src/features/rewards/components/toolSpotlight.jsx

import React, { useState } from 'react';
import { Calendar, Gift, UserPlus } from 'lucide-react';

const ToolSpotlightCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);

  const handleSignUp = async () => {
    setIsSignUpLoading(true);
    try {
      // Implement sign-up logic here
      console.log('Sign up for Reclaim');
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const handleClaimPoints = async () => {
    setIsClaimLoading(true);
    try {
      // Implement claim points logic here
      console.log('Claim 50 points');
    } finally {
      setIsClaimLoading(false);
    }
  };

  const gridColors = [
    { bg: 'bg-purple-700' },
    { bg: 'bg-yellow-400' },
    { bg: 'bg-pink-500' },
    { bg: 'bg-gray-800' }
  ];

  return (
    <div 
      className={`rounded-2xl overflow-hidden transition-all duration-300 shadow-md ${
        isHovered ? 'transform -translate-y-1 shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-400 p-6 relative">
        <span className="absolute top-4 left-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </span>

        <div className="absolute top-6 right-6 h-16 w-16 bg-blue-300 rounded-full flex items-center justify-center">
          <div className="grid grid-cols-2 gap-1 p-2">
            {gridColors.map((color, index) => (
              <div 
                key={index}
                className={`h-3 w-3 rounded-sm ${color.bg}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col pr-20">
          <h2 className="text-xl font-bold text-white mb-3 mt-6">
            Top Tool Spotlight
          </h2>
          <h3 className="text-2xl font-extrabold text-white">
            Reclaim
          </h3>
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="flex gap-3 mb-6">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-2">
              Automate and Optimize Your Schedule
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button 
            onClick={handleSignUp}
            disabled={isSignUpLoading}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Sign up for Reclaim"
          >
            <UserPlus className="h-4 w-4" />
            {isSignUpLoading ? 'Loading...' : 'Sign up'}
          </button>

          <button 
            onClick={handleClaimPoints}
            disabled={isClaimLoading}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-purple-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Claim 50 points"
          >
            <Gift className="h-4 w-4" />
            {isClaimLoading ? 'Claiming...' : 'Claim 50 pts'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ToolSpotlightCard);