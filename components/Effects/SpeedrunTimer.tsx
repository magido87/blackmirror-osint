'use client';

import { useEffect, useState, useCallback } from 'react';

interface SpeedrunTimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

export default function SpeedrunTimer({ isRunning, onTimeUpdate }: SpeedrunTimerProps) {
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isRunning && !startTime) {
      setStartTime(Date.now());
    }
  }, [isRunning, startTime]);

  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTime(elapsed);
      onTimeUpdate?.(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, startTime, onTimeUpdate]);

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  }, []);

  return (
    <div className={`speedrun-timer ${!isRunning && time > 0 ? 'paused' : ''}`}>
      {formatTime(time)}
    </div>
  );
}

export function useSpeedrunTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const updateTime = useCallback((time: number) => setFinalTime(time), []);

  return { isRunning, start, stop, finalTime, updateTime };
}



