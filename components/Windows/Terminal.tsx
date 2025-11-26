'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const COMMAND_HISTORY_OUTPUT = `  142  cd /home/mchen/documents
  143  ls -la blackmirror/
  144  cat blackmirror/config.yaml
  145  git clone git@meridian-internal:spectral/blackmirror-exports.git
  146  cd blackmirror-exports
  147  git log --oneline
  148  vim .env.backup
  149  tar -czf evidence.tar.gz ./
  150  gpg --encrypt --recipient spectral@proton.me evidence.tar.gz
  151  scp evidence.tar.gz.gpg remote:/dead-drop/
  152  rm -rf evidence.tar.gz*
  153  history`;

const FS_STRUCTURE: Record<string, string[]> = {
  '/': ['EVIDENCE', 'PERSONAL', 'DEVTOOLS', 'home'],
  '/EVIDENCE': ['project_blackmirror.pdf', 'internal_audit.txt', 'employee_badge.png'],
  '/PERSONAL': ['notes.md', 'wifi_backup.cfg', 'vacation_draft.txt', 'encrypted.vault'],
  '/DEVTOOLS': ['terminal', 'hexdump'],
  '/home': ['mchen'],
  '/home/mchen': ['documents', '.bashrc', '.gitconfig'],
};

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'MERIDIAN SYSTEMS - Forensic Terminal v2.1' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/mchen');
  const [spectralModeUnlocked, setSpectralModeUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const addOutput = (content: string, type: 'output' | 'error' = 'output') => {
    setLines(prev => [...prev, { type, content }]);
  };

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Add command to history
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add input line
    setLines(prev => [...prev, { type: 'input', content: `${currentDir}$ ${trimmed}` }]);

    // Process commands
    switch (command) {
      case '':
        break;

      case 'help':
        addOutput(`Available commands:
  ls [path]     - List directory contents
  cat <file>    - Display file contents
  cd <path>     - Change directory
  pwd           - Print working directory
  whoami        - Display current user
  id            - Display user identity
  hostname      - Display system hostname
  uname [-a]    - Display system information
  history       - Show command history
  date          - Show system date
  uptime        - Show system uptime
  env           - Show environment variables
  ps            - Show running processes
  netstat       - Show network connections
  last          - Show login history
  df            - Show disk usage
  clear         - Clear terminal
  echo <text>   - Echo text
  file <path>   - Show file type info
  ping <host>   - Ping a host (restricted)
  curl <url>    - Fetch URL (restricted)
  man <cmd>     - Show manual page`);
        if (spectralModeUnlocked) {
          addOutput(`  spectral_mode - [UNLOCKED]`);
          addOutput(`  blackmirror   - Project status`);
        }
        break;

      case 'whoami':
        addOutput('mchen');
        break;

      case 'id':
        addOutput('uid=1042(mchen) gid=1042(mchen) groups=1042(mchen),27(sudo),100(users),1001(blackmirror-team)');
        break;

      case 'hostname':
        addOutput('MERIDIAN-WS-7');
        break;

      case 'uname':
        if (args.includes('-a')) {
          addOutput('Linux MERIDIAN-WS-7 5.15.0-92-generic #102-Ubuntu SMP x86_64 GNU/Linux');
        } else {
          addOutput('Linux');
        }
        break;

      case 'pwd':
        addOutput(currentDir);
        break;

      case 'date':
        addOutput('Tue Feb 28 03:14:00 UTC 2024');
        addOutput('⚠ System clock may be inaccurate');
        break;

      case 'uptime':
        addOutput(' 03:14:00 up 127 days, 14:22,  1 user,  load average: 0.42, 0.31, 0.28');
        break;

      case 'env':
        addOutput(`USER=mchen
HOME=/home/mchen
SHELL=/bin/bash
TERM=xterm-256color
LANG=en_US.UTF-8
PATH=/usr/local/bin:/usr/bin:/bin
HOSTNAME=MERIDIAN-WS-7
DISPLAY=:0
XDG_SESSION_TYPE=x11
MERIDIAN_ENV=production
PROJECT_ID=BLACKMIRROR
CLEARANCE_LEVEL=4
DB_HOST=[REDACTED]
API_KEY=[REDACTED]
BACKUP_KEY_FRAG_B=4rE=`);
        break;

      case 'ps':
        addOutput(`  PID TTY          TIME CMD
 1042 pts/0    00:00:00 bash
 4271 pts/0    00:00:02 blackmirror-agent
 4285 pts/0    00:00:00 ssh-agent
 4362 pts/0    00:00:00 ps`);
        break;

      case 'netstat':
        addOutput(`Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 10.47.3.142:443         198.51.100.47:52341     ESTABLISHED
