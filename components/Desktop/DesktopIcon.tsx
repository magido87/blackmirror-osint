'use client';

import { useState, useEffect } from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  compact?: boolean;
}

// Detect touch device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  return isTouch;
}

export default function DesktopIcon({ icon, label, onDoubleClick, compact = false }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const isTouch = useIsTouchDevice();

  // Single click on touch devices, double click on desktop
  const handleClick = () => {
    if (isTouch) {
      // Touch device: single tap opens
      onDoubleClick();
    } else {
      // Desktop: single click selects
      setIsSelected(true);
    }
  };

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${compact ? 'compact' : ''}`}
      onClick={handleClick}
      onDoubleClick={() => {
        if (!isTouch) {
          onDoubleClick();
        }
      }}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      style={compact ? { 
        width: '100%',
        padding: '12px 4px',
      } : undefined}
    >
      <div 
        className="desktop-icon-image"
        style={compact ? {
          width: '36px',
          height: '36px',
          fontSize: '24px',
        } : undefined}
      >
        {icon}
      </div>
      <span 
        className="desktop-icon-label whitespace-pre-line"
        style={compact ? {
          fontSize: '9px',
        } : undefined}
      >
        {label.replace('\n', ' ')}
      </span>
    </div>
  );
}

