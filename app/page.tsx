'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from '@/components/Boot/BootSequence';
import Desktop from '@/components/Desktop/Desktop';
import CompletionScreen from '@/components/Effects/CompletionScreen';
import { useChallenge } from '@/hooks/useChallenge';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const challenge = useChallenge();

  // Check for completion - trigger when all 10 levels are solved
  useEffect(() => {
    const allSolved = challenge.state.solvedCount === 10;
    if (allSolved && !showCompletion) {
      // Delay to let the last answer animation play
      const timer = setTimeout(() => setShowCompletion(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [challenge.state.solvedCount, showCompletion]);

  // Always show boot sequence on page load/reload
  // No skipping - this is part of the experience
  useEffect(() => {
    // Reset boot state on mount (ensures boot shows on every reload)
    setIsBooting(true);
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence 
            key="boot" 
            onComplete={handleBootComplete} 
          />
        ) : showCompletion ? (
          <CompletionScreen
            key="completion"
            rank={challenge.getRank()}
            completionTime={challenge.getCompletionTime()}
            hintsUsed={challenge.state.totalHintsUsed}
            onClose={() => setShowCompletion(false)}
          />
        ) : (
          <Desktop 
            key="desktop" 
            solvedCount={challenge.state.solvedCount}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
