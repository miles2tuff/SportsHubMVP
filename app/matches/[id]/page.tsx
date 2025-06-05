'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// Mock data - in a real app, this would come from an API
const MATCH_DATA = {
  '1': {
    competition: 'Premier League',
    home: {
      name: 'Arsenal',
      logo: '/team-logos/arsenal.png',
      score: 3,
      scorers: ['Saka (23\')', 'Martinelli (45\')', 'Havertz (78\')']
    },
    away: {
      name: 'Brighton',
      logo: '/team-logos/brighton.png',
      score: 0,
      scorers: []
    },
    date: '2024-03-14',
    status: 'FT',
    stats: {
      possession: { home: 65, away: 35 },
      shots: { home: 18, away: 8 },
      shotsOnTarget: { home: 8, away: 3 },
      corners: { home: 7, away: 2 },
      fouls: { home: 8, away: 12 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 }
    },
    lineups: {
      home: {
        starting: [
          { number: 1, name: 'Raya', position: 'GK' },
          { number: 4, name: 'White', position: 'RB' },
          { number: 2, name: 'Saliba', position: 'CB' },
          { number: 6, name: 'Gabriel', position: 'CB' },
          { number: 35, name: 'Zinchenko', position: 'LB' },
          { number: 41, name: 'Rice', position: 'CDM' },
          { number: 8, name: 'Odegaard', position: 'CM' },
          { number: 29, name: 'Havertz', position: 'CM' },
          { number: 7, name: 'Saka', position: 'RW' },
          { number: 11, name: 'Martinelli', position: 'LW' },
          { number: 9, name: 'Jesus', position: 'ST' }
        ],
        subs: [
          { number: 22, name: 'Turner', position: 'GK' },
          { number: 15, name: 'Timber', position: 'DEF' },
          { number: 12, name: 'Jorginho', position: 'MID' },
          { number: 14, name: 'Nketiah', position: 'FWD' }
        ]
      },
      away: {
        starting: [
          { number: 1, name: 'Verbruggen', position: 'GK' },
          { number: 34, name: 'Veltman', position: 'RB' },
          { number: 5, name: 'Dunk', position: 'CB' },
          { number: 4, name: 'van Hecke', position: 'CB' },
          { number: 24, name: 'Estupinan', position: 'LB' },
          { number: 13, name: 'Gross', position: 'CM' },
          { number: 8, name: 'Gilmour', position: 'CM' },
          { number: 20, name: 'March', position: 'RM' },
          { number: 10, name: 'Mac Allister', position: 'CAM' },
          { number: 22, name: 'Mitoma', position: 'LM' },
          { number: 18, name: 'Welbeck', position: 'ST' }
        ],
        subs: [
          { number: 23, name: 'Steele', position: 'GK' },
          { number: 6, name: 'Webster', position: 'DEF' },
          { number: 7, name: 'Moder', position: 'MID' },
          { number: 28, name: 'Ferguson', position: 'FWD' }
        ]
      }
    },
    highlights: [
      {
        id: 1,
        title: 'Saka opens the scoring',
        timestamp: '23:00',
        thumbnail: '/highlights/arsenal-brighton-1.jpg',
        videoUrl: 'https://example.com/goal1.mp4'
      },
      {
        id: 2,
        title: 'Martinelli doubles the lead',
        timestamp: '45:00',
        thumbnail: '/highlights/arsenal-brighton-2.jpg',
        videoUrl: 'https://example.com/goal2.mp4'
      },
      {
        id: 3,
        title: 'Havertz seals the win',
        timestamp: '78:00',
        thumbnail: '/highlights/arsenal-brighton-3.jpg',
        videoUrl: 'https://example.com/goal3.mp4'
      }
    ]
  }
};

interface VideoPlayerModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoUrl, title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="aspect-video relative">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={videoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default function MatchPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.id as string;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'lineups' | 'highlights'>('stats');
  
  const match = MATCH_DATA[matchId as keyof typeof MATCH_DATA];

  if (!match) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Match not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Match Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-gray-500">{match.competition}</span>
            <span className="mx-2">•</span>
            <span className="text-sm text-gray-500">{match.date}</span>
            {match.status === 'LIVE' && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-1"></span>
                LIVE
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <Image
                src={match.home.logo}
                alt={match.home.name}
                width={64}
                height={64}
                className="object-contain mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-900">{match.home.name}</h2>
            </div>
            <div className="flex items-center justify-center flex-1">
              <span className="text-4xl font-bold text-gray-900">{match.home.score}</span>
              <span className="mx-4 text-2xl text-gray-400">-</span>
              <span className="text-4xl font-bold text-gray-900">{match.away.score}</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <Image
                src={match.away.logo}
                alt={match.away.name}
                width={64}
                height={64}
                className="object-contain mb-2"
              />
              <h2 className="text-lg font-semibold text-gray-900">{match.away.name}</h2>
            </div>
          </div>
          {/* Scorers */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex-1 text-center">
              {match.home.scorers.map((scorer, index) => (
                <div key={index}>{scorer}</div>
              ))}
            </div>
            <div className="flex-1" />
            <div className="flex-1 text-center">
              {match.away.scorers.map((scorer, index) => (
                <div key={index}>{scorer}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {(['stats', 'lineups', 'highlights'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            {Object.entries(match.stats).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className="w-1/3 text-right">
                  <span className="font-medium text-gray-900">{value.home}</span>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative h-2 bg-gray-200 rounded">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500 rounded"
                      style={{ width: `${value.home}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded">
                    <div
                      className="absolute left-0 top-0 h-full bg-red-500 rounded"
                      style={{ width: `${value.away}%` }}
                    />
                  </div>
                </div>
                <div className="w-1/3">
                  <span className="font-medium text-gray-900">{value.away}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'lineups' && (
          <div className="grid md:grid-cols-2 gap-8">
            {['home', 'away'].map((team) => (
              <div key={team}>
                <h3 className="font-semibold text-gray-900 mb-4">
                  {match[team as 'home' | 'away'].name} Lineup
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Starting XI</h4>
                    <div className="space-y-2">
                      {match.lineups[team as 'home' | 'away'].starting.map((player) => (
                        <div
                          key={player.number}
                          className="flex items-center bg-gray-50 rounded p-2"
                        >
                          <span className="w-8 text-sm text-gray-500">{player.number}</span>
                          <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                          <span className="text-sm text-gray-500">{player.position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Substitutes</h4>
                    <div className="space-y-2">
                      {match.lineups[team as 'home' | 'away'].subs.map((player) => (
                        <div
                          key={player.number}
                          className="flex items-center bg-gray-50 rounded p-2"
                        >
                          <span className="w-8 text-sm text-gray-500">{player.number}</span>
                          <span className="flex-1 font-medium text-gray-900">{player.name}</span>
                          <span className="text-sm text-gray-500">{player.position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {match.highlights.map((highlight) => (
              <button
                key={highlight.id}
                onClick={() => setSelectedVideo(highlight.videoUrl)}
                className="bg-white rounded-lg shadow overflow-hidden group hover:ring-2 hover:ring-blue-500 focus:outline-none"
              >
                <div className="aspect-video relative bg-gray-100">
                  {highlight.thumbnail && (
                    <Image
                      src={highlight.thumbnail}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
                    {highlight.timestamp}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{highlight.title}</h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <VideoPlayerModal
            videoUrl={selectedVideo}
            title="Match Highlight"
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </div>
  );
} 