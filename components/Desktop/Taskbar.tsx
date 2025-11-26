'use client';

import { useState, useEffect } from 'react';
import { WindowState } from '@/hooks/useWindowManager';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  solvedCount?: number;
}

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export default function Taskbar({ windows, activeWindowId, onWindowClick, solvedCount = 0 }: TaskbarProps) {
  const [clockClicks, setClockClicks] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [clockGlitch, setClockGlitch] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(() => Date.now());
  const isMobile = useIsMobile();

  // Clock is stuck at 03:14 (the time of the data breach)
  const time = '03:14';
  
  // Speedrun timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Random clock glitch
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setClockGlitch(true);
        setTimeout(() => setClockGlitch(false), 200);
      }
    }, 15000);
    return () => clearInterval(glitchInterval);
  }, []);

  const formatElapsed = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClockClick = () => {
    const newClicks = clockClicks + 1;
    setClockClicks(newClicks);
    
    if (newClicks >= 3) {
      setShowToast(true);
      setClockClicks(0);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Easter egg toast
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  return (
    <>
      <div className="taskbar">
        {/* App buttons - hidden on mobile */}
        {!isMobile && (
          <div className="taskbar-apps">
            {windows.map(window => (
              <button
                key={window.id}
                className={`taskbar-app ${window.id === activeWindowId ? 'active' : ''} ${window.isMinimized ? 'opacity-60' : ''}`}
                onClick={() => onWindowClick(window.id)}
                title={window.title}
              >
                {window.title.length > 20 ? window.title.slice(0, 20) + '...' : window.title}
              </button>
            ))}
          </div>
        )}

        {/* System tray */}
        <div className={`taskbar-system ${isMobile ? 'w-full justify-between' : ''}`}>
          {/* Speedrun Timer */}
          <div 
            className="speedrun-timer"
            title="Session time"
          >
            {formatElapsed(elapsedTime)}
          </div>

          {/* Network indicator - compact on mobile */}
          <div 
            className="flex items-center gap-1 cursor-default"
            title="MERIDIAN-SECURE-NET (LIMITED)"
          >
            <span className="text-amber-400 animate-pulse">⚡</span>
            {!isMobile && <span className="text-xs text-amber-400">LIMITED</span>}
          </div>

          {/* Progress indicator */}
          <div 
            className="flex items-center gap-1"
            title={`Progress: ${solvedCount}/10 levels solved`}
          >
            <span className="text-green-400">✓</span>
            <span className="text-xs text-green-400">{solvedCount}/10</span>
          </div>

          {/* Clock (stuck) */}
          <div 
            className={`taskbar-clock cursor-pointer ${clockGlitch ? 'glitch' : ''}`}
            onClick={handleClockClick}
            title="TIME DIVERGENCE DETECTED"
          >
            {time}
          </div>
        </div>
      </div>

      {/* Easter egg toast */}
      {showToast && (
        <div className="fixed bottom-12 right-4 bg-red-900/80 border border-red-500/50 text-red-200 px-4 py-2 rounded text-sm font-mono z-[9999] animate-pulse">
          Time cannot be corrected.
        </div>
      )}
    </>
  );
}

