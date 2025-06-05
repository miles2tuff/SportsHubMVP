import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <Link href="/" className={`flex flex-col items-center ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/sports" className={`flex flex-col items-center ${pathname === '/sports' ? 'text-blue-600' : 'text-gray-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M5 3v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4s-4-1.8-4-4V7c0-2.2 1.8-4 4-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 15h8" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 19h8" />
            </svg>
            <span className="text-xs mt-1">Sports Hub</span>
          </Link>
          
          <Link href="/explore" className={`flex flex-col items-center ${pathname === '/explore' ? 'text-blue-600' : 'text-gray-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs mt-1">Explore</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav; 