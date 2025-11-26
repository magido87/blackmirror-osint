'use client';

import { useState, useEffect } from 'react';
import { EMAILS, Email } from '@/data/emails';

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export default function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState(EMAILS);
  const [showList, setShowList] = useState(true);
  const isMobile = useIsMobile();

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read
    setEmails(prev => prev.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    ));
    // On mobile, switch to email view
    if (isMobile) {
      setShowList(false);
    }
  };

  const handleBack = () => {
    setShowList(true);
  };

  const unreadCount = emails.filter(e => !e.read).length;

  // Mobile: Show either list or email content
  if (isMobile) {
    if (showList) {
      return (
        <div className="h-full bg-[#0d0d12] overflow-y-auto">
          <div className="p-3 border-b border-white/5 sticky top-0 bg-[#0d0d12] z-10">
            <div className="text-sm font-medium text-gray-300">Inbox</div>
            <div className="text-xs text-gray-500">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
            </div>
          </div>

          {emails.map((email) => (
            <div
              key={email.id}
              className={`email-item ${!email.read ? 'unread' : ''}`}
              onClick={() => handleSelectEmail(email)}
            >
              <div className="email-from">
                {email.from.split('@')[0]}
                {!email.read && <span className="ml-2 text-cyan-400">●</span>}
              </div>
              <div className="email-subject">{email.subject}</div>
              <div className="email-date">{email.date}</div>
            </div>
          ))}
        </div>
      );
    } else if (selectedEmail) {
      return (
        <div className="h-full bg-[#0d0d12] flex flex-col">
          {/* Back button */}
          <button 
            onClick={handleBack}
            className="p-3 border-b border-white/5 text-left text-cyan-400 text-sm flex items-center gap-2"
          >
            ← Back to Inbox
          </button>
          
          {/* Email header */}
          <div className="p-3 border-b border-white/5 bg-[#151520]">
            <h2 className="text-base font-medium text-gray-200 mb-2">
              {selectedEmail.subject}
            </h2>
            <div className="text-xs text-gray-400 space-y-1">
              <div><span className="text-gray-500">From:</span> {selectedEmail.from}</div>
              <div><span className="text-gray-500">Date:</span> {selectedEmail.date}</div>
            </div>
          </div>

          {/* Email body */}
          <div className="flex-1 overflow-y-auto p-3">
            <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed">
              {selectedEmail.body}
            </pre>
          </div>
        </div>
      );
    }
  }

  // Desktop: Two-column layout
  return (
    <div className="h-full flex bg-[#0d0d12]">
      {/* Email list */}
      <div className="email-list w-72 overflow-y-auto">
        <div className="p-3 border-b border-white/5">
          <div className="text-sm font-medium text-gray-300">Inbox</div>
          <div className="text-xs text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All read'}
          </div>
        </div>

        {emails.map((email) => (
          <div
            key={email.id}
            className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''} ${!email.read ? 'unread' : ''}`}
            onClick={() => handleSelectEmail(email)}
          >
            <div className="email-from">
              {email.from.split('@')[0]}
              {!email.read && <span className="ml-2 text-cyan-400">●</span>}
            </div>
            <div className="email-subject">{email.subject}</div>
            <div className="email-date">{email.date}</div>
          </div>
        ))}
      </div>

      {/* Email content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedEmail ? (
          <>
            {/* Email header */}
            <div className="p-4 border-b border-white/5 bg-[#151520]">
              <h2 className="text-lg font-medium text-gray-200 mb-2">
                {selectedEmail.subject}
              </h2>
              <div className="text-sm text-gray-400 space-y-1">
                <div>
                  <span className="text-gray-500">From:</span> {selectedEmail.from}
                </div>
                <div>
                  <span className="text-gray-500">To:</span> {selectedEmail.to}
                </div>
                <div>
                  <span className="text-gray-500">Date:</span> {selectedEmail.date}
                </div>
              </div>
            </div>

            {/* Email body */}
            <div className="flex-1 overflow-y-auto p-4">
              <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed">
                {selectedEmail.body}
              </pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}

