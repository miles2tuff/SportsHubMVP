import React, { useState } from 'react';
import Link from 'next/link';

interface Standing {
  position: number;
  team: string;
  points?: number;
  wins?: number;
  losses?: number;
}

interface Highlight {
  id: string;
  title: string;
  date: string;
  sport: string;
}

interface TeamCardProps {
  name: string;
  sport: string;
  league: string;
  standings: Standing[];
  highlights: Highlight[];
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

export default function TeamCard({ name, sport, league, standings, highlights }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get team's current standing
  const teamStanding = standings.find(s => s.team === name);
  const nextMatch = { opponent: "Chelsea", date: "Tomorrow, 20:00" }; // Mock data
  const lastResult = { opponent: "Arsenal", result: "W 2-1" }; // Mock data
  const recentHighlights = highlights.slice(0, 2); // Get two most recent highlights

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div 
        className="p-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
          <SportIcon sport={sport} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-500">{league}</p>
          {teamStanding && (
            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              {teamStanding.points !== undefined 
                ? `${teamStanding.position}${getOrdinalSuffix(teamStanding.position)} • ${teamStanding.points} pts`
                : `${teamStanding.position}${getOrdinalSuffix(teamStanding.position)} • ${teamStanding.wins}-${teamStanding.losses}`
              }
            </div>
          )}
        </div>
        <button className="flex-shrink-0">
          <svg
            className={`w-4 h-4 text-gray-400 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-medium text-gray-500">Next Match</p>
            <p className="text-xs font-medium text-gray-900">vs {nextMatch.opponent}</p>
            <p className="text-xs text-gray-500">{nextMatch.date}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Last Result</p>
            <p className="text-xs font-medium text-gray-900">vs {lastResult.opponent}</p>
            <p className="text-xs text-gray-500">{lastResult.result}</p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Standings */}
          <div className="p-3">
            <h4 className="font-medium text-sm text-gray-900 mb-2">Standings</h4>
            <div className="space-y-1">
              {standings.slice(0, 5).map((standing) => (
                <div
                  key={standing.team}
                  className={`flex items-center justify-between p-1.5 rounded text-sm ${
                    standing.team === name 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{standing.position}. {standing.team}</span>
                  <span>
                    {standing.points !== undefined 
                      ? `${standing.points} pts`
                      : `${standing.wins}-${standing.losses}`
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Videos */}
          {recentHighlights.length > 0 && (
            <div className="p-3 border-t border-gray-100">
              <div className="space-y-3">
                {recentHighlights.map((highlight) => (
                  <Link
                    key={highlight.id}
                    href={`/highlights/${highlight.id}`}
                    className="block rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-500 focus:outline-none"
                  >
                    <div className="aspect-video relative bg-gray-100">
                      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium drop-shadow-lg line-clamp-2">{highlight.title}</p>
                        <p className="text-white text-xs mt-1 opacity-90">{highlight.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getOrdinalSuffix(i: number) {
  const j = i % 10,
        k = i % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
} 