'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../../components/SearchBar';
import BottomNav from '../../components/BottomNav';

// Temporary image data URLs for development
const TEMP_IMAGES = {
  NBA_BG: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIABADAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAJBAAAgEDAwMFAAAAAAAAAAAAAQIDBAURAAYhEjFBBxMiUXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAHhEAAgICAgMAAAAAAAAAAAAAAQIAAwQRIRIxQVH/2gAMAwEAAhEDEQA/AJzcu6bZb7JJa6G4xSXRoyglYZVEGMkgkDkjx51m1hUvqYcj0fWqhHEwJnqFuKz2G5QWyguKz1RhMsixKQVBIGSSB4P7p+xQtdmQSMeJ01XZW5QkczmX//Z',
  NBA_LOGO: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMASURBVFiF7ZdNiFVlGMd/z3vOPXfuODN3xsYZx8YPS0JRQkEpg4jIhYS0CTdBm2gRLYI2QauIFrWLaOOqVbQJoU1QixYRQgUFhiFOQpq4zjjzJ37ee495z3Pi1/ILNTmnntnXJ7V4Tz/3/N/zjnP834JVeUuQgMopeSdEhCRe0TkfaCxdOUTwHFVbS77QBHZC3wE7AK+m52dffXcuXOXK5VKrV6vt0ql0p9LS0vnReQk8Iaqzv8vAhHZDRwD6qq6R0SqwFvAQWA38DXwpqp+57ruS77vPxYEQdj3/YYQYlREykAArACXgBOqenSjp9gQICKvAR8Dp4GXVXXlFjERkS3AO8ArQB04oqqfpWm6K4qiA0EQ7A/DcFsYhlvDMKwGQVCJ47jqOM7BXC73+Xg8fvpWEBuWQEQc4FPgaWBKVZ+7Xc5EpAC8BxwGFoHfgbKqLopIEXBFJKeqnohIqKoNEakAk8C0qr58W4CI5IGvgIeAE6r6/AY5+4F3gX1ABkwBHyRJ8mQcx9U4jp04jh3f9x3f910RKQRBUMnlcpM9z3vD87zPb1kCESkBp4CHgc9U9YU75OwD4BAwBB5Q1YaI5FW1LyJlwBWRHFASkbyqRiIyAZSBGVV96o4AqtoWkRPAj8DTIvKoqv64Qc5+Ap4B5lX1l+uXReRB4DAwCQyAJvCxqv4G4DjOoTAMJ4Mg2B4EQTUIgkoYhtUgCEqBiDwPvA1EVX1ERK4Bj6vqzxtk7XvgMeCaqv52/bKI7ADeAvYDc8C7qvrl+riI5IGiiJRVNRQRT0RcEXFExBURISKPAEeAJVV9WEQc4BfgIVWd2SBrp4G9wKyqnr1+WUTuBz4EdgIXgNdV9dsbx0UkD5RFpKSqoYh4IuKKiCMiQkQmgKPAsqruFZEi8CtwQFUvbpC108A+YE5Vf7x+WUS2Ax8Bu4DfgMOqevZOY0JVl0VkGlhQ1R0iUgB+B/ar6tUNsvYjsAeYV9Wz/wDMRN1kK4/GKAAAAABJRU5ErkJggg==',
  CL_BG: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIABADAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  CL_LOGO: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQkSURBVFiF7ZddbBRVFMd/987M7s7u7Gx3u922S2m3ULYUIgIBIhFMoAkQBR4wUSGRxEQTiQ8k+mDig4nx0QQTTfTFxAQTIwmJiUAIkGhIeAAiCpQIkVq6dLvtbtttt7vz4czOx70+UNaKsS0l2/CB/3OSe889/3PuPWfO3BEiQjpJAYgIxhgEQRBQSgEgImitcc5hjME5h4hgjMFai4hgjEEphbUWpRTOOYwxGGMAUEqhtQZAKUWj0eDEiRNs3LiR7u5ugiAgCAKMMRhjCMOQkZERTp06xfbt2+nt7UUpRRAEaK3x3qOUQkQwxuCcwxhDEAQopQiCgCAIEBGstdYYg1IKYwzGGKy1eO/x3qOUQkSw1qK1xhhDGIYopajX66xfv55t27bR399PpVJhbGyM48ePMzg4yOrVq6lWq4yOjrJ//34GBgZYtmwZtVqN0dFRDh06xMDAAEuXLqVarTI2NsbRo0cZGBhgyZIl1Go1xsbGOHbsGBs2bKC3t5dKpUKtVuPkyZNs3ryZnp4ewjAkDEOCIMA5h7UWpRTee7z3eO/x3iMiOOew1hKGIWEYEoYhQRBQr9dZtWoVW7ZsYWhoiPPnz7N7927WrVvHjh07GB4e5uzZs+zZs4e1a9eyc+dOLly4wJkzZ9i7dy9r1qxh165dXLx4kdOnT7Nv3z5WrVrF7t27uXTpEsPDw+zbt4+VK1eyZ88eLl++zIULFzhw4ACDg4Ns3bqVK1eucPnyZQ4ePMjQ0BDbt2/n6tWrjI+Pc/jwYTZt2kRfXx9hGBIEAUoptNYWQGtNEARorUkmKaXQWqO1RmtNEARordFao7VGa00QBGitcc6hlEJrjXMOrTVaa5xzKKVwzqGUQmuN1hrnHEoptNY451BKobXGOYfWGq01zjmUUiilcM6hlEJrjXMOrTXOOZRSaK1xzqGUIggCtNYEQYDWGq01WmuccwRBgNYarTVBEGCMwVqLtRZrLd57vPd477HW4r3HWov3Hmst3nustXjvsdbivcdai/cea+0/4r3HWov3Hmst3nustf+Iff369f8VRkS4desWMzMzTE9PMzk5yfT0NLOzs8zNzVGv16nX69TrdRqNBs1mk2aziXOOVqtFq9Wi1WrRbDZxztFqtWg2mzjnaLVaNJtNnHO0Wi2azSbOOVqtFs1mE+cczWaTVquFc45Wq0Wr1cI5R7PZpNVq4ZzDOUer1aLZbNJut2m327TbbZxzOOdot9u0223a7TbOOdrtNu12m3a7TbvdptPp0Ol06HQ6dDodOp0OnU6HTqdDp9P5E78DaD4MdxFzG4MAAAAASUVORK5CYII='
};

