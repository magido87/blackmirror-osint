'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalytics, isSupabaseConfigured } from '@/lib/supabase';

interface AnalyticsData {
  totalSessions: number;
  totalGuesses: number;
  totalCompletions: number;
  avgCompletionTimeMs: number;
  levelStats: Record<string, { correct: number; incorrect: number }>;
  hintsPerLevel: Record<string, number>;
  recentGuesses: Array<{
    session_id: string;
    level: string;
    is_correct: boolean;
    guess: string;
    time: string;
  }>;
  leaderboard: Array<{
    session_id: string;
    levels_completed: number;
    levels: string[];
  }>;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const LEVEL_NAMES: Record<string, string> = {
  alias: 'Alias',
  project: 'Project',
  firstname: 'First Name',
  city: 'City',
  ssid: 'WiFi SSID',
  year: 'Year',
  flag: 'Flag',
  coords: 'GPS Coords',
  enckey: 'Enc Key',
  codephrase: 'Codephrase',
};

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'levels' | 'live' | 'leaderboard'>('overview');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const result = await getAnalytics();
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setData(result.data);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchData();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen, fetchData]);

  const formatTime = (ms: number) => {
    if (!ms) return '--';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#0a0a12] border border-cyan-500/30 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#0d0d15] border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-mono text-cyan-400">ADMIN ANALYTICS</h2>
                <p className="text-xs text-gray-500">PROJECT BLACKMIRROR METRICS</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                className="text-gray-400 hover:text-cyan-400 transition-colors p-2"
                title="Refresh"
              >
                <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#0d0d15] border-b border-gray-800 px-6 flex gap-1">
            {(['overview', 'levels', 'live', 'leaderboard'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-mono transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-cyan-400 border-cyan-400'
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {!isSupabaseConfigured() ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-mono text-amber-400 mb-2">SUPABASE NOT CONFIGURED</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables to enable analytics.
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-mono text-red-400 mb-2">ERROR FETCHING DATA</h3>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            ) : isLoading && !data ? (
              <div className="flex items-center justify-center py-12">
                <svg className="w-8 h-8 text-cyan-400 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : data && (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                      label="TOTAL PLAYERS"
                      value={data.totalSessions.toString()}
                      icon="👥"
                    />
                    <StatCard
                      label="TOTAL GUESSES"
                      value={data.totalGuesses.toString()}
                      icon="🎯"
                    />
                    <StatCard
                      label="COMPLETIONS"
                      value={data.totalCompletions.toString()}
                      icon="🏆"
                      highlight
                    />
                    <StatCard
                      label="AVG TIME"
                      value={formatTime(data.avgCompletionTimeMs)}
                      icon="⏱️"
                    />
                  </div>
                )}

                {/* Levels Tab */}
                {activeTab === 'levels' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono text-gray-400 mb-4">PERFORMANCE BY LEVEL</h3>
                    {Object.entries(LEVEL_NAMES).map(([key, name]) => {
                      const stats = data.levelStats[key] || { correct: 0, incorrect: 0 };
                      const hints = data.hintsPerLevel[key] || 0;
                      const total = stats.correct + stats.incorrect;
                      const successRate = total > 0 ? Math.round((stats.correct / total) * 100) : 0;
                      
                      return (
                        <div key={key} className="bg-[#0d0d15] border border-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-white">{name}</span>
                            <span className="text-xs font-mono text-gray-500">
                              {stats.correct} correct / {stats.incorrect} incorrect
                            </span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded overflow-hidden mb-2">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                              style={{ width: `${successRate}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{successRate}% success rate</span>
                            <span>{hints} hints used</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Live Feed Tab */}
                {activeTab === 'live' && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-mono text-gray-400 mb-4">RECENT GUESSES (LAST 50)</h3>
                    {data.recentGuesses.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No guesses recorded yet</p>
                    ) : (
                      <div className="space-y-1">
                        {data.recentGuesses.map((guess, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-4 px-3 py-2 rounded font-mono text-sm ${
                              guess.is_correct
                                ? 'bg-green-500/10 border border-green-500/20'
                                : 'bg-red-500/10 border border-red-500/20'
                            }`}
                          >
                            <span className={guess.is_correct ? 'text-green-400' : 'text-red-400'}>
                              {guess.is_correct ? '✓' : '✗'}
                            </span>
                            <span className="text-gray-500 w-16">{guess.session_id}</span>
                            <span className="text-gray-400 w-24">{LEVEL_NAMES[guess.level] || guess.level}</span>
                            <span className="text-gray-300 flex-1 truncate">{guess.guess}</span>
                            <span className="text-gray-600 text-xs">{formatTimeAgo(guess.time)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Leaderboard Tab */}
                {activeTab === 'leaderboard' && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-mono text-gray-400 mb-4">TOP PLAYERS BY PROGRESS</h3>
                    {data.leaderboard.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No players have completed levels yet</p>
                    ) : (
                      <div className="space-y-2">
                        {data.leaderboard.map((player, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 bg-[#0d0d15] border border-gray-800 rounded-lg px-4 py-3"
                          >
                            <span className={`text-2xl font-bold ${
                              i === 0 ? 'text-yellow-400' :
                              i === 1 ? 'text-gray-300' :
                              i === 2 ? 'text-amber-600' :
                              'text-gray-600'
                            }`}>
                              #{i + 1}
                            </span>
                            <span className="font-mono text-gray-400 w-20">{player.session_id}</span>
                            <div className="flex-1">
                              <div className="flex gap-1">
                                {Array.from({ length: 10 }).map((_, j) => (
                                  <div
                                    key={j}
                                    className={`w-6 h-2 rounded ${
                                      j < player.levels_completed
                                        ? 'bg-cyan-500'
                                        : 'bg-gray-800'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="font-mono text-cyan-400">
                              {player.levels_completed}/10
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#0d0d15] border-t border-gray-800 px-6 py-3 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-mono">
              Auto-refresh: 30s | Last update: {new Date().toLocaleTimeString()}
            </span>
            <span className="text-xs text-gray-600 font-mono">
              MERIDIAN SYSTEMS ANALYTICS v1.0
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatCard({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={`bg-[#0d0d15] border rounded-lg p-4 ${
      highlight ? 'border-cyan-500/30' : 'border-gray-800'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-mono text-gray-500">{label}</span>
      </div>
      <div className={`text-2xl font-mono ${highlight ? 'text-cyan-400' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}

