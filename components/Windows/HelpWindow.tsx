'use client';

import { useState } from 'react';

const HELP_SECTIONS = [
  {
    title: 'Overview',
    content: `Welcome to PROJECT BLACKMIRROR.

You are examining a forensic image from a seized workstation. Your task is to investigate the digital evidence and uncover the truth.

This is an OSINT (Open Source Intelligence) challenge. Everything you need to solve it is contained within this environment.

No external tools, downloads, or websites are required. All clues are in-browser.`
  },
  {
    title: 'Available Tools',
    content: `EVIDENCE & PERSONAL FOLDERS
Browse files like documents, images, and configuration files.

COMMS (Email Client)
Read recovered email correspondence.

DEVTOOLS
Access terminal emulator and hex viewer for technical analysis.

git-sync (Repository Browser)
Explore a recovered git repository with files and commit history.

Browser
Limited web access within the simulation.

System Monitor
View running processes and system status.

SUBMIT FINDINGS
Enter your answers to progress through the challenge.`
  },
  {
    title: 'Challenge Structure',
    content: `There are 10 levels to complete, ranging from introductory to extreme difficulty.

Levels 1-4: Foundation
Levels 5-7: Advanced
Levels 8-10: Expert

Details are intentionally omitted. Discovering what you need to find is part of the challenge.

Each level has 2 hints available. Using fewer hints results in a higher rank.

S Rank: 0 hints used
A Rank: 1-5 hints used  
B Rank: 6-12 hints used
C Rank: 13+ hints used`
  },
  {
    title: 'Tips',
    content: `• Examine everything carefully - files, metadata, configurations
• Not all information is immediately visible
• Different file types may require different approaches
• Some files may have encoding or hidden data
• Terminal commands can reveal system information
• Git repositories often contain sensitive data
• Pay attention to patterns and connections between files
• Take notes as you discover information`
  },
  {
    title: 'Technical Notes',
    content: `This simulation recreates a recovered workstation image.

The system clock shows 03:14 - the time the image was captured.

Some network functionality is restricted as part of the forensic environment.

All data is fictional and created for this challenge. No real persons, organizations, or events are depicted.`
  }
];

export default function HelpWindow() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#151520]">
        <div className="text-sm font-medium text-gray-300">
          Help & Information
        </div>
        <div className="text-xs text-gray-500 mt-1">
          PROJECT BLACKMIRROR - OSINT Challenge
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/5 bg-[#0a0a0f] p-2">
          {HELP_SECTIONS.map((section, index) => (
            <button
              key={section.title}
              onClick={() => setActiveSection(index)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                activeSection === index
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-medium text-cyan-400 mb-4">
            {HELP_SECTIONS[activeSection].title}
          </h2>
          <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
            {HELP_SECTIONS[activeSection].content}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/5 bg-[#151520] text-xs text-gray-500 text-center">
        Good luck, investigator.
      </div>
    </div>
  );
}

