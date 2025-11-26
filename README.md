```
██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗
██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝
██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   
██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   
██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   
                                                          
██████╗ ██╗      █████╗  ██████╗██╗  ██╗                  
██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝                  
██████╔╝██║     ███████║██║     █████╔╝                   
██╔══██╗██║     ██╔══██║██║     ██╔═██╗                   
██████╔╝███████╗██║  ██║╚██████╗██║  ██╗                  
╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝                  
                                                          
███╗   ███╗██╗██████╗ ██████╗  ██████╗ ██████╗            
████╗ ████║██║██╔══██╗██╔══██╗██╔═══██╗██╔══██╗           
██╔████╔██║██║██████╔╝██████╔╝██║   ██║██████╔╝           
██║╚██╔╝██║██║██╔══██╗██╔══██╗██║   ██║██╔══██╗           
██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╔╝██║  ██║           
╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝           
```

# An Advanced OSINT Investigation Challenge

**Live:** [blackmirror-osint.netlify.app](https://blackimirror.netlify.app/)

---

## The Scenario

You are a forensic analyst examining a disk image recovered from the workstation of a suspected whistleblower. The subject, an employee at defense contractor Meridian Systems, allegedly exfiltrated classified documents related to a domestic surveillance program before disappearing.

The FBI's digital forensics team hit a wall. They recovered the data but couldn't crack the puzzles left behind. Now it's your turn.

Your mission: Analyze the evidence, decode the hidden messages, and answer 10 increasingly difficult questions to piece together the full story.

---

## What Makes This Different

This isn't your typical CTF. There are no downloads, no external tools required, no account creation. Everything runs entirely in your browser.

The challenge simulates a complete desktop environment with:

- Functional file explorer with nested directories
- PDF and image viewers with metadata inspection
- Terminal emulator with realistic command responses  
- Email client with recovered correspondence
- Git repository browser with commit history
- Hex dump viewer for binary analysis
- System monitor showing running processes

Every detail is intentional. The files, the timestamps, the error messages. Pay attention.

---

## Difficulty Progression

**Levels 1-4: Foundation**
Basic OSINT techniques. Reading documents, checking metadata, exploring the filesystem. If you've done any CTF before, these should be approachable.

**Levels 5-7: Advanced**  
Multiple encoding schemes, cross-referencing sources, steganography. You'll need to connect dots across different files and applications.

**Levels 8-10: Expert**
These are designed to be genuinely difficult. Expect to spend hours. Multiple encoding layers, fragmented data across sources, unconventional hiding methods. Only the most thorough investigators will complete all 10.

---

## Skills You'll Need

- Metadata analysis (EXIF, PDF properties, hidden layers)
- Encoding recognition (Base64, ROT13, XOR, hex)
- Steganography detection (zero-width characters, morse code)
- Pattern recognition across multiple documents
- Terminal/command line familiarity
- Git repository analysis
- Attention to detail

---

## Technical Implementation

Built with modern web technologies for a smooth experience:

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Client-side only (static export, no server required)
- Works in any modern browser

The entire challenge is self-contained. No network requests to external APIs, no tracking beyond basic analytics, no data collection.

---

## For Developers

### Local Setup

```bash
git clone https://github.com/magido87/blackmirror-osint.git
cd blackmirror-osint
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

Static output is generated in the `out` directory, ready for deployment to any static hosting platform.

---

## Solutions

Stuck? A password-protected solutions file is included in this repository. The password can be found by completing the challenge itself, or by those who truly need it.

Hint: The password relates to a location mentioned in the evidence.

---

## Disclaimer

All characters, organizations, events, and data in this challenge are entirely fictional. This project was created for entertainment and educational purposes within the OSINT and CTF community.

No actual surveillance programs, government agencies, defense contractors, or real persons are depicted. Any resemblance to real entities is coincidental.

---

## Credits

Created for the OSINT community. Share your completion times and ranks.

If you enjoyed this challenge, consider sharing it with others who might appreciate a good puzzle.

---

## License

MIT License. Feel free to fork, modify, and create your own challenges.

---

**Good luck, investigator. The truth is in there somewhere.**
