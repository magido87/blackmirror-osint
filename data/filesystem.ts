export interface FileNode {
  type: 'folder' | 'text' | 'image' | 'pdf' | 'config' | 'encrypted' | 'app';
  children?: string[];
  content?: string;
  visibleContent?: string;
  hiddenLayer?: string;
  base64?: string;
  exif?: Record<string, string | null>;
  encoding?: string;
  rawBytes?: string;
  hint?: string;
  contents?: Record<string, string>;
  encodedContents?: string;
  appType?: string;
  availableCommands?: string[];
}

export type FileSystem = Record<string, FileNode>;

export const FILESYSTEM: FileSystem = {
  "/EVIDENCE": {
    type: "folder",
    children: ["project_blackmirror.pdf", "internal_audit.txt", "employee_badge.png", "financial_summary_q3.pdf", "meeting_notes_feb.txt", "network_topology.txt"]
  },
  
  "/EVIDENCE/project_blackmirror.pdf": {
    type: "pdf",
    visibleContent: `╔══════════════════════════════════════════════════════════════╗
║                    [CLASSIFIED]                               ║
║              MERIDIAN SYSTEMS INTERNAL                        ║
╚══════════════════════════════════════════════════════════════╝

                    PROJECT BLACKMIRROR
                    ══════════════════
                    
DOCUMENT ID: MS-BM-T154-0042
CLASSIFICATION: TOP SECRET // NOFORN
DATE: 2024-01-15

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: PROJECT OVERVIEW

Objective: ████████████████████████████████████████████
           ████████████████████████████████████████████
           
Primary Function: Predictive behavioral analysis system
Target Deployment: [REDACTED]
Budget Allocation: $███,███,███

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2: TIMELINE

INIT_EPOCH: 1546300800 - Project initiated under D. Reeves
Q1 following year - Phase 1 complete
Q2+2 - ████████████████████
Q4+4 - Full operational capability achieved
Q1+5 - [CURRENT STATUS: ACTIVE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3: KEY PERSONNEL

Project Lead: D. Reeves (Clearance: TS/SCI)
Technical Lead: ██████████
Infrastructure: M. Chen (Clearance: Level 4)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    [END OF DOCUMENT]
                    
This document is the property of Meridian Systems.
Unauthorized disclosure is punishable under 18 U.S.C. § 798.`,
    hiddenLayer: "<!-- xml:meta author='D. Reeves' project='BLACKMIRROR' initiated_epoch='1546300800' status='ACTIVE' key_frag_c='0xC4D5' -->",
  },
  
  "/EVIDENCE/internal_audit.txt": {
    type: "text",
    content: `MERIDIAN SYSTEMS - INTERNAL SECURITY AUDIT
============================================
Date: 2024-02-28
Audit ID: SEC-2024-0228
Classification: INTERNAL USE ONLY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECURITY EVENT LOG - ANOMALIES DETECTED

[03:14:22] User 'spectral' accessed /blackmirror/core
[03:14:45] User 'spectral' initiated bulk data export
[03:15:03] User 'spectral' exported 2.3GB to external device
[03:15:47] User 'spectral' accessed /blackmirror/reports
[03:16:12] User 'spectral' deleted access logs (RECOVERED)
[03:16:34] User 'spectral' disconnected from secure network

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INVESTIGATOR NOTES:

- Username 'spectral' is an alias
- Real identity: UNKNOWN (investigation ongoing)
- Access method: Valid credentials (compromised?)
- Data exported: Project BLACKMIRROR core files
- Estimated breach severity: CRITICAL

ACTION ITEMS:
[X] Preserve audit logs
[X] Freeze account 'spectral'
[ ] Identify real user behind alias
[ ] Assess damage to project BLACKMIRROR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note: spectral = alias, real identity unknown
Further investigation required.

-- END OF AUDIT REPORT --`
  },
  
  "/EVIDENCE/employee_badge.png": {
    type: "image",
    base64: "BADGE_PLACEHOLDER",
    exif: {
      "Make": "Apple",
      "Model": "iPhone 14 Pro",
      "DateTime": "2024-01-15 09:23:41",
      "Software": "16.2",
      "GPSLatitude": null,
      "GPSLongitude": null,
      "ColorSpace": "sRGB",
      "ExifImageWidth": "4032",
      "ExifImageHeight": "3024",
      "UserComment": "Emergency suffix (ROT13+REV): 7-NZTFV",
    },
  },

  "/EVIDENCE/financial_summary_q3.pdf": {
    type: "pdf",
    visibleContent: `╔══════════════════════════════════════════════════════════════╗
║               MERIDIAN SYSTEMS                                ║
║           Q3 2023 FINANCIAL SUMMARY                           ║
╚══════════════════════════════════════════════════════════════╝

CONFIDENTIAL - INTERNAL USE ONLY

REVENUE BREAKDOWN BY PROJECT:

Project AURORA........... $12.4M
Project BLACKMIRROR...... $8.7M  
Project PHOENIX.......... $15.2M
Project SENTINEL......... $6.1M
Project WATCHDOG......... $4.3M
Infrastructure Ops....... $22.8M

TOTAL Q3 REVENUE: $69.5M

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADCOUNT BY DEPARTMENT:

Engineering.............. 234
Operations............... 156
Security................. 89
Administration........... 45

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Notes:
- BLACKMIRROR budget increase approved for Q4
- PHOENIX ahead of schedule
- SENTINEL contract renewal pending

Prepared by: Finance Department
Distribution: Executive Team Only`,
  },

  "/EVIDENCE/meeting_notes_feb.txt": {
    type: "text",
    content: `MEETING NOTES - PROJECT STATUS REVIEW
Date: 2024-02-14
Location: Conference Room 7B
Attendees: D. Reeves, J. Martinez, R. Thompson, M. Chen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AGENDA ITEM 1: BLACKMIRROR Status
- Phase 3 deployment on track
- Minor issues with data ingestion pipeline
- Chen to investigate network latency issues

AGENDA ITEM 2: Security Concerns
- Reeves: "Recent audit findings are concerning"
- Need to review access logs from Building 12
- Reminder: No unauthorized USB devices

AGENDA ITEM 3: PHOENIX Integration
- Timeline pushed to Q2
- Budget approval needed from DOD contact
- Martinez handling contractor coordination

AGENDA ITEM 4: Personnel
- New hire starting March 1 (Alex Wong)
- Background check pending for 2 contractors
- Chen requested PTO for week of March 15

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTION ITEMS:
[X] Reeves - Send updated project timeline
[ ] Chen - Review server logs for anomalies
[ ] Thompson - Update network diagrams
[ ] Martinez - Confirm contractor clearances

Next meeting: 2024-02-21

-- END OF NOTES --`
  },

  "/EVIDENCE/network_topology.txt": {
    type: "text",
    content: `MERIDIAN SYSTEMS - NETWORK TOPOLOGY
Document ID: NET-2024-0042
Last Updated: 2024-02-01
Classification: INTERNAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY DATA CENTER (BUILDING 7)

        [INTERNET]
            |
    [FIREWALL-PRIMARY]
            |
    [CORE SWITCH L3]
       /    |    \\
   VLAN   VLAN   VLAN
    10     20     30
   CORP   PROJ   SEC
            |
    [BLACKMIRROR-GW]
            |
    [INTERNAL SUBNET]
    10.47.0.0/16

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECURE ZONE (BUILDING 12)

    [AIR-GAPPED NETWORK]
            |
    [CLASSIFIED-SWITCH]
       /    |    \\
   PROJ   PROJ   PROJ
   ALPHA  BETA  GAMMA
   
   Note: SIGMA network isolated
   Access via physical security only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WIFI NETWORKS:
- MERIDIAN-GUEST (unencrypted)
- MERIDIAN-CORP (WPA3-Enterprise)
- MERIDIAN-SECURE (WPA3 + 802.1X)
- [REDACTED]-SIGMA7 (isolated)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact: netops@meridian-sys.com
Emergency: ext. 4747`
  },
  
  "/PERSONAL": {
    type: "folder",
    children: ["notes.md", "wifi_backup.cfg", "vacation_draft.txt", "encrypted.vault", "contacts.txt", "todo_list.txt", "screenshots"]
  },
  
  "/PERSONAL/notes.md": {
    type: "text",
    content: `# Random Thoughts

Just some things I need to remember...

## Personal
- Mom's birthday: March 7
- Gym locker combo: 4-15-23
- Car insurance renewal: April 2nd

## Work
- Project deadline pushed to Q2
- Meeting with David on Thursday
- Need to update security certs

## Shopping
- Coffee beans
- New headphones
- Birthday gift for mom

\u200B\u200C\u200C\u200B\u200B\u200C\u200C\u200B\u200B\u200C\u200C\u200B\u200C\u200C\u200C\u200C\u200B\u200C\u200C\u200C\u200B\u200B\u200C\u200B\u200B\u200C\u200C\u200C\u200B\u200C\u200B\u200B\u200B\u200C\u200C\u200B\u200B\u200B\u200C\u200C\u200B\u200C\u200C\u200B\u200C\u200C\u200C\u200C\u200B\u200C\u200C\u200B\u200C\u200C\u200B\u200B\u200B\u200C\u200C\u200B\u200C\u200C\u200B\u200B\u200B\u200C\u200C\u200B\u200C\u200B\u200B\u200C\u200B\u200C\u200C\u200B\u200C\u200C\u200C\u200B\u200B\u200C\u200C\u200C\u200B\u200B\u200C\u200C

---

Need to call David about the car situation...
He's been asking about the project too much lately.
Getting paranoid.`
  },
  
  "/PERSONAL/wifi_backup.cfg": {
    type: "config",
    content: `# Network Configuration Backup
# Exported: 2024-02-14
# Device: MERIDIAN-WS-7

[network]
interface=wlan0
ssid_hash=a1b2c3d4e5f6
channel=6
band=5GHz

[security]
type=WPA3-Enterprise
authentication=EAP-TLS

; SSID prefix (encoded storage)
; raw: 2f 27 30 2b 26 2b 23 2c 6f
; see system hex dump for decode method

[credentials]
cert_path=/etc/ssl/meridian/client.pem

[advanced]
power_save=disabled
roaming_threshold=-70
beacon_interval=100`
  },
  
  "/PERSONAL/vacation_draft.txt": {
    type: "text",
    encoding: "utf16le",
    rawBytes: "FF FE 50 00 6C 00 61 00 6E 00 6E 00 69 00 6E 00 67 00 20 00 74 00 72 00 69 00 70 00 20 00 74 00 6F 00 20 00 46 00 6F 00 72 00 74 00 20 00 43 00 6F 00 6C 00 6C 00 69 00 6E 00 73 00 20 00 6E 00 65 00 78 00 74 00 20 00 6D 00 6F 00 6E 00 74 00 68 00 2E 00 20 00 4D 00 69 00 73 00 73 00 20 00 74 00 68 00 65 00 20 00 6D 00 6F 00 75 00 6E 00 74 00 61 00 69 00 6E 00 73 00 2E 00",
    content: `ÿþP\x00l\x00a\x00n\x00n\x00i\x00n\x00g\x00 \x00t\x00r\x00i\x00p\x00...

[FILE ENCODING ERROR - Content appears corrupted]
[Detected: UTF-16LE with BOM]
[Use hex viewer or decoder to read]`
  },
  
  "/PERSONAL/encrypted.vault": {
    type: "encrypted",
    hint: "Read between the lines. The first letter of each line reveals all.",
    encodedContents: "V0hJU1RMRUJMT1dFUiBGSU5BTCBSRVBPUlQKPT09PT09PT09PT09PT09PT09PT09PT09PT09CgpJLCBNYXJjdXMgQ2hlbiwgaGVyZWJ5IGFmZmlybSB0aGF0IHRoZSBpbmZvcm1hdGlvbgpjb250YWluZWQgaW4gdGhpcyBkb2N1bWVudCBpcyB0cnVlIGFuZCBhY2N1cmF0ZS4KClByb2plY3QgQkxBQ0tNSVJST1IgaXMgYW4gaWxsZWdhbCBtYXNzIHN1cnZlaWxsYW5jZQpwcm9ncmFtIG9wZXJhdGluZyB3aXRob3V0IGNvbmdyZXNzaW9uYWwgb3ZlcnNpZ2h0LgoKRXZpZGVuY2UgaGFzIGJlZW4gcHJlc2VydmVkIGFuZCBkaXN0cmlidXRlZC4KCkZMQUd7U1VSVkVJTExBTkNFX0hBU19OT19PVkVSU0lHSFR9CgpUaGUgdHJ1dGggd2lsbCBjb21lIG91dC4KCi0gU3BlY3RyYWwK"
  },

  "/PERSONAL/contacts.txt": {
    type: "text",
    content: `PERSONAL CONTACTS
==================

FAMILY:
- Mom: 555-0142
- Sister (Lisa): 555-0187
- Uncle Bob: 555-0234

WORK:
- David Reeves (boss): 555-0311
- Julia Martinez: 555-0298
- Rob Thompson: 555-0345
- IT Support: ext. 4500
- Security Desk: ext. 4911

PERSONAL:
- Dr. Patel (dentist): 555-0422
- Auto shop: 555-0561
- Gym membership: 555-0633

EMERGENCY:
- Local PD (non-emergency): 555-0100
- FBI tip line: 1-800-CALL-FBI
- Lawyer (just in case): 555-0777

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note to self: Update this after move to CO

​‌‌​​​​‌​‌‌​​​‌‌​‌‌‌​‌​​​‌‌​‌​​‌​‌‌‌​‌‌​​‌‌​​​‌​‌`
  },

  "/PERSONAL/todo_list.txt": {
    type: "text",
    content: `TODO LIST - FEBRUARY 2024
==========================

URGENT:
[X] Backup all project files
[X] Set up encrypted email
[X] Document everything
[ ] Talk to a lawyer???
[ ] Contact press (NYT? WaPo?)

WORK:
[X] Fix network latency issue
[X] Update security certificates
[ ] Review access logs
[ ] Attend all-hands meeting

PERSONAL:
[ ] Cancel gym membership
[ ] Change oil in car
[ ] Pack for "vacation"
[ ] Close bank accounts (?)

DENVER TRIP:
[ ] Book one-way flight
[ ] Rent cabin (CASH ONLY)
[ ] Buy burner phone
[ ] Leave no trail
̶[̶ ̶]̶ ̶D̶e̶a̶d̶ ̶d̶r̶o̶p̶:̶ ̶3̶9̶.̶7̶3̶9̶2̶,̶-̶1̶0̶4̶.̶9̶9̶0̶3̶

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REMEMBER:
- Trust no one at work
- Don't use company devices for personal
- They're probably watching
- 39.7392 / -104.9903 (delete this)`
  },

  "/PERSONAL/screenshots": {
    type: "folder",
    children: ["key_backup.png", "key_fragment.dat", "error_20240215.txt", "system_log.txt"]
  },

  "/PERSONAL/screenshots/key_backup.png": {
    type: "image",
    base64: "CORRUPTED_PLACEHOLDER",
    exif: {
      "Make": "Samsung",
      "Model": "Galaxy S23",
      "DateTime": "2024-02-10 11:45:22",
      "Software": "Android 14",
      "GPSLatitude": null,
      "GPSLongitude": null,
      "ColorSpace": "sRGB",
      "ExifImageWidth": "1920",
      "ExifImageHeight": "1080",
      "UserComment": "KEY_FRAG_A: DEC 167.243",
    },
  },

  "/PERSONAL/screenshots/key_fragment.dat": {
    type: "text",
    content: `CORRUPTED KEY FRAGMENT
====================
Status: Partially recovered
Encryption: XOR (key unknown)

Encoded bytes (XOR'd):
b4 aa

Decoder hint: Same key as WiFi config
If decoded correctly, this is fragment D (final)`
  },

  "/PERSONAL/screenshots/error_20240215.txt": {
    type: "text",
    content: `SCREENSHOT METADATA
==================

Unable to display image: corrupted data

Original filename: error_20240215.png
Date: 2024-02-15 14:32:11
Size: 0 KB (corrupted)

Recovery attempt failed.

Note: This file was recovered from deleted items
but appears to have been overwritten.`
  },

  "/PERSONAL/screenshots/system_log.txt": {
    type: "text",
    content: `SYSTEM LOG EXPORT
=================
Date: 2024-02-27

[14:23:11] User mchen logged in
[14:25:33] Accessed /blackmirror/docs
[14:27:45] Downloaded project_brief.pdf
[14:28:12] Downloaded surveillance_report.xlsx
[14:30:00] Connected USB device: SANDISK-32GB
[14:32:55] File copy initiated: 2.3GB
[14:35:47] USB device ejected
[14:36:02] User navigated to /personal
[14:37:18] Encrypted archive created
[14:38:44] Archive moved to external storage
[14:39:01] User initiated log cleanup
[14:39:15] *** LOG TRUNCATED ***

Note: Partial log recovered by forensics team`
  },
  
  "/COMMS": {
    type: "app",
    appType: "email"
  },
  
  "/DEVTOOLS": {
    type: "folder",
    children: ["terminal", "hexdump"]
  },
  
  "/DEVTOOLS/terminal": {
    type: "app",
    appType: "terminal",
    availableCommands: ["ls", "cat", "whoami", "history", "pwd", "clear", "help", "date", "echo"]
  },
  
  "/DEVTOOLS/hexdump": {
    type: "app",
    appType: "hexviewer"
  },
  
  "/git-sync": {
    type: "app",
    appType: "git"
  }
};

export function getFile(path: string): FileNode | undefined {
  return FILESYSTEM[path];
}

export function getFolderContents(path: string): string[] {
  const folder = FILESYSTEM[path];
  if (folder?.type === 'folder' && folder.children) {
    return folder.children;
  }
  return [];
}

