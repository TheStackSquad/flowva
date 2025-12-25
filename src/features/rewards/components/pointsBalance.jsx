// src/features/rewards/components/pointsBalance.jsx

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

  const progressPercentage = useMemo(() => (points / goalPoints) * 100, [points, goalPoints]);
  
  const motivation = useMemo(() => {
    if (progressPercentage >= 100) return { emoji: "🎉", text: "Reward Unlocked! Claim it now." };
    if (progressPercentage >= 75) return { emoji: "🔥", text: "So close! Just a few more tasks." };
    if (progressPercentage >= 40) return { emoji: "📈", text: "You're making great progress!" };
    return { emoji: "🚀", text: "Just getting started — keep earning!" };
  }, [progressPercentage]);

  return (
    <div 
      className={`bg-white rounded-2xl flex flex-col transition-all duration-300 h-full border border-gray-100 ${
        isHovered ? 'transform -translate-y-1 shadow-xl shadow-purple-100' : 'shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-blue-50 w-full rounded-t-2xl px-4 py-4 flex items-center gap-2">
        <Medal className="h-5 w-5 text-purple-600" />
        <h2 className="text-base font-semibold text-gray-800">Points Balance</h2>
      </div>

      <div className="flex flex-col flex-grow px-6 py-6 justify-between">
        <div className="flex items-center justify-between mb-8">
          {isLoading ? (
            <div className="h-16 w-32 bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <span className="text-6xl font-extrabold text-purple-600 tracking-tight">
              {points.toLocaleString()}
            </span>
          )}
          
          {/* Perspective added here to ensure 3D rotation works on mount */}
          <div className="relative h-16 w-16 [perspective:1000px]">
            <img 
              src={starIcon} 
              alt="Star Coin" 
              width="64" 
              height="64"
              /* Use key to force re-render/re-animate if needed, 
                 but the conditional class is usually enough */
              className={`h-16 w-16 drop-shadow-md ${!isLoading ? 'animate-coin-spin' : ''}`}
              loading="eager"
            />
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm font-medium text-gray-600">
              Progress to <span className="text-gray-900">{goalReward}</span>
            </p>
            <span className="text-xs font-bold text-gray-500">
              {isLoading ? '...' : `${points}/${goalPoints}`}
            </span>
          </div>
          
          <div 
            className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden"
            role="progressbar"
            aria-valuenow={points}
            aria-valuemin="0"
            aria-valuemax={goalPoints}
          >
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          
          <p className="text-xs font-medium text-pink-500 flex items-center gap-1.5">
            <span>{motivation.emoji}</span> {motivation.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PointsBalanceCard);