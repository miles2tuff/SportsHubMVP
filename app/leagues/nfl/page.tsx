'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MOCK_NFL_DATA = {
  standings: {
    afc: [
      { position: 1, team: 'Kansas City Chiefs', wins: 12, losses: 5, division: 'AFC West' },
      { position: 2, team: 'Baltimore Ravens', wins: 11, losses: 6, division: 'AFC North' },
      { position: 3, team: 'Buffalo Bills', wins: 10, losses: 7, division: 'AFC East' },
      { position: 4, team: 'Cincinnati Bengals', wins: 9, losses: 8, division: 'AFC North' }
    ],
    nfc: [
      { position: 1, team: 'San Francisco 49ers', wins: 11, losses: 6, division: 'NFC West' },
      { position: 2, team: 'Philadelphia Eagles', wins: 10, losses: 7, division: 'NFC East' },
      { position: 3, team: 'Detroit Lions', wins: 9, losses: 8, division: 'NFC North' },
      { position: 4, team: 'Tampa Bay Buccaneers', wins: 9, losses: 8, division: 'NFC South' }
    ]
  },
  upcomingGames: [
    {
      id: '1',
      week: 'Week 1',
      games: [
        {
          id: 'g1',
          home: 'Kansas City Chiefs',
          away: 'Buffalo Bills',
          date: 'Sunday, 4:25 PM ET',
          broadcast: 'CBS'
        },
        {
          id: 'g2',
          home: 'San Francisco 49ers',
          away: 'Los Angeles Rams',
          date: 'Sunday, 8:20 PM ET',
          broadcast: 'NBC'
        }
      ]
    },
    {
      id: '2',
      week: 'Week 2',
      games: [
        {
          id: 'g3',
          home: 'Philadelphia Eagles',
          away: 'Minnesota Vikings',
          date: 'Monday, 8:15 PM ET',
          broadcast: 'ESPN'
        }
      ]
    }
  ],
  recentResults: [
    {
      id: 'r1',
      home: { team: 'Kansas City Chiefs', score: 24 },
      away: { team: 'San Francisco 49ers', score: 21 },
      date: 'Final'
    },
    {
      id: 'r2',
      home: { team: 'Baltimore Ravens', score: 31 },
      away: { team: 'Cincinnati Bengals', score: 17 },
      date: 'Final'
    }
  ],
  highlights: [
    {
      id: 'h1',
      title: 'Chiefs vs 49ers Game Highlights',
      duration: '10:23',
      views: '1.2M',
      date: '3 hours ago',
      thumbnail: '/thumbnails/chiefs-49ers.jpg'
    },
    {
      id: 'h2',
      title: 'Top 10 Plays of the Week',
      duration: '5:45',
      views: '856K',
      date: '1 day ago',
      thumbnail: '/thumbnails/top-10.jpg'
    }
  ]
};

export default function NFLPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'schedule' | 'standings' | 'highlights'>('schedule');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        {/* Back Button and Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.5 2.5c4.95 0 9 4.05 9 9s-4.05 9-9 9-9-4.05-9-9 4.05-9 9-9zM16 7l-4 4-4-4H5v2l4 4-4 4v2h3l4-4 4 4h3v-2l-4-4 4-4V7h-3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">NFL</h1>
          </div>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {(['schedule', 'standings', 'highlights'] as const).map((tab) => (
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
        {activeTab === 'schedule' && (
          <div className="space-y-8">
            {/* Recent Results */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Results</h2>
              <div className="space-y-4">
                {MOCK_NFL_DATA.recentResults.map((game) => (
                  <div key={game.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{game.away.team}</span>
                          <span className="font-bold text-xl text-gray-900 ml-4">{game.away.score}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{game.home.team}</span>
                          <span className="font-bold text-xl text-gray-900 ml-4">{game.home.score}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{game.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Games */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Upcoming Games</h2>
              <div className="space-y-6">
                {MOCK_NFL_DATA.upcomingGames.map((week) => (
                  <div key={week.id}>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{week.week}</h3>
                    <div className="space-y-4">
                      {week.games.map((game) => (
                        <div key={game.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-900">{game.away} @ {game.home}</div>
                              <div className="text-sm text-gray-500 mt-1">{game.date}</div>
                            </div>
                            <div className="text-sm font-medium text-gray-600">{game.broadcast}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="space-y-8">
            {/* AFC Standings */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">AFC Standings</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="min-w-full">
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-1 text-sm font-medium text-gray-500">#</div>
                      <div className="col-span-5 text-sm font-medium text-gray-500">Team</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">W</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">L</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">PCT</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {MOCK_NFL_DATA.standings.afc.map((team, idx) => (
                      <div key={team.team} className={`px-4 py-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-1 text-sm text-gray-900">{team.position}</div>
                          <div className="col-span-5 text-sm font-medium text-gray-900">{team.team}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">{team.wins}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">{team.losses}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">
                            {(team.wins / (team.wins + team.losses)).toFixed(3)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* NFC Standings */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">NFC Standings</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="min-w-full">
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-1 text-sm font-medium text-gray-500">#</div>
                      <div className="col-span-5 text-sm font-medium text-gray-500">Team</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">W</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">L</div>
                      <div className="col-span-2 text-sm font-medium text-gray-500 text-center">PCT</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {MOCK_NFL_DATA.standings.nfc.map((team, idx) => (
                      <div key={team.team} className={`px-4 py-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-1 text-sm text-gray-900">{team.position}</div>
                          <div className="col-span-5 text-sm font-medium text-gray-900">{team.team}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">{team.wins}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">{team.losses}</div>
                          <div className="col-span-2 text-sm text-gray-900 text-center">
                            {(team.wins / (team.wins + team.losses)).toFixed(3)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'highlights' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_NFL_DATA.highlights.map((highlight) => (
              <button
                key={highlight.id}
                onClick={() => {
                  setSelectedVideo(highlight);
                  setShowVideoModal(true);
                }}
                className="bg-white rounded-lg shadow overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative bg-gray-100">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
                    {highlight.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{highlight.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-500">{highlight.date}</p>
                    <p className="text-sm text-gray-500">{highlight.views} views</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">{selectedVideo.title}</h3>
              <button onClick={() => setShowVideoModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video relative bg-black">
              {/* Video player would go here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg">Video Player Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 