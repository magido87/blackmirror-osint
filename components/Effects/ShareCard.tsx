'use client';

import { useRef, useCallback } from 'react';

interface ShareCardProps {
  rank: string;
  time: string;
  hintsUsed: number;
  levelsCompleted: number;
}

export default function ShareCard({ rank, time, hintsUsed, levelsCompleted }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rankColors: Record<string, string> = {
    'S': 'text-yellow-400',
    'A': 'text-green-400',
    'B': 'text-cyan-400',
    'C': 'text-gray-400',
  };

  const shareToTwitter = useCallback(() => {
    const text = `I cracked PROJECT BLACKMIRROR with ${rank} Rank!\n\n⏱️ Time: ${time}\n💡 Hints: ${hintsUsed}\n🎯 Levels: ${levelsCompleted}/10\n\nCan you do better?\n\nhttps://blackmirror-osint.netlify.app`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [rank, time, hintsUsed, levelsCompleted]);

  const shareToReddit = useCallback(() => {
    const title = `I completed PROJECT BLACKMIRROR with ${rank} Rank!`;
    const url = `https://reddit.com/r/OSINT/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent('https://blackmirror-osint.netlify.app')}`;
    window.open(url, '_blank');
  }, [rank]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText('https://blackmirror-osint.netlify.app');
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Visual Card */}
      <div ref={cardRef} className="share-card">
        <div className="share-card-logo">PROJECT BLACKMIRROR</div>
        <div className="text-sm text-gray-500 mb-4">OSINT CHALLENGE COMPLETED</div>
        <div className={`share-card-rank ${rankColors[rank]} glow-${rank === 'S' ? 'amber' : rank === 'A' ? 'green' : 'cyan'}`}>
          {rank}
        </div>
        <div className="text-lg text-white mb-4">RANK</div>
        <div className="share-card-stats">
          <div>
            <span className="share-card-stat-value">{time}</span>
            <span>TIME</span>
          </div>
          <div>
            <span className="share-card-stat-value">{hintsUsed}</span>
            <span>HINTS</span>
          </div>
          <div>
            <span className="share-card-stat-value">{levelsCompleted}/10</span>
            <span>LEVELS</span>
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-4">
        <button
          onClick={shareToTwitter}
          className="px-6 py-2 bg-[#1DA1F2]/20 border border-[#1DA1F2]/50 rounded text-[#1DA1F2] hover:bg-[#1DA1F2]/30 transition-colors text-sm font-mono"
        >
          Share on X
        </button>
        <button
          onClick={shareToReddit}
          className="px-6 py-2 bg-[#FF4500]/20 border border-[#FF4500]/50 rounded text-[#FF4500] hover:bg-[#FF4500]/30 transition-colors text-sm font-mono"
        >
          Share on Reddit
        </button>
        <button
          onClick={copyLink}
          className="px-6 py-2 bg-white/10 border border-white/30 rounded text-white hover:bg-white/20 transition-colors text-sm font-mono"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}



