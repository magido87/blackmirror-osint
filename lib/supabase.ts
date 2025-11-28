import { createClient } from '@supabase/supabase-js';

// Supabase configuration - uses environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client (only if credentials exist)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Generate anonymous session ID (persists in localStorage)
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  const key = 'osint-session-id';
  let sessionId = localStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, sessionId);
  }
  
  return sessionId;
}

// Analytics event types
export type EventType = 'guess' | 'hint_used' | 'level_complete' | 'session_start' | 'challenge_complete';

interface AnalyticsEvent {
  session_id: string;
  event_type: EventType;
  level?: string;
  is_correct?: boolean;
  guess_value?: string;
  hint_number?: number;
  total_hints_used?: number;
  completion_time_ms?: number;
  rank?: string;
  user_agent?: string;
}

// Track an analytics event
export async function trackEvent(
  eventType: EventType,
  data: Partial<Omit<AnalyticsEvent, 'session_id' | 'event_type' | 'user_agent'>> = {}
): Promise<void> {
  // Skip if Supabase is not configured
  if (!supabase) {
    console.log('[Analytics] Supabase not configured, skipping event:', eventType);
    return;
  }

  try {
    const event: AnalyticsEvent = {
      session_id: getSessionId(),
      event_type: eventType,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      ...data,
    };

    const { error } = await supabase
      .from('analytics')
      .insert([event]);

    if (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  } catch (err) {
    console.error('[Analytics] Failed to track event:', err);
  }
}

// Fetch analytics data for admin panel
export async function getAnalytics() {
  if (!supabase) {
    return { error: 'Supabase not configured' };
  }

  try {
    // Get all events
    const { data: events, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate statistics
    const uniqueSessions = new Set(events?.map(e => e.session_id) || []).size;
    
    // Guesses per level
    const guessEvents = events?.filter(e => e.event_type === 'guess') || [];
    const levelStats: Record<string, { correct: number; incorrect: number }> = {};
    
    guessEvents.forEach(e => {
      if (!levelStats[e.level]) {
        levelStats[e.level] = { correct: 0, incorrect: 0 };
      }
      if (e.is_correct) {
        levelStats[e.level].correct++;
      } else {
        levelStats[e.level].incorrect++;
      }
    });

    // Hints per level
    const hintEvents = events?.filter(e => e.event_type === 'hint_used') || [];
    const hintsPerLevel: Record<string, number> = {};
    hintEvents.forEach(e => {
      hintsPerLevel[e.level] = (hintsPerLevel[e.level] || 0) + 1;
    });

    // Completions
    const completions = events?.filter(e => e.event_type === 'challenge_complete') || [];
    const avgCompletionTime = completions.length > 0
      ? completions.reduce((sum, e) => sum + (e.completion_time_ms || 0), 0) / completions.length
      : 0;

    // Session progress (which levels each session has completed)
    const sessionProgress: Record<string, string[]> = {};
    const levelCompleteEvents = events?.filter(e => e.event_type === 'level_complete') || [];
    levelCompleteEvents.forEach(e => {
      if (!sessionProgress[e.session_id]) {
        sessionProgress[e.session_id] = [];
      }
      if (e.level && !sessionProgress[e.session_id].includes(e.level)) {
        sessionProgress[e.session_id].push(e.level);
      }
    });

    // Recent guesses (last 50)
    const recentGuesses = guessEvents.slice(0, 50).map(e => ({
      session_id: e.session_id?.slice(-8) || 'unknown',
      level: e.level,
      is_correct: e.is_correct,
      guess: e.guess_value?.slice(0, 20) || '***',
      time: e.created_at,
    }));

    // Leaderboard (sessions sorted by levels completed)
    const leaderboard = Object.entries(sessionProgress)
      .map(([sessionId, levels]) => ({
        session_id: sessionId.slice(-8),
        levels_completed: levels.length,
        levels: levels,
      }))
      .sort((a, b) => b.levels_completed - a.levels_completed)
      .slice(0, 20);

    return {
      data: {
        totalSessions: uniqueSessions,
        totalGuesses: guessEvents.length,
        totalCompletions: completions.length,
        avgCompletionTimeMs: Math.round(avgCompletionTime),
        levelStats,
        hintsPerLevel,
        recentGuesses,
        leaderboard,
      },
      error: null,
    };
  } catch (err) {
    console.error('[Analytics] Failed to fetch analytics:', err);
    return { error: String(err), data: null };
  }
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!supabase;
}

