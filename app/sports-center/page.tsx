'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import TabView from '@/components/TabView';
import BottomNav from '@/components/BottomNav';

const tabs = ['Clubs', 'Leagues/Sports', 'Players'];

interface TeamStanding {
  position: number;
  name: string;
  points: number;
  isSelected?: boolean;
}

const mockStandings: TeamStanding[] = [
  { position: 3, name: 'Chelsea', points: 65 },
  { position: 4, name: 'Arsenal', points: 64, isSelected: true },
  { position: 5, name: 'Tottenham', points: 61 },
];

const mockHighlights = [
  { id: 1, title: 'Arsenal vs Chelsea Highlights', time: '2h ago' },
  { id: 2, title: 'Arsenal vs Man United Goals', time: '1d ago' },
];

export default function SportsCenter() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen pt-4 px-4 pb-20">
      <SearchBar />
      
      <TabView 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="mt-6">
        {activeTab === 0 && (
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Highlights</h2>
              <div className="space-y-3">
                {mockHighlights.map(highlight => (
                  <div
                    key={highlight.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4"
                  >
                    <h3 className="font-medium">{highlight.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{highlight.time}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Premier League Standings</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden">
                {mockStandings.map(team => (
                  <div
                    key={team.name}
                    className={`flex items-center justify-between p-4 border-b border-gray-700 last:border-0 ${
                      team.isSelected ? 'bg-blue-500/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">{team.position}</span>
                      <span className={team.isSelected ? 'font-semibold' : ''}>{team.name}</span>
                    </div>
                    <span>{team.points} pts</span>
                  </div>
                ))}
              </div>
            </section>
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

      <BottomNav />
    </div>
  );
} 