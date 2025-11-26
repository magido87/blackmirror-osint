'use client';

import { useEffect, useState, useCallback } from 'react';

interface GlitchState {
  type: 'none' | 'micro' | 'rgb-split' | 'corrupt' | 'flicker';
  target: 'screen' | 'element';
}

export default function RandomGlitch() {
  const [glitch, setGlitch] = useState<GlitchState>({ type: 'none', target: 'screen' });

  const triggerGlitch = useCallback(() => {
    const glitchTypes: GlitchState['type'][] = ['micro', 'rgb-split', 'flicker'];
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    
    setGlitch({ type: randomType, target: 'screen' });
    
    // Reset after animation
    setTimeout(() => {
      setGlitch({ type: 'none', target: 'screen' });
    }, 200);
  }, []);

  useEffect(() => {
    // Random glitch every 30-90 seconds
    const scheduleGlitch = () => {
      const delay = 30000 + Math.random() * 60000;
      return setTimeout(() => {
        triggerGlitch();
        scheduleGlitch();
      }, delay);
    };

    const timeout = scheduleGlitch();
    return () => clearTimeout(timeout);
  }, [triggerGlitch]);

  if (glitch.type === 'none') return null;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-[9996] ${glitch.type}`}
      style={{
        mixBlendMode: glitch.type === 'rgb-split' ? 'screen' : 'normal'
      }}
    />
  );
}

