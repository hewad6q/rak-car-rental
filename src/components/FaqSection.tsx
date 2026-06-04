/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { FAQS } from '../data';

interface FaqSectionProps {
  isRtl: boolean;
  faqs?: any[];
}

export default function FaqSection({ isRtl, faqs: propsFaqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqsList, setFaqsList] = useState<any[]>([]);

  useEffect(() => {
    if (propsFaqs && propsFaqs.length > 0) {
      setFaqsList(propsFaqs.filter(f => f.visible !== false));
    } else {
      const stored = localStorage.getItem('speedrental_faqs');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFaqsList(parsed.filter((f: any) => f.visible !== false));
        } catch {
          setFaqsList(FAQS);
        }
      } else {
        setFaqsList(FAQS);
      }
    }
  }, [propsFaqs]);

  const activeFaqs = faqsList.length > 0 ? faqsList : FAQS;

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-white relative border-b border-[#E0E0E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] text-center uppercase">
            {isRtl ? 'الأسئلة الأكثر تداولاً' : 'Frequently Asked Questions'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] text-center max-w-[560px] mx-auto text-sm sm:text-base">
            {isRtl
              ? 'كل ما تود معرفته عن شروط الإيجار والوثائق المطلوبة للتسليم والاستلام في رأس الخيمة.'
              : 'Find answers regarding security deposits, driver requirements, delivery terms, and international licenses.'}
          </p>
        </div>

        {/* Accordion List - 12 items */}
        <div id="faq-accordion-container" className="flex flex-col gap-4">
          {activeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                id={`faq-item-${idx}`}
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-[#E0E0E0] hover:border-[#CCCCCC] transition-all duration-300"
              >
                {/* Header click bar */}
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-neutral-50 select-none cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-[#0A0A0A] transition-colors duration-200">
                    {faq.question}
                  </span>
                  
                  <span className={`w-6 h-6 rounded-full border border-[#E0E0E0] text-[#0A0A0A] flex items-center justify-center text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#0A0A0A] text-white border-none' : 'rotate-0'}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>

                {/* Content collapsible slide with height transition */}
                <div 
                  id={`faq-content-${idx}`}
                  className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-56 opacity-100 py-5' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 text-xs sm:text-sm text-[#888888] font-light leading-relaxed font-sans text-left border-t border-[#F0F0F0]">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
