'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CompletionScreenProps {
  rank: 'S' | 'A' | 'B' | 'C';
  completionTime: string;
  hintsUsed: number;
  onClose?: () => void;
}

export default function CompletionScreen({ 
  rank, 
  completionTime, 
  hintsUsed,
  onClose 
}: CompletionScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Dramatic reveal
    setTimeout(() => setShowContent(true), 1500);
    
    // Console easter egg
    console.log('%c EVIDENCE SECURED ', 'background: #00ff88; color: black; font-size: 20px; padding: 10px;');
    console.log('Congratulations, investigator. The truth is out.');
  }, []);

  const rankColors = {
    S: 'text-yellow-400 shadow-yellow-400/50',
    A: 'text-green-400 shadow-green-400/50',
    B: 'text-cyan-400 shadow-cyan-400/50',
    C: 'text-gray-400 shadow-gray-400/50',
  };

  const rankDescriptions = {
    S: 'PERFECT - No hints used',
    A: 'EXCELLENT - Minimal assistance',
    B: 'GOOD - Some hints used',
    C: 'COMPLETE - Heavy hint usage',
  };

  const shareToTwitter = useCallback(() => {
    const text = `I cracked PROJECT BLACKMIRROR with ${rank} Rank!\n\n⏱️ ${completionTime}\n💡 ${hintsUsed} hints\n🎯 10/10 levels\n\nCan you do better?\n\nhttps://blackmirror-osint.netlify.app\n\n#OSINT #CTF`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [rank, completionTime, hintsUsed]);

  const shareToReddit = useCallback(() => {
    const title = `I completed PROJECT BLACKMIRROR with ${rank} Rank! (OSINT Challenge)`;
    const url = `https://reddit.com/r/OSINT/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent('https://blackmirror-osint.netlify.app')}`;
    window.open(url, '_blank');
  }, [rank]);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText('https://blackmirror-osint.netlify.app');
  }, []);

  return (
    <motion.div
      className="completion-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Static noise transition */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {showContent && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {/* Title */}
          <motion.div
            className="completion-title glow-green"
            initial={{ letterSpacing: '0px' }}
            animate={{ letterSpacing: '16px' }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            EVIDENCE SECURED
          </motion.div>

          <motion.div
            className="completion-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Case: MERIDIAN-BLACKMIRROR-2024
          </motion.div>

          {/* Stats card */}
          <motion.div
            className="completion-stats mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className={`completion-rank ${rankColors[rank]} phosphor-glow`} style={{ textShadow: `0 0 30px currentColor` }}>
              {rank}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {rankDescriptions[rank]}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between px-8">
                <span className="text-gray-500">Completion Time:</span>
                <span className="text-cyan-400 font-mono glow-cyan">{completionTime}</span>
              </div>
              <div className="flex justify-between px-8">
                <span className="text-gray-500">Hints Used:</span>
                <span className="text-amber-400 font-mono">{hintsUsed}/20</span>
              </div>
              <div className="flex justify-between px-8">
                <span className="text-gray-500">Levels Completed:</span>
                <span className="text-green-400 font-mono">10/10</span>
              </div>
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <button
              onClick={shareToTwitter}
              className="px-5 py-2 bg-[#1DA1F2]/20 border border-[#1DA1F2]/50 rounded text-[#1DA1F2] hover:bg-[#1DA1F2]/30 transition-colors text-sm font-mono"
            >
              Share on X
            </button>
            <button
              onClick={shareToReddit}
              className="px-5 py-2 bg-[#FF4500]/20 border border-[#FF4500]/50 rounded text-[#FF4500] hover:bg-[#FF4500]/30 transition-colors text-sm font-mono"
            >
              Share on Reddit
            </button>
            <button
              onClick={copyLink}
              className="px-5 py-2 bg-white/10 border border-white/30 rounded text-white hover:bg-white/20 transition-colors text-sm font-mono"
            >
              Copy Link
            </button>
          </motion.div>

          {/* Message */}
          <motion.div
            className="mt-8 text-gray-400 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="mb-4">
              Whistleblower identified. Project exposed.<br />
              The truth is out.
            </p>
            <p className="text-xs text-gray-600 italic">
              &quot;The truth is rarely pure and never simple.&quot;
            </p>
          </motion.div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            Return to Desktop
          </motion.button>
        </motion.div>
      )}

      {/* CRT Vignette */}
      <div className="crt-vignette" />
    </motion.div>
  );
}
