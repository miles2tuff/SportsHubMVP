'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock user data for Alex Thompson
const ALEX_DATA = {
  name: 'Alex Thompson',
  handle: '@alexthompson',
  avatar: '/avatars/alex.png',
  bio: 'Die-hard Arsenal fan | Sports analytics enthusiast',
  location: 'London, UK',
  joinedDate: 'Joined September 2023',
  stats: {
    following: 156,
    followers: 89
  },
  preferences: {
    teams: [
      { 
        id: 1, 
        name: 'Arsenal', 
        league: 'Premier League', 
        sport: 'soccer',
        followingSince: '2023-09-15'
      },
      { 
        id: 2, 
        name: 'Boston Celtics', 
        league: 'NBA', 
        sport: 'basketball',
        followingSince: '2023-10-01'
      }
    ],
    players: [
      {
        id: 1,
        name: 'Bukayo Saka',
        team: 'Arsenal',
        sport: 'soccer',
        position: 'Right Wing'
      },
      {
        id: 2,
        name: 'Martin Ødegaard',
        team: 'Arsenal',
        sport: 'soccer',
        position: 'Midfielder'
      },
      {
        id: 3,
        name: 'Jayson Tatum',
        team: 'Boston Celtics',
        sport: 'basketball',
        position: 'Forward'
      }
    ],
    leagues: [
      {
        id: 1,
        name: 'Premier League',
        sport: 'soccer',
        region: 'England'
      },
      {
        id: 2,
        name: 'NBA',
        sport: 'basketball',
        region: 'United States'
      }
    ]
  }
};

const SportIcon = ({ sport }: { sport: string }) => {
  const iconClassName = "w-5 h-5";
  
  if (sport === 'soccer') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
      </svg>
    );
  }
  
  if (sport === 'basketball') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13.5c-.55 0-1 .45-1 1v4H8c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1v-4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4v-4c0-.55-.45-1-1-1z" />
      </svg>
    );
  }

  return null;
};

// Helper function to calculate following duration
const getFollowingDuration = (followingSince: string): string => {
  const start = new Date(followingSince);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day';
  if (diffDays < 30) return `${diffDays} days`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return '1 month';
  if (diffMonths < 12) return `${diffMonths} months`;
  
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) return '1 year';
  return `${diffYears} years`;
};

export default function UserProfile() {
  const params = useParams();
  const username = params.username as string;
  const [isFollowing, setIsFollowing] = useState(true);

  // In a real app, you'd fetch user data based on the username
  const userData = ALEX_DATA; // For now, always show Alex's data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-sm text-gray-500">{userData.handle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-20">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 truncate">{userData.name}</h2>
                  <p className="text-gray-500 text-sm">{userData.handle}</p>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{userData.bio}</p>
              <div className="mt-2 flex flex-wrap gap-y-1 gap-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userData.location}
                </div>
                <div className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {userData.joinedDate}
                </div>
                <div className="flex items-center space-x-4">
                  <span>
                    <span className="font-semibold text-gray-900">{userData.stats.following}</span>
                    <span className="ml-1">Following</span>
                  </span>
                  <span>
                    <span className="font-semibold text-gray-900">{userData.stats.followers}</span>
                    <span className="ml-1">Followers</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Teams {userData.name} Follows</h3>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {userData.preferences.teams.map((team) => (
              <div key={team.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <SportIcon sport={team.sport} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{team.name}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{team.league}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">Following for {getFollowingDuration(team.followingSince)}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/teams/${team.name.toLowerCase().replace(' ', '-')}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Players Section */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Players {userData.name} Follows</h3>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {userData.preferences.players.map((player) => (
              <div key={player.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <SportIcon sport={player.sport} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{player.name}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{player.team}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{player.position}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/players/${player.name.toLowerCase().replace(' ', '-')}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Leagues Section */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Leagues {userData.name} Follows</h3>
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
            {userData.preferences.leagues.map((league) => (
              <div key={league.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <SportIcon sport={league.sport} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{league.name}</div>
                    <div className="text-sm text-gray-500">{league.region}</div>
                  </div>
                </div>
                <Link
                  href={`/leagues/${league.name.toLowerCase().replace(' ', '-')}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 