'use client';

import { useState, useEffect } from 'react';

interface Process {
  pid: number;
  name: string;
  cpu: string;
  mem: string;
  status: string;
  user: string;
}

const FAKE_PROCESSES: Process[] = [
  { pid: 1, name: 'systemd', cpu: '0.1%', mem: '12MB', status: 'running', user: 'root' },
  { pid: 234, name: 'sshd', cpu: '0.0%', mem: '8MB', status: 'sleeping', user: 'root' },
  { pid: 567, name: 'nginx', cpu: '0.2%', mem: '24MB', status: 'running', user: 'www' },
  { pid: 847, name: 'meridian-agent', cpu: '2.3%', mem: '156MB', status: 'running', user: 'system' },
  { pid: 1043, name: 'blackmirror.exe', cpu: '12.7%', mem: '1.2GB', status: 'running', user: 'SYSTEM' },
  { pid: 2381, name: 'auditd', cpu: '0.4%', mem: '32MB', status: 'sleeping', user: 'root' },
  { pid: 3902, name: 'specter-daemon', cpu: '??%', mem: '??MB', status: 'unstable', user: 'unknown' },
  { pid: 4201, name: 'evidence-collector', cpu: '1.1%', mem: '64MB', status: 'running', user: 'forensic' },
  { pid: 4362, name: 'cleanup-agent', cpu: '0.0%', mem: '0MB', status: 'QUARANTINED', user: 'BLOCKED' },
];

export default function SystemMonitor() {
  const [processes, setProcesses] = useState(FAKE_PROCESSES);
  const [flickerRow, setFlickerRow] = useState<number | null>(null);

  // Random flicker effect for specter-daemon
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlickerRow(3902);
        setTimeout(() => setFlickerRow(null), 200);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate CPU fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses(prev => prev.map(p => {
        if (p.name === 'blackmirror.exe') {
          const cpu = 10 + Math.random() * 5;
          return { ...p, cpu: `${cpu.toFixed(1)}%` };
        }
        return p;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400';
      case 'sleeping': return 'text-gray-400';
      case 'unstable': return 'text-amber-400';
      case 'QUARANTINED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#151520]">
        <div className="text-sm font-medium text-gray-300">System Processes</div>
        <div className="text-xs text-gray-500 mt-1">
          {processes.length} processes running
        </div>
      </div>

      {/* CPU Activity Pattern - Hidden clue */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#0a0a0f]">
        <div className="text-xs text-cyan-400 mb-2">CPU ACTIVITY PATTERN (anomaly detected)</div>
        <div className="font-mono text-xs text-green-400 tracking-wider">
          {/* CPU anomaly pattern - investigate */}
          ▓▓░ ░░░░ ▓▓▓ ░░░ ▓
        </div>
        <div className="text-[10px] text-gray-600 mt-1">
          Pattern repeating | Dash=high Dot=low | Check comm protocols
        </div>
      </div>

      {/* Network Status Widget */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#0a0a0f]">
        <div className="text-xs text-cyan-400 mb-2">NETWORK STATUS</div>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">MERIDIAN-SYS-VPN</span>
            <span className="text-green-400">[ACTIVE]</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">BLACKMIRROR-NODE-03</span>
            <span className="text-amber-400">[TIMEOUT]</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">FIRIANA-CONTROL</span>
            <span className="text-green-400">[ACTIVE]</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">EXTERNAL</span>
            <span className="text-red-400">[BLOCKED]</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Outbound: 0 KB/s (RESTRICTED)
        </div>
      </div>

      {/* Process list */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs font-mono">
          <thead className="bg-[#151520] sticky top-0">
            <tr className="text-gray-500">
              <th className="px-3 py-2 text-left">PID</th>
              <th className="px-3 py-2 text-left">NAME</th>
              <th className="px-3 py-2 text-right">CPU</th>
              <th className="px-3 py-2 text-right">MEM</th>
              <th className="px-3 py-2 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr 
                key={process.pid}
                className={`
                  border-b border-white/5 hover:bg-white/5
                  ${flickerRow === process.pid ? 'bg-red-500/20' : ''}
                  ${process.status === 'QUARANTINED' ? 'bg-red-900/10' : ''}
                  ${process.name === 'blackmirror.exe' ? 'bg-amber-900/10' : ''}
                `}
              >
                <td className="px-3 py-2 text-gray-500">{process.pid}</td>
                <td className={`px-3 py-2 ${
                  process.name === 'blackmirror.exe' ? 'text-amber-400' :
                  process.name === 'specter-daemon' ? 'text-red-400' :
                  'text-gray-300'
                }`}>
                  {process.name}
                </td>
                <td className={`px-3 py-2 text-right ${
                  parseFloat(process.cpu) > 10 ? 'text-amber-400' : 'text-gray-400'
                }`}>
                  {process.cpu}
                </td>
                <td className="px-3 py-2 text-right text-gray-400">{process.mem}</td>
                <td className={`px-3 py-2 ${getStatusColor(process.status)}`}>
                  {process.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 text-xs text-gray-500 border-t border-white/5 bg-[#151520]">
        ⚠ Some processes may be forensic artifacts
      </div>
    </div>
  );
}

