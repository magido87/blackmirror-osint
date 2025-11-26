'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  icon: string;
}

const NOTIFICATIONS = [
  {
    title: 'SECURITY DAEMON',
    message: 'Unauthorized process detected (PID 4362)\nQuarantining...',
    icon: '🛡️',
  },
  {
    title: 'NETWORK MONITOR',
    message: 'Outbound connection blocked\nDestination: 198.51.100.47',
    icon: '🌐',
  },
  {
    title: 'INTEGRITY CHECK',
    message: 'Sector 0x7F2A: CORRUPTED\nAttempting recovery...',
    icon: '💾',
  },
  {
    title: 'MERIDIAN SYSTEMS',
    message: 'Session timeout in 47 minutes\nRe-authentication required',
    icon: '⏱️',
  },
  {
    title: 'AUDIT SYSTEM',
    message: 'Unusual access pattern detected\nLogging activity...',
    icon: '📋',
  },
];

interface NotificationSystemProps {
  solvedCount?: number;
}

function NotificationSystem({ solvedCount = 0 }: NotificationSystemProps) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const notificationIdRef = useRef(0);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Adjust frequency based on progress (more notifications as you progress)
    const baseInterval = 120000; // 2 minutes
    const interval = Math.max(30000, baseInterval - (solvedCount * 15000));

    const showRandomNotification = () => {
      if (Math.random() > 0.4) { // 60% chance
        const notif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
        notificationIdRef.current += 1;
        setActiveNotification({
          ...notif,
          id: notificationIdRef.current,
        });

        // Clear any existing dismiss timer
        if (dismissTimerRef.current) {
          clearTimeout(dismissTimerRef.current);
        }
        
        // Auto-dismiss after 4 seconds
        dismissTimerRef.current = setTimeout(() => {
          setActiveNotification(null);
        }, 4000);
      }
    };

    // Initial notification after 30 seconds
    const initialTimer = setTimeout(showRandomNotification, 30000);
    
    // Recurring notifications
    const recurringTimer = setInterval(showRandomNotification, interval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [solvedCount]);

  return (
    <AnimatePresence>
      {activeNotification && (
        <motion.div
          key={activeNotification.id}
          className="notification"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{activeNotification.icon}</span>
            <div>
              <div className="notification-title">{activeNotification.title}</div>
              <div className="notification-message">{activeNotification.message}</div>
            </div>
            <button
              onClick={() => setActiveNotification(null)}
              className="text-gray-500 hover:text-gray-300 ml-2"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(NotificationSystem);
