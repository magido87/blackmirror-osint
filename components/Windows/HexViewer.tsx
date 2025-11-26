'use client';

import { useState, memo } from 'react';
import { formatHexDump } from '@/lib/decoders';

// Sample hex data representing fragments of intercepted data
const HEX_DATA = `
00000000  4d 45 52 49 44 49 41 4e  20 53 59 53 54 45 4d 53  |MERIDIAN SYSTEMS|
00000010  0d 0a 50 52 4f 4a 45 43  54 3a 20 42 4c 41 43 4b  |..PROJECT: BLACK|
00000020  4d 49 52 52 4f 52 0d 0a  53 54 41 54 55 53 3a 20  |MIRROR..STATUS: |
00000030  41 43 54 49 56 45 0d 0a  0d 0a 2d 2d 2d 20 45 4e  |ACTIVE....--- EN|
00000040  43 52 59 50 54 45 44 20  42 4c 4f 43 4b 20 2d 2d  |CRYPTED BLOCK --|
00000050  2d 0d 0a 00 00 00 00 00  00 00 00 00 00 00 00 00  |-...............|
00000060  a3 f8 e2 b1 c4 d5 e6 f7  a8 b9 c0 d1 e2 f3 a4 b5  |................|
00000070  c6 d7 e8 f9 a0 b1 c2 d3  e4 f5 a6 b7 c8 d9 e0 f1  |................|
00000080  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000090  2d 2d 2d 20 45 4e 44 20  45 4e 43 52 59 50 54 45  |--- END ENCRYPTE|
000000a0  44 20 42 4c 4f 43 4b 20  2d 2d 2d 0d 0a 0d 0a 55  |D BLOCK ---...U|
000000b0  53 45 52 3a 20 73 70 65  63 74 72 61 6c 0d 0a 54  |SER: spectral..T|
000000c0  49 4d 45 3a 20 30 33 3a  31 34 3a 30 30 20 55 54  |IME: 03:14:00 UT|
000000d0  43 0d 0a 0d 0a 57 41 52  4e 49 4e 47 3a 20 55 6e  |C....WARNING: Un|
000000e0  61 75 74 68 6f 72 69 7a  65 64 20 64 61 74 61 20  |authorized data |
000000f0  65 78 70 6f 72 74 20 64  65 74 65 63 74 65 64 0d  |export detected.|
00000100  0a 0d 0a 54 61 72 67 65  74 3a 20 2f 62 6c 61 63  |...Target: /blac|
00000110  6b 6d 69 72 72 6f 72 2f  63 6f 72 65 2f 73 75 72  |kmirror/core/sur|
00000120  76 65 69 6c 6c 61 6e 63  65 2e 64 62 0d 0a 53 69  |veillance.db..Si|
00000130  7a 65 3a 20 32 2e 33 20  47 42 0d 0a 0d 0a 00 00  |ze: 2.3 GB......|
`.trim();

// Additional binary fragments for analysis
const BINARY_FRAGMENTS = [
  {
    label: 'memory_dump_0x7F00.bin',
    data: `
00007f00  45 56 49 44 45 4e 43 45  5f 4c 4f 47 5f 30 30 31  |EVIDENCE_LOG_001|
00007f10  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00007f20  5b 45 4e 43 52 59 50 54  45 44 5f 42 4c 4f 43 4b  |[ENCRYPTED_BLOCK|
00007f30  5f 52 45 51 55 49 52 45  53 5f 4b 45 59 5d 00 00  |_REQUIRES_KEY]..|
00007f40  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00007f50  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
    `.trim(),
  },
  {
    label: 'network_capture_03_14.pcap',
    data: `
00000000  d4 c3 b2 a1 02 00 04 00  00 00 00 00 00 00 00 00  |................|
00000010  ff ff 00 00 01 00 00 00  5f 5b 8c 65 00 00 00 00  |........_[.e....|
00000020  45 00 00 3c 1c 46 40 00  40 06 b1 e6 c0 a8 01 64  |E..<.F@.@......d|
00000030  c6 33 64 2f 00 50 1f 90  00 00 00 00 00 00 00 00  |.3d/.P..........|
00000040  70 02 fa f0 00 00 00 00  02 04 05 b4 01 01 04 02  |p...............|
    `.trim(),
  },
  {
    label: 'config_backup.dat',
    data: `
00000000  23 20 57 69 46 69 20 43  6f 6e 66 69 67 75 72 61  |# WiFi Configura|
00000010  74 69 6f 6e 20 42 61 63  6b 75 70 0d 0a 53 53 49  |tion Backup..SSI|
00000020  44 5f 58 4f 52 3a 20 32  66 20 32 37 20 33 30 20  |D_XOR: 2f 27 30 |
00000030  32 39 20 32 34 20 32 39  20 32 33 20 31 33 20 33  |29 24 29 23 13 3|
00000040  31 20 32 39 20 32 37 20  32 66 20 32 33 20 33 35  |1 29 27 2f 23 35|
00000050  0d 0a 4b 45 59 3a 20 30  78 34 32 0d 0a 00 00 00  |..KEY: 0x42.....|
    `.trim(),
  },
  {
    label: 'geolocator_cache.bin',
    data: `
00000000  47 45 4f 5f 43 41 43 48  45 5f 56 32 2e 31 00 00  |GEO_CACHE_V2.1..|
00000010  ff ff ff ff ff ff ff ff  ff ff ff ff ff ff ff ff  |................|
00000020  44 45 41 44 5f 44 52 4f  50 5f 4c 4f 43 00 00 00  |DEAD_DROP_LOC...|
00000030  33 39 2e 37 33 39 32 2c  2d 31 30 34 2e 39 39 30  |39.7392,-104.990|
00000040  33 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |3...............|
00000050  45 4e 44 5f 4f 46 5f 52  45 43 4f 52 44 00 00 00  |END_OF_RECORD...|
    `.trim(),
  },
];

