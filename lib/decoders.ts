// XOR decoder
export function xorDecode(hexBytes: number[], key: number): string {
  return hexBytes.map(byte => String.fromCharCode(byte ^ key)).join('');
}

// Parse hex string to byte array
export function parseHexString(hexStr: string): number[] {
  const cleaned = hexStr.replace(/0x/g, '').replace(/\s+/g, ' ').trim();
  return cleaned.split(' ').map(hex => parseInt(hex, 16));
}

// Base64 decode
export function base64Decode(input: string): string {
  try {
    return atob(input);
  } catch {
    return '[Invalid Base64]';
  }
}

// Base64 encode
export function base64Encode(input: string): string {
  try {
    return btoa(input);
  } catch {
    return '[Encoding Error]';
  }
}

// Zero-width character steganography decoder
export function decodeZeroWidth(input: string): string {
  const zeroWidthChars: Record<string, string> = {
    '\u200B': '0', // ZERO WIDTH SPACE
    '\u200C': '1', // ZERO WIDTH NON-JOINER
    '\u200D': '1', // ZERO WIDTH JOINER (alternate)
    '\uFEFF': ' ', // BYTE ORDER MARK (separator)
  };
  
  let binary = '';
  let result = '';
  
  for (const char of input) {
    if (char in zeroWidthChars) {
      const bit = zeroWidthChars[char];
      if (bit === ' ') {
        // Convert accumulated binary to character
        if (binary.length > 0) {
          const charCode = parseInt(binary, 2);
          if (charCode > 0 && charCode < 128) {
            result += String.fromCharCode(charCode);
          }
          binary = '';
        }
      } else {
        binary += bit;
        // Every 8 bits, convert to character
        if (binary.length === 8) {
          const charCode = parseInt(binary, 2);
          if (charCode > 0 && charCode < 128) {
            result += String.fromCharCode(charCode);
          }
          binary = '';
        }
      }
    }
  }
  
  // Handle remaining bits
  if (binary.length > 0) {
    const charCode = parseInt(binary.padEnd(8, '0'), 2);
    if (charCode > 0 && charCode < 128) {
      result += String.fromCharCode(charCode);
    }
  }
  
  return result;
}

// UTF-16 LE decoder
export function decodeUTF16LE(hexString: string): string {
  const bytes = hexString.split(' ').filter(b => b.length > 0);
  let result = '';
  
  for (let i = 0; i < bytes.length - 1; i += 2) {
    const low = parseInt(bytes[i], 16);
    const high = parseInt(bytes[i + 1], 16);
    const charCode = (high << 8) | low;
    
    // Skip BOM
    if (charCode === 0xFEFF) continue;
    
    if (charCode > 0 && charCode < 65536) {
      result += String.fromCharCode(charCode);
    }
  }
  
  return result;
}

// Hex dump formatter
export function formatHexDump(data: string): string {
  const lines: string[] = [];
  const bytes = data.split('').map(c => c.charCodeAt(0));
  
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const offset = i.toString(16).padStart(8, '0');
    const hex = chunk.map(b => b.toString(16).padStart(2, '0')).join(' ');
    const ascii = chunk.map(b => (b >= 32 && b < 127) ? String.fromCharCode(b) : '.').join('');
    
    lines.push(`${offset}  ${hex.padEnd(48)}  |${ascii}|`);
  }
  
  return lines.join('\n');
}

// Extract hidden data from text
export function extractHiddenCharacters(text: string): { visible: string; hidden: string } {
  const hiddenChars = ['\u200B', '\u200C', '\u200D', '\uFEFF', '\u00AD'];
  let hidden = '';
  let visible = '';
  
  for (const char of text) {
    if (hiddenChars.includes(char)) {
      hidden += char;
    } else {
      visible += char;
    }
  }
  
  return { visible, hidden };
}



