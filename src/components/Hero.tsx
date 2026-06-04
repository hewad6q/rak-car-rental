/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  isRtl: boolean;
}

export default function Hero({ onExploreClick, isRtl }: HeroProps) {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  // Generate lazy light particle coordinates to avoid re-renders
  useEffect(() => {
    const arr = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 4,
    }));
    setParticles(arr);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen hero-pulse-bg flex flex-col justify-center items-center overflow-hidden pt-24 px-4 sm:px-6 lg:px-8 text-center border-b border-[#2E2E2E]"
    >
      {/* Subtle White Spark Particles - Pure CSS Powered */}
      <div id="particle-container" className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 bg-white rounded-full opacity-20 animate-[floatUp_infinite_linear]"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>

      {/* Main Copy */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-8">
        
        {/* Animated Headline */}
        <h1 className="leading-none tracking-tight select-none">
          <span className="block text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-white uppercase tracking-wider">
            {isRtl ? 'قد بثقة في' : 'DRIVE IN'}
          </span>
          <span className="block text-6xl sm:text-8xl md:text-9xl font-serif italic font-bold text-white gold-text-glow tracking-wide mt-2">
            {isRtl ? 'فخامة' : 'LUXURY'}
          </span>
        </h1>

        {/* Dynamic Subheading */}
        <p className="mt-6 text-base sm:text-xl md:text-2xl text-[#AAAAAA] font-sans max-w-2xl font-light">
          {isRtl 
            ? 'تأجير سيارات متميزة في رأس الخيمة — تبدأ من 80 درهم / اليوم' 
            : 'Premium Car Rentals in Ras Al Khaimah — From AED 80 / Day'}
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-sans font-bold text-sm tracking-uppercase rounded transition-all duration-300 hover:bg-[#E0E0E0] hover:scale-[1.02] active:scale-95 shadow-[0_4px_24px_rgba(255,255,255,0.04)] border-none btn-lux-glow cursor-pointer"
          >
            <i className="fa-solid fa-car-side mr-2"></i> {isRtl ? 'اكتشف الأسطول' : 'Explore Our Fleet'}
          </button>
          
          <a
            id="hero-whatsapp-btn"
            href="https://wa.me/971506024221?text=Hello%20Speed%20Rental%20RAK,%20I'd%20like%20to%20inquire%20about%20car%20rental%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-1.5 border-white font-sans font-bold text-sm tracking-uppercase rounded transition-all duration-300 hover:bg-white hover:text-black flex items-center justify-center gap-2 cursor-pointer group"
          >
            <i className="fa-brands fa-whatsapp text-lg transition-colors duration-300"></i> {isRtl ? 'تواصل عبر واتساب' : 'WhatsApp Us Now'}
          </a>
        </div>

        {/* Performance Statistics Row */}
        <div className="mt-16 w-full max-w-4xl bg-[#111111] border-t border-[#2E2E2E] rounded-xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 py-8 w-full">
            <div className="flex flex-col items-center border-r border-[#2E2E2E]/50 last:border-r-0">
              <i className="fa-solid fa-face-smile text-white text-2xl mb-2"></i>
              <span className="font-mono text-2xl text-white font-semibold">500+</span>
              <span className="text-xs text-[#AAAAAA] font-sans uppercase tracking-widest mt-1">
                {isRtl ? 'عميل سعيد' : 'Happy Customers'}
              </span>
            </div>

            <div className="flex flex-col items-center border-r border-[#2E2E2E]/50 last:border-r-0 lg:border-r">
              <i className="fa-solid fa-key text-white text-2xl mb-2"></i>
              <span className="font-mono text-2xl text-white font-semibold">20+</span>
              <span className="text-xs text-[#AAAAAA] font-sans uppercase tracking-widest mt-1">
                {isRtl ? 'سيارة متاحة' : 'Cars Available'}
              </span>
            </div>

            <div className="flex flex-col items-center border-r border-[#2E2E2E]/50 last:border-r-0 sm:border-r">
              <i className="fa-solid fa-star text-white text-2xl mb-2"></i>
              <span className="font-mono text-2xl text-white font-semibold">4.3 ★</span>
              <span className="text-xs text-[#AAAAAA] font-sans uppercase tracking-widest mt-1">
                {isRtl ? 'تقييم جوجل' : 'Google Rating'}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <i className="fa-solid fa-award text-white text-2xl mb-2"></i>
              <span className="font-mono text-2xl text-white font-semibold">5+</span>
              <span className="text-xs text-[#AAAAAA] font-sans uppercase tracking-widest mt-1">
                {isRtl ? 'سنوات الخبرة' : 'Years Experience'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* SVG Custom Car Silhouette glides gently from right to left */}
      <div id="car-silhouette" className="absolute bottom-4 left-0 w-full overflow-hidden pointer-events-none py-2 z-1">
        <svg 
          className="w-48 h-12 text-white/4 fill-current animate-[driveSilhouette_16s_linear_infinite]" 
          viewBox="0 0 100 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 12c.5 0 1-.5 1-1h6c0 .5.5 1 1 1h4c2.5-1.5 5-1.5 8-4l4-3s2-.5 4 .5c2 1 4 3 6 3h8c1.5 0 2 .5 3 2l6 1.5c4 .5 5 1.5 5 2.5h1c.5 0 1 .5 1 1v2c0 .5-.5 1-1 1h-2a3 3 0 0 1-5.6 0H31a3 3 0 0 1-5.6 0H8c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h7zm14 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm24 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
        </svg>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
        }
        @keyframes driveSilhouette {
          0% {
            transform: translate3d(100vw, 0, 0);
          }
          100% {
            transform: translate3d(-20vw, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
