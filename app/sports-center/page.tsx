'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import TabView from '@/components/TabView';

const tabs = ['Clubs', 'Leagues/Sports', 'Players'];

export default function SportsCenter() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen pt-4 px-4">
      <SearchBar />
      
      <TabView 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="mt-4">
        {activeTab === 0 && (
          <div className="space-y-4">
            {/* Clubs content */}
            <h2 className="text-xl font-semibold">Your Clubs</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Club cards will go here */}
            </div>
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="space-y-4">
            {/* Leagues/Sports content */}
            <h2 className="text-xl font-semibold">Your Leagues & Sports</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* League/Sport cards will go here */}
            </div>
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="space-y-4">
            {/* Players content */}
            <h2 className="text-xl font-semibold">Your Players</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Player cards will go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 