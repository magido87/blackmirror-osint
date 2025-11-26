export interface GitFile {
  name: string;
  content: string;
  hidden?: boolean;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

export interface GitRepo {
  name: string;
  owner: string;
  isPrivate: boolean;
  description: string;
  files: GitFile[];
  commits: GitCommit[];
  branches: string[];
}

export const FAKE_REPO: GitRepo = {
  name: "blackmirror-exports",
  owner: "spectral",
  isPrivate: true,
  description: "Backup of critical files - DELETE BEFORE AUDIT",
  
  files: [
    {
      name: "README.md",
      content: `# blackmirror-exports

Nothing to see here. Just personal backups.

> "The truth is rarely pure and never simple."
> - Oscar Wilde

---

*Last updated: 2024-02-28*`
    },
    {
      name: "config.yaml",
      content: `# Personal configuration backup

user:
  handle: spectral
  real_name: # removed
  department: Infrastructure
  clearance: 4
  employee_id: MC-EP1546-0742

locations:
  office: Building 7, Floor 3
  desk: 7F-2847
  home: # see vacation notes

preferences:
  editor: vim
  shell: zsh
  theme: dark
  
notes:
  - Remember to update security certificates
  - Meeting with D.R. on Thursday
  - Project deadline: Q2 2024`
    },
    {
      name: ".env.backup",
      hidden: true,
      content: `# Environment variables backup
# Created: 2024-01-10
# WARNING: Contains sensitive data

# Database
DB_HOST=internal.meridian.local
DB_PORT=5432
DB_NAME=blackmirror_prod
DB_USER=mchen
DB_PASS=Chen$ecure!

# API Keys (rotated monthly)
API_KEY=mk_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ
API_SECRET=sk_live_123456789abcdef

# Internal Services
LDAP_SERVER=ldap://auth.meridian-sys.com
LDAP_BIND_DN=cn=mchen,ou=users,dc=meridian

# Notes
# Yes I know hardcoding passwords is bad practice
# But IT takes forever to set up vault access
# Fight me - MC`
    },
    {
      name: "notes.txt",
      content: `Personal notes - encrypted version in vault

Timeline of events (days since epoch 1546300800):
- T+0: Joined Meridian, assigned to infrastructure
- T+366: First noticed anomalies in BLACKMIRROR traffic
- T+731: Started documenting irregularities
- T+1461: Confirmed illegal surveillance scope
- T+1827: Decision made to go public

Key evidence locations:
- Primary: encrypted.vault (local)
- Backup 1: [REDACTED]
- Backup 2: [REDACTED]

If you're reading this and I'm gone,
the truth is in the vault.

- S`
    },
    {
      name: "backup.sh",
      content: `#!/bin/bash
# Automated backup script
# Author: M. Chen
# Last modified: 2024-02-27

set -e

BACKUP_DIR="/mnt/external/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "[*] Starting backup at $TIMESTAMP"

# Backup critical files
tar -czf "$BACKUP_DIR/evidence_$TIMESTAMP.tar.gz" \\
    /home/mchen/documents/blackmirror/ \\
    /var/log/meridian/audit.log \\
    2>/dev/null

# Encrypt with GPG
gpg --symmetric --cipher-algo AES256 \\
    "$BACKUP_DIR/evidence_$TIMESTAMP.tar.gz"

# Clean up
rm "$BACKUP_DIR/evidence_$TIMESTAMP.tar.gz"

echo "[+] Backup complete: evidence_$TIMESTAMP.tar.gz.gpg"

# TODO: Add remote sync to dead drop
# ssh spectral@[REDACTED] "..."
`
    },
    {
      name: "project_status.md",
      content: `# Project Status Tracking

## Active Projects

### BLACKMIRROR
- Status: Phase 3 Deployment
- Lead: D. Reeves
- Team: 12 engineers
- Budget: $8.7M Q3

### PHOENIX
- Status: Phase 2 Planning
- Lead: J. Martinez  
- Team: 18 engineers
- Budget: $15.2M Q3

### AURORA
- Status: Maintenance Mode
- Lead: R. Thompson
- Team: 6 engineers
- Budget: $12.4M Q3

### SENTINEL
- Status: Contract Renewal
- Lead: A. Wong
- Team: 4 engineers
- Budget: $6.1M Q3

## Notes
- All projects have DOD oversight
- BLACKMIRROR has expanded scope (see internal memo)
- PHOENIX integration delayed to Q2`
    },
    {
      name: "credentials_old.txt",
      hidden: true,
      content: `OLD CREDENTIALS - DO NOT USE
=============================

These are old/rotated credentials kept for reference

Database (expired 2023-06):
  Host: db-legacy.meridian.local
  User: mc_admin
  Pass: Meridian2022!

API Keys (revoked):
  Old API: mk_test_oldkey123456
  Old Secret: sk_test_oldsecret789

VPN (old profile):
  Server: vpn-west.meridian-sys.com
  User: mchen_legacy
  Token: expired-token-xyz

NOTE: Current credentials in .env.backup`
    },
    {
      name: "denver_plan.txt",
      hidden: true,
      content: `CONTINGENCY PLAN - DENVER
=========================

If things go south:

1. Cabin booked: Horsetooth Hideaway
   - Paid with cash
   - Under name: Michael Carter
   - 2 weeks starting March 15

2. Contact points:
   - Reporter: Sarah Mitchell, WaPo
   - Lawyer: (get from uncle)
   - Backup email: echo7@proton.me

3. Evidence distribution:
   - Copy 1: USB dead drop (location TBD)
   - Copy 2: Encrypted cloud (Tresorit)
   - Copy 3: Physical - safety deposit

4. Exit route:
   - Fly to Denver (DEN)
   - Rent car with cash
   - Drive to cabin
   - Go dark for 2 weeks
   - Then... TBD

GPS: 39.7382, -104.9903 (not the cabin - typo?)`
    }
  ],
  
  commits: [
    {
      hash: "p1q2r3s",
      message: "Purged remaining traces from system",
      author: "spectral",
      date: "2024-02-28 03:14"
    },
    {
      hash: "n0o1p2q",
      message: "Ready for extraction - final checks done",
      author: "Marcus Chen",
      date: "2024-02-28 03:10"
    },
    {
      hash: "m9n0o1p",
      message: "Obfuscated all sensitive identifiers",
      author: "M. Chen",
      date: "2024-02-28 02:55"
    },
    {
      hash: "l8m9n0o",
      message: "Transferred backup to secure location",
      author: "spectral",
      date: "2024-02-28 02:45"
    },
    {
      hash: "k7l8m9n",
      message: "Organized evidence folders",
      author: "M. Chen",
      date: "2024-02-27 23:30"
    },
    {
      hash: "j6k7l8m",
      message: "Cleaned up after final review",
      author: "M. Chen",
      date: "2024-02-27 14:22"
    },
    {
      hash: "i5j6k7l",
      message: "Operational security measures implemented",
      author: "Marcus Chen",
      date: "2024-02-15 09:15"
    },
    {
      hash: "h4i5j6k",
      message: "Last chance to back out - staying committed",
      author: "spectral",
      date: "2024-02-10 16:40"
    },
    {
      hash: "g3h4i5j",
      message: "Added project status tracking",
      author: "Marcus Chen",
      date: "2024-02-05 11:30"
    },
    {
      hash: "f2g3h4i",
      message: "Added encrypted vault reference",
      author: "M. Chen",
      date: "2024-01-20 11:30"
    },
    {
      hash: "e1f2g3h",
      message: "Updated config with credentials",
      author: "M. Chen",
      date: "2024-01-15 09:00"
    },
    {
      hash: "a1b2c3d",
      message: "Initial commit - setting up backup repo",
      author: "Marcus Chen",
      date: "2024-01-10 08:00"
    }
  ],
  
  branches: ["main", "feature/secure-export"]
};

export function getFileByName(name: string): GitFile | undefined {
  return FAKE_REPO.files.find(f => f.name === name);
}

export function getVisibleFiles(): GitFile[] {
  return FAKE_REPO.files.filter(f => !f.hidden);
}

export function getAllFiles(): GitFile[] {
  return FAKE_REPO.files;
}

