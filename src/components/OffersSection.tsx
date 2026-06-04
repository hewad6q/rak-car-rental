/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Promotion } from '../types';

interface OffersSectionProps {
  promotions: Promotion[];
  onBookRateClick: (categoryFilter: string) => void;
  isRtl: boolean;
}

export default function OffersSection({ promotions, isRtl }: OffersSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };
  
  // Filter active promotions
  const activeOffers = promotions.filter(p => p.active === true || p.isActive === true);

  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section id="offers" className="py-16 bg-[#F7F7F7] border-b border-[#E0E0E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] uppercase">
            {isRtl ? 'العروض الخاصة والترويجية' : 'Special Offers & Promotions'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] max-w-[560px] mx-auto text-sm">
            {isRtl
              ? 'وفر أكثر مع حملاتنا الحصرية وعروضنا الترويجية المخصصة لاحتياجات تواصلك.'
              : 'Save more with our exclusive seasonal campaigns and promotion coupons tailored for your commute.'}
          </p>
        </div>

        {/* Dynamic Promotional Banners Ribbons */}
        <div id="promotions-banners" className="flex flex-col gap-4">
          {activeOffers.map((p) => {
            const promoCodeValue = p.promoCode || p.code || '';
            const offerEmoji = p.emoji || '🎉';
            return (
              <div 
                id={`promo-${p.id}`}
                key={p.id} 
                className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 transition-all duration-300 border border-[#E0E0E0] bg-white hover:border-[#CCCCCC] text-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 flex-grow text-left">
                  <span className="text-3xl select-none">{offerEmoji}</span>
                  <div>
                    <h4 className="font-serif text-lg sm:text-lg font-extrabold mb-1 text-[#0A0A0A]">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#888888] max-w-xl">
                      {p.description}
                    </p>
                    {p.validUntil && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1.5 font-mono">
                        {isRtl ? 'صالح لغاية: ' : 'Until: '}{p.validUntil}
                      </p>
                    )}
                  </div>
                </div>

                {promoCodeValue && (
                  <button
                    id={`copy-code-${p.id}`}
                    onClick={() => handleCopyCode(promoCodeValue, String(p.id))}
                    className={`px-5 py-2.5 border rounded-[6px] text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      copiedId === String(p.id)
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                        : 'border-[#E0E0E0] bg-transparent text-[#888888] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {copiedId === String(p.id) ? (
                      <>
                        <i className="fa-solid fa-check"></i>
                        {isRtl ? 'تم النسخ!' : 'Copied!'}
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-copy"></i>
                        {isRtl ? 'نسخ القسيمة' : `Code: ${promoCodeValue}`}
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
