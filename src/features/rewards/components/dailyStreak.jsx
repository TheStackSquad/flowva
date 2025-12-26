// src/features/rewards/components/dailyStreak.jsx

import React, { useState, useMemo } from 'react';
import { Calendar, Zap, Loader2 } from 'lucide-react';

const DailyStreakCard = ({ 
  streak = 0, 
  lastClaimDate = null, 
  onClaim, 
  isLoading = false 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get current day index (Monday = 0, Sunday = 6)
  const todayIndex = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  }, []);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Check if user has claimed today
  const hasClaimedToday = useMemo(() => {
    if (!lastClaimDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const claimDate = new Date(lastClaimDate);
    claimDate.setHours(0, 0, 0, 0);
    
    return claimDate.getTime() === today.getTime();
  }, [lastClaimDate]);

  const handleClaim = async () => {
    if (hasClaimedToday || isSubmitting || isLoading) return;
    
    setIsSubmitting(true);
    try {
      await onClaim();
    } catch (error) {
      console.error('Claim error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonText = hasClaimedToday ? 'Claimed Today' : "Claim Today's Points";
  const isButtonDisabled = hasClaimedToday || isSubmitting || isLoading;

  return (
    <div 
      className={`rounded-2xl flex flex-col bg-white items-center transition-all duration-300 h-full ${
        isHovered ? '-translate-y-1 shadow-lg shadow-purple-100' : 'shadow-sm border border-gray-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="bg-blue-50 w-full rounded-t-2xl px-4 py-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-cyan-500" aria-hidden="true" />
        <h3 className="text-base font-medium text-gray-700">Daily Streak</h3>
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center justify-between px-4 sm:px-6 py-6 w-full">
        {/* Streak Counter */}
        <div className="mb-6 w-full flex items-baseline justify-start">
          <span className="text-4xl sm:text-5xl font-extrabold text-purple-600" aria-live="polite">
            {isLoading ? "..." : streak}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-purple-600 ml-2">
            {streak === 1 ? 'day' : 'days'}
          </span>
        </div>
        
        {/* Week Visualization */}
        <div className="flex justify-between w-full mb-6 gap-1 sm:gap-2">
          {days.map((day, index) => {
            const isToday = index === todayIndex;
            const isPast = index < todayIndex;
            
            return (
              <div
                key={`${day}-${index}`}
                className={`
                  h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center 
                  text-xs sm:text-sm font-bold transition-all duration-200
                  ${isToday
                    ? 'border-2 border-purple-600 bg-white text-purple-600 shadow-md scale-110' 
                    : 'bg-gray-100 text-gray-400'
                  }
                `}
                aria-label={`${day} ${isToday ? '(Today)' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>
        
        {/* Info Text */}
        <p className="text-xs text-gray-500 mb-6 text-center leading-relaxed px-2">
          Check in daily to build your streak and earn{' '}
          <span className="font-bold text-purple-600">+5 points</span> each day
        </p>
        
        {/* Claim Button */}
        <button
          onClick={handleClaim}
          disabled={isButtonDisabled}
          className={`
            w-full py-3 sm:py-4 px-4 sm:px-6 rounded-2xl flex items-center justify-center 
            gap-2 font-bold text-sm transition-all duration-200
            ${hasClaimedToday 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-purple-600 text-white hover:bg-purple-700 active:scale-95 shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300'
            }
            ${isSubmitting ? 'opacity-75' : ''}
          `}
          aria-label={buttonText}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Zap 
              className={`h-4 w-4 ${hasClaimedToday ? 'text-gray-400' : 'fill-current'}`} 
              aria-hidden="true" 
            />
          )}
          <span className="truncate">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(DailyStreakCard);