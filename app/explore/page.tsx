'use client';

import React from 'react';
import SearchBar from '@/components/SearchBar';

interface LiveEvent {
  id: string;
  title: string;
  time: string;
  isLive: boolean;
}

interface TrendingEvent {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

const mockLiveEvents: LiveEvent[] = [
  {
    id: '1',
    title: 'Lakers vs Warriors',
    time: 'Live Now',
    isLive: true,
  },
  // Add more live events
];

const mockTrendingEvents: TrendingEvent[] = [
  {
    id: '1',
    title: 'Champions League Final',
    date: 'June 1, 2024',
    imageUrl: '/event-1.jpg',
  },
  // Add more trending events
];

export default function Explore() {
  return (
    <div className="min-h-screen pt-4 px-4">
      <SearchBar />
      
      {/* Live Events Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Live Now</h2>
        <div className="space-y-4">
          {mockLiveEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-400">{event.time}</p>
              </div>
              {event.isLive && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                  <span className="text-sm text-red-500">LIVE</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Trending Events Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Trending Events</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockTrendingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <div className="h-32 bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">[Event Image]</span>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-400">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 