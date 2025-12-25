// src/features/rewards/components/RewardCard.jsx

import React, { useState } from 'react';
import { PrimaryButton } from '../../../components/ui/buttons';

const RewardCard = ({ 
  icon: Icon,
  title, 
  description, 
  points, 
  status = 'locked',
  onRedeem 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isUnlocked = status === 'unlocked';

  const buttonConfig = {
    unlocked: {
      text: 'Redeem',
      className: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200',
      disabled: false
    },
    'coming-soon': {
      text: 'Coming Soon',
      className: 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200',
      disabled: true
    },
    locked: {
      text: 'Locked',
      className: 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200',
      disabled: true
    }
  };

  const config = buttonConfig[status] || buttonConfig.locked;

  return (
    <div
      className={`bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center transition-all duration-300 border ${
        isUnlocked 
          ? isHovered 
            ? '-translate-y-1 shadow-xl shadow-purple-100 border-purple-100' 
            : 'shadow-md border-gray-100'
          : 'shadow-none bg-gray-50/50 border-gray-200 opacity-80'
      }`}
      onMouseEnter={() => setIsHovered(isUnlocked)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
          isUnlocked ? 'bg-purple-100' : 'bg-gray-200 grayscale'
        }`}
        aria-hidden="true"
      >
        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${isUnlocked ? 'text-purple-600' : 'text-gray-400'}`} aria-hidden="true" />
      </div>

      <h3 className={`text-lg sm:text-xl font-bold mb-3 text-center ${isUnlocked ? 'text-gray-900' : 'text-gray-500'} truncate w-full`}>
        {title}
      </h3>

      <p className={`text-xs sm:text-sm text-center mb-4 leading-relaxed min-h-[48px] sm:min-h-[60px] line-clamp-3 ${
        isUnlocked ? 'text-gray-600' : 'text-gray-400'
      }`}>
        {description}
      </p>

      <div className="flex items-center gap-1 mb-5 sm:mb-6" aria-label={`${points} points`}>
        <span aria-hidden="true" className={isUnlocked ? '' : 'grayscale opacity-50'}>⭐</span>
        <span className={`text-sm sm:text-base font-semibold ${isUnlocked ? 'text-purple-600' : 'text-gray-400'}`}>
          {points} pts
        </span>
      </div>

      <PrimaryButton
        onClick={isUnlocked ? onRedeem : undefined}
        disabled={config.disabled}
        className={`w-full py-2.5 sm:py-3 font-bold rounded-xl transition-all ${config.className} text-sm sm:text-base`}
        aria-label={`${config.text} ${title} reward`}
        aria-disabled={config.disabled}
      >
        {config.text}
      </PrimaryButton>
    </div>
  );
};

export default React.memo(RewardCard);