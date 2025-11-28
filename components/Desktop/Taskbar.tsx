'use client';

import { useState, useEffect } from 'react';
import { WindowState } from '@/hooks/useWindowManager';
import AdminLogin from '@/components/Admin/AdminLogin';
import AdminPanel from '@/components/Admin/AdminPanel';

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
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const isMobile = useIsMobile();

  // Check if already authenticated on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated');
    if (auth === 'true') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
    setShowAdminPanel(true);
  };

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

          {/* Admin Settings (Cog icon) */}
          <button
            onClick={handleAdminClick}
            className={`p-1 rounded transition-colors hover:bg-gray-800 ${
              isAdminAuthenticated ? 'text-cyan-400' : 'text-gray-600 hover:text-gray-400'
            }`}
            title="Admin Panel"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

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

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      {/* Easter egg toast */}
      {showToast && (
        <div className="fixed bottom-12 right-4 bg-red-900/80 border border-red-500/50 text-red-200 px-4 py-2 rounded text-sm font-mono z-[9999] animate-pulse">
          Time cannot be corrected.
        </div>
      )}
    </>
  );
}

