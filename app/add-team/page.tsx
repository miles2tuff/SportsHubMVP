'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock data for available teams
const AVAILABLE_TEAMS = [
  {
    league: 'Premier League',
    teams: [
      { id: 1, name: 'Arsenal', sport: 'soccer' },
      { id: 2, name: 'Manchester City', sport: 'soccer' },
      { id: 3, name: 'Liverpool', sport: 'soccer' },
      { id: 4, name: 'Tottenham', sport: 'soccer' },
    ]
  },
  {
    league: 'NFL',
    teams: [
      { id: 5, name: 'Chiefs', sport: 'football' },
      { id: 6, name: 'Ravens', sport: 'football' },
      { id: 7, name: 'Eagles', sport: 'football' },
      { id: 8, name: 'Bills', sport: 'football' },
    ]
  },
  {
    league: 'MLB',
    teams: [
      { id: 9, name: 'Dodgers', sport: 'baseball' },
      { id: 10, name: 'Braves', sport: 'baseball' },
      { id: 11, name: 'Astros', sport: 'baseball' },
      { id: 12, name: 'Rangers', sport: 'baseball' },
    ]
  }
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

export default function AddTeam() {
  const [query, setQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  // Filter teams based on search query and selected league
  const filteredTeams = AVAILABLE_TEAMS
    .filter(league => !selectedLeague || league.league === selectedLeague)
    .map(league => ({
      ...league,
      teams: league.teams.filter(team => 
        team.name.toLowerCase().includes(query.toLowerCase()) ||
        league.league.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(league => league.teams.length > 0);

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
          <h1 className="text-xl font-bold text-gray-900">Add Team</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="pt-20">
          {/* Search Bar */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search teams..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* League Filter */}
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedLeague(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                !selectedLeague
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Leagues
            </button>
            {AVAILABLE_TEAMS.map((league) => (
              <button
                key={league.league}
                onClick={() => setSelectedLeague(league.league)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedLeague === league.league
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {league.league}
              </button>
            ))}
          </div>

          {/* Teams List */}
          <div className="mt-6 space-y-8">
            {filteredTeams.map((league) => (
              <section key={league.league}>
                <h2 className="text-sm font-medium text-gray-500 mb-3">{league.league}</h2>
                <div className="grid grid-cols-1 gap-2">
                  {league.teams.map((team) => (
                    <Link
                      key={team.id}
                      href={`/teams/${team.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center p-3 rounded-lg border border-gray-100 bg-white hover:border-blue-500 hover:shadow-sm transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                        <SportIcon sport={team.sport} />
                      </div>
                      <span className="ml-3 font-medium text-gray-900 group-hover:text-blue-600">
                        {team.name}
                      </span>
                      <svg 
                        className="w-5 h-5 ml-auto text-gray-400 group-hover:text-blue-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            {filteredTeams.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No teams found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 