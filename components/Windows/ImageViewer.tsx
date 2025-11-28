'use client';

import { useState, useEffect } from 'react';
import { getFile } from '@/data/filesystem';
import { base64Decode } from '@/lib/decoders';

interface ImageViewerProps {
  path: string;
}

export default function ImageViewer({ path }: ImageViewerProps) {
  const [exif, setExif] = useState<Record<string, string | null> | null>(null);
  const [showExif, setShowExif] = useState(true);

  useEffect(() => {
    const file = getFile(path);
    if (file?.exif) {
      setExif(file.exif);
    }
  }, [path]);

  const fileName = path.split('/').pop() || 'Image';

  // Decode UserComment if it exists
  const decodedUserComment = exif?.UserComment 
    ? base64Decode(exif.UserComment) 
    : null;

  return (
    <div className="h-full flex bg-[#0d0d12]">
      {/* Image area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4 bg-[#080810]">
          {/* Placeholder badge image */}
          <div className="relative w-64 h-80 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-xl overflow-hidden">
            {/* Badge design */}
            <div className="absolute inset-0 flex flex-col">
              {/* Header */}
              <div className="bg-blue-900 px-4 py-3 text-center">
                <div className="text-xs text-blue-200 tracking-wider">MERIDIAN SYSTEMS</div>
                <div className="text-[10px] text-blue-300/60">DEFENSE CONTRACTOR</div>
              </div>
              
              {/* Photo area */}
              <div className="flex-1 flex items-center justify-center bg-gray-600 m-4 rounded">
                <div className="text-4xl">👤</div>
              </div>
              
              {/* Info */}
              <div className="px-4 pb-4 text-center">
                <div className="text-lg font-bold text-white">M. CH██</div>
                <div className="text-xs text-gray-400">INFRASTRUCTURE</div>
                <div className="text-xs text-gray-500 mt-1">Level 4 Clearance</div>
                <div className="mt-2 text-[10px] text-gray-500 font-mono">
                  ID: MC-2019-0742
                </div>
              </div>

              {/* Barcode area */}
              <div className="bg-white px-4 py-2">
                <div className="h-8 bg-gradient-to-r from-black via-white to-black bg-[length:4px_100%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-3 py-2 border-t border-white/5 bg-[#151520] flex items-center justify-between">
          <span className="text-sm text-gray-400">{fileName}</span>
          <button
            onClick={() => setShowExif(!showExif)}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            {showExif ? 'Hide' : 'Show'} EXIF Data
          </button>
        </div>
      </div>

      {/* EXIF Panel */}
      {showExif && exif && (
        <div className="exif-panel w-64 overflow-y-auto">
          <div className="text-xs text-cyan-400 mb-3 font-bold tracking-wider">
            EXIF METADATA
          </div>
          
          {Object.entries(exif).map(([key, value]) => (
            <div key={key} className="exif-row">
              <span className="exif-key">{key}</span>
              <span className="exif-value">
                {value || 'null'}
              </span>
            </div>
          ))}

          {/* Decoded section */}
          {decodedUserComment && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-amber-400 mb-2">
                ⚠ UserComment (Base64 decoded):
              </div>
              <div className="text-xs text-green-400 bg-black/30 p-2 rounded font-mono break-all">
                {decodedUserComment}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



