// src/features/redemption/components/redemptionList.jsx
import React, { useState } from 'react';
import RewardCard from './rewardCard';
import { CreditCard, Send, Smartphone, Gift, BookOpen } from 'lucide-react';

const RedemptionList = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const rewards = [
    {
      id: 1,
      icon: CreditCard,
      title: '$5 Bank Transfer',
      description: 'The $5 equivalent will be transferred to your bank account.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 2,
      icon: Send,
      title: '$5 PayPal International',
      description: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 3,
      icon: Smartphone,
      title: '$5 Virtual Visa Card',
      description: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 4,
      icon: Gift,
      title: '$5 Apple Gift Card',
      description: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 5,
      icon: Gift,
      title: '$5 Google Play Card',
      description: 'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 6,
      icon: Gift,
      title: '$5 Amazon Gift Card',
      description: 'Get a $5 digital gift card to spend on your favorite tools or platforms.',
      points: 5000,
      status: 'locked'
    },
    {
      id: 7,
      icon: Gift,
      title: '$10 Amazon Gift Card',
      description: 'Get a $10 digital gift card to spend on your favorite tools or platforms.',
      points: 10000,
      status: 'locked'
    },
    {
      id: 8,
      icon: BookOpen,
      title: 'Free Udemy Course',
      description: 'Coming Soon!',
      points: 0,
      status: 'coming-soon'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Rewards', count: rewards.length },
    { key: 'unlocked', label: 'Unlocked', count: rewards.filter(r => r.status === 'unlocked').length },
    { key: 'locked', label: 'Locked', count: rewards.filter(r => r.status === 'locked').length },
    { key: 'coming-soon', label: 'Coming Soon', count: rewards.filter(r => r.status === 'coming-soon').length }
  ];

  const filteredRewards = activeFilter === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.status === activeFilter);

  const handleRedeem = (rewardId) => {
    console.log('Redeeming reward:', rewardId);
    // Add redemption logic here
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* Section Header with Purple Border */}
      <div className="flex items-center gap-3">
        <span className="text-purple-600 text-3xl font-bold">|</span>
        <h2 className="text-2xl font-bold text-gray-900">Redeem Your Points</h2>
      </div>

      {/* Filter Tabs - Added 'overflow-x-auto' for horizontal scroll on small screens if tabs are too wide */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-4 sm:gap-8 overflow-x-auto" aria-label="Filter tabs">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`
                relative py-3 px-1 whitespace-nowrap font-medium text-sm transition-colors duration-150 focus:outline-none flex items-center gap-2
                ${activeFilter === filter.key
                  ? 'text-purple-700' 
                  : 'text-gray-600 hover:text-purple-600 focus:text-purple-600'
                }
              `}
            >
              {filter.label}
              
              {/* Badge with count */}
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeFilter === filter.key
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {filter.count}
              </span>

              {/* Bottom border */}
              <span 
                className={`
                  absolute bottom-0 left-0 h-0.5 bg-purple-700 transition-all duration-300
                  ${activeFilter === filter.key ? 'w-full' : 'w-0'}
                `}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Rewards Grid - Mobile Responsive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            icon={reward.icon}
            title={reward.title}
            description={reward.description}
            points={reward.points}
            status={reward.status}
            onRedeem={() => handleRedeem(reward.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No rewards found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default RedemptionList;