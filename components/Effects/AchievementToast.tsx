'use client';

import { useEffect, useState } from 'react';

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_blood: {
    id: 'first_blood',
    icon: '🩸',
    title: 'First Blood',
    description: 'Solved your first level',
  },
  no_hints_level: {
    id: 'no_hints_level',
    icon: '🧠',
    title: 'Pure Skill',
    description: 'Completed a level without hints',
  },
  speed_demon: {
    id: 'speed_demon',
    icon: '⚡',
    title: 'Speed Demon',
    description: 'Solved a level in under 2 minutes',
  },
  halfway: {
    id: 'halfway',
    icon: '🎯',
    title: 'Halfway There',
    description: 'Completed 5 levels',
  },
  deep_dive: {
    id: 'deep_dive',
    icon: '🔍',
    title: 'Deep Dive',
    description: 'Found hidden files in git',
  },
  terminal_master: {
    id: 'terminal_master',
    icon: '💻',
    title: 'Terminal Master',
    description: 'Used 10 different terminal commands',
  },
  ghost: {
    id: 'ghost',
    icon: '👻',
    title: 'Ghost',
    description: 'Completed all levels with 0 hints',
  },
  complete: {
    id: 'complete',
    icon: '🏆',
    title: 'Case Closed',
    description: 'Completed all 10 levels',
  },
};

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onDismiss, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div className={`achievement-toast ${isExiting ? 'exit' : ''}`}>
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-content">
        <h4>Achievement Unlocked</h4>
        <p>{achievement.description}</p>
      </div>
    </div>
  );
}



