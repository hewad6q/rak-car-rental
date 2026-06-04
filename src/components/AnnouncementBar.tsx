/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isClosed = localStorage.getItem('speed_rental_announcement_closed') === 'true';
    if (isClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('speed_rental_announcement_closed', 'true');
  };

  return (
    <div 
      id="announcement-bar" 
      className="relative flex items-center justify-between bg-white text-[#0A0A0A] px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide border-b border-neutral-200"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          <span className="mx-8">🚗 FREE Delivery within Ras Al Khaimah City Limits</span>
          <span className="mx-8">📞 Call Right Now for Immediate Dispatch: 050 602 4221</span>
          <span className="mx-8">⭐ Rated 4.3/5 based on real Google Business Reviews</span>
          <span className="mx-8">🕐 Open Daily Until 12:00 AM Midnight</span>
        </div>
      </div>
      <button 
        id="close-announcement"
        onClick={handleDismiss}
        className="ml-4 h-6 w-6 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/15 text-[#0A0A0A] transition-colors duration-200 cursor-pointer"
        aria-label="Dismiss Announcement"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
