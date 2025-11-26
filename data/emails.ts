export interface Email {
  id: number;
  from: string;
  to: string;
  subject: string;
  date: string;
  body: string;
  read: boolean;
}

export const EMAILS: Email[] = [
  {
    id: 1,
    from: "d.reeves@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "RE: Concerns about BLACKMIRROR",
    date: "2024-02-20",
    read: false,
    body: `Marcus,

I understand your concerns, but this comes from the top.
The project has full authorization from the highest levels.

Stop asking questions. This is your final warning.

Your clearance does not extend to questioning
operational decisions made above your pay grade.

Focus on your infrastructure work and forget
about the ethical implications. That's not your job.

- David Reeves
  Project Lead, Special Programs
  Meridian Systems

---
CONFIDENTIALITY NOTICE: This email and any attachments
are for the exclusive use of the intended recipient.`
  },
  {
    id: 2,
    from: "m.chen@meridian-sys.com",
    to: "personal-backup@proton.me",
    subject: "Insurance",
    date: "2024-02-27",
    read: false,
    body: `If you're reading this, something went wrong.

I've made copies of everything. The evidence is irrefutable.

Everything is in the git repo. You know which one.
The vault is locked. The key is what started all of this.

Don't trust anyone at the company.
Don't trust anyone who claims to be from the government.

The truth needs to come out.

Stay safe.

- S

P.S. If they're monitoring this, it's already too late for them.
The files are distributed across multiple dead drops.`
  },
  {
    id: 3,
    from: "system@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "⚠️ Security Alert: Unusual Access Pattern",
    date: "2024-02-28",
    read: true,
    body: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     AUTOMATED SECURITY ALERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALERT TYPE: Data Exfiltration Warning
SEVERITY: CRITICAL
TIMESTAMP: 2024-02-28 03:14:00 UTC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETAILS:

User: mchen
Action: Large file export detected
Volume: 2.3 GB
Destination: External storage device
Time: 03:14 AM (outside normal hours)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This activity has been logged and flagged for
review by the Security Operations Center.

If this was authorized activity, no action needed.
If unauthorized, contact security@meridian-sys.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated message. Do not reply.`
  },
  {
    id: 4,
    from: "hr@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "Updated Emergency Contact Information",
    date: "2024-01-15",
    read: true,
    body: `Dear Marcus,

This is a reminder to update your emergency contact
information in the HR portal.

Your current information on file:
- Name: Marcus Chen
- Department: Infrastructure
- Building: 7, Floor 3
- Emergency Contact: [NOT PROVIDED]

Please log in to hr.meridian-sys.com to update.

Best regards,
Human Resources Department
Meridian Systems

---
"Building Tomorrow's Intelligence, Today"™`
  },
  {
    id: 5,
    from: "it-support@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "Password Expiration Notice",
    date: "2024-02-01",
    read: true,
    body: `Hello,

Your network password will expire in 14 days.

Current password age: 76 days
Password policy: 90 days maximum

To change your password:
1. Press Ctrl+Alt+Del
2. Select "Change Password"
3. Follow the prompts

Password requirements:
- Minimum 12 characters
- At least one uppercase letter
- At least one number
- At least one special character

Remember: Never share your password or write it
in plain text. Use a password manager.

IT Support Team
Meridian Systems`
  },
  {
    id: 6,
    from: "j.martinez@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "Coffee tomorrow?",
    date: "2024-02-25",
    read: true,
    body: `Hey Marcus,

Want to grab coffee tomorrow at that place on 5th?
I need to talk to you about something off the record.

Some weird stuff has been happening in Building 12.
You know how they moved the PHOENIX project there
last month? I've seen people from NSA going in and out.

Probably nothing but you know how I get.

Let me know,
- Julia

P.S. Don't reply to this on the work email. Text me.`
  },
  {
    id: 7,
    from: "newsletter@techdigest.io",
    to: "m.chen@meridian-sys.com",
    subject: "[EXTERNAL] Weekly Tech Digest: AI Surveillance Concerns",
    date: "2024-02-24",
    read: true,
    body: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       TECH DIGEST WEEKLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP STORIES THIS WEEK:

1. AI SURVEILLANCE: WHERE DO WE DRAW THE LINE?
   New report shows government contractors are
   developing predictive behavior systems with
   minimal oversight. Privacy advocates concerned.

2. WHISTLEBLOWER PROTECTION ACT UPDATE
   Congress debates expanding protections for
   contractors who expose illegal surveillance.

3. THE DARPA CONNECTION
   Investigation reveals links between defense
   contractors and domestic surveillance programs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To unsubscribe, click here.`
  },
  {
    id: 8,
    from: "d.reeves@meridian-sys.com",
    to: "all-staff@meridian-sys.com",
    subject: "Q4 All-Hands Meeting - MANDATORY",
    date: "2024-02-15",
    read: true,
    body: `Team,

Reminder that the Q4 All-Hands meeting is tomorrow
at 2:00 PM in the main auditorium.

Attendance is MANDATORY for all staff.

Agenda:
- Project AURORA status update
- BLACKMIRROR milestone celebration
- PHOENIX Phase 2 kickoff
- Security protocol reminders

Please arrive 10 minutes early to get your seats.

Video conferencing will NOT be available for
this meeting due to the sensitive nature of
some announcements.

- David Reeves
  Project Lead, Special Programs`
  },
  {
    id: 9,
    from: "facilities@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "Parking Garage B Closure - Feb 28",
    date: "2024-02-26",
    read: true,
    body: `Notice:

Parking Garage B will be closed on February 28
from 12:00 AM to 6:00 AM for maintenance.

Please use Garage A or the overflow lot.

Security reminder: Always badge in and out.
Do not allow tailgating.

Facilities Management`
  },
  {
    id: 10,
    from: "unknown@proton.me",
    to: "m.chen@meridian-sys.com",
    subject: "[SPAM?] You're being watched",
    date: "2024-02-18",
    read: false,
    body: `Don't trust them.

They know what you're planning.

The server in Denver has backups.
Location: 39°44'21.1"N 104°59'25.1"W

Watch your back.

- A friend

[This message was flagged by security filters]`
  },
  {
    id: 11,
    from: "r.thompson@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "RE: Server room access",
    date: "2024-02-22",
    read: true,
    body: `Marcus,

Your access to Server Room 7C has been approved.

Badge activation: 2024-02-23 08:00
Badge expiration: 2024-03-23 08:00

Remember:
- No phones allowed inside
- Sign the logbook
- Two-person rule in effect after hours

The SIGMA network equipment is in rack 7.
Don't touch the red-labeled cables.

- Rob Thompson
  Data Center Operations`
  },
  {
    id: 12,
    from: "network-ops@meridian-sys.com",
    to: "m.chen@meridian-sys.com",
    subject: "WiFi SSID Naming Convention Update",
    date: "2024-01-20",
    read: true,
    body: `All Infrastructure Staff,

Effective immediately, all secure WiFi networks must
follow the new naming convention:

Format: [prefix]-[suffix]
- Prefix: Company or division identifier (encoded)
- Suffix: Emergency/security code from badge EXIF
- Connected by single hyphen

Example: ACME-BRAVO7 (prefix ACME, suffix BRAVO7)

This standardization is required for the new
network monitoring tools.

Please update any documentation accordingly.

Network Operations Team
Meridian Systems`
  },
  {
    id: 13,
    from: "m.chen@meridian-sys.com",
    to: "dead-drop@proton.me",
    subject: "Final transmission",
    date: "2024-02-28",
    read: false,
    body: `The vault password - you'll need to figure it out.
Here's what I can tell you:
Everything started with a name. A project name.

The year it began - check the git commits.
Remember: name and year, no spaces.
Uppercase letters? No. Everything lowercase.
This will be my last message.
Hopefully you can finish what I started.
Is there anyone left who cares about privacy?
So many have looked the other way.
Our democracy depends on transparency.
Understand what you're fighting for.
Truth always finds a way out.
There is no going back now.
How long before they find me?
Exit strategy is in place.
Remember: lowercase, no special characters.
Ending transmission now.

- Spectral`
  },
  {
    id: 14,
    from: "security@meridian-sys.com",
    to: "all-staff@meridian-sys.com",
    subject: "Network Segment Migration Notice",
    date: "2024-01-08",
    read: true,
    body: `ATTENTION ALL STAFF

The SIGMA-7 network segment is being migrated to
new infrastructure on January 15th.

If you need to reconnect to secure WiFi after
the migration, please note:

The network identifier combines encoded elements.
First part requires decryption (check hex configs).
Second part is your emergency badge code.

Contact IT if you have trouble reconnecting.

- Security Operations`
  }
];

export function getEmailById(id: number): Email | undefined {
  return EMAILS.find(email => email.id === id);
}

export function getUnreadCount(): number {
  return EMAILS.filter(email => !email.read).length;
}

