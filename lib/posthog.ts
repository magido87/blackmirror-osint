// PostHog Analytics Configuration
// Get your API key from: https://posthog.com

import posthog from 'posthog-js';

// Initialize PostHog - only on client side
export const initPostHog = () => {
  if (typeof window === 'undefined') return;
  
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';
  
  if (!apiKey) {
    console.warn('PostHog API key not configured');
    return;
  }
  
  posthog.init(apiKey, {
    api_host: apiHost,
    // Capture pageviews automatically
    capture_pageview: true,
    // Capture page leaves
    capture_pageleave: true,
    // Session recording (optional - enable if you want replays)
    disable_session_recording: false,
    // Respect Do Not Track
    respect_dnt: true,
    // Persistence
    persistence: 'localStorage',
    // Autocapture clicks, form submissions, etc.
    autocapture: true,
  });
};

// Custom event tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  posthog.capture(eventName, properties);
};

// Track challenge events
export const trackChallengeStart = () => {
  trackEvent('challenge_started');
};

export const trackLevelAttempt = (level: string, correct: boolean) => {
  trackEvent('level_attempt', {
    level,
    correct,
    timestamp: new Date().toISOString(),
  });
};

export const trackLevelSolved = (level: string, hintsUsed: number) => {
  trackEvent('level_solved', {
    level,
    hints_used: hintsUsed,
    timestamp: new Date().toISOString(),
  });
};

export const trackHintUsed = (level: string, hintNumber: number) => {
  trackEvent('hint_used', {
    level,
    hint_number: hintNumber,
  });
};

export const trackChallengeComplete = (rank: string, totalHints: number, timeSpent?: number) => {
  trackEvent('challenge_completed', {
    rank,
    total_hints_used: totalHints,
    time_spent_seconds: timeSpent,
  });
};

export const trackWindowOpened = (windowType: string) => {
  trackEvent('window_opened', {
    window_type: windowType,
  });
};

export const trackFileViewed = (filePath: string) => {
  trackEvent('file_viewed', {
    file_path: filePath,
  });
};

export default posthog;

