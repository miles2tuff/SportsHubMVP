import React, { useState } from 'react';

interface VideoCardProps {
  videoUrl: string;
  title: string;
  likes: number;
  comments: number;
  hasNearbyEvent?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  title,
  likes: initialLikes,
  comments,
  hasNearbyEvent
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative h-screen w-full bg-black">
      <video
        className="h-full w-full object-cover"
        src={videoUrl}
        loop
        muted
        playsInline
      />
      
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className="flex flex-col items-center"
          >
            <svg
              className={`w-8 h-8 ${isLiked ? 'text-red-500' : 'text-white'}`}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-white text-sm">{likesCount}</span>
          </button>

          <button className="flex flex-col items-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-white text-sm">{comments}</span>
          </button>

          {hasNearbyEvent && (
            <button className="flex flex-col items-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-white text-sm">Events</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 