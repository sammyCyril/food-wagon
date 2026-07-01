'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function OfflineMessage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-3 bg-gray-50 hover:bg-zinc-100 border border-zinc-200 text-black px-6 py-3 rounded-2xl text-sm font-medium transition-all active:scale-95 shadow-xl"
      >
        <RefreshCw className="w-5 h-5" />
        Retry Connection
      </button>
    </div>
  );
}