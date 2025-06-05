'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import BottomNav from '../../components/BottomNav';
import TeamCard from '../../components/TeamCard';

// Mock data for team circles (will be personalized based on user preferences later)
const MY_TEAMS = [
  { id: 1, name: 'Arsenal', sport: 'soccer', league: 'Premier League' },
  { id: 2, name: 'Chiefs', sport: 'football', league: 'NFL' },
  { id: 3, name: 'Dodgers', sport: 'baseball', league: 'MLB' },
];

// Mock data for match notifications
const MATCH_NOTIFICATIONS = [
  {
    id: 1,
    home: { name: 'Arsenal', score: 2, sport: 'soccer' },
    away: { name: 'Brighton', score: 0, sport: 'soccer' },
    status: 'LIVE',
    time: '65\'',
    competition: 'Premier League'
  },
  {
    id: 2,
    home: { name: 'Chelsea', score: 3, sport: 'soccer' },
    away: { name: 'Tottenham', score: 1, sport: 'soccer' },
    status: 'FT',
    competition: 'Premier League'
  },
  {
    id: 3,
    home: { name: 'LA Dodgers', score: 5, sport: 'baseball' },
    away: { name: 'SF Giants', score: 2, sport: 'baseball' },
    status: 'FT',
    competition: 'MLB'
  },
  {
    id: 4,
    home: { name: 'Kansas City Chiefs', score: 24, sport: 'football' },
    away: { name: 'San Francisco 49ers', score: 21, sport: 'football' },
    status: 'FT',
    competition: 'NFL'
  }
];

// Mock data for teams
const MOCK_TEAMS = [
  {
    name: 'Chelsea',
    sport: 'soccer',
    league: 'Premier League',
    standings: [
      { position: 1, team: 'Arsenal', points: 72 },
      { position: 2, team: 'Liverpool', points: 71 },
      { position: 3, team: 'Chelsea', points: 68 },
      { position: 4, team: 'Tottenham', points: 64 },
      { position: 5, team: 'West Ham', points: 62 }
    ],
    highlights: [
      {
        id: '1',
        title: 'Chelsea vs Arsenal Highlights',
        date: '2 hours ago',
        sport: 'soccer'
      },
      {
        id: '2',
        title: 'Chelsea\'s Best Goals This Week',
        date: '1 day ago',
        sport: 'soccer'
      }
    ]
  },
  {
    name: 'LA Dodgers',
    sport: 'baseball',
    league: 'MLB',
    standings: [
      { position: 1, team: 'LA Dodgers', wins: 15, losses: 5 },
      { position: 2, team: 'San Francisco', wins: 13, losses: 7 },
      { position: 3, team: 'San Diego', wins: 12, losses: 8 },
      { position: 4, team: 'Arizona', wins: 10, losses: 10 },
      { position: 5, team: 'Colorado', wins: 7, losses: 13 }
    ],
    highlights: [
      {
        id: '1',
        title: 'Dodgers vs Giants Full Game Highlights',
        date: '5 hours ago',
        sport: 'baseball'
      },
      {
        id: '2',
        title: 'Amazing Double Play by Dodgers',
        date: '1 day ago',
        sport: 'baseball'
      }
    ]
  },
  {
    name: 'NFL',
    sport: 'football',
    league: 'NFL',
    standings: [
      { position: 1, team: 'Kansas City Chiefs', wins: 12, losses: 5 },
      { position: 2, team: 'San Francisco 49ers', wins: 11, losses: 6 },
      { position: 3, team: 'Baltimore Ravens', wins: 11, losses: 6 },
      { position: 4, team: 'Buffalo Bills', wins: 10, losses: 7 },
      { position: 5, team: 'Philadelphia Eagles', wins: 10, losses: 7 }
    ],
    highlights: [
      {
        id: '1',
        title: 'Chiefs vs 49ers Game Highlights',
        date: '3 hours ago',
        sport: 'football'
      },
      {
        id: '2',
        title: 'Top 10 Plays of the Week',
        date: '1 day ago',
        sport: 'football'
      }
    ],
    upcomingGames: [
      {
        id: '1',
        home: 'Kansas City Chiefs',
        away: 'Buffalo Bills',
        date: 'Sunday, 4:25 PM ET',
        week: 'Week 1'
      },
      {
        id: '2',
        home: 'San Francisco 49ers',
        away: 'Los Angeles Rams',
        date: 'Sunday, 8:20 PM ET',
        week: 'Week 1'
      }
    ]
  }
];

// Group teams by league
const groupedTeams = MOCK_TEAMS.reduce((acc, team) => {
  if (!acc[team.league]) {
    acc[team.league] = [];
  }
  acc[team.league].push(team);
  return acc;
}, {} as Record<string, typeof MOCK_TEAMS>);

