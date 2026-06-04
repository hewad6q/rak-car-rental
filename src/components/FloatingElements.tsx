/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface FloatingElementsProps {
  phoneFormatted: string;
  whatsappNumber: string;
  isRtl: boolean;
}

export default function FloatingElements({ phoneFormatted, whatsappNumber, isRtl }: FloatingElementsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Monitor Scroll for Back-To-Top button appearance
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check Cookie Consent state on startup
  useEffect(() => {
    const isAccepted = localStorage.getItem('speed_cookies_accepted');
    if (!isAccepted) {
      // Delay slightly for dramatic appearance
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('speed_cookies_accepted', 'true');
    setShowCookieBanner(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* FLOATING ACTION ANCHORS PANEL */}
      <div id="floating-actions" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 tracking-normal">
        
        {/* 1. BACK TO TOP BUTTON */}
        <button
          id="back-to-top"
          onClick={handleScrollToTop}
          className={`w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-sm shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none ${
            showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          title="Scroll Back To Top"
          aria-label="Back To Top"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>

        {/* 2. FLOATING CALL BUTTON */}
        <a
          id="floating-phone-dial"
          href={`tel:${phoneFormatted}`}
          className="w-12 h-12 rounded-full bg-[#0A0A0A] border border-[#0A0A0A] text-white flex items-center justify-center text-sm shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 phone-pulse relative group"
          title="Call Reservation Hot-line"
          aria-label="Call RAK Office"
        >
          <i className="fa-solid fa-phone"></i>
          {/* Tooltip trigger */}
          <span className="absolute right-14 bg-white text-[#0A0A0A] border border-[#E0E0E0] text-[10px] font-bold py-1 px-3 rounded-md uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none shadow-md">
            {isRtl ? 'اتصل بنا هاتفيًا!' : 'Call Office Now!'}
          </span>
        </a>

        {/* 3. FLOATING WHATSAPP CHAT BUTTON */}
        <a
          id="floating-whatsapp-chat"
          href={`https://wa.me/${whatsappNumber}?text=Hello%20Speed%20Rental%20RAK,%20I'd%20like%20to%20inquire%20about%20car%20rental%20availability.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 whatsapp-pulse relative group border border-neutral-200"
          title="Chat with reservation manager"
          aria-label="WhatsApp with us"
        >
          <i className="fa-brands fa-whatsapp text-2xl"></i>
          {/* Tooltip trigger */}
          <span className="absolute right-16 bg-white text-[#0A0A0A] border border-[#E0E0E0] text-[10px] font-bold py-1 px-3 rounded-md uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none shadow-md">
            {isRtl ? 'راسلنا عبر واتساب' : 'Chat With Us!'}
          </span>
        </a>

      </div>

      {/* FIXED COOKIE CONSENT BANNER SHEET */}
      {showCookieBanner && (
        <div id="cookie-banner" className="fixed bottom-0 left-0 w-full z-45 p-4 sm:p-6 bg-white border-t border-[#E0E0E0] shadow-2xl animate-[slideInUp_0.5s_ease-out_1]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-left">
            <p className="text-[#888888] font-light leading-relaxed max-w-4xl font-sans">
              🍪 {isRtl 
                ? 'ملفات تعريف الارتباط: نحن نستخدم ملفات تعريف الارتباط لتحسين تصفحك وقياس الأداء لموقعنا. بالاستمرار بالتصفح، نوافق على تشغيل سياسة الخصوصية.' 
                : 'We use premium standard cookies to gauge performance, study demographic metrics, and provide smooth client experiences. By using our Dubai supercar portal, you agree to our policies.'}
            </p>

            <div className="flex items-center gap-4 shrink-0 font-bold">
              <button
                id="cookie-decline"
                onClick={() => setShowCookieBanner(false)}
                className="text-neutral-500 hover:text-[#0A0A0A] transition-colors duration-150 text-xs uppercase cursor-pointer"
              >
                {isRtl ? 'رفض' : 'Decline'}
              </button>
              
              <button
                id="cookie-accept"
                onClick={handleAcceptCookies}
                className="px-6 py-2.5 bg-[#0A0A0A] text-white hover:bg-[#2E2E2E] text-xs uppercase rounded-[6px] transition-all duration-150 cursor-pointer shadow-md"
              >
                {isRtl ? 'موافق، قبول الكل' : 'Accept Cookies'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInUp {
          0% { transform: translate3d(0, 100%, 0); opacity: 0; }
          100% { transform: translate3d(0, 0, 0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
