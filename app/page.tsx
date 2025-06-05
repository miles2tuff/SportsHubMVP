'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '../components/BottomNav';

// Mock data for posts
const MOCK_POSTS = {
  discover: [
    {
      id: 1,
      user: {
        id: 'espn',
        name: 'ESPN',
        handle: '@espn',
        verified: true,
        avatar: '/avatars/espn.png'
      },
      content: 'BREAKING: Manchester City wins the FIFA Club World Cup, becoming the first team in English football history to hold the Premier League, Champions League, FA Cup, UEFA Super Cup and Club World Cup titles simultaneously 🏆',
      timestamp: '2h',
      stats: {
        comments: 1243,
        reposts: 3829,
        likes: 28900,
        views: '2.4M'
      },
      media: {
        type: 'image',
        url: '/posts/city-cwc.jpg'
      }
    },
    {
      id: 2,
      user: {
        id: 'nba',
        name: 'NBA',
        handle: '@NBA',
        verified: true,
        avatar: '/avatars/nba.png'
      },
      content: 'Steph Curry drops 42 PTS as the Warriors secure a crucial victory! 🔥\n\nGSW 128 - BOS 112',
      timestamp: '4h',
      stats: {
        comments: 892,
        reposts: 2156,
        likes: 19400,
        views: '1.8M'
      }
    },
    {
      id: 3,
      user: {
        id: 'nfl',
        name: 'NFL',
        handle: '@NFL',
        verified: true,
        avatar: '/avatars/nfl.png'
      },
      content: 'The @Chiefs have clinched the AFC West for the 8th consecutive season! 👑',
      timestamp: '6h',
      stats: {
        comments: 1532,
        reposts: 4267,
        likes: 32100,
        views: '3.1M'
      },
      media: {
        type: 'image',
        url: '/posts/chiefs-west.jpg'
      }
    }
  ],
  friends: [
    {
      id: 4,
      user: {
        id: 'alexthompson',
        name: 'Alex Thompson',
        handle: '@alexthompson',
        verified: false,
        avatar: '/avatars/alex.png'
      },
      content: 'At the Emirates watching Arsenal vs Brighton! Amazing atmosphere 🔴⚪️ #COYG',
      timestamp: '1h',
      stats: {
        comments: 12,
        reposts: 3,
        likes: 89,
        views: '412'
      },
      media: {
        type: 'image',
        url: '/posts/arsenal-stadium.jpg'
      }
    },
    {
      id: 5,
      user: {
        id: 'sarahchen',
        name: 'Sarah Chen',
        handle: '@sarahchen',
        verified: false,
        avatar: '/avatars/sarah.png'
      },
      content: 'Lakers game with the fam! 🏀 @Lakers',
      timestamp: '3h',
      stats: {
        comments: 8,
        reposts: 2,
        likes: 67,
        views: '245'
      }
    }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'discover' | 'friends'>('discover');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="text-xl font-bold text-gray-900">AppName</h1>
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === 'discover' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Discover
            {activeTab === 'discover' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-3 text-sm font-medium relative ${
              activeTab === 'friends' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Friends
            {activeTab === 'friends' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="space-y-4">
          {MOCK_POSTS[activeTab].map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-4">
              {/* Post Header */}
              <div className="flex items-start">
                <Link 
                  href={`/users/${post.user.id}`}
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 hover:opacity-80 transition-opacity"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <Link 
                      href={`/users/${post.user.id}`}
                      className="group flex items-center hover:underline"
                    >
                      <span className="font-semibold text-gray-900 group-hover:underline">{post.user.name}</span>
                      {post.user.verified && (
                        <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                      <span className="ml-1 text-gray-500">{post.user.handle}</span>
                    </Link>
                    <span className="mx-1 text-gray-500">·</span>
                    <span className="text-gray-500">{post.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-900 whitespace-pre-line">{post.content}</p>
                </div>
              </div>

              {/* Post Media */}
              {post.media && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                  <div className="aspect-video bg-gray-100" />
                </div>
              )}

              {/* Post Stats */}
              <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                <button className="flex items-center space-x-1 hover:text-blue-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{formatNumber(post.stats.comments)}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>{formatNumber(post.stats.reposts)}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-red-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{formatNumber(post.stats.likes)}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{post.stats.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 