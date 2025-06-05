'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Mock search results - in a real app, this would come from an API
const MOCK_SEARCH_RESULTS = {
  teams: [
    { id: 1, name: 'Arsenal', logo: '/team-logos/arsenal.png', league: 'Premier League' },
    { id: 2, name: 'Manchester City', logo: '/team-logos/city.png', league: 'Premier League' },
    { id: 3, name: 'Chiefs', logo: '/team-logos/chiefs.png', league: 'NFL' },
    { id: 4, name: 'Dodgers', logo: '/team-logos/dodgers.png', league: 'MLB' }
  ],
  events: [
    { 
      id: 1, 
      title: 'Arsenal vs Manchester City', 
      competition: 'Premier League',
      date: 'Today, 20:00',
      isLive: true
    },
    { 
      id: 2, 
      title: 'Chiefs vs Ravens', 
      competition: 'NFL',
      date: 'Tomorrow, 16:30',
      isLive: false
    }
  ],
  players: [
    { id: 1, name: 'Bukayo Saka', team: 'Arsenal', image: '/players/saka.png' },
    { id: 2, name: 'Patrick Mahomes', team: 'Chiefs', image: '/players/mahomes.png' },
    { id: 3, name: 'Mookie Betts', team: 'Dodgers', image: '/players/betts.png' }
  ]
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'teams' | 'events' | 'players'>('teams');
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter results based on query
  const getFilteredResults = () => {
    if (!query) return { teams: [], events: [], players: [] };
    
    const searchTerm = query.toLowerCase();
    return {
      teams: MOCK_SEARCH_RESULTS.teams.filter(team => 
        team.name.toLowerCase().includes(searchTerm) ||
        team.league.toLowerCase().includes(searchTerm)
      ),
      events: MOCK_SEARCH_RESULTS.events.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.competition.toLowerCase().includes(searchTerm)
      ),
      players: MOCK_SEARCH_RESULTS.players.filter(player => 
        player.name.toLowerCase().includes(searchTerm) ||
        player.team.toLowerCase().includes(searchTerm)
      )
    };
  };

  const filteredResults = getFilteredResults();
  const hasResults = Object.values(filteredResults).some(category => category.length > 0);

  const handleItemClick = (type: string, id: number) => {
    setIsOpen(false);
    if (type === 'teams') {
      const team = MOCK_SEARCH_RESULTS.teams.find(t => t.id === id);
      if (team) {
        router.push(`/teams/${team.name.toLowerCase().replace(' ', '-')}`);
      }
    } else if (type === 'events') {
      router.push(`/matches/${id}`);
    } else if (type === 'players') {
      router.push(`/players/${id}`);
    }
  };

  const getDropdownHeight = () => {
    if (!query) return 'h-0';
    if (query.length === 1) return 'h-24';
    if (query.length === 2) return 'h-48';
    return 'h-96';
  };

  const getDropdownOpacity = () => {
    if (!query) return 'opacity-0';
    if (query.length === 1) return 'opacity-80';
    return 'opacity-100';
  };

  return (
    <div ref={searchRef} className="relative">
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
        placeholder="Search teams, players, or games..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Search Results Dropdown */}
      <div 
        className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'visible' : 'invisible'
        } ${getDropdownHeight()} ${getDropdownOpacity()}`}
      >
        {query.length === 1 ? (
          // Initial small dropdown with quick suggestions
          <div className="p-3 space-y-2">
            <div className="text-xs font-medium text-gray-500">Keep typing to search...</div>
            <div className="flex flex-wrap gap-2">
              {['Teams', 'Players', 'Games'].map((suggestion) => (
                <span key={suggestion} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        ) : query.length >= 2 ? (
          // Full search results
          hasResults ? (
            <>
              {/* Category Tabs */}
              <div className="flex border-b border-gray-200">
                {(['teams', 'events', 'players'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                      activeCategory === category
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700'
                    } transition-colors`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <span className="ml-1 text-xs text-gray-400">
                      ({filteredResults[category].length})
                    </span>
                  </button>
                ))}
              </div>

              {/* Results List */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 41px)' }}>
                {activeCategory === 'teams' && filteredResults.teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => handleItemClick('teams', team.id)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <SportIcon sport={team.league === 'Premier League' ? 'soccer' : team.league === 'NFL' ? 'football' : 'baseball'} />
                    </div>
                    <div className="ml-3 text-left">
                      <div className="font-medium text-gray-900">{team.name}</div>
                      <div className="text-sm text-gray-500">{team.league}</div>
                    </div>
                  </button>
                ))}

                {activeCategory === 'events' && filteredResults.events.map(event => (
                  <button
                    key={event.id}
                    onClick={() => handleItemClick('events', event.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500">{event.competition}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{event.date}</div>
                      {event.isLive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse mr-1"></span>
                          LIVE
                        </span>
                      )}
                    </div>
                  </button>
                ))}

                {activeCategory === 'players' && filteredResults.players.map(player => (
                  <button
                    key={player.id}
                    onClick={() => handleItemClick('players', player.id)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3 text-left">
                      <div className="font-medium text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.team}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

const SportIcon = ({ sport }: { sport: string }) => {
  const iconClassName = "w-5 h-5 text-gray-500";
  
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