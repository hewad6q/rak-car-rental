/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BusinessInfo } from '../types';

interface NavbarProps {
  business: BusinessInfo;
  isRtl: boolean;
  setIsRtl: (val: boolean) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ business, isRtl, setIsRtl, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Monitor Scroll for Glassmorphism & Shrinking Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Page Section Highlighting
  useEffect(() => {
    const sections = ['hero', 'fleet', 'why-us', 'offers', 'how-it-works', 'testimonials', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Center of viewport trigger
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Language Toggle
  const toggleLanguage = () => {
    const newVal = !isRtl;
    setIsRtl(newVal);
    if (newVal) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  const navLinks = [
    { label: isRtl ? 'الرئيسية' : 'Home', id: 'hero' },
    { label: isRtl ? 'الأسطول' : 'Fleet', id: 'fleet' },
    { label: isRtl ? 'المميزات' : 'About', id: 'why-us' },
    { label: isRtl ? 'العروض' : 'Offers', id: 'offers' },
    { label: isRtl ? 'تواصل معنا' : 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      id="main-nav"
      className={`sticky top-0 w-full transition-all duration-300 border-b border-[#E0E0E0] ${
        isScrolled 
          ? 'py-3 bg-white/92 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]' 
          : 'py-5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          id="nav-logo"
          onClick={() => onNavigate('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          {/* Black speed lines icon */}
          <svg className="w-8 h-8 text-[#0A0A0A] transition-transform duration-500 group-hover:skew-x-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 5H19L16 12H21L11 20L13 13H8L13 5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#0A0A0A] tracking-wider transition-colors duration-200">
              SPEED RENTAL
            </span>
            <span className="block text-[10px] uppercase font-semibold text-[#888888] tracking-widest mt-[-2px] text-right">
              RAK
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              id={`nav-link-${link.id}`}
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-medium transition-all duration-200 relative py-1 hover:text-[#0A0A0A] cursor-pointer ${
                activeSection === link.id 
                  ? 'text-[#0A0A0A] font-semibold' 
                  : 'text-[#444444]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A0A0A]" />
              )}
            </button>
          ))}
        </nav>

        {/* CONTROLS (AR/EN & BOOK CTA) */}
        <div id="nav-controls" className="hidden md:flex items-center gap-4">
          {/* RTL Toggle Button */}
          <button
            id="lang-toggle"
            onClick={toggleLanguage}
            className="px-3 py-1 text-xs border border-[#E0E0E0] rounded-md text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 bg-transparent cursor-pointer"
            title="Toggle Arabic Layout"
          >
            {isRtl ? 'EN' : 'العربية'}
          </button>

          {/* Premium Black CTA Button */}
          <button
            id="nav-cta"
            onClick={() => onNavigate('fleet')}
            className="px-5 py-2 text-xs font-bold bg-[#0A0A0A] text-white rounded-[4px] hover:bg-[#2E2E2E] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-none cursor-pointer"
          >
            {isRtl ? 'احجز الآن' : 'Book Now'}
          </button>
        </div>

        {/* MOBILE TRIGGER & LANG TOGGLE IN ROW */}
        <div className="flex md:hidden items-center gap-3">
          <button
            id="lang-toggle-mobile"
            onClick={toggleLanguage}
            className="px-2 py-1 text-[11px] border border-[#E0E0E0] rounded text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 bg-transparent"
          >
            {isRtl ? 'EN' : 'AR'}
          </button>
          
          <button
            id="mobile-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0A0A0A] hover:text-black text-xl p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

      </div>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <div 
        id="mobile-nav-overlay"
        className={`fixed inset-0 bg-white z-[10000] flex flex-col justify-center items-center gap-6 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        <button
          id="close-mobile-nav"
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-[#0A0A0A] text-2xl hover:text-black cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {navLinks.map((link) => (
          <button
            id={`mobile-nav-link-${link.id}`}
            key={link.id}
            onClick={() => handleLinkClick(link.id)}
            className={`text-2xl font-serif font-bold tracking-wider cursor-pointer ${
              activeSection === link.id ? 'text-[#0A0A0A]' : 'text-[#888888]'
            }`}
          >
            {link.label}
          </button>
        ))}

        <button
          id="mobile-nav-cta"
          onClick={() => handleLinkClick('fleet')}
          className="mt-6 px-8 py-3 bg-[#0A0A0A] text-white font-bold uppercase rounded-[4px] shadow-lg border-none cursor-pointer hover:bg-[#2E2E2E]"
        >
          {isRtl ? 'احجز الآن' : 'Book Now'}
        </button>
        
        <span className="text-xs text-[#888888] mt-12 font-mono">
          {business.phone} | Ras Al Khaimah
        </span>
      </div>
    </nav>
  );
}
