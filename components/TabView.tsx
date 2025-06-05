import React from 'react';

interface TabViewProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const TabView: React.FC<TabViewProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 border-b border-gray-700">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === index
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => onTabChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabView; 