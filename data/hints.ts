// Runtime hint generation - no plaintext stored

const _e = atob;
const _k: Record<string, string[]> = {
  a: [
    'Q2hlY2sgdGhlIGF1ZGl0IGxvZ3MgaW4gdGhlIEVWSURFTkNFIGZvbGRlci4gU2VjdXJpdHkgYnJlYWNoZXMgbGVhdmUgdHJhY2VzLg==',
    'VGhlIHVzZXJuYW1lIGFwcGVhcnMgbXVsdGlwbGUgdGltZXMgaW4gaW50ZXJuYWxfYXVkaXQudHh0IC0gbG9vayBmb3IgdGhlIHBhdHRlcm4gJ1VzZXIgW25hbWVdJw=='
  ],
  p: [
    'VGhlIHByb2plY3QgYnJpZWYgZG9jdW1lbnQgbWlnaHQgaGF2ZSB0aGUgYW5zd2VyIGluIGl0cyB2ZXJ5IG5hbWUu',
    'U29tZXRpbWVzIHRoZSBtb3N0IG9idmlvdXMgYW5zd2VyIGlzIHRoZSBjb3JyZWN0IG9uZS4gV2hhdCdzIHdyaXR0ZW4gb24gdGhlIFBERj8='
  ],
  f: [
    'VGhlIHRlcm1pbmFsIG1pZ2h0IHJlbWVtYmVyIHdobyB3YXMgbG9nZ2VkIGluLiBUcnkgY29tbW9uIGNvbW1hbmRzIGxpa2UgJ3dob2FtaScgb3IgJ2lkJy4=',
    'R2l0IGNvbW1pdHMgb2Z0ZW4gcmV2ZWFsIGF1dGhvciBpbmZvcm1hdGlvbi4gQ2hlY2sgdGhlIGNvbW1pdCBoaXN0b3J5IGluIGdpdC1zeW5jLg=='
  ],
  c: [
    'VGhlcmUncyBtb3JlIGluIHRoZSBub3RlcyB0aGFuIG1lZXRzIHRoZSBleWUuIFNvbWUgY2hhcmFjdGVycyBhcmUgaW52aXNpYmxlIHRvIHRoZSBuYWtlZCBleWUuLi4=',
    'WmVyby13aWR0aCBVbmljb2RlIGNoYXJhY3RlcnMgY2FuIGVuY29kZSBoaWRkZW4gbWVzc2FnZXMuIExvb2sgYmV0d2VlbiB2aXNpYmxlIHRleHQgbGluZXMu'
  ],
  s: [
    'TmV0d29yayBkb2N1bWVudGF0aW9uIG9mdGVuIGxpc3RzIGFsbCBhdmFpbGFibGUgV2lGaSBuZXR3b3Jrcy4gQ2hlY2sgdGhlIEVWSURFTkNFIGZvbGRlci4=',
    'TG9vayBmb3IgbmV0d29ya190b3BvbG9neS50eHQgLSBpdCBsaXN0cyBhbGwgV2lGaSBuZXR3b3Jrcy4gT25lIG9mIHRoZW0gaXMgdW5lbmNyeXB0ZWQu'
  ],
  y: [
    'VGltZXN0YW1wcyBhcmUgb2Z0ZW4gc3RvcmVkIGFzIGVwb2NoIHZhbHVlcy4gTG9vayBmb3IgbGFyZ2UgbnVtYmVycyBsaWtlIDE1NDYzMDA4MDAu',
    'Q29udmVydCB0aGUgZXBvY2ggdGltZXN0YW1wIHRvIGEgaHVtYW4tcmVhZGFibGUgZGF0ZS4gV2hhdCB5ZWFyIGRvZXMgaXQgcmVwcmVzZW50Pw=='
  ],
  g: [
    'VGhlIHZhdWx0IGhpbnQgbWVudGlvbnMgcmVhZGluZyBiZXR3ZWVuIHRoZSBsaW5lcy4gTG9vayBmb3IgYW4gYWNyb3N0aWMgaW4gb25lIG9mIHRoZSBlbWFpbHMu',
    'RmluZCB0aGUgZW1haWwgdGl0bGVkICJGaW5hbCB0cmFuc21pc3Npb24iIC0gdGhlIGZpcnN0IGxldHRlciBvZiBlYWNoIGxpbmUgc3BlbGxzIHRoZSBwYXNzd29yZC4='
  ],
  o: [
    'TXVsdGlwbGUgc291cmNlcyBtZW50aW9uIERlbnZlci4gQ3Jvc3MtcmVmZXJlbmNlIGNvb3JkaW5hdGVzIGZyb20gZW1haWxzLCBmaWxlcywgYW5kIGhleCBkdW1wcy4=',
    'VGhlIGNvcnJlY3QgZm9ybWF0IGlzIGRlY2ltYWwgZGVncmVlczogWFguWFhYWCwtWFhYLlhYWFggLSBvbmx5IG9uZSBzb3VyY2UgaGFzIHRoZSBleGFjdCBjb3JyZWN0IHZhbHVlcy4='
  ],
  e: [
    'VGhlIFBERiBkb2N1bWVudCBoYXMgYSBoaWRkZW4gbGF5ZXIuIExvb2sgZm9yIG1ldGFkYXRhIG9yIGNvbW1lbnRzIHRoYXQgYXJlbid0IHZpc2libGUu',
    'SW4gdGhlIFBERiBoaWRkZW4gbGF5ZXIsIGxvb2sgZm9yICdrZXlfZnJhZ19jJyAtIHRoZSB2YWx1ZSBpcyBpbiBoZXggZm9ybWF0ICgweFhYWFgpLg=='
  ],
  d: [
    'VGhyZWUgd29yZHMsIHRocmVlIGVuY29kaW5nIG1ldGhvZHM6IG1vcnNlIGNvZGUsIGFjcm9zdGljLCBhbmQgemVyby13aWR0aCBjaGFyYWN0ZXJzLg==',
    'Q1BVIHBhdHRlcm4sIGdpdCBjb21taXRzLCBhbmQgY29udGFjdHMgZmlsZSBlYWNoIGhpZGUgb25lIHdvcmQuIENvbm5lY3Qgd2l0aCBoeXBoZW5zLg=='
  ]
};

const _m: Record<string, string> = {
  alias: 'a', project: 'p', firstname: 'f', city: 'c', ssid: 's', year: 'y', flag: 'g',
  coords: 'o', enckey: 'e', codephrase: 'd'
};

let _r = 0;

export function getHint(level: string, hintIndex: number): string | null {
  if (++_r > 30) return null;
  const k = _m[level];
  if (!k || !_k[k]) return null;
  const h = _k[k];
  if (hintIndex < 0 || hintIndex >= h.length) return null;
  try { return _e(h[hintIndex]); } catch { return null; }
}

export function getHintCount(level: string): number {
  const k = _m[level];
  return k && _k[k] ? _k[k].length : 0;
}

export function resetHintCounter(): void {
  _r = 0;
}