tcp        0      0 10.47.3.142:8080        10.47.1.1:33921         ESTABLISHED
⚠ Some connections filtered by security policy`);
        break;

      case 'last':
        addOutput(`mchen    pts/0        10.47.1.50       Tue Feb 28 03:12   still logged in
mchen    pts/0        10.47.1.50       Mon Feb 27 22:15 - 23:45  (01:30)
mchen    pts/0        10.47.1.50       Mon Feb 27 09:00 - 18:30  (09:30)
mchen    pts/0        10.47.1.50       Sun Feb 26 14:00 - 16:22  (02:22)
reboot   system boot  5.15.0-92-generic Mon Oct 23 12:52   still running

wtmp begins Mon Oct 23 12:52:14 2023`);
        break;

      case 'df':
        addOutput(`Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       256G  187G   56G  77% /
/dev/sdb1       1.0T  823G  177G  83% /mnt/data
tmpfs            16G  2.3G   14G  15% /dev/shm
/dev/sdc1       128G   94G   28G  78% /mnt/backup`);
        break;

      case 'ping':
        addOutput('ping: socket: Operation not permitted');
        addOutput('⚠ Network diagnostics disabled by security policy');
        break;

      case 'curl':
      case 'wget':
        addOutput(`${command}: error: Network access restricted`);
        addOutput('Contact security@meridian-sys.com for exceptions');
        break;

      case 'man':
        if (!args[0]) {
          addOutput('What manual page do you want?');
        } else if (args[0] === 'spectral') {
          addOutput('No manual entry for spectral');
          addOutput('...but you found an easter egg 🥚');
        } else if (args[0] === 'blackmirror') {
          addOutput('BLACKMIRROR(7)            Meridian Manual           BLACKMIRROR(7)');
          addOutput('');
          addOutput('NAME');
          addOutput('       blackmirror - [CLASSIFIED]');
          addOutput('');
          addOutput('DESCRIPTION');
          addOutput('       [REDACTED]');
          addOutput('');
          addOutput('SEE ALSO');
          addOutput('       surveillance(1), oversight(7), constitution(4)');
        } else {
          addOutput(`No manual entry for ${args[0]}`);
        }
        break;

      case 'sudo':
        addOutput('[sudo] password for mchen:');
        setTimeout(() => {
          addOutput('Sorry, user mchen is not allowed to execute sudo on MERIDIAN-WS-7');
        }, 500);
        break;

      case 'exit':
        addOutput('logout');
        addOutput('Connection to forensic terminal closed.');
        break;

      case 'ssh':
        addOutput('ssh: connect to host: Network is unreachable');
        addOutput('⚠ SSH connections blocked in forensic mode');
        break;

      case 'git':
        if (args[0] === 'log') {
          addOutput(`commit k8l9m0n (HEAD -> main)
Author: Marcus Chen <m.chen@meridian-sys.com>
Date:   Tue Feb 28 03:10:00 2024

    Final cleanup before going dark

commit h7i8j9k
Author: M. Chen <m.chen@meridian-sys.com>
Date:   Tue Feb 28 02:45:00 2024

    Removed personal info before audit`);
        } else if (args[0] === 'status') {
          addOutput('On branch main');
          addOutput('nothing to commit, working tree clean');
        } else {
          addOutput(`git: '${args[0] || ''}' is not a git command.`);
        }
        break;

      case 'history':
        addOutput(COMMAND_HISTORY_OUTPUT);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'echo':
        addOutput(args.join(' '));
        break;

      case 'ls':
        const lsPath = args[0] ? resolvePath(args[0]) : currentDir;
        const contents = FS_STRUCTURE[lsPath];
        if (contents) {
          addOutput(contents.join('  '));
        } else {
          addOutput(`ls: cannot access '${args[0]}': No such file or directory`, 'error');
        }
        break;

      case 'cd':
        if (!args[0] || args[0] === '~') {
          setCurrentDir('/home/mchen');
        } else if (args[0] === '..') {
          const parts = currentDir.split('/').filter(Boolean);
          parts.pop();
          setCurrentDir('/' + parts.join('/') || '/');
        } else {
          const newPath = resolvePath(args[0]);
          if (FS_STRUCTURE[newPath]) {
            setCurrentDir(newPath);
          } else {
            addOutput(`cd: ${args[0]}: No such file or directory`, 'error');
          }
        }
        break;

      case 'cat':
        if (!args[0]) {
          addOutput('cat: missing operand', 'error');
        } else {
          const filePath = resolvePath(args[0]);
          // Simulate some file contents
          if (filePath.includes('.bashrc')) {
            addOutput(`# .bashrc
