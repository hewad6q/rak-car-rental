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

export default function OffersSection({ promotions, onBookRateClick, isRtl }: OffersSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };
  
  const pricingCards = [
    {
      title: isRtl ? 'اشتراك يومي' : 'DAILY PASS',
      price: '80',
      period: isRtl ? 'يوميًا' : 'day',
      features: isRtl 
        ? ['تغطية تأمينية أساسية', 'صيانة متكاملة مجانية', 'توصيل مجاني داخل المدينة', 'دعم فني جاهز على مدار الساعة']
        : ['Basic Comprehensive Insurance', 'Complimentary Maintenance', 'Free Delivery within RAK City', '24/7 Helpline Support'],
      cta: isRtl ? 'احجز يومي' : 'Book Daily',
      category: 'Economy',
      popular: false,
    },
    {
      title: isRtl ? 'اشتراك أسبوعي' : 'WEEKLY SPEC',
      price: '500',
      period: isRtl ? 'أسبوعيًا' : 'week',
      features: isRtl 
        ? ['تغطية تأمينية كاملة ممتازة', 'صيانة وقود متكاملة', 'توصيل مخصص فوري لموقعك', 'أولوية قصوى للدعم والرد']
        : ['Full Comprehensive Insurance', 'Advanced Oil Maintenance', 'Free Home Delivery & Collection', 'Priority Helpline Response'],
      cta: isRtl ? 'احجز أسبوعي' : 'Book Weekly',
      category: 'All',
      popular: true,
    },
    {
      title: isRtl ? 'عقد شهري مميز' : 'MONTHLY RENTAL',
      price: '1800',
      period: isRtl ? 'شهريًا' : 'month',
      features: isRtl 
        ? ['تأمين شامل متكامل', 'تغيير مجاني للسيارة', 'توصيل وتفويض مجاني متكامل', 'دعم الحوادث والمساعدة بالطرق مجانًا']
        : ['Premium All-Inclusive Insurance', 'Free Vehicle Replacement Option', 'Free Express Home Delivery', 'Complimentary Roadside Recovery'],
      cta: isRtl ? 'احجز شهري' : 'Book Monthly',
      category: 'Luxury',
      popular: false,
    },
  ];

  return (
    <section id="offers" className="py-24 bg-[#0A0A0A] border-b border-[#2E2E2E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-percent text-xs text-[#AAAAAA]"></i> {isRtl ? 'أفضل العروض والأسعار' : 'Rates & Packages'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'العروض الممتازة والأسعار' : 'Offers & Pricing Plans'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {pricingCards.map((card, idx) => (
            <div 
              id={`price-card-${idx}`}
              key={idx}
              className={`bg-[#111111] rounded-2xl p-8 flex flex-col justify-between relative border transition-all duration-300 cursor-pointer ${
                card.popular 
                  ? 'border-white scale-102 shadow-[0_12px_44px_rgba(255,255,255,0.04)] md:-translate-y-4' 
                  : 'border-[#2E2E2E] hover:border-white'
              }`}
            >
              {card.popular && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-white text-black text-[10px] font-bold px-4 py-1 rounded uppercase tracking-widest">
                  {isRtl ? 'الأكثر طلبًا' : 'Most Popular'}
                </span>
              )}

              {/* Title and Price Info */}
              <div className="mb-6">
                <span className="text-[10px] sm:text-xs text-[#555555] font-bold uppercase tracking-widest mb-2 block">{card.title}</span>
                <div className="flex items-baseline gap-1 mt-1 font-mono">
                  <span className="text-sm text-white font-semibold">AED</span>
                  <span className="text-5xl font-extrabold text-white leading-none tracking-tight">{card.price}</span>
                  <span className="text-[#AAAAAA] text-sm">/{card.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3 py-6 border-t border-b border-[#2E2E2E] mb-8 text-xs sm:text-sm text-[#AAAAAA]">
                {card.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <i className="fa-regular fa-circle-check text-white text-xs mt-1"></i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA select button */}
              <button
                id={`price-cta-${idx}`}
                onClick={() => onBookRateClick(card.category)}
                className={`w-full py-3.5 rounded text-xs sm:text-sm font-bold tracking-uppercase transition-all duration-300 cursor-pointer ${
                  card.popular 
                    ? 'bg-white text-black hover:bg-[#E0E0E0] shadow-md border-none' 
                    : 'bg-transparent border border-[#2E2E2E] text-white hover:bg-white hover:text-black'
                }`}
              >
                {card.cta}
              </button>

            </div>
          ))}
        </div>

        {/* Dynamic Promotional Banners Ribbons */}
        <div id="promotions-banners" className="flex flex-col gap-5 max-w-4xl mx-auto">
          {promotions.filter(p => p.isActive).map((p) => (
            <div 
              id={`promo-${p.id}`}
              key={p.id} 
              className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 transition-all duration-300 border border-[#2E2E2E] bg-[#111111] hover:border-white text-white"
            >
              <div className="flex-grow text-left">
                <h4 className="font-serif text-lg sm:text-xl font-extrabold mb-1">
                  {p.title}
                </h4>
                <p className="text-xs text-[#AAAAAA] max-w-2xl">
                  {p.description}
                </p>
              </div>

              {p.code && (
                <button
                  id={`copy-code-${p.id}`}
                  onClick={() => handleCopyCode(p.code || '', p.id)}
                  className={`px-5 py-2.5 border rounded text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    copiedId === p.id
                      ? 'border-white bg-white text-black'
                      : 'border-[#2E2E2E] bg-transparent text-[#AAAAAA] hover:border-white hover:text-white'
                  }`}
                >
                  {copiedId === p.id ? (
                    <>
                      <i className="fa-solid fa-check"></i>
                      {isRtl ? 'تم النسخ!' : 'Copied!'}
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-copy"></i>
                      {isRtl ? 'نسغ رمز القسيمة' : `Copy Code: ${p.code}`}
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