interface LiveEvent {
  id: string;
  title: string;
  time: string;
  isLive: boolean;
  league?: string;
}

interface TrendingEvent {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  type: 'live' | 'upcoming';
  league?: string;
  logo?: string;
}

const mockLiveEvents: Array<{
  id: string;
  title: string;
  time: string;
  isLive: boolean;
  league?: string;
}> = [
  {
    id: '1',
    title: 'Lakers vs Warriors',
    time: 'Live Now',
    isLive: true,
    league: 'NBA Playoffs'
  },
  {
    id: '2',
    title: 'Real Madrid vs Barcelona',
    time: 'Starting in 10min',
    isLive: false,
    league: 'Champions League'
  },
];

const mockTrendingEvents: Array<{
  id: string;
  title: string;
  date: string;
  type: 'live' | 'upcoming';
  league?: string;
}> = [
  {
    id: '1',
    title: 'Champions League Final',
    date: 'June 1, 2024',
    type: 'upcoming',
    league: 'UEFA Champions League'
  },
  {
    id: '2',
    title: 'NBA Playoffs - Game 7',
    date: 'Live Now',
    type: 'live',
    league: 'NBA Playoffs'
  },
];

// Mock data for featured events
const FEATURED_EVENTS = [
  {
    id: 1,
    title: 'Enhanced Games',
    subtitle: 'THE FUTURE OF SPORTS IS HERE',
    date: '21-24 May, 2026',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-800',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13.5c-.55 0-1 .45-1 1v4H8c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1v-4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4v-4c0-.55-.45-1-1-1z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'FIFA Club World Cup',
    subtitle: 'The Ultimate Club Competition',
    date: 'Dec 2023 - Feb 2024',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-800',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
      </svg>
    )
  }
];

