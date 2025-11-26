'use client';

import { useState, useEffect, useCallback } from 'react';

export type GlitchType = 'horizontal-tear' | 'color-shift' | 'static-burst' | 'flicker' | 'glitch';

interface UseGlitchEffectReturn {
  isGlitching: boolean;
  glitchType: GlitchType | null;
  triggerGlitch: (type?: GlitchType) => void;
  glitchIntensity: number;
  setGlitchIntensity: (intensity: number) => void;
}

const GLITCH_TYPES: GlitchType[] = ['horizontal-tear', 'color-shift', 'static-burst', 'flicker', 'glitch'];

export function useGlitchEffect(
  baseInterval: number = 60000, // 60 seconds base
  intensityMultiplier: number = 1
): UseGlitchEffectReturn {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState<GlitchType | null>(null);
  const [glitchIntensity, setGlitchIntensity] = useState(intensityMultiplier);

  const triggerGlitch = useCallback((type?: GlitchType) => {
    const selectedType = type || GLITCH_TYPES[Math.floor(Math.random() * GLITCH_TYPES.length)];
    setGlitchType(selectedType);
    setIsGlitching(true);
    
    // Duration varies by type
    const duration = selectedType === 'flicker' ? 300 : 
                    selectedType === 'static-burst' ? 200 :
                    150;
    
    setTimeout(() => {
      setIsGlitching(false);
      setGlitchType(null);
    }, duration);
  }, []);

  useEffect(() => {
    // Calculate interval based on intensity (higher = more frequent)
    const interval = baseInterval / glitchIntensity;
    
    // Add randomness (±30%)
    const randomizedInterval = interval * (0.7 + Math.random() * 0.6);
    
    const timer = setInterval(() => {
      // Random chance to trigger (50%)
      if (Math.random() > 0.5) {
        triggerGlitch();
      }
    }, randomizedInterval);

    return () => clearInterval(timer);
  }, [baseInterval, glitchIntensity, triggerGlitch]);

  return {
    isGlitching,
    glitchType,
    triggerGlitch,
    glitchIntensity,
    setGlitchIntensity,
  };
}

