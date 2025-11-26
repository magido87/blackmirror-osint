import CryptoJS from 'crypto-js';

// Verification system - all sensitive data is pre-hashed
// No plaintext answers exist in this codebase

// Hash computation utility
function computeHash(input: string): string {
  if (!input || typeof input !== 'string') return '';
  const normalized = input.toLowerCase().replace(/[\s\t\n\r]/g, '').trim();
  return CryptoJS.SHA256(normalized).toString();
}

// Level identifiers
const LEVEL_KEYS = ['alias', 'project', 'firstname', 'city', 'ssid', 'year', 'flag', 'coords', 'enckey', 'codephrase'] as const;
type LevelKey = typeof LEVEL_KEYS[number];

// Pre-computed verification hashes (SHA-256)
// These are the ONLY stored representation of correct answers
const VERIFICATION_DATA: Record<LevelKey, string> = {
  alias: 'a26ea51cb6950777b2295324b711dc735ce88816af2cc1b277b11ca4a1e74f5c',
  project: '7a1e0a37cab754b5b834c30d30be39e4cf1af571f38d0beefbd4b089a6040004',
  firstname: 'd7ae9de750a5640adf6e724d72643767faa73bca2941781dae9d276ff2d4b4ca',
  city: '07851dd3528cd6a587e58af442a1ce7d2de7d04558bcca06bdfdca079a50063c',
  ssid: '3401322d52d0759e8dacf64cb7794f9640b82bee9fc220118f599dd47fbc9e0e',
  year: '023e33504ab909cf87a6f4e4e545090e40bdc0a2153e5b68b19f7fad2b737904',
  flag: 'd3a15e1187555c9702d902d17024fea3b8b5596ce63890c7ddaaf0330ed37e86',
  coords: 'bdc9404465fbbec46355092f021dbf9523a61a158093b0cb553e5ce2f0d88d80',
  enckey: '558d3199c2777f09391c2608c48a7dffe253030691195a880358cf86d9296302',
  codephrase: '2ea88c7a30351b12a4dcfc06cdce2af6eab18416176466c2500cb6ef74f745bf',
};

// Timing-safe string comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Main verification function
export function verifyAnswer(level: string, answer: string): boolean {
  if (!answer || typeof answer !== 'string') return false;
  if (!LEVEL_KEYS.includes(level as LevelKey)) return false;
  
  const userHash = computeHash(answer);
  const correctHash = VERIFICATION_DATA[level as LevelKey];
  
  if (!correctHash || !userHash) return false;
  
  return safeCompare(userHash, correctHash);
}

// Level metadata for UI (contains no sensitive information)
export const LEVEL_INFO = [
  { id: 'alias', label: 'Whistleblower Alias', number: 1 },
  { id: 'project', label: 'Project Codename', number: 2 },
  { id: 'firstname', label: "Whistleblower's First Name", number: 3 },
  { id: 'city', label: 'City of Residence', number: 4 },
  { id: 'ssid', label: 'WiFi Network SSID', number: 5 },
  { id: 'year', label: 'Project Start Year', number: 6 },
  { id: 'flag', label: 'Final Flag', number: 7 },
  { id: 'coords', label: 'Dead Drop GPS Coordinates', number: 8 },
  { id: 'enckey', label: 'Key Fragment C (4 hex chars)', number: 9 },
  { id: 'codephrase', label: 'Final Codephrase', number: 10 },
];
