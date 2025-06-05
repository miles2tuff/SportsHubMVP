'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';

// Mock data for scores grouped by league
const SCORES_BY_LEAGUE = {
  'NFL': [
    {
      id: 1,
      home: { name: 'Chiefs', score: 24, sport: 'football' },
      away: { name: '49ers', score: 21, sport: 'football' },
      status: 'FT',
      competition: 'NFL',
      date: 'Today'
    },
    {
      id: 2,
      home: { name: 'Ravens', score: 31, sport: 'football' },
      away: { name: 'Bills', score: 28, sport: 'football' },
      status: 'FT',
      competition: 'NFL',
      date: 'Today'
    }
  ],
  'Premier League': [
    {
      id: 3,
      home: { name: 'Arsenal', score: 2, sport: 'soccer' },
      away: { name: 'Brighton', score: 0, sport: 'soccer' },
      status: 'LIVE',
      time: '65\'',
      competition: 'Premier League',
      date: 'Today'
    },
    {
      id: 4,
      home: { name: 'Chelsea', score: 3, sport: 'soccer' },
      away: { name: 'Tottenham', score: 1, sport: 'soccer' },
      status: 'FT',
      competition: 'Premier League',
      date: 'Today'
    }
  ],
  'MLB': [
    {
      id: 5,
      home: { name: 'Dodgers', score: 5, sport: 'baseball' },
      away: { name: 'Giants', score: 2, sport: 'baseball' },
      status: 'FT',
      competition: 'MLB',
      date: 'Today'
    },
    {
      id: 6,
      home: { name: 'Yankees', score: 7, sport: 'baseball' },
      away: { name: 'Red Sox', score: 3, sport: 'baseball' },
      status: 'FT',
      competition: 'MLB',
      date: 'Today'
    }
  ]
};

const SPORTS = [
  { id: 'all', name: 'All Sports' },
  { id: 'football', name: 'Football' },
  { id: 'soccer', name: 'Soccer' },
  { id: 'baseball', name: 'Baseball' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'hockey', name: 'Hockey' }
];

const SportIcon = ({ sport }: { sport: string }) => {
  const iconClassName = "w-5 h-5";
  
  if (sport === 'soccer') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
      </svg>
    );
  }
  
  if (sport === 'baseball') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 18H9v-2h2v2zm1-4c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1z" />
      </svg>
    );
  }

  if (sport === 'football') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.5 2.5c4.95 0 9 4.05 9 9s-4.05 9-9 9-9-4.05-9-9 4.05-9 9-9zM16 7l-4 4-4-4H5v2l4 4-4 4v2h3l4-4 4 4h3v-2l-4-4 4-4V7h-3z" />
      </svg>
    );
  }

  return null;
};

export default function ScoresPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Fixed Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center h-14">
          <Link
            href="/sports"
            className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Scores</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="pt-20">
          {/* Search Bar */}
          <SearchBar />

          {/* Filter Options */}
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                showFavorites
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Favorites</span>
              </div>
            </button>
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedFilter(sport.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedFilter === sport.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sport.name}
              </button>
            ))}
          </div>

          {/* Scores by League */}
          <div className="mt-6 space-y-8">
            {Object.entries(SCORES_BY_LEAGUE).map(([league, matches]) => (
              <section key={league}>
                <h2 className="text-lg font-bold mb-3 text-gray-900">{league}</h2>
                <div className="space-y-3">
                  {matches.map((match) => (
                    <Link
                      key={match.id}
                      href={`/matches/${match.id}`}
                      className="block bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:border-blue-500 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">{match.date}</span>
                        {match.status === 'LIVE' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-800">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse mr-1"></span>
                            LIVE {match.time}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-gray-500">Final</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <SportIcon sport={match.home.sport} />
                          </div>
                          <span className="font-medium text-sm text-gray-900">{match.home.name}</span>
                        </div>
                        <span className="font-bold text-base text-gray-900">{match.home.score}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <SportIcon sport={match.away.sport} />
                          </div>
                          <span className="font-medium text-sm text-gray-900">{match.away.name}</span>
                        </div>
                        <span className="font-bold text-base text-gray-900">{match.away.score}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 