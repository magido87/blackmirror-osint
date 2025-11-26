'use client';

import { useState, useEffect } from 'react';
import { getFile } from '@/data/filesystem';
import CryptoJS from 'crypto-js';

interface EncryptedViewerProps {
  path: string;
}

export default function EncryptedViewer({ path }: EncryptedViewerProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [decodedContent, setDecodedContent] = useState<string>('');
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [encodedData, setEncodedData] = useState<string>('');

  useEffect(() => {
    const file = getFile(path);
    if (file?.type === 'encrypted') {
      setHint(file.hint || '');
      // Store encoded content - will decode on unlock
      if (file.encodedContents) {
        setEncodedData(file.encodedContents);
      }
    }
  }, [path]);

  const handleUnlock = () => {
    const isCorrect = verifyVaultPassword(password);
    
    if (isCorrect) {
      setIsUnlocked(true);
      setError('');
      // Decode content only after successful unlock
      if (encodedData) {
        try {
          const decoded = atob(encodedData);
          setDecodedContent(decoded);
        } catch {
          setDecodedContent('[Decryption error]');
        }
      }
    } else {
      setAttempts(prev => prev + 1);
      setError(`Incorrect password. Attempt ${attempts + 1}/∞`);
      setPassword('');
    }
  };

  const fileName = path.split('/').pop() || 'Encrypted File';

  if (isUnlocked && decodedContent) {
    return (
      <div className="h-full flex flex-col bg-[#0d0d12]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-green-500/30 bg-green-900/10 flex items-center gap-2">
          <span className="text-green-400">🔓</span>
          <span className="text-green-400 font-mono text-sm">{fileName} - DECRYPTED</span>
        </div>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <div className="text-xs text-cyan-400 mb-2 font-mono">
              📄 final_report.txt
            </div>
            <pre className="text-sm text-gray-300 bg-black/30 p-4 rounded font-mono whitespace-pre-wrap">
              {decodedContent}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0d0d12] p-8">
      {/* Lock icon */}
      <div className="text-6xl mb-6 animate-pulse">🔒</div>
      
      {/* File name */}
      <div className="text-lg text-gray-300 mb-2 font-mono">{fileName}</div>
      <div className="text-xs text-gray-500 mb-6">AES-256 Encrypted Container</div>

      {/* Password input */}
      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-2">
            Enter decryption password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-gray-200 font-mono focus:border-cyan-500/50 focus:outline-none"
            placeholder="••••••••••••"
            autoFocus
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <button
          onClick={handleUnlock}
          className="w-full py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono"
        >
          DECRYPT
        </button>

        {/* Hint */}
        {hint && (
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
            <div className="text-xs text-amber-400 mb-1">💡 Hint:</div>
            <div className="text-xs text-gray-400">{hint}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Verification function using pre-computed hash
function verifyVaultPassword(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  const normalized = input.toLowerCase().trim().replace(/\s/g, '');
  const hash = CryptoJS.SHA256(normalized).toString();
  // Pre-computed SHA256 hash
  const expected = 'b9fb0ea018bdd77fa470767b4f15119ba0b713ac1859fb34686b29f936f71b33';
  return hash === expected;
}
