'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { verifyAnswer, LEVEL_INFO } from '@/data/answers';
import { getHint, getHintCount } from '@/data/hints';
import { trackEvent } from '@/lib/supabase';

export type AnswerStatus = 'unchecked' | 'correct' | 'incorrect';

export interface ChallengeState {
  answers: Record<string, AnswerStatus>;
  hintsUsed: Record<string, number>;
  hintsRevealed: Record<string, string[]>;
  solvedCount: number;
  totalHintsUsed: number;
  startTime: number;
  completionTime: number | null;
  isComplete: boolean;
}

interface UseChallengeReturn {
  state: ChallengeState;
  checkAnswer: (level: string, answer: string) => boolean;
  revealHint: (level: string) => string | null;
  getRevealedHints: (level: string) => string[];
  canRevealHint: (level: string) => boolean;
  getRank: () => 'S' | 'A' | 'B' | 'C';
  getCompletionTime: () => string;
  resetChallenge: () => void;
}

const STORAGE_KEY = 'osint-challenge-state';

function calculateRank(hintsUsed: number): 'S' | 'A' | 'B' | 'C' {
  if (hintsUsed === 0) return 'S';
  if (hintsUsed <= 3) return 'A';
  if (hintsUsed <= 7) return 'B';
  return 'C';
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

function getInitialState(): ChallengeState {
  const initialAnswers: Record<string, AnswerStatus> = {};
  const initialHints: Record<string, number> = {};
  const initialRevealed: Record<string, string[]> = {};
  
  LEVEL_INFO.forEach(level => {
    initialAnswers[level.id] = 'unchecked';
    initialHints[level.id] = 0;
    initialRevealed[level.id] = [];
  });
  
  return {
    answers: initialAnswers,
    hintsUsed: initialHints,
    hintsRevealed: initialRevealed,
    solvedCount: 0,
    totalHintsUsed: 0,
    startTime: Date.now(),
    completionTime: null,
    isComplete: false,
  };
}

export function useChallenge(): UseChallengeReturn {
  const [state, setState] = useState<ChallengeState>(getInitialState);
  const hasTrackedSession = useRef(false);

  // Load from localStorage on mount and track session start
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch {
        // Invalid saved state, use fresh
      }
    }
    
    // Track session start (only once per page load)
    if (!hasTrackedSession.current) {
      hasTrackedSession.current = true;
      trackEvent('session_start');
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const checkAnswer = useCallback((level: string, answer: string): boolean => {
    const isCorrect = verifyAnswer(level, answer);
    
    // Track guess event
    trackEvent('guess', {
      level,
      is_correct: isCorrect,
      guess_value: answer.slice(0, 50), // Truncate long answers
    });
    
    setState(prev => {
      const newAnswers = { ...prev.answers, [level]: isCorrect ? 'correct' : 'incorrect' as AnswerStatus };
      const newSolvedCount = Object.values(newAnswers).filter(s => s === 'correct').length;
      const isNowComplete = newSolvedCount === LEVEL_INFO.length;
      const wasAlreadyCorrect = prev.answers[level] === 'correct';
      
      // Track level completion (only first time)
      if (isCorrect && !wasAlreadyCorrect) {
        trackEvent('level_complete', { level });
      }
      
      // Track challenge completion
      if (isNowComplete && !prev.isComplete) {
        const completionTime = Date.now() - prev.startTime;
        trackEvent('challenge_complete', {
          completion_time_ms: completionTime,
          total_hints_used: prev.totalHintsUsed,
          rank: calculateRank(prev.totalHintsUsed),
        });
      }
      
      return {
        ...prev,
        answers: newAnswers,
        solvedCount: newSolvedCount,
        isComplete: isNowComplete,
        completionTime: isNowComplete && !prev.completionTime 
          ? Date.now() - prev.startTime 
          : prev.completionTime,
      };
    });
    
    return isCorrect;
  }, []);

  const revealHint = useCallback((level: string): string | null => {
    const currentRevealed = state.hintsRevealed[level]?.length || 0;
    const maxHints = getHintCount(level);
    
    if (currentRevealed >= maxHints) {
      return null;
    }
    
    const hint = getHint(level, currentRevealed);
    if (!hint) return null;
    
    // Track hint usage
    trackEvent('hint_used', {
      level,
      hint_number: currentRevealed + 1,
    });
    
    setState(prev => ({
      ...prev,
      hintsUsed: {
        ...prev.hintsUsed,
        [level]: (prev.hintsUsed[level] || 0) + 1,
      },
      hintsRevealed: {
        ...prev.hintsRevealed,
        [level]: [...(prev.hintsRevealed[level] || []), hint],
      },
      totalHintsUsed: prev.totalHintsUsed + 1,
    }));
    
    return hint;
  }, [state.hintsRevealed]);

  const getRevealedHints = useCallback((level: string): string[] => {
    return state.hintsRevealed[level] || [];
  }, [state.hintsRevealed]);

  const canRevealHint = useCallback((level: string): boolean => {
    const revealed = state.hintsRevealed[level]?.length || 0;
    const max = getHintCount(level);
    return revealed < max && state.answers[level] !== 'correct';
  }, [state.hintsRevealed, state.answers]);

  const getRank = useCallback((): 'S' | 'A' | 'B' | 'C' => {
    return calculateRank(state.totalHintsUsed);
  }, [state.totalHintsUsed]);

  const getCompletionTime = useCallback((): string => {
    if (state.completionTime) {
      return formatTime(state.completionTime);
    }
    return formatTime(Date.now() - state.startTime);
  }, [state.completionTime, state.startTime]);

  const resetChallenge = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(getInitialState());
  }, []);

  return {
    state,
    checkAnswer,
    revealHint,
    getRevealedHints,
    canRevealHint,
    getRank,
    getCompletionTime,
    resetChallenge,
  };
}


