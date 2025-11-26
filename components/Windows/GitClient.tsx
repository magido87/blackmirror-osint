'use client';

import { useState } from 'react';
import { FAKE_REPO, GitFile, GitCommit } from '@/data/gitrepo';

type Tab = 'files' | 'commits' | 'branches';

export default function GitClient() {
  const [activeTab, setActiveTab] = useState<Tab>('files');
  const [selectedFile, setSelectedFile] = useState<GitFile | null>(null);
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);

  const visibleFiles = showHiddenFiles 
    ? FAKE_REPO.files 
    : FAKE_REPO.files.filter(f => !f.hidden);

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Header */}
      <div className="git-header">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <div>
            <div className="git-repo-name">{FAKE_REPO.owner}/{FAKE_REPO.name}</div>
            <div className="text-xs text-gray-500 mt-1">{FAKE_REPO.description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">
            {FAKE_REPO.isPrivate ? 'Private' : 'Public'}
          </span>
          <span className="text-xs text-gray-500">
            {FAKE_REPO.commits.length} commits
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="git-tabs">
        <button 
          className={`git-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          📁 Files
        </button>
        <button 
          className={`git-tab ${activeTab === 'commits' ? 'active' : ''}`}
          onClick={() => setActiveTab('commits')}
        >
          📝 Commits
        </button>
        <button 
          className={`git-tab ${activeTab === 'branches' ? 'active' : ''}`}
          onClick={() => setActiveTab('branches')}
        >
          🌿 Branches
        </button>
        <div className="flex-1" />
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input 
            type="checkbox" 
            checked={showHiddenFiles}
            onChange={(e) => setShowHiddenFiles(e.target.checked)}
            className="w-3 h-3"
          />
          Show hidden files
        </label>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* File list */}
        {activeTab === 'files' && (
          <>
            <div className="w-64 border-r border-white/5 overflow-y-auto">
              {visibleFiles.map((file) => (
                <div
                  key={file.name}
                  className={`px-4 py-2 cursor-pointer hover:bg-white/5 flex items-center gap-2 ${
                    selectedFile?.name === file.name ? 'bg-cyan-500/10' : ''
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <span className="text-sm">
                    {file.name.endsWith('.md') ? '📄' : 
                     file.name.endsWith('.yaml') || file.name.endsWith('.yml') ? '⚙️' :
                     file.name.endsWith('.sh') ? '📜' :
                     file.name.startsWith('.') ? '👁️' : '📄'}
                  </span>
                  <span className={`text-sm ${file.hidden ? 'text-gray-500' : 'text-gray-300'}`}>
                    {file.name}
                  </span>
                  {file.hidden && (
                    <span className="text-xs text-amber-400 ml-auto">hidden</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* File content */}
            <div className="flex-1 overflow-auto p-4 bg-[#0a0a0f]">
              {selectedFile ? (
                <div>
                  <div className="text-xs text-gray-500 mb-2 font-mono">
                    {selectedFile.name}
                  </div>
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {selectedFile.content}
                  </pre>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Select a file to view its contents
                </div>
              )}
            </div>
          </>
        )}

        {/* Commits */}
        {activeTab === 'commits' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {FAKE_REPO.commits.map((commit: GitCommit) => (
                <div 
                  key={commit.hash}
                  className="p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400">
                      {commit.hash}
                    </span>
                    <span className="text-xs text-gray-500">
                      {commit.date}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {commit.message}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    👤 {commit.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Branches */}
        {activeTab === 'branches' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {FAKE_REPO.branches.map((branch: string) => (
                <div 
                  key={branch}
                  className={`p-3 rounded-lg flex items-center gap-2 ${
                    branch === 'main' ? 'bg-green-500/10' : 'bg-white/5'
                  }`}
                >
                  <span className="text-lg">🌿</span>
                  <span className="text-sm text-gray-300">{branch}</span>
                  {branch === 'main' && (
                    <span className="text-xs text-green-400 ml-auto">default</span>
                  )}
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="text-xs text-red-400 mb-1">⚠ Deleted branches (from reflog):</div>
                <div className="text-sm text-gray-400">
                  • evidence-backup <span className="text-red-400">(deleted)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 border-t border-white/5 bg-[#151520]">
        Repository cloned from meridian-internal (local cache)
      </div>
    </div>
  );
}

