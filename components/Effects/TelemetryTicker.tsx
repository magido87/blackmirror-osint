'use client';

import { useEffect, useState, useRef } from 'react';

const LOG_TEMPLATES = [
  'SYS: Memory scan complete',
  'NET: Outbound request blocked (policy)',
  'USR: Session active - mchen',
  'USR: firiana_Control authenticated',
  'SEC: Anomaly score: {score}',
  'LOG: Evidence index updated',
  'SYS: Disk I/O spike detected',
  'NET: Connection attempt - DENIED',
  'SEC: File integrity check passed',
  'USR: Idle timeout warning',
  'SYS: Cache cleared',
  'LOG: Audit trail synced',
  'NET: DNS query logged',
  'SEC: Encryption verified',
  'SYS: Process monitor active',
  'USR: Clipboard access logged',
  'LOG: Forensic snapshot saved',
  'NET: Port scan detected - blocked',
  'SEC: Hash verification: OK',
  'SYS: Watchdog timer reset',
  'LOG: Activity logged to buffer',
];

interface LogEntry {
  id: number;
  time: string;
  message: string;
}

export default function TelemetryTicker() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateLog = (): string => {
    const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
    return template
      .replace('{score}', (0.5 + Math.random() * 0.5).toFixed(2));
  };

  const getTime = (): string => {
    // Always show 03:14:XX (frozen time with changing seconds)
    const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `03:14:${seconds}`;
  };

  useEffect(() => {
    // Initial logs
    const initialLogs: LogEntry[] = [];
    for (let i = 0; i < 5; i++) {
      initialLogs.push({
        id: i,
        time: getTime(),
        message: generateLog(),
      });
    }
    setLogs(initialLogs);
    setIdCounter(5);

    // Add new log every 3-6 seconds
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now(),
        time: getTime(),
        message: generateLog(),
      };
      
      setLogs(prev => {
        const updated = [...prev, newLog];
        // Keep only last 8 logs
        if (updated.length > 8) {
          return updated.slice(-8);
        }
        return updated;
      });
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-12 right-4 z-50 pointer-events-none">
      <div 
        ref={containerRef}
        className="w-72 h-28 overflow-hidden font-mono text-[10px] leading-relaxed text-right"
        style={{
          background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        {logs.map((log, index) => (
          <div 
            key={log.id}
            className="text-gray-500 opacity-70 hover:opacity-100 transition-opacity"
            style={{
              animation: 'fadeInLog 0.5s ease',
            }}
          >
            <span className="text-gray-600">[{log.time}]</span>{' '}
            <span className={
              log.message.includes('DENIED') || log.message.includes('blocked') 
                ? 'text-red-400/60' 
                : log.message.includes('OK') || log.message.includes('passed')
                ? 'text-green-400/60'
                : 'text-gray-500'
            }>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

