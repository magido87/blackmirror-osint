'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface WindowProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized?: boolean;
  isFocused?: boolean;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onDragStop: (x: number, y: number) => void;
}

// Hook to detect mobile/touch devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640 || 
        ('ontouchstart' in window && window.innerWidth < 1024));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export default function Window({
  title,
  x,
  y,
  width,
  height,
  zIndex,
  isMinimized,
  isFocused,
  children,
  onClose,
  onMinimize,
  onFocus,
  onDragStop,
}: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const isMobile = useIsMobile();

  // Remove animation after initial mount
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (isMinimized) return null;

  const handleDragStop: DraggableEventHandler = (_, data) => {
    onDragStop(data.x, data.y);
  };

  // Mobile: Full screen, no dragging
  if (isMobile) {
    return (
      <div
        ref={nodeRef}
        className={`window fixed inset-0 bottom-10 ${isFocused ? 'focused' : ''} ${isAnimating ? 'window-entering' : ''}`}
        style={{ 
          zIndex,
          width: '100%',
          height: 'calc(100% - 40px)',
          borderRadius: 0,
        }}
        onClick={onFocus}
      >
        {/* Title bar */}
        <div className="window-titlebar flex items-center justify-between" style={{ padding: '10px 12px' }}>
          {/* Close button - larger touch target for mobile */}
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 active:bg-red-600"
            onClick={(e) => { 
              e.stopPropagation(); 
              e.preventDefault();
              onClose(); 
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            style={{ touchAction: 'manipulation' }}
            aria-label="Close"
          >
            <span className="text-white text-lg font-bold">×</span>
          </button>
          <h3 className="flex-1 text-center truncate px-2 text-sm">{title}</h3>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div 
          className="overflow-auto"
          style={{ height: `calc(100% - 48px)` }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Desktop: Draggable windows
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      defaultPosition={{ x, y }}
      onStop={handleDragStop}
      onMouseDown={onFocus}
    >
      <div
        ref={nodeRef}
        className={`window absolute ${isFocused ? 'focused' : ''} ${isAnimating ? 'window-entering' : ''}`}
        style={{ 
          width, 
          height, 
          zIndex,
        }}
        onClick={onFocus}
      >
        {/* Title bar - this is the drag handle */}
        <div className="window-titlebar">
          <div className="window-controls">
            <button 
              className="window-control close" 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              title="Close"
            />
            <button 
              className="window-control minimize" 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              title="Minimize"
            />
            <button 
              className="window-control maximize" 
              title="Maximize"
            />
          </div>
          <h3>{title}</h3>
          <div className="w-[68px]" /> {/* Spacer for symmetry */}
        </div>

        {/* Content */}
        <div 
          className="overflow-auto"
          style={{ height: `calc(100% - 37px)` }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
}
