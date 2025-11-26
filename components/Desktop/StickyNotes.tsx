'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface StickyNote {
  id: string;
  content: string;
  x: number;
  y: number;
  rotation: number;
  color: 'yellow' | 'pink' | 'blue';
}

const NOTES: StickyNote[] = [
  {
    id: 'note1',
    content: "Don't trust D.R.\nHe knows more than\nhe's saying.",
    x: 78,
    y: 8,
    rotation: -3,
    color: 'yellow',
  },
  {
    id: 'note2', 
    content: "03:14\nWhy does the clock\nnever change?",
    x: 85,
    y: 28,
    rotation: 2,
    color: 'pink',
  },
  {
    id: 'note3',
    content: "Check the\nhidden files\nin git",
    x: 72,
    y: 45,
    rotation: -2,
    color: 'blue',
  },
];

const colorStyles = {
  yellow: {
    bg: 'bg-yellow-200/90',
    border: 'border-yellow-300',
    text: 'text-yellow-900',
    shadow: 'shadow-yellow-400/20',
  },
  pink: {
    bg: 'bg-pink-200/90',
    border: 'border-pink-300',
    text: 'text-pink-900',
    shadow: 'shadow-pink-400/20',
  },
  blue: {
    bg: 'bg-blue-200/90',
    border: 'border-blue-300',
    text: 'text-blue-900',
    shadow: 'shadow-blue-400/20',
  },
};

export default function StickyNotes() {
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);

  return (
    <>
      {NOTES.map((note) => {
        const styles = colorStyles[note.color];
        return (
          <motion.div
            key={note.id}
            className={`
              fixed w-28 p-3 rounded-sm cursor-default select-none
              ${styles.bg} ${styles.border} ${styles.text}
              border shadow-lg ${styles.shadow}
              font-handwriting text-xs leading-tight
            `}
            style={{
              right: `${100 - note.x}%`,
              top: `${note.y}%`,
              transform: `rotate(${note.rotation}deg)`,
              fontFamily: "'Segoe Script', 'Bradley Hand', cursive",
              zIndex: hoveredNote === note.id ? 100 : 10,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: hoveredNote === note.id ? 1.05 : 1,
              rotate: hoveredNote === note.id ? 0 : note.rotation,
            }}
            transition={{ 
              duration: 0.3,
              delay: Math.random() * 0.5,
            }}
            onMouseEnter={() => setHoveredNote(note.id)}
            onMouseLeave={() => setHoveredNote(null)}
            whileHover={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            {/* Tape effect */}
            <div 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-300/60 rounded-sm"
              style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
            />
            
            {/* Content */}
            <div className="whitespace-pre-line">
              {note.content}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

