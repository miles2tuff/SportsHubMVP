'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SportIcon = ({ sport }: { sport: string }) => {
  const iconClassName = "w-5 h-5";
  
  if (sport === 'soccer') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
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
  
  if (sport === 'baseball') {
    return (
      <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 18H9v-2h2v2zm1-4c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1z" />
      </svg>
    );
  }

  return null;
};

// Mock user data
const USER_DATA = {
  name: 'John Doe',
  handle: '@johndoe',
  avatar: '/avatars/john.png',
  bio: 'Sports enthusiast | Arsenal & Chiefs fan | Fantasy league champion 🏆',
  location: 'San Francisco, CA',
  joinedDate: 'Joined December 2023',
  stats: {
    following: 248,
    followers: 182
  }
};

// Mock following data
const FOLLOWING_DATA = [
  {
    id: 1,
    name: 'ESPN',
    handle: '@espn',
    verified: true,
    avatar: '/avatars/espn.png',
    isFollowing: true
  },
  {
    id: 2,
    name: 'Arsenal',
    handle: '@arsenal',
    verified: true,
    avatar: '/avatars/arsenal.png',
    isFollowing: true
  },
  {
    id: 3,
    name: 'Alex Thompson',
    handle: '@alexthompson',
    verified: false,
    avatar: '/avatars/alex.png',
    isFollowing: true
  }
];

// Mock suggested accounts
const SUGGESTED_ACCOUNTS = [
  {
    id: 4,
    name: 'NBA',
    handle: '@nba',
    verified: true,
    avatar: '/avatars/nba.png',
    isFollowing: false
  },
  {
    id: 5,
    name: 'NFL',
    handle: '@nfl',
    verified: true,
    avatar: '/avatars/nfl.png',
    isFollowing: false
  }
];

// Mock preferences data
const PREFERENCES_DATA = {
  teams: [
    { 
      id: 1, 
      name: 'Arsenal', 
      type: 'team', 
      league: 'Premier League', 
      sport: 'soccer',
      followingSince: '2023-12-15'
    },
    { 
      id: 2, 
      name: 'Chiefs', 
      type: 'team', 
      league: 'NFL', 
      sport: 'football',
      followingSince: '2024-01-01'
    },
    { 
      id: 3, 
      name: 'Dodgers', 
      type: 'team', 
      league: 'MLB', 
      sport: 'baseball',
      followingSince: '2024-02-15'
    }
  ],
  leagues: [
    { id: 1, name: 'Premier League', type: 'league', sport: 'soccer' },
    { id: 2, name: 'NFL', type: 'league', sport: 'football' },
    { id: 3, name: 'MLB', type: 'league', sport: 'baseball' }
  ],
  players: [
    { id: 1, name: 'Bukayo Saka', team: 'Arsenal', sport: 'soccer' },
    { id: 2, name: 'Patrick Mahomes', team: 'Chiefs', sport: 'football' },
    { id: 3, name: 'Mookie Betts', team: 'Dodgers', sport: 'baseball' }
  ]
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

export default function Profile() {
  const [activeSection, setActiveSection] = useState<'profile' | 'following' | 'settings'>('profile');
  const [searchQuery, setSearchQuery] = useState('');

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{USER_DATA.name}</h1>
              <p className="text-gray-500">{USER_DATA.handle}</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Edit Profile
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {USER_DATA.location}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {USER_DATA.joinedDate}
              </div>
            </div>
            <p className="text-gray-900">{USER_DATA.bio}</p>
            <div className="flex space-x-4">
              <button className="text-sm hover:underline">
                <span className="font-semibold text-gray-900">{USER_DATA.stats.following}</span>
                <span className="text-gray-500"> Following</span>
              </button>
              <button className="text-sm hover:underline">
                <span className="font-semibold text-gray-900">{USER_DATA.stats.followers}</span>
                <span className="text-gray-500"> Followers</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-6">
        {/* Teams */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Teams</h2>
            <Link
              href="/add-team"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              Add Team
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PREFERENCES_DATA.teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
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
                <button className="text-gray-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Leagues */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Leagues</h2>
            <Link
              href="/leagues"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              Add League
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PREFERENCES_DATA.leagues.map((league) => (
              <div key={league.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <SportIcon sport={league.sport} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{league.name}</div>
                    <div className="text-sm text-gray-500">{league.sport}</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Players */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Players</h2>
            <Link
              href="/players"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              Add Player
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PREFERENCES_DATA.players.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <SportIcon sport={player.sport} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.team}</div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderFollowing = () => (
    <div className="px-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search accounts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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

      {/* Following List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Following</h2>
        <div className="space-y-4">
          {FOLLOWING_DATA.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900">{account.name}</span>
                    {account.verified && (
                      <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{account.handle}</span>
                </div>
              </div>
              <button className="px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-colors">
                Unfollow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Accounts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Accounts</h2>
        <div className="space-y-4">
          {SUGGESTED_ACCOUNTS.map((account) => (
            <div key={account.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900">{account.name}</span>
                    {account.verified && (
                      <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{account.handle}</span>
                </div>
              </div>
              <button className="px-4 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="px-4 space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Personal Information</div>
              <div className="text-sm text-gray-500">Update your name, bio, and location</div>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Password & Security</div>
              <div className="text-sm text-gray-500">Manage your password and security settings</div>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Notifications</div>
              <div className="text-sm text-gray-500">Configure your notification preferences</div>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-red-500 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-medium text-red-600">Sign Out</div>
              <div className="text-sm text-gray-500">Sign out of your account</div>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

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
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="max-w-2xl mx-auto px-4 flex border-b border-gray-200">
          <button
            onClick={() => setActiveSection('profile')}
            className={`py-3 px-4 text-sm font-medium relative ${
              activeSection === 'profile' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
            {activeSection === 'profile' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('following')}
            className={`py-3 px-4 text-sm font-medium relative ${
              activeSection === 'following' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Following
            {activeSection === 'following' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            className={`py-3 px-4 text-sm font-medium relative ${
              activeSection === 'settings' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
            {activeSection === 'settings' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        {activeSection === 'profile' && renderProfile()}
        {activeSection === 'following' && renderFollowing()}
        {activeSection === 'settings' && renderSettings()}
      </div>
    </div>
  );
} 