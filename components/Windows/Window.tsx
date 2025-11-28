'use client';

import { useRef, ReactNode, useState, useEffect, useCallback } from 'react';
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
  id,
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentSize, setCurrentSize] = useState({ width, height });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isMobile = useIsMobile();
  
  // Store pre-maximize position
  const [preMaxPosition, setPreMaxPosition] = useState({ x, y, width, height });

  // Remove animation after initial mount
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Handle maximize toggle
  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      // Save current position before maximizing
      setPreMaxPosition({ x, y, width: currentSize.width, height: currentSize.height });
      setIsMaximized(true);
    } else {
      setIsMaximized(false);
    }
  }, [isMaximized, x, y, currentSize]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: currentSize.width,
      height: currentSize.height,
    });
  }, [currentSize]);

  // Handle resize move
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(300, resizeStart.width + deltaX);
      const newHeight = Math.max(200, resizeStart.height + deltaY);
      
      setCurrentSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart]);

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

  // Maximized: Full screen window
  if (isMaximized) {
    return (
      <div
        ref={nodeRef}
        className={`window fixed ${isFocused ? 'focused' : ''}`}
        style={{ 
          top: 0,
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 48px)',
          zIndex: zIndex + 1000,
          borderRadius: 0,
        }}
        onClick={onFocus}
      >
        {/* Title bar */}
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
              className="window-control maximize maximized" 
              onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
              title="Restore"
            />
          </div>
          <h3>{title}</h3>
          <div className="w-[68px]" />
        </div>

        {/* Content */}
        <div 
          className="overflow-auto"
          style={{ height: `calc(100% - 37px)` }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Desktop: Draggable and resizable windows
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      defaultPosition={{ x, y }}
      onStop={handleDragStop}
      onMouseDown={onFocus}
      disabled={isResizing}
    >
      <div
        ref={nodeRef}
        className={`window absolute ${isFocused ? 'focused' : ''} ${isAnimating ? 'window-entering' : ''}`}
        style={{ 
          width: currentSize.width, 
          height: currentSize.height, 
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
              onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
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

        {/* Resize handle - bottom right corner */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize group"
          onMouseDown={handleResizeStart}
          style={{ zIndex: 10 }}
        >
          <svg 
            className="w-3 h-3 absolute bottom-0.5 right-0.5 text-gray-500 group-hover:text-cyan-400 transition-colors"
            viewBox="0 0 10 10"
          >
            <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </Draggable>
  );
}