// Updated sports categories with colors
const SPORTS_CATEGORIES = [
  {
    id: 1,
    name: 'Soccer',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
      </svg>
    )
  },
  {
    id: 2,
    name: 'Basketball',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13.5c-.55 0-1 .45-1 1v4H8c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1v-4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4v-4c0-.55-.45-1-1-1z" />
      </svg>
    )
  },
  {
    id: 3,
    name: 'Football',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.5 2.5c4.95 0 9 4.05 9 9s-4.05 9-9 9-9-4.05-9-9 4.05-9 9-9zM16 7l-4 4-4-4H5v2l4 4-4 4v2h3l4-4 4 4h3v-2l-4-4 4-4V7h-3z" />
      </svg>
    )
  },
  {
    id: 4,
    name: 'Baseball',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 18H9v-2h2v2zm1-4c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1z" />
      </svg>
    )
  },
  {
    id: 5,
    name: 'Hockey',
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-13v6h4v-6h-4z" />
      </svg>
    )
  },
  {
    id: 6,
    name: 'Tennis',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2v6h-2v-6z" />
      </svg>
    )
  }
];

// Mock data for live events
const LIVE_EVENTS = [
  {
    id: 1,
    title: 'Arsenal vs Brighton',
    type: 'Premier League',
    viewers: '245K',
    thumbnail: '/thumbnails/arsenal-brighton.jpg'
  },
  {
    id: 2,
    title: 'Lakers vs Warriors',
    type: 'NBA',
    viewers: '189K',
    thumbnail: '/thumbnails/lakers-warriors.jpg'
  }
  // Add more live events as needed
];

// Add trending hashtags data
const TRENDING_HASHTAGS = [
  {
    id: 1,
    tag: '#EnhancedGames',
    posts: '125K',
    trending: true,
    category: 'Sports'
  },
  {
    id: 2,
    tag: '#UCL',
    posts: '89K',
    trending: true,
    category: 'Soccer'
  },
  {
    id: 3,
    tag: '#NBA',
    posts: '76K',
    trending: true,
    category: 'Basketball'
  },
  {
    id: 4,
    tag: '#SuperBowl',
    posts: '65K',
    trending: true,
    category: 'Football'
  },
  {
    id: 5,
    tag: '#WorldCup',
    posts: '54K',
    trending: true,
    category: 'Soccer'
  }
];

export default function Explore() {
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
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pt-16 pb-20">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search events, teams, or players..."
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

        {/* Sports Categories */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {SPORTS_CATEGORIES.map((sport) => (
            <button
              key={sport.id}
              className={`aspect-square ${sport.bgColor} rounded-xl flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all border border-gray-100`}
            >
              <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center ${sport.iconColor}`}>
                {sport.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">{sport.name}</span>
            </button>
          ))}
        </div>

        {/* Live Now Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Now</h2>
          <div className="grid grid-cols-2 gap-4">
            {LIVE_EVENTS.map((event) => (
              <div key={event.id} className="group relative">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 rounded-full flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-1 animate-pulse" />
                    <span className="text-xs font-medium text-white">LIVE</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-full">
                        {event.viewers} viewers
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white mt-1 line-clamp-2">{event.title}</h3>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Events</h2>
          <div className="space-y-4 mb-6">
            {FEATURED_EVENTS.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="relative w-full h-20 rounded-xl overflow-hidden group block"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${event.gradientFrom} ${event.gradientTo} opacity-90 group-hover:opacity-95 transition-opacity`} />
                <div className="absolute top-3 right-4 flex items-center space-x-2">
                  <span className="text-white text-xs font-medium">{event.date}</span>
                </div>
                <div className="absolute inset-0 flex items-center p-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-white">
                        {event.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{event.title}</h3>
                      <p className="text-blue-100 text-sm font-medium">{event.subtitle}</p>
                    </div>
                    <div className="flex items-center text-white text-sm font-medium">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              href="/featured-events"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-900">View Featured Events</span>
              <svg className="w-4 h-4 ml-2 text-gray-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Trending Hashtags (simplified styling) */}
        <div className="space-y-5">
          {TRENDING_HASHTAGS.map((hashtag) => (
            <Link
              key={hashtag.id}
              href={`/hashtag/${hashtag.tag.substring(1)}`}
              className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-900">{hashtag.tag}</span>
                  <span className="text-sm text-gray-500">{hashtag.category}</span>
                </div>
                {hashtag.trending && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Trending
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">{hashtag.posts} posts</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            href="/trending"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
          >
            <span>View all trending topics</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
} 