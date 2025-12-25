// src/features/rewards/components/dailyStreak.jsx
import React, { useState, useMemo } from 'react';
import { Calendar, Zap, Loader2 } from 'lucide-react';

const DailyStreakCard = ({ streak = 0, lastClaimDate = '', onClaim, isLoadingData = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const todayIndex = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  }, []);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const hasClaimedToday = useMemo(() => {
    if (!lastClaimDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const claimDate = lastClaimDate.split('T')[0];
    return claimDate === today;
  }, [lastClaimDate]);

  const handleClaim = async () => {
    if (hasClaimedToday || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onClaim();
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonText = hasClaimedToday ? 'Claimed Today' : "Claim Today's Points";
  const isButtonDisabled = hasClaimedToday || isSubmitting || isLoadingData;

  return (
    <div 
      className={`rounded-2xl flex flex-col bg-white items-center transition-all duration-300 h-full ${
        isHovered ? 'transform -translate-y-1 shadow-lg shadow-purple-100' : 'shadow-sm border border-gray-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-blue-50 w-full rounded-t-2xl px-4 py-4 flex items-center gap-2 mb-2">
        <Calendar className="h-5 w-5 text-cyan-500" />
        <h3 className="text-base font-medium text-gray-700">Daily Streak</h3>
      </div>
      
      <div className="flex flex-col items-center justify-between px-6 py-6 w-full">
        <div className="mb-6 w-full flex items-baseline justify-start">
          <span className="text-5xl font-extrabold text-purple-600">
            {isLoadingData ? "..." : streak}
          </span>
          <span className="text-2xl font-bold text-purple-600 ml-2">days</span>
        </div>
        
        <div className="flex justify-between w-full mb-6">
          {days.map((day, index) => (
            <div
              key={`${day}-${index}`}
              className={`
                h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                ${index === todayIndex
                  ? 'border-2 border-purple-600 bg-white text-purple-600 shadow-sm' 
                  : index < todayIndex 
                    ? 'bg-purple-50 text-purple-300'
                    : 'bg-gray-100 text-gray-400'
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mb-6 text-center leading-relaxed">
          Check in daily to build your streak and earn <span className="font-bold text-purple-600">+5 points</span>
        </p>
        
        <button
          onClick={handleClaim}
          disabled={isButtonDisabled}
          className={`
            w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all
            ${hasClaimedToday 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95 shadow-md shadow-purple-200'
            }
          `}
          aria-label={buttonText}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Zap className={`h-4 w-4 ${hasClaimedToday ? 'text-gray-400' : 'fill-current'}`} />
          )}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default React.memo(DailyStreakCard);