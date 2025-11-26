'use client';

import { useState, useCallback, memo } from 'react';

// Fake websites that exist in this universe
const FAKE_WEBSITES: Record<string, { title: string; content: React.ReactNode }> = {
  'meridian-sys.com': {
    title: 'Meridian Systems - Defense Solutions',
    content: (
      <div className="min-h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-2xl font-bold">M</div>
            <div>
              <h1 className="text-3xl font-bold">MERIDIAN SYSTEMS</h1>
              <p className="text-blue-400">Building Tomorrow's Intelligence, Today™</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300">Meridian Systems is a leading defense contractor specializing in advanced intelligence solutions for government and military clients worldwide.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">500+</div>
              <div className="text-sm text-gray-400">Employees</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">$2.1B</div>
              <div className="text-sm text-gray-400">Annual Revenue</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">15+</div>
              <div className="text-sm text-gray-400">Active Projects</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 border-t border-slate-700 pt-4">
            © 2024 Meridian Systems Inc. All rights reserved. | Careers | Contact | Legal
          </div>
        </div>
      </div>
    )
  },
  'news.gov': {
    title: 'Federal News Service',
    content: (
      <div className="min-h-full bg-white text-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="border-b-4 border-blue-800 pb-2 mb-6">
            <h1 className="text-2xl font-serif font-bold text-blue-900">Federal News Service</h1>
            <p className="text-sm text-gray-500">Official Government News Portal</p>
          </div>
          <article className="mb-8">
            <h2 className="text-xl font-bold mb-2">DOD Awards $8.7M Contract to Meridian Systems</h2>
            <p className="text-sm text-gray-500 mb-3">February 15, 2024</p>
            <p className="text-gray-700 mb-4">The Department of Defense has awarded an $8.7 million contract to Meridian Systems for continued development of Project BLACKMIRROR, a classified initiative under the National Security Agency's oversight.</p>
            <p className="text-gray-700">Details of the project remain classified, but sources indicate it involves "predictive behavioral analysis" capabilities.</p>
          </article>
          <article className="mb-8">
            <h2 className="text-xl font-bold mb-2">Congressional Hearing on Surveillance Programs Postponed</h2>
            <p className="text-sm text-gray-500 mb-3">February 20, 2024</p>
            <p className="text-gray-700">The scheduled congressional oversight hearing on domestic surveillance programs has been postponed indefinitely, citing "national security concerns."</p>
          </article>
        </div>
      </div>
    )
  },
  'whistleblower.info': {
    title: 'Whistleblower Protection Resources',
    content: (
      <div className="min-h-full bg-amber-50 text-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6">
            <h1 className="text-xl font-bold text-amber-800">⚠️ Whistleblower Protection Resources</h1>
            <p className="text-sm text-amber-700">Know Your Rights. Stay Safe.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-bold mb-3">If You're Considering Blowing the Whistle:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Document everything with dates and evidence</li>
              <li>Use encrypted communication only</li>
              <li>Contact a lawyer BEFORE going public</li>
              <li>Consider contacting journalists at major outlets</li>
              <li>Know that retaliation is illegal under federal law</li>
            </ol>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-2">Secure Contact Points:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• SecureDrop: Various news organizations</li>
              <li>• Signal: End-to-end encrypted messaging</li>
              <li>• ProtonMail: Encrypted email service</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  'search.net': {
    title: 'Search.net - Web Search',
    content: (
      <div className="min-h-full bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-500">S</span>
            <span className="text-red-500">e</span>
            <span className="text-amber-500">a</span>
            <span className="text-blue-500">r</span>
            <span className="text-green-500">c</span>
            <span className="text-red-500">h</span>
          </h1>
          <div className="bg-white rounded-full shadow-lg px-6 py-4 flex items-center gap-4 mb-4">
            <span className="text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search the web..."
              className="flex-1 outline-none text-gray-700"
              disabled
            />
          </div>
          <p className="text-sm text-gray-500">Search functionality disabled in forensic mode</p>
          <div className="mt-8 text-xs text-gray-400">
            © 2024 Search.net | Privacy | Terms
          </div>
        </div>
      </div>
    )
  }
};

const BLOCKED_MESSAGE = (
  <div className="min-h-full bg-red-900/20 flex items-center justify-center p-8">
    <div className="bg-red-900/40 border border-red-500/50 rounded-lg p-8 text-center max-w-md">
      <div className="text-6xl mb-4">🚫</div>
      <h2 className="text-xl font-bold text-red-400 mb-2">CONNECTION BLOCKED</h2>
      <p className="text-gray-300 mb-4">
        External network access has been restricted by Meridian Systems Security Policy.
      </p>
      <div className="text-xs text-gray-500 font-mono">
        Error Code: NET_BLOCKED_BY_POLICY<br/>
        Contact: security@meridian-sys.com
      </div>
    </div>
  </div>
);

const NOT_FOUND = (url: string) => (
  <div className="min-h-full bg-gray-900 flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <div className="text-8xl mb-4">😕</div>
      <h2 className="text-xl font-bold text-gray-300 mb-2">Site Not Found</h2>
      <p className="text-gray-500 mb-4">
        The site <span className="text-cyan-400 font-mono">{url}</span> could not be reached.
      </p>
      <p className="text-xs text-gray-600">
        This may be a network restriction or the site doesn't exist.
      </p>
    </div>
  </div>
);

function WebBrowser() {
  const [url, setUrl] = useState('meridian-sys.com');
  const [inputUrl, setInputUrl] = useState('meridian-sys.com');
  const [history, setHistory] = useState<string[]>(['meridian-sys.com']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = useCallback((newUrl: string) => {
    const cleanUrl = newUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
    setUrl(cleanUrl);
    setInputUrl(cleanUrl);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cleanUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  const renderContent = () => {
    // Check if it's a known fake website
    const site = Object.keys(FAKE_WEBSITES).find(domain => url.includes(domain));
    if (site) {
      return FAKE_WEBSITES[site].content;
    }
    
    // Check for blocked external sites
    const blockedPatterns = ['google', 'facebook', 'twitter', 'youtube', 'reddit', 'github'];
    if (blockedPatterns.some(p => url.includes(p))) {
      return BLOCKED_MESSAGE;
    }
    
    // Unknown site
    return NOT_FOUND(url);
  };

  const getCurrentTitle = () => {
    const site = Object.keys(FAKE_WEBSITES).find(domain => url.includes(domain));
    return site ? FAKE_WEBSITES[site].title : url;
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d12]">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a24] border-b border-white/5">
        {/* Navigation buttons */}
        <button 
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          →
        </button>
        <button 
          onClick={() => navigate(url)}
          className="p-1.5 rounded hover:bg-white/10"
        >
          ↻
        </button>

        {/* URL bar */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="flex items-center bg-black/40 rounded px-3 py-1.5">
            <span className="text-gray-500 text-sm mr-2">🔒</span>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-300 outline-none font-mono"
              placeholder="Enter URL..."
            />
          </div>
        </form>

        {/* Bookmarks */}
        <div className="flex gap-1">
          {['meridian-sys.com', 'news.gov', 'whistleblower.info'].map(site => (
            <button
              key={site}
              onClick={() => navigate(site)}
              className="px-2 py-1 text-xs bg-white/5 rounded hover:bg-white/10 text-gray-400"
            >
              {site.split('.')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        {renderContent()}
      </div>

      {/* Status bar */}
      <div className="px-3 py-1 text-xs text-gray-500 bg-[#1a1a24] border-t border-white/5 flex justify-between">
        <span>{getCurrentTitle()}</span>
        <span className="text-amber-400">⚠ Limited network access</span>
      </div>
    </div>
  );
}

export default memo(WebBrowser);

