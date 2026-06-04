/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';

interface ReviewsSectionProps {
  isRtl: boolean;
}

export default function ReviewsSection({ isRtl }: ReviewsSectionProps) {
  // Double list to create seamless infinite loop effect
  const doubledReviews = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 bg-[#111111] relative overflow-hidden border-b border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-comments text-xs text-[#AAAAAA]"></i> {isRtl ? 'آراء ورضا عملائنا' : 'Social Proof'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'ماذا يقولون عنا في جوجل؟' : 'Verified Google Reviews'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

      </div>

      {/* Infinite Horizontal Auto-Scroller Carousel */}
      <div id="reviews-carousel-container" className="relative w-full overflow-hidden py-4 border-t border-b border-[#2E2E2E] bg-[#0A0A0A]/40">
        <div className="carousel-track select-none flex animate-[scroll_40s_linear_infinite]">
          {doubledReviews.map((r, i) => (
            <div 
              id={`review-card-${i}`}
              key={i} 
              className="w-[330px] sm:w-[350px] shrink-0 mx-4 bg-[#1A1A1A] p-6 rounded border border-[#2E2E2E] hover:border-white transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Five White Stars row */}
                <div className="flex gap-1 mb-4 text-white text-xs">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <i key={idx} className="fa-solid fa-star"></i>
                  ))}
                </div>
                
                {/* Review Text block */}
                <p className="text-sm text-[#AAAAAA] leading-relaxed font-light font-sans italic mb-4">
                  "{r.text}"
                </p>
              </div>

              {/* Reviewer Details footer wrapper */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2E2E2E] text-xs">
                <span className="font-sans font-bold text-white tracking-wide">
                  {r.name}
                </span>

                <span className="text-[#AAAAAA] flex items-center gap-1">
                  <i className="fa-brands fa-google text-[#AAAAAA]"></i>
                  <span>via Google</span>
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Overarching Aggregated Ratings badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center flex flex-col items-center justify-center gap-4">
        <div className="bg-[#1A1A1A] px-8 py-5 rounded border border-[#2E2E2E] flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-serif text-3xl font-extrabold text-white">4.3</span>
              <div className="flex gap-0.5 text-white text-sm">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
            <p className="text-xs text-[#AAAAAA] mt-1 uppercase tracking-widest leading-none">
              {isRtl ? 'استناداً إلى 20 تقييم حقيقي' : 'Aggregated on 20 business reviews'}
            </p>
          </div>

          <a
            id="write-google-review"
            href="https://maps.google.com/?q=2+Al+Nuwawir+St,+Al+Juwais,+Ras+Al+Khaimah,+UAE"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black hover:bg-[#E0E0E0] text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 shadow-md flex items-center gap-2 leading-none cursor-pointer"
          >
            <i className="fa-regular fa-star text-sm"></i>
            {isRtl ? 'اترك لنا تقييمًا' : 'Leave a Google Review'}
          </a>
        </div>
      </div>

    </section>
  );
}
