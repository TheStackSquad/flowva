// src/features/rewards/components/pointsBalance.jsx
import React, { useState, useMemo } from 'react';
import { Medal } from 'lucide-react';
import starIcon from '../../../assets/star.png';

const PointsBalanceCard = ({ 
  points = 0, 
  isLoading = false, 
  goalPoints = 5000, 
  goalReward = "$5 Gift Card" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const progressPercentage = useMemo(() => Math.min((points / goalPoints) * 100, 100), [points, goalPoints]);
  
  const motivation = useMemo(() => {
    if (progressPercentage >= 100) return { emoji: "🎉", text: "Reward Unlocked! Claim it now." };
    if (progressPercentage >= 75) return { emoji: "🔥", text: "So close! Just a few more tasks." };
    if (progressPercentage >= 40) return { emoji: "📈", text: "You're making great progress!" };
    return { emoji: "🚀", text: "Just getting started — keep earning!" };
  }, [progressPercentage]);

  return (
    <div 
      className={`bg-white rounded-2xl flex flex-col transition-all duration-300 h-full border border-gray-100 ${
        isHovered ? '-translate-y-1 shadow-xl shadow-purple-100' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-blue-50 w-full rounded-t-2xl px-4 py-4 flex items-center gap-2">
        <Medal className="h-5 w-5 text-purple-600" aria-hidden="true" />
        <h2 className="text-base font-semibold text-gray-800">Points Balance</h2>
      </div>

      <div className="flex flex-col flex-grow px-4 sm:px-6 py-6 justify-between">
        <div className="flex items-center justify-between mb-6 sm:mb-8 ">
          {isLoading ? (
            <div className="h-14 w-24 sm:h-16 sm:w-32 py-4 sm:py-5 bg-gray-200 animate-pulse rounded-lg" 
                 aria-hidden="true" />
          ) : (
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-600 tracking-tight" 
                  aria-live="polite">
              {points.toLocaleString()}
            </span>
          )}
          
          <div className="relative h-auto w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 [perspective:1000px]">
            <img 
              src={starIcon} 
              alt="Star Coin" 
              width="64" 
              height="64"
              className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 drop-shadow-md ${!isLoading ? 'animate-coin-spin' : ''}`}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        
        <div className="w-full h-full">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Progress to <span className="text-gray-900 font-semibold">{goalReward}</span>
            </p>
            <span className="text-xs font-bold text-gray-500" aria-live="polite">
              {isLoading ? '...' : `${points.toLocaleString()}/${goalPoints.toLocaleString()}`}
            </span>
          </div>
          
          <div 
            className="w-full bg-gray-100 rounded-full h-2 sm:h-3 mb-3 sm:mb-4 overflow-hidden"
            role="progressbar"
            aria-valuenow={points}
            aria-valuemin="0"
            aria-valuemax={goalPoints}
            aria-label={`Progress toward ${goalReward}: ${Math.round(progressPercentage)}%`}
          >
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-xs font-medium text-pink-500 flex items-center gap-1.5" aria-live="polite">
            <span aria-hidden="true">{motivation.emoji}</span> 
            <span>{motivation.text}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PointsBalanceCard);