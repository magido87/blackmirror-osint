'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GlitchType } from '@/hooks/useGlitchEffect';

interface GlitchOverlayProps {
  isGlitching: boolean;
  glitchType: GlitchType | null;
}

export default function GlitchOverlay({ isGlitching, glitchType }: GlitchOverlayProps) {
  if (!isGlitching || !glitchType) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 pointer-events-none z-[9990] ${glitchType}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.05 }}
      >
        {/* Static noise for static-burst */}
        {glitchType === 'static-burst' && (
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Horizontal tear lines */}
        {glitchType === 'horizontal-tear' && (
          <>
            <div 
              className="absolute left-0 right-0 h-8 bg-cyan-500/20"
              style={{ top: '30%', transform: 'translateX(-5px)' }}
            />
            <div 
              className="absolute left-0 right-0 h-4 bg-red-500/20"
              style={{ top: '60%', transform: 'translateX(5px)' }}
            />
          </>
        )}

        {/* Color shift */}
        {glitchType === 'color-shift' && (
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 100%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Flicker - handled by CSS animation */}
      </motion.div>
    </AnimatePresence>
  );
}



