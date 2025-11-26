'use client';

import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import Window from '../Windows/Window';
import FileExplorer from '../Windows/FileExplorer';
import TextEditor from '../Windows/TextEditor';
import ImageViewer from '../Windows/ImageViewer';
import PDFViewer from '../Windows/PDFViewer';
import Terminal from '../Windows/Terminal';
import GitClient from '../Windows/GitClient';
import EmailClient from '../Windows/EmailClient';
import EncryptedViewer from '../Windows/EncryptedViewer';
import ChallengePanel from '../Windows/ChallengePanel';
import SystemMonitor from '../Windows/SystemMonitor';
import HexViewer from '../Windows/HexViewer';
import WebBrowser from '../Windows/WebBrowser';
import HelpWindow from '../Windows/HelpWindow';
import NotificationSystem from '../Effects/NotificationSystem';
import GlitchOverlay from '../Effects/GlitchOverlay';
import RandomGlitch from '../Effects/RandomGlitch';
import Particles from '../Effects/Particles';
import SurveillanceEffects from '../Effects/SurveillanceEffects';
import AchievementToast, { Achievement, ACHIEVEMENTS } from '../Effects/AchievementToast';
import SpeedrunTimer from '../Effects/SpeedrunTimer';
import TelemetryTicker from '../Effects/TelemetryTicker';
import StickyNotes from './StickyNotes';
import { useWindowManager, WindowState } from '@/hooks/useWindowManager';
import { useGlitchEffect } from '@/hooks/useGlitchEffect';
import { useChallenge } from '@/hooks/useChallenge';

const DESKTOP_ICONS = [
  { id: 'evidence', label: 'EVIDENCE', icon: '📁', type: 'folder', path: '/EVIDENCE' },
  { id: 'personal', label: 'PERSONAL', icon: '📂', type: 'folder', path: '/PERSONAL' },
  { id: 'comms', label: 'COMMS', icon: '📧', type: 'email' },
  { id: 'devtools', label: 'DEVTOOLS', icon: '🔧', type: 'folder', path: '/DEVTOOLS' },
  { id: 'git-sync', label: 'git-sync', icon: '🔄', type: 'git' },
  { id: 'browser', label: 'Browser', icon: '🌐', type: 'browser' },
  { id: 'submit', label: 'SUBMIT\nFINDINGS', icon: '🎯', type: 'challenge' },
  { id: 'sysmon', label: 'System\nMonitor', icon: '📊', type: 'sysmon' },
  { id: 'help', label: 'Help', icon: '❓', type: 'help' },
];

interface DesktopProps {
  solvedCount?: number;
}

// Hook to detect screen size
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  return screenSize;
}

