'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Mock data - in a real app, this would come from an API based on the team slug
const TEAM_DATA = {
  arsenal: {
    name: 'Arsenal',
    sport: 'soccer',
    isFavorite: true,
    leagues: [
      {
        name: 'Premier League',
        standings: [
          { position: 1, team: 'Arsenal', points: 72, played: 30 },
          { position: 2, team: 'Liverpool', points: 71, played: 30 },
          { position: 3, team: 'Manchester City', points: 70, played: 29 },
          { position: 4, team: 'Tottenham', points: 64, played: 30 },
          { position: 5, team: 'Aston Villa', points: 60, played: 30 }
        ]
      }
    ],
    recentScores: [
      { 
        id: 1,
        competition: 'Premier League', 
        home: { name: 'Arsenal', score: 3, sport: 'soccer' }, 
        away: { name: 'Brighton', score: 0, sport: 'soccer' },
        date: '2024-03-14',
        isLive: false,
        stats: {
          possession: { home: 65, away: 35 },
          shots: { home: 18, away: 8 },
          shotsOnTarget: { home: 8, away: 3 },
          corners: { home: 7, away: 2 }
        },
        lineups: {
          home: ['Raya', 'White', 'Saliba', 'Gabriel', 'Zinchenko', 'Rice', 'Odegaard', 'Havertz', 'Saka', 'Martinelli', 'Jesus'],
          away: ['Verbruggen', 'Veltman', 'Dunk', 'van Hecke', 'Estupinan', 'Gross', 'Gilmour', 'Buonanotte', 'Enciso', 'Mitoma', 'Welbeck']
        }
      }
    ],
    highlights: [
      { 
        id: 1, 
        title: 'Arsenal vs Brighton | All Goals and Highlights', 
        sport: 'soccer',
        date: '2 days ago',
        duration: '4:32',
        views: '1.2M',
        videoUrl: 'https://example.com/video1.mp4'
      }
    ]
  }
  // Add more teams as needed
};

interface VideoPlayerModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

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

  return null;
};

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

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, you'd fetch this data based on the slug
  const teamData = TEAM_DATA[slug as keyof typeof TEAM_DATA] || null;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you'd make an API call to update the user's preferences
  };

  if (!teamData) {
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
            <h1 className="text-2xl font-bold text-gray-900">Team not found</h1>
          </div>
        </div>
      </div>
    );
  }

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
              <SportIcon sport={teamData.sport} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{teamData.name}</h1>
          </div>
          <button
            onClick={toggleFavorite}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
          >
            <span className="text-gray-900">{isFavorite ? '❤️' : '🤍'}</span>
            <span className="text-sm font-medium text-gray-700">
              {isFavorite ? 'Following' : 'Follow'}
            </span>
          </button>
        </div>

        {/* League Standings */}
        {teamData.leagues.map((league) => (
          <section key={league.name} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">{league.name} Standings</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="min-w-full">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-1 text-sm font-medium text-gray-500">#</div>
                    <div className="col-span-7 text-sm font-medium text-gray-500">Team</div>
                    <div className="col-span-2 text-sm font-medium text-gray-500 text-center">MP</div>
                    <div className="col-span-2 text-sm font-medium text-gray-500 text-center">Pts</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {league.standings.map((standing) => (
                    <div 
                      key={standing.team} 
                      className={`px-4 py-3 ${standing.team === teamData.name ? 'bg-blue-50' : ''}`}
                    >
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-1 text-sm text-gray-900">{standing.position}</div>
                        <div className="col-span-7 text-sm font-medium text-gray-900">{standing.team}</div>
                        <div className="col-span-2 text-sm text-gray-500 text-center">{standing.played}</div>
                        <div className="col-span-2 text-sm font-semibold text-gray-900 text-center">{standing.points}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Recent Highlights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamData.highlights.map((highlight) => (
              <button
                key={highlight.id}
                onClick={() => setSelectedVideo(highlight.videoUrl)}
                className="bg-white rounded-lg shadow overflow-hidden group hover:ring-2 hover:ring-blue-500 focus:outline-none"
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
        </section>

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