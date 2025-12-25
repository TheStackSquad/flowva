// src/pages/dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/layout/sidebar.jsx';
import Header from '../components/layout/header.jsx';
import TabNavigation from '../components/layout/tabNavigation.jsx';

import { useRewards } from '../features/rewards/hooks/useRewards';
import { useReferralStats } from '../features/rewards/hooks/useReferralStats.jsx';
import { useProfile } from '../features/profile/hooks/userProfile.jsx';

import PointsBalanceCard from '../features/rewards/components/pointsBalance.jsx';
import DailyStreakCard from '../features/rewards/components/dailyStreak.jsx';
import ToolSpotlightCard from '../features/rewards/components/toolSpotlight.jsx';
import EarnMorePointsSection from '../features/rewards/components/earnMorePoints.jsx';
import ReferralSection from '../features/rewards/components/referralSection.jsx';
import RedemptionList from '../features/redemption/components/redemptionList.jsx';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('earn');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { rewards, loading, claimDaily, shareStack } = useRewards();
  const { totalReferrals, totalPoints, loading: statsLoading } = useReferralStats();
  const { profile } = useProfile();

  const renderEarnPointsContent = () => (
    <>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-purple-600 text-3xl font-bold" aria-hidden="true">|</span>
        <h2 className="text-2xl font-bold text-gray-900">Your Rewards Journey</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <PointsBalanceCard 
          points={rewards?.points} 
          isLoading={loading}
        />
        
        <DailyStreakCard 
          streak={rewards?.streak_days}
          lastClaimDate={rewards?.last_claim_date}
          onClaim={claimDaily}
          isLoading={loading}
        />
        
        <ToolSpotlightCard />
      </div>

      <EarnMorePointsSection onShare={shareStack} />

      <ReferralSection 
        username={profile?.username}
        referralCode={profile?.referral_code}
        totalReferrals={totalReferrals}
        totalPoints={totalPoints}
        isLoading={statsLoading}
      />
    </>
  );

  return (
    <div className="flex bg-app-bg min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-grow md:ml-64 px-0 md:px-6 py-3">
        <Header onMenuClick={() => setSidebarOpen(true)} userRewards={rewards} />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="mt-8">
          {activeTab === 'earn' ? renderEarnPointsContent() : <RedemptionList />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;