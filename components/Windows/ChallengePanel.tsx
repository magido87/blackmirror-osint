'use client';

import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEVEL_INFO } from '@/data/answers';

interface ChallengePanelProps {
  challenge: {
    state: {
      answers: Record<string, 'unchecked' | 'correct' | 'incorrect'>;
      solvedCount: number;
      totalHintsUsed: number;
    };
    checkAnswer: (level: string, answer: string) => boolean;
    revealHint: (level: string) => string | null;
    getRevealedHints: (level: string) => string[];
    canRevealHint: (level: string) => boolean;
    getRank: () => 'S' | 'A' | 'B' | 'C';
  };
  onComplete?: () => void;
}

// Input validation and sanitization
const MAX_INPUT_LENGTH = 100;
const VALID_INPUT_REGEX = /^[a-zA-Z0-9_\-{}.,\s]*$/;

function sanitizeInput(input: string): string {
  // Limit length
  let sanitized = input.slice(0, MAX_INPUT_LENGTH);
  // Remove any HTML/script tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  // Only allow alphanumeric, underscore, hyphen, braces, periods, commas, spaces
  if (!VALID_INPUT_REGEX.test(sanitized)) {
    sanitized = sanitized.replace(/[^a-zA-Z0-9_\-{}.,\s]/g, '');
  }
  return sanitized;
}

function ChallengePanel({ challenge, onComplete }: ChallengePanelProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [shaking, setShaking] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const handleInputChange = useCallback((levelId: string, value: string) => {
    const sanitized = sanitizeInput(value);
    setInputs(prev => ({ ...prev, [levelId]: sanitized }));
  }, []);

  const handleVerify = useCallback((levelId: string) => {
    // Prevent rapid fire
    if (verifyingId === levelId) return;
    
    const answer = inputs[levelId] || '';
    
    // Basic validation
    if (!answer.trim()) return;
    
    setVerifyingId(levelId);
    
    // Small delay to prevent timing attacks and rapid clicking
    setTimeout(() => {
      const isCorrect = challenge.checkAnswer(levelId, answer);
      
      if (!isCorrect) {
        setShaking(levelId);
        setTimeout(() => setShaking(null), 500);
      } else if (challenge.state.solvedCount === LEVEL_INFO.length - 1) {
        // All solved!
        onComplete?.();
      }
      
      setVerifyingId(null);
    }, 100);
  }, [inputs, challenge, onComplete, verifyingId]);

  const handleRevealHint = useCallback((levelId: string) => {
    challenge.revealHint(levelId);
  }, [challenge]);

  const getStatusIcon = (status: 'unchecked' | 'correct' | 'incorrect') => {
    switch (status) {
      case 'correct': return <span className="text-green-400">✓</span>;
      case 'incorrect': return <span className="text-red-400">✗</span>;
      default: return <span className="text-gray-500">○</span>;
    }
  };

  const getStatusText = (status: 'unchecked' | 'correct' | 'incorrect') => {
    switch (status) {
      case 'correct': return 'CORRECT';
      case 'incorrect': return 'INCORRECT';
      default: return 'UNCHECKED';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#151520]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-300">Submit Your Findings</div>
            <div className="text-xs text-gray-500 mt-1">
              {challenge.state.solvedCount}/{LEVEL_INFO.length} levels solved
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Hints used</div>
            <div className="text-lg font-mono text-amber-400">
              {challenge.state.totalHintsUsed}/14
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${(challenge.state.solvedCount / LEVEL_INFO.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Challenge levels */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {LEVEL_INFO.map((level) => {
          const status = challenge.state.answers[level.id];
          const hints = challenge.getRevealedHints(level.id);
          const canHint = challenge.canRevealHint(level.id);
          const isVerifying = verifyingId === level.id;
          
          return (
            <motion.div
              key={level.id}
              className={`challenge-level ${status} ${shaking === level.id ? 'incorrect' : ''}`}
              animate={shaking === level.id ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {/* Level header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400">
                    LEVEL {level.number}
                  </span>
                  <span className="text-sm text-gray-300">{level.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(status)}
                  <span className={`text-xs ${
                    status === 'correct' ? 'text-green-400' :
                    status === 'incorrect' ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>

              {/* Input and verify */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={inputs[level.id] || ''}
                  onChange={(e) => handleInputChange(level.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify(level.id)}
                  disabled={status === 'correct' || isVerifying}
                  placeholder="Enter your answer..."
                  maxLength={MAX_INPUT_LENGTH}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className={`challenge-input flex-1 ${status === 'correct' ? 'opacity-50' : ''}`}
                />
                <button
                  onClick={() => handleVerify(level.id)}
                  disabled={status === 'correct' || isVerifying || !inputs[level.id]?.trim()}
                  className={`challenge-button ${
                    status === 'correct' || isVerifying ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isVerifying ? '...' : 'VERIFY'}
                </button>
              </div>

              {/* Hint buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRevealHint(level.id)}
                  disabled={!canHint || hints.length >= 1}
                  className="hint-button"
                >
                  HINT 1 {hints.length >= 1 ? '✓' : ''}
                </button>
                <button
                  onClick={() => handleRevealHint(level.id)}
                  disabled={!canHint || hints.length < 1 || hints.length >= 2}
                  className="hint-button"
                >
                  HINT 2 {hints.length >= 2 ? '✓' : ''}
                </button>
              </div>

              {/* Revealed hints - safely rendered */}
              <AnimatePresence>
                {hints.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 space-y-2 overflow-hidden"
                  >
                    {hints.map((hint, i) => (
                      <div 
                        key={i}
                        className="text-xs text-amber-400/80 bg-amber-500/10 p-2 rounded"
                      >
                        {/* Use textContent-safe rendering */}
                        <span>💡 </span>
                        <span>{hint}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer with rank */}
      <div className="px-4 py-3 border-t border-white/5 bg-[#151520] flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Current Rank: <span className={`font-bold ${
            challenge.getRank() === 'S' ? 'text-yellow-400' :
            challenge.getRank() === 'A' ? 'text-green-400' :
            challenge.getRank() === 'B' ? 'text-cyan-400' : 'text-gray-400'
          }`}>{challenge.getRank()}</span>
        </div>
        <div className="text-xs text-gray-500">
          S: 0 hints | A: 1-3 | B: 4-7 | C: 8+
        </div>
      </div>
    </div>
  );
}

export default memo(ChallengePanel);
