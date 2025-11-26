'use client';

import { useState, useCallback } from 'react';

export interface WindowState {
  id: string;
  title: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data?: Record<string, unknown>;
}

interface UseWindowManagerReturn {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (config: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  minimizeAllWindows: () => void;
  getWindow: (id: string) => WindowState | undefined;
}

let nextZIndex = 100;

export function useWindowManager(): UseWindowManagerReturn {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = useCallback((config: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) => {
    // Check if window already exists
    setWindows(prev => {
      const existing = prev.find(w => w.id === config.id);
      if (existing) {
        // If minimized, restore it
        if (existing.isMinimized) {
          return prev.map(w => 
            w.id === config.id 
              ? { ...w, isMinimized: false, zIndex: ++nextZIndex }
              : w
          );
        }
        // Just focus it
        return prev.map(w => 
          w.id === config.id 
            ? { ...w, zIndex: ++nextZIndex }
            : w
        );
      }
      
      // Create new window
      return [...prev, {
        ...config,
        zIndex: ++nextZIndex,
        isMinimized: false,
        isMaximized: false,
      }];
    });
    setActiveWindowId(config.id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    setActiveWindowId(prev => prev === id ? null : prev);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: ++nextZIndex } : w
    ));
    setActiveWindowId(id);
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: ++nextZIndex } : w
    ));
    setActiveWindowId(id);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: ++nextZIndex } : w
    ));
    setActiveWindowId(id);
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ));
  }, []);

  const minimizeAllWindows = useCallback(() => {
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
  }, []);

  const getWindow = useCallback((id: string) => {
    return windows.find(w => w.id === id);
  }, [windows]);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    minimizeAllWindows,
    getWindow,
  };
}

