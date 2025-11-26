'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_TEXT = `DIGITAL EVIDENCE EXTRACTION MODULE v4.2.1
Initializing secure environment...

████████████████████████████░░ 87%

IMAGE: MERIDIAN_WS_7.IMG
SIZE: 128.4 GB
HASH: SHA256:a3f8e2b1c4d5e6f7...
STATUS: VERIFIED ✓

CHAIN OF CUSTODY: FBI-EVID-2024-0315
EXAMINER: [REDACTED]
DATE ACQUIRED: 2024-03-15 03:14:00 UTC

⚠ WARNING: Evidence integrity preserved
           Do not modify system files

Loading recovered filesystem...`;

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);

  // Auto-proceed after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 100));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="boot-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* CRT Scanline overlay */}
        <div className="crt-overlay" />
        
        {/* Boot text */}
        <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {BOOT_TEXT.split('\n').map((line, index) => (
            <div 
              key={index} 
              className={`
                ${line.includes('WARNING') ? 'text-amber-400' : ''}
                ${line.includes('VERIFIED') ? 'text-green-400' : ''}
                ${line.includes('████') ? 'text-cyan-400' : ''}
              `}
            >
              {line}
            </div>
          ))}
          
          {/* Loading indicator */}
          <div className="mt-4 text-cyan-400">
            <div className="flex items-center gap-2">
              <div className="w-48 h-1 bg-gray-800 rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-xs">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Static noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