function HexViewer() {
  const [selectedFragment, setSelectedFragment] = useState(0);
  const [showDecoded, setShowDecoded] = useState(false);

  const currentData = selectedFragment === 0 
    ? HEX_DATA 
    : BINARY_FRAGMENTS[selectedFragment - 1]?.data || '';

  const decodeASCII = (hexLine: string): string => {
    // Extract ASCII part from hex dump line
    const match = hexLine.match(/\|(.+)\|$/);
    return match ? match[1] : '';
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#151520]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-300">Hex Dump Viewer</div>
            <div className="text-xs text-gray-500 mt-1">Forensic Binary Analysis Tool</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDecoded(!showDecoded)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                showDecoded 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              {showDecoded ? 'HEX VIEW' : 'DECODE ASCII'}
            </button>
          </div>
        </div>
      </div>

      {/* Fragment selector */}
      <div className="px-4 py-2 border-b border-white/5 bg-[#0a0a0f] flex gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedFragment(0)}
          className={`px-3 py-1 text-xs font-mono rounded whitespace-nowrap transition-colors ${
            selectedFragment === 0
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          intercepted_data.bin
        </button>
        {BINARY_FRAGMENTS.map((frag, i) => (
          <button
            key={i}
            onClick={() => setSelectedFragment(i + 1)}
            className={`px-3 py-1 text-xs font-mono rounded whitespace-nowrap transition-colors ${
              selectedFragment === i + 1
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {frag.label}
          </button>
        ))}
      </div>

      {/* Hex content */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="font-mono text-xs leading-relaxed">
          {currentData.split('\n').map((line, i) => {
            const offset = line.substring(0, 8);
            const hexPart = line.substring(10, 58);
            const asciiPart = line.match(/\|(.+)\|$/)?.[1] || '';
            
            return (
              <div key={i} className="flex">
                <span className="text-cyan-600 select-none">{offset}</span>
                <span className="mx-2 text-gray-600 select-none">|</span>
                <span className={`text-gray-300 ${showDecoded ? 'hidden' : ''}`}>
                  {hexPart}
                </span>
                <span className={`text-amber-400/80 ${showDecoded ? '' : 'hidden'}`}>
                  {hexPart}
                </span>
                <span className="mx-2 text-gray-600 select-none">|</span>
                <span className={`${
                  asciiPart.includes('FLAG') || asciiPart.includes('spectral') 
                    ? 'text-green-400' 
                    : asciiPart.includes('ENCRYPTED') || asciiPart.includes('WARNING')
                    ? 'text-red-400'
                    : 'text-amber-400/60'
                }`}>
                  |{asciiPart}|
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#151520] flex items-center justify-between">
        <div className="text-xs text-gray-500">
          <span className="text-cyan-400">TIP:</span> Look for patterns in the ASCII column
        </div>
        <div className="text-xs text-gray-500 font-mono">
          {currentData.split('\n').length} lines
        </div>
      </div>
    </div>
  );
}

export default memo(HexViewer);

