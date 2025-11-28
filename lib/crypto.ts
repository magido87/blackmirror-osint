import CryptoJS from 'crypto-js';

export function sha256(input: string): string {
  return CryptoJS.SHA256(input).toString();
}

export function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().replace(/[\s\t\n\r]/g, '').trim();
}

export function hashAnswer(answer: string): string {
  const normalized = normalizeAnswer(answer);
  return sha256(normalized);
}

export function verifyHash(input: string, expectedHash: string): boolean {
  const hash = hashAnswer(input);
  return hash === expectedHash;
}



