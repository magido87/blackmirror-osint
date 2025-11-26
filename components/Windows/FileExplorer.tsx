'use client';

import { useState, useEffect } from 'react';
import { FILESYSTEM, getFolderContents, getFile } from '@/data/filesystem';

interface FileExplorerProps {
  initialPath: string;
  onOpenFile: (path: string, type: string) => void;
}

const FILE_ICONS: Record<string, string> = {
  folder: '📁',
  text: '📄',
  config: '⚙️',
  pdf: '📕',
  image: '🖼️',
  encrypted: '🔒',
  app: '💻',
};

// Detect touch device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  return isTouch;
}

export default function FileExplorer({ initialPath, onOpenFile }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const isTouch = useIsTouchDevice();

  const contents = getFolderContents(currentPath);
  
  const openItem = (itemName: string) => {
    const fullPath = `${currentPath}/${itemName}`;
    const item = getFile(fullPath);
    
    if (!item) return;
    
    if (item.type === 'folder') {
      setCurrentPath(fullPath);
      setSelectedItem(null);
    } else if (item.type === 'app') {
      onOpenFile(fullPath, 'app');
    } else {
      onOpenFile(fullPath, item.type);
    }
  };
  
  const handleItemClick = (itemName: string) => {
    if (isTouch) {
      // Touch device: single tap opens
      openItem(itemName);
    } else {
      // Desktop: single click selects
      setSelectedItem(itemName);
    }
  };

  const handleItemDoubleClick = (itemName: string) => {
    if (!isTouch) {
      openItem(itemName);
    }
  };

  const navigateUp = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length > 1) {
      parts.pop();
      setCurrentPath('/' + parts.join('/'));
      setSelectedItem(null);
    }
  };

  const getParentPath = () => {
    const parts = currentPath.split('/').filter(Boolean);
    return parts.length > 1;
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Navigation bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#151520]">
        <button
          onClick={navigateUp}
          disabled={!getParentPath()}
          className="px-2 py-1 text-sm bg-white/5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⬆️ Up
        </button>
        <div className="flex-1 px-3 py-1 bg-black/30 rounded text-sm font-mono text-cyan-400">
          {currentPath}
        </div>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto p-2">
        {contents.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Empty folder
          </div>
        ) : (
          <div className="space-y-1">
            {contents.map((itemName) => {
              const fullPath = `${currentPath}/${itemName}`;
              const item = getFile(fullPath);
              const type = item?.type || 'text';
              const icon = FILE_ICONS[type] || '📄';
              
              return (
                <div
                  key={itemName}
                  className={`file-item ${selectedItem === itemName ? 'selected' : ''}`}
                  onClick={() => handleItemClick(itemName)}
                  onDoubleClick={() => handleItemDoubleClick(itemName)}
                >
                  <span className="file-icon">{icon}</span>
                  <span className="file-name">{itemName}</span>
                  {type === 'encrypted' && (
                    <span className="ml-auto text-xs text-amber-400">LOCKED</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 border-t border-white/5 bg-[#151520]">
        {contents.length} item{contents.length !== 1 ? 's' : ''}
        {selectedItem && ` • Selected: ${selectedItem}`}
      </div>
    </div>
  );
}