// Add mock data for multiple highlights at the top
const HIGHLIGHTS = [
  {
    id: 'trending-1',
    title: 'Manchester City vs Real Madrid | Champions League Highlights',
    duration: '5:23',
    views: '2.1M',
    thumbnail: '/thumbnails/city-madrid.jpg',
    date: '2 hours ago',
    sport: 'soccer',
    videoUrl: '/videos/city-madrid.mp4'
  },
  {
    id: 'trending-2',
    title: 'Chiefs vs Bills | NFL Week 14 Highlights',
    duration: '4:15',
    views: '1.8M',
    thumbnail: '/thumbnails/chiefs-bills.jpg',
    date: '5 hours ago',
    sport: 'football',
    videoUrl: '/videos/chiefs-bills.mp4'
  },
  {
    id: 'trending-3',
    title: 'Lakers vs Warriors | NBA Highlights',
    duration: '6:02',
    views: '1.2M',
    thumbnail: '/thumbnails/lakers-warriors.jpg',
    date: '8 hours ago',
    sport: 'basketball',
    videoUrl: '/videos/lakers-warriors.mp4'
  },
  // Add more highlights as needed
];

const SportIcon = ({ sport }: { sport: string }) => {
  const iconClassName = "w-6 h-6";
  
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

export default function SportsHub() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle intersection observer for videos
  useEffect(() => {
    if (!showVideoModal) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            video.play();
          } else {
            const video = entry.target as HTMLVideoElement;
            video.pause();
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [showVideoModal]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Fixed Top Banner */}
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

      <div className="max-w-7xl mx-auto px-4">
        <div className="pt-16">
          {/* Compact Search and My Teams Section */}
          <div className="flex flex-col space-y-3">
            <SearchBar />
            
            {/* Featured Event Banner */}
            <Link
              href="/events/fifa-club-world-cup-2024"
              className="relative w-full h-20 rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90 group-hover:opacity-95 transition-opacity" />
              {/* Live Indicator */}
              <div className="absolute top-3 right-4 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">LIVE</span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              {/* Main Content */}
              <div className="absolute inset-0 flex items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10.99L8.5 12l2.5 2.99L14.5 12l-3.5-2.99z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">FIFA Club World Cup</h3>
                    <p className="text-blue-100 text-sm font-medium">Manchester City vs Fluminense • Final</p>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* My Teams - More Compact */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2">My Teams</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-2.5 pb-1">
                  {MY_TEAMS.map((team) => (
                    <Link 
                      key={team.id} 
                      href={`/teams/${team.name.toLowerCase().replace(' ', '-')}`}
                      className="flex flex-col items-center space-y-1.5 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm backdrop-blur-sm border border-gray-100 overflow-hidden flex items-center justify-center transition-all transform group-hover:scale-105 group-hover:shadow-md">
                        <SportIcon sport={team.sport} />
                      </div>
                      <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap group-hover:text-blue-600">{team.name}</span>
                    </Link>
                  ))}
                  
                  {/* Add Team Button */}
                  <Link 
                    href="/add-team"
                    className="flex flex-col items-center space-y-1.5 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center transition-all transform group-hover:scale-105 group-hover:border-blue-500 group-hover:bg-blue-50">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap group-hover:text-blue-600">Add Team</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Section - Two Highlights */}
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Trending</h3>
            <div className="grid grid-cols-1 gap-4">
              {HIGHLIGHTS.slice(0, 2).map((highlight, index) => (
                <button
                  key={highlight.id}
                  onClick={() => {
                    setCurrentVideoIndex(index);
                    setShowVideoModal(true);
                  }}
                  className="w-full bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative bg-gray-100">
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                      <div className="w-14 h-14 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg className="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg drop-shadow-lg">{highlight.title}</h3>
                      <div className="flex items-center mt-2 text-white text-sm">
                        <span className="drop-shadow-lg">{highlight.views} views</span>
                        <span className="mx-2">•</span>
                        <span className="drop-shadow-lg">{highlight.date}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
                      {highlight.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Match Notifications */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Scores</h2>
            <div className="grid grid-cols-2 gap-3">
              {MATCH_NOTIFICATIONS.map((match) => (
                <Link
                  key={match.id}
                  href={`/matches/${match.id}`}
                  className="block bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:border-blue-500 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">{match.competition}</span>
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
            <div className="mt-3 flex justify-end">
              <Link
                href="/scores"
                className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <span>see more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Leagues and Teams */}
          <div className="mt-8 space-y-8">
            {Object.entries(groupedTeams).map(([league, teams]) => (
              <section key={league}>
                <h2 className="text-xl font-bold mb-4 text-gray-900">{league}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {teams.map((team) => (
                    <TeamCard
                      key={team.name}
                      name={team.name}
                      sport={team.sport}
                      league={team.league}
                      standings={team.standings}
                      highlights={team.highlights}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Video Feed */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="h-full overflow-y-auto snap-y snap-mandatory">
            {HIGHLIGHTS.map((highlight, index) => (
              <div key={highlight.id} className="h-full w-full snap-start">
                <div className="relative h-full flex items-center justify-center">
                  <video
                    ref={el => {
                      videoRefs.current[index] = el;
                    }}
                    className="h-full w-full object-contain"
                    src={highlight.videoUrl}
                    playsInline
                    loop
                    muted={false}
                    controls
                  >
                    <source src={highlight.videoUrl} type="video/mp4" />
                  </video>
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-semibold text-lg">{highlight.title}</h3>
                    <div className="flex items-center mt-2 text-white text-sm">
                      <span>{highlight.views} views</span>
                      <span className="mx-2">•</span>
                      <span>{highlight.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button 
            onClick={() => {
              setShowVideoModal(false);
              setCurrentVideoIndex(0);
            }}
            className="fixed top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
} 