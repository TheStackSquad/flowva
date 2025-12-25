// src/components/layout/tabNavigation.jsx
import { TabButton } from '../ui/buttons';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'earn', label: 'Earn Points' },
    { key: 'redeem', label: 'Redeem Rewards' },
  ];

  return (
    <div className="border-b border-gray-200 mt-4">
      <nav className="-mb-px flex gap-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            isActive={tab.key === activeTab}
            onClick={() => setActiveTab(tab.key)}
          />
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;