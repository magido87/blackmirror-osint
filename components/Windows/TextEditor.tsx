'use client';

import { useState, useEffect } from 'react';
import { getFile } from '@/data/filesystem';
import { extractHiddenCharacters, decodeZeroWidth } from '@/lib/decoders';

interface TextEditorProps {
  path: string;
}

export default function TextEditor({ path }: TextEditorProps) {
  const [content, setContent] = useState<string>('Loading...');
  const [encoding, setEncoding] = useState<string>('UTF-8');
  const [hasHiddenChars, setHasHiddenChars] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [decodedHidden, setDecodedHidden] = useState<string>('');

  useEffect(() => {
    const file = getFile(path);
    if (file) {
      if (file.encoding === 'utf16le') {
        // Show the garbled content first
        setContent(file.content || '[Unable to decode file]');
        setEncoding('UTF-16LE (detected)');
      } else {
        setContent(file.content || '');
        setEncoding('UTF-8');
      }
      
      // Check for hidden characters
      if (file.content) {
        const { hidden } = extractHiddenCharacters(file.content);
        if (hidden.length > 0) {
          setHasHiddenChars(true);
          const decoded = decodeZeroWidth(file.content);
          setDecodedHidden(decoded);
        }
      }
    } else {
      setContent('File not found');
    }
  }, [path]);

  const fileName = path.split('/').pop() || 'Untitled';
  const lineCount = content.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-[#151520]">
        <span className="text-sm text-gray-400">{fileName}</span>
        <span className="text-xs text-gray-600">|</span>
        <span className="text-xs text-gray-500">{encoding}</span>
        {hasHiddenChars && (
          <>
            <span className="text-xs text-gray-600">|</span>
            <button
              onClick={() => setShowHidden(!showHidden)}
              className="text-xs text-amber-400 hover:text-amber-300"
            >
              {showHidden ? 'Hide' : 'Show'} hidden chars
            </button>
          </>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="flex">
          {/* Line numbers */}
          <div className="flex-shrink-0 px-3 py-2 text-right text-xs text-gray-600 bg-[#0a0a0f] select-none font-mono border-r border-white/5">
            {content.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          
          {/* Content */}
          <pre className="flex-1 p-2 text-sm font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
            {content}
          </pre>
        </div>
      </div>

      {/* Hidden characters panel */}
      {showHidden && hasHiddenChars && (
        <div className="border-t border-amber-500/30 bg-amber-900/20 p-3">
          <div className="text-xs text-amber-400 mb-2 font-mono">
            ⚠ HIDDEN CHARACTERS DETECTED
          </div>
          <div className="text-sm font-mono text-white bg-black/30 p-2 rounded">
            Decoded: <span className="text-green-400">{decodedHidden || '[Unable to decode]'}</span>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 border-t border-white/5 bg-[#151520] flex justify-between">
        <span>{lineCount} lines</span>
        <span>{content.length} characters</span>
      </div>
    </div>
  );
}



