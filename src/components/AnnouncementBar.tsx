/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

function getDefaultAnnouncements() {
  return [
    { id: 1, emoji: "🚗", text: "FREE Delivery in RAK City", active: true },
    { id: 2, emoji: "📞", text: "Call Now: 050 602 4221", active: true },
    { id: 3, emoji: "⭐", text: "Rated 4.3/5 on Google", active: true },
    { id: 4, emoji: "🕐", text: "Open Until Midnight", active: true }
  ];
}

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');

  const loadAnnouncements = () => {
    // 1. Check if closed on this local user terminal session
    const isClosed = localStorage.getItem('speed_rental_announcement_closed') === 'true';
    if (isClosed) {
      setIsVisible(false);
      return;
    }

    // 2. Check settings
    const settingsStored = localStorage.getItem("speedrental_settings");
    let settings = settingsStored ? JSON.parse(settingsStored) : {};
    if (settings.announcementBarEnabled === false) {
      setIsVisible(false);
      return;
    }

    // 3. Load announcements
    const stored = localStorage.getItem("speedrental_announcements");
    let announcements = [];
    if (stored) {
      try {
        announcements = JSON.parse(stored);
      } catch (e) {
        announcements = getDefaultAnnouncements();
      }
    } else {
      announcements = getDefaultAnnouncements();
      localStorage.setItem("speedrental_announcements", JSON.stringify(announcements));
    }

    const active = announcements.filter((a: any) => a.active === true || a.isActive === true);
    if (active.length === 0) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    const marqueeText = active.map((a: any) => 
      `${a.emoji || a.icon || ""} ${a.text}`
    ).join("    |    ");
    setDisplayText(marqueeText);
  };

  useEffect(() => {
    loadAnnouncements();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "speedrental_announcements" || e.key === "speedrental_settings") {
        loadAnnouncements();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("reload_announcements", loadAnnouncements);
    const interval = setInterval(loadAnnouncements, 1500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("reload_announcements", loadAnnouncements);
      clearInterval(interval);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('speed_rental_announcement_closed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      id="announcement-bar" 
      className="relative flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-white"
      style={{ 
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0A0A0A 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 6s ease infinite',
        borderBottom: '1px solid rgba(255,255,255,0.15)'
      }}
    >
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer font-bold tracking-[0.05em] uppercase">
          <span className="mx-8">{displayText}</span>
          <span className="mx-8">{displayText}</span>
        </div>
      </div>
      <button 
        id="close-announcement"
        onClick={handleDismiss}
        className="ml-4 h-6 w-6 flex items-center justify-center text-white opacity-75 hover:opacity-100 transition-all duration-200 cursor-pointer bg-transparent"
        aria-label="Dismiss Announcement"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
