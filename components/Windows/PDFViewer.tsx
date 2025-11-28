'use client';

import { useState, useEffect } from 'react';
import { getFile } from '@/data/filesystem';

interface PDFViewerProps {
  path: string;
}

export default function PDFViewer({ path }: PDFViewerProps) {
  const [content, setContent] = useState<string>('');
  const [hiddenLayer, setHiddenLayer] = useState<string>('');
  const [showMetadata, setShowMetadata] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading animation
    setIsLoading(true);
    const timer = setTimeout(() => {
      const file = getFile(path);
      if (file) {
        setContent(file.visibleContent || file.content || '');
        setHiddenLayer(file.hiddenLayer || '');
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [path]);

  const fileName = path.split('/').pop() || 'Document';

  // Parse hidden layer metadata
  const parseMetadata = (layer: string): Record<string, string> => {
    const metadata: Record<string, string> = {};
    const match = layer.match(/xml:meta\s+([^>]+)/);
    if (match) {
      const attrs = match[1].matchAll(/(\w+)='([^']+)'/g);
      for (const attr of attrs) {
        metadata[attr[1]] = attr[2];
      }
    }
    return metadata;
  };

  const metadata = parseMetadata(hiddenLayer);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#0d0d12] font-mono text-sm">
        <div className="text-cyan-400 mb-4">SECURE DOCUMENT VIEWER v2.1</div>
        <div className="space-y-2 text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Checking redaction layers...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>Verifying digital signature...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="animate-pulse">⏳</span>
            <span>Rendering safe view...</span>
          </div>
        </div>
        <div className="mt-6 text-amber-400 text-xs">
          ⚠ WARNING: Document contains [CLASSIFIED] material
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#151520]">
        <span className="text-sm text-gray-400">{fileName}</span>
        <span className="text-xs text-gray-600">|</span>
        <span className="text-xs text-red-400">CLASSIFIED</span>
        <div className="flex-1" />
        {hiddenLayer && (
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            {showMetadata ? 'Hide' : 'View'} XML Metadata
          </button>
        )}
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto p-6 bg-[#1a1a1f]">
        <div className="max-w-3xl mx-auto bg-white/5 rounded-lg p-8 shadow-xl">
          <pre className="pdf-content text-gray-300 whitespace-pre-wrap">
            {content}
          </pre>
        </div>
      </div>

      {/* Hidden metadata panel */}
      {showMetadata && hiddenLayer && (
        <div className="border-t border-cyan-500/30 bg-cyan-900/10 p-3">
          <div className="text-xs text-cyan-400 mb-2 font-mono">
            📋 XML METADATA LAYER (Hidden)
          </div>
          <div className="text-xs font-mono text-gray-400 bg-black/30 p-2 rounded mb-2">
            {hiddenLayer}
          </div>
          {Object.keys(metadata).length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="text-xs text-cyan-400">Parsed attributes:</div>
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className="text-xs font-mono">
                  <span className="text-gray-500">{key}:</span>{' '}
                  <span className="text-green-400">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 border-t border-white/5 bg-[#151520]">
        Document rendered in secure mode
      </div>
    </div>
  );
}