export PS1="\\u@meridian:\\w$ "
alias ll='ls -la'
alias cls='clear'
# Added 2019-03-15`);
          } else if (filePath.includes('.gitconfig')) {
            addOutput(`[user]
    name = M. Chen
    email = m.chen@meridian-sys.com
[core]
    editor = vim
[alias]
    st = status
    co = checkout`);
          } else {
            addOutput(`cat: ${args[0]}: Permission denied or file is binary`, 'error');
          }
        }
        break;

      case 'file':
        if (!args[0]) {
          addOutput('file: missing operand', 'error');
        } else {
          if (args[0].endsWith('.pdf')) {
            addOutput(`${args[0]}: PDF document, version 1.7 (encrypted)`);
          } else if (args[0].endsWith('.png') || args[0].endsWith('.jpg')) {
            addOutput(`${args[0]}: PNG image data, 4032 x 3024, 8-bit/color RGB`);
          } else if (args[0].endsWith('.vault')) {
            addOutput(`${args[0]}: data (AES-256 encrypted container)`);
          } else {
            addOutput(`${args[0]}: ASCII text`);
          }
        }
        break;

      case 'spectral_mode':
        if (spectralModeUnlocked) {
          addOutput('');
          addOutput('Initializing spectral protocol...');
          setTimeout(() => {
            addOutput('ERROR: Clearance level insufficient');
            addOutput('');
            addOutput("You're not supposed to see this.");
            addOutput('');
            addOutput('[CONNECTION TERMINATED]');
          }, 500);
        } else {
          addOutput(`${command}: command not found`, 'error');
        }
        break;

      case 'blackmirror':
        if (spectralModeUnlocked) {
          addOutput('Project BLACKMIRROR: STATUS UNKNOWN');
          addOutput('Last sync: 2024-02-28 03:14:00');
          addOutput('[ACCESS DENIED]');
        } else {
          addOutput(`${command}: command not found`, 'error');
        }
        break;

      default:
        addOutput(`${command}: command not found`, 'error');
    }
  };

  const resolvePath = (path: string): string => {
    if (path.startsWith('/')) return path;
    if (path.startsWith('~')) return '/home/mchen' + path.slice(1);
    
    const current = currentDir.split('/').filter(Boolean);
    const parts = path.split('/');
    
    for (const part of parts) {
      if (part === '..') {
        current.pop();
      } else if (part !== '.') {
        current.push(part);
      }
    }
    
    return '/' + current.join('/');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const parts = currentInput.split(' ');
      if (parts.length > 1) {
        const partial = parts[parts.length - 1];
        const dir = currentDir;
        const contents = FS_STRUCTURE[dir] || [];
        const match = contents.find(f => f.startsWith(partial));
        if (match) {
          parts[parts.length - 1] = match;
          setCurrentInput(parts.join(' '));
        }
      }
    }
  };

  // Unlock spectral mode after solving 5 challenges (check via prop or context)
  useEffect(() => {
    // For demo, unlock after a delay
    const timer = setTimeout(() => setSpectralModeUnlocked(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="terminal h-full cursor-text"
      onClick={() => inputRef.current?.focus()}
      ref={containerRef}
    >
      {/* Output lines */}
      {lines.map((line, i) => (
        <div 
          key={i} 
          className={`
            ${line.type === 'input' ? 'text-cyan-400' : ''}
            ${line.type === 'error' ? 'text-red-400' : ''}
          `}
        >
          {line.content}
        </div>
      ))}

      {/* Input line */}
      <div className="flex items-center">
        <span className="terminal-prompt">{currentDir}$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

