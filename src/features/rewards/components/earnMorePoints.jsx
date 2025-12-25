//src/features/rewards/components/earnMorePoints.jsx
import React from 'react';
import { Share2, Star } from 'lucide-react';

const SimpleEarnMoreAction = ({ 
  title, 
  points, 
  description, 
  icon: Icon, 
  buttonText 
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md min-h-[160px] border-2 border-gray-100 transition-all duration-300 ease-in-out hover:border-purple-400 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-purple-100 flex-shrink-0">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="font-semibold text-gray-900 leading-tight">{title}</h3>
          {points && (
            <span className="text-sm font-medium text-purple-600">{points}</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600 pr-4">{description}</p>
        
        {buttonText && (
          <button 
            className="flex items-center text-sm font-semibold text-purple-600 py-1 px-3 rounded-lg border border-purple-200 bg-purple-50 flex-shrink-0 hover:bg-purple-100 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-1" />
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const EarnMorePointsSection = () => {
  return (
    <div className="p-1 mb-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-purple-600 text-2xl font-bold">|</span>
          <h2 className="text-2xl font-bold text-gray-900">Earn More Points</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SimpleEarnMoreAction
            title="Refer and win 10,000 points!"
            icon={Star}
            description="Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of 10,000 points. Friends must complete onboarding to qualify."
          />
          
          <SimpleEarnMoreAction
            title="Share Your Stack"
            points="Earn +25 pts"
            icon={Share2}
            description="Share your tool stack"
            buttonText="Share"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(EarnMorePointsSection);