export default function Desktop({ solvedCount = 0 }: DesktopProps) {
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    focusWindow,
    updateWindowPosition,
  } = useWindowManager();
  
  const { isGlitching, glitchType, setGlitchIntensity } = useGlitchEffect(60000, 1 + solvedCount * 0.2);
  const challenge = useChallenge();
  const screenSize = useScreenSize();
  
  // Achievement system
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  
  // Speedrun timer
  const [timerRunning, setTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState(0);

  const unlockAchievement = useCallback((id: string) => {
    if (!unlockedAchievements.has(id) && ACHIEVEMENTS[id]) {
      setUnlockedAchievements(prev => new Set([...prev, id]));
      setCurrentAchievement(ACHIEVEMENTS[id]);
    }
  }, [unlockedAchievements]);

  const dismissAchievement = useCallback(() => {
    setCurrentAchievement(null);
  }, []);

  // Update glitch intensity based on progress
  const handleIconDoubleClick = useCallback((icon: typeof DESKTOP_ICONS[0]) => {
    const baseX = 100 + Math.random() * 200;
    const baseY = 50 + Math.random() * 100;
    
    switch (icon.type) {
      case 'folder':
        openWindow({
          id: `explorer-${icon.path}`,
          title: icon.path || 'File Explorer',
          type: 'explorer',
          x: baseX,
          y: baseY,
          width: 600,
          height: 450,
          data: { path: icon.path },
        });
        break;
      case 'email':
        openWindow({
          id: 'email-client',
          title: 'COMMS - Meridian Mail',
          type: 'email',
          x: baseX,
          y: baseY,
          width: 700,
          height: 500,
        });
        break;
      case 'git':
        openWindow({
          id: 'git-client',
          title: 'git-sync - Repository Browser',
          type: 'git',
          x: baseX,
          y: baseY,
          width: 750,
          height: 550,
        });
        break;
      case 'challenge':
        openWindow({
          id: 'challenge-panel',
          title: 'SUBMIT FINDINGS',
          type: 'challenge',
          x: baseX,
          y: baseY,
          width: 500,
          height: 650,
        });
        break;
      case 'sysmon':
        openWindow({
          id: 'system-monitor',
          title: 'System Monitor',
          type: 'sysmon',
          x: baseX,
          y: baseY,
          width: 450,
          height: 400,
        });
        break;
      case 'browser':
        openWindow({
          id: 'web-browser',
          title: 'Web Browser',
          type: 'browser',
          x: baseX,
          y: baseY,
          width: 900,
          height: 600,
        });
        break;
      case 'help':
        openWindow({
          id: 'help-window',
          title: 'Help & Information',
          type: 'help',
          x: baseX,
          y: baseY,
          width: 650,
          height: 500,
        });
        break;
    }
  }, [openWindow]);

  const handleOpenFile = useCallback((filePath: string, fileType: string) => {
    const baseX = 150 + Math.random() * 200;
    const baseY = 80 + Math.random() * 100;
    const fileName = filePath.split('/').pop() || filePath;
    
    switch (fileType) {
      case 'text':
      case 'config':
        openWindow({
          id: `text-${filePath}`,
          title: fileName,
          type: 'text',
          x: baseX,
          y: baseY,
          width: 600,
          height: 450,
          data: { path: filePath },
        });
        break;
      case 'image':
        openWindow({
          id: `image-${filePath}`,
          title: fileName,
          type: 'image',
          x: baseX,
          y: baseY,
          width: 700,
          height: 500,
          data: { path: filePath },
        });
        break;
      case 'pdf':
        openWindow({
          id: `pdf-${filePath}`,
          title: fileName,
          type: 'pdf',
          x: baseX,
          y: baseY,
          width: 650,
          height: 550,
          data: { path: filePath },
        });
        break;
      case 'encrypted':
        openWindow({
          id: `encrypted-${filePath}`,
          title: fileName,
          type: 'encrypted',
          x: baseX,
          y: baseY,
          width: 500,
          height: 400,
          data: { path: filePath },
        });
        break;
      case 'app':
        // Handle app types
        if (filePath.includes('terminal')) {
          openWindow({
            id: 'terminal',
            title: 'Terminal',
            type: 'terminal',
            x: baseX,
            y: baseY,
            width: 700,
            height: 450,
          });
        } else if (filePath.includes('hexdump')) {
          openWindow({
            id: 'hexviewer',
            title: 'Hex Dump Viewer',
            type: 'hex',
            x: baseX,
            y: baseY,
            width: 750,
            height: 500,
          });
        }
        break;
    }
  }, [openWindow]);

  const renderWindow = (window: WindowState) => {
    const commonProps = {
      id: window.id,
      title: window.title,
      x: window.x,
      y: window.y,
      width: window.width,
      height: window.height,
      zIndex: window.zIndex,
      isMinimized: window.isMinimized,
      isFocused: window.id === activeWindowId,
      onClose: () => closeWindow(window.id),
      onMinimize: () => minimizeWindow(window.id),
      onFocus: () => focusWindow(window.id),
      onDragStop: (x: number, y: number) => updateWindowPosition(window.id, x, y),
    };

    switch (window.type) {
      case 'explorer':
        return (
          <Window key={window.id} {...commonProps}>
            <FileExplorer 
              initialPath={window.data?.path as string || '/EVIDENCE'} 
              onOpenFile={handleOpenFile}
            />
          </Window>
        );
      case 'text':
        return (
          <Window key={window.id} {...commonProps}>
            <TextEditor path={window.data?.path as string} />
          </Window>
        );
      case 'image':
        return (
          <Window key={window.id} {...commonProps}>
            <ImageViewer path={window.data?.path as string} />
          </Window>
        );
      case 'pdf':
        return (
          <Window key={window.id} {...commonProps}>
            <PDFViewer path={window.data?.path as string} />
          </Window>
        );
      case 'encrypted':
        return (
          <Window key={window.id} {...commonProps}>
            <EncryptedViewer path={window.data?.path as string} />
          </Window>
        );
      case 'terminal':
        return (
          <Window key={window.id} {...commonProps}>
            <Terminal />
          </Window>
        );
      case 'git':
        return (
          <Window key={window.id} {...commonProps}>
            <GitClient />
          </Window>
        );
      case 'email':
        return (
          <Window key={window.id} {...commonProps}>
            <EmailClient />
          </Window>
        );
      case 'challenge':
        return (
          <Window key={window.id} {...commonProps}>
            <ChallengePanel 
              challenge={challenge}
              onComplete={() => setGlitchIntensity(3)}
            />
          </Window>
        );
      case 'sysmon':
        return (
          <Window key={window.id} {...commonProps}>
            <SystemMonitor />
          </Window>
        );
      case 'hex':
        return (
          <Window key={window.id} {...commonProps}>
            <HexViewer />
          </Window>
        );
      case 'browser':
        return (
          <Window key={window.id} {...commonProps}>
            <WebBrowser />
          </Window>
        );
      case 'help':
        return (
          <Window key={window.id} {...commonProps}>
            <HelpWindow />
          </Window>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="relative w-screen h-screen overflow-hidden forensic-cursor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#0a0a0f' }}
    >
      {/* Animated wallpaper background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(0, 50, 80, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(50, 0, 80, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 20, 40, 0.2) 0%, transparent 70%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d15 50%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Desktop icons - Responsive layout */}
      <div className={`
        desktop-icons-container absolute
        ${screenSize === 'mobile' 
          ? 'top-2 left-2 right-2 grid grid-cols-3 gap-2' 
          : 'top-4 left-4 flex flex-col gap-2'}
      `}>
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            compact={screenSize === 'mobile'}
          />
        ))}
      </div>

      {/* Windows */}
      {windows
        .filter(w => !w.isMinimized)
        .map(window => renderWindow(window))}

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={(id) => {
          const window = windows.find(w => w.id === id);
          if (window?.isMinimized) {
            focusWindow(id);
          } else {
            focusWindow(id);
          }
        }}
        solvedCount={challenge.state.solvedCount}
      />

      {/* Notification System */}
      <NotificationSystem solvedCount={challenge.state.solvedCount} />

      {/* Glitch Overlay */}
      <GlitchOverlay isGlitching={isGlitching} glitchType={glitchType} />
      
      {/* Random Micro Glitches */}
      <RandomGlitch />
      
      {/* Floating Particles - Hidden on mobile for performance */}
      {screenSize !== 'mobile' && <Particles />}
      
      {/* Surveillance Effects - Hidden on mobile */}
      {screenSize !== 'mobile' && <SurveillanceEffects />}
      
      {/* Achievement Toast */}
      <AchievementToast 
        achievement={currentAchievement} 
        onDismiss={dismissAchievement} 
      />
      
      {/* Telemetry Ticker - Hidden on mobile */}
      {screenSize !== 'mobile' && <TelemetryTicker />}
      
      {/* Sticky Notes - Hidden on mobile/tablet */}
      {screenSize === 'desktop' && <StickyNotes />}

      {/* CRT Vignette */}
      <div className="crt-vignette" />

      {/* CRT Scanlines (subtle) */}
      <div 
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />
    </motion.div>
  );
}

