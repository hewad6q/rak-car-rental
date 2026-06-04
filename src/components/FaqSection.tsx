/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQS } from '../data';

interface FaqSectionProps {
  isRtl: boolean;
}

export default function FaqSection({ isRtl }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#0A0A0A] relative border-b border-[#2E2E2E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-circle-question text-xs text-[#AAAAAA]"></i> {isRtl ? 'الأسئلة الشائعة' : 'FAQ Accordion'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'الأسئلة الأكثر تداولاً' : 'Frequently Asked Questions'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* Accordion List - 12 items */}
        <div id="faq-accordion-container" className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                id={`faq-item-${idx}`}
                key={idx}
                className="bg-[#111111] rounded-xl overflow-hidden border border-[#2E2E2E] hover:border-white transition-all duration-300"
              >
                {/* Header click bar */}
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-white/2 select-none cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-white transition-colors duration-200">
                    {faq.question}
                  </span>
                  
                  <span className={`w-6 h-6 rounded-full border border-[#2E2E2E] text-white flex items-center justify-center text-xs transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white text-black border-none' : 'rotate-0'}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>

                {/* Content collapsible slide with height transition */}
                <div 
                  id={`faq-content-${idx}`}
                  className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-56 opacity-100 py-5' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 text-xs sm:text-sm text-[#AAAAAA] font-light leading-relaxed font-sans text-left border-t border-[#2E2E2E]">
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
