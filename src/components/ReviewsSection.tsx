/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';
import { useEffect, useState } from 'react';

interface ReviewsSectionProps {
  isRtl: boolean;
  reviews?: any[];
}

export default function ReviewsSection({ isRtl, reviews: propsReviews }: ReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  useEffect(() => {
    if (propsReviews && propsReviews.length > 0) {
      setReviewsList(propsReviews.filter(r => r.visible !== false));
    } else {
      const stored = localStorage.getItem('speedrental_reviews');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setReviewsList(parsed.filter((r: any) => r.visible !== false));
        } catch {
          setReviewsList(TESTIMONIALS);
        }
      } else {
        setReviewsList(TESTIMONIALS);
      }
    }
  }, [propsReviews]);

  // Use a fallback in case lists are empty
  const activeReviews = reviewsList.length > 0 ? reviewsList : TESTIMONIALS;

  // Double list to create seamless infinite loop effect
  const doubledReviews = [...activeReviews, ...activeReviews];

  // Load rating and review specs dynamically
  const settingsStr = localStorage.getItem('speedrental_settings');
  let ratingValue = "4.3";
  let reviewCountVal = "20";
  let googleReviewsUrl = "https://maps.google.com/?q=2+Al+Nuwawir+St,+Al+Juwais,+Ras+Al+Khaimah,+UAE";
  if (settingsStr) {
    try {
      const bObj = JSON.parse(settingsStr);
      if (bObj.rating) ratingValue = bObj.rating.toString();
      if (bObj.reviewCount) reviewCountVal = bObj.reviewCount.toString();
      if (bObj.googleReviewsUrl) googleReviewsUrl = bObj.googleReviewsUrl;
    } catch {}
  }

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] text-center uppercase">
            {isRtl ? 'ماذا يقولون عنا في جوجل؟' : 'Verified Google Reviews'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] text-center max-w-[560px] mx-auto text-sm sm:text-base">
            {isRtl
              ? 'افخر بخدمة ورضاء آلاف العملاء المشتركين في رأس الخيمة وخارجها على مدار أكثر من 5 سنوات.'
              : 'Our five-star reputation is built customer-by-customer, offering transparent pricing and superior hospitality.'}
          </p>
        </div>

      </div>

      {/* Infinite Horizontal Auto-Scroller Carousel */}
      <div id="reviews-carousel-container" className="relative w-full overflow-hidden py-4 border-t border-b border-[#E0E0E0] bg-[#F7F7F7]">
        <div className="carousel-track select-none flex animate-[scroll_40s_linear_infinite]">
          {doubledReviews.map((r: any, i: number) => {
            const authorName = r.author || r.name;
            const ratingStars = r.rating || 5;
            return (
              <div 
                id={`review-card-${i}`}
                key={i} 
                className="w-[330px] sm:w-[350px] shrink-0 mx-4 bg-white p-6 rounded-[6px] border border-[#E0E0E0] hover:border-[#CCCCCC] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Five Black Stars row */}
                  <div className="flex gap-1 mb-4 text-[#0A0A0A] text-xs">
                    {Array.from({ length: ratingStars }).map((_, idx) => (
                      <i key={idx} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  
                  {/* Review Text block */}
                  <p className="text-sm text-[#888888] leading-relaxed font-light font-sans italic mb-4">
                    "{r.text}"
                  </p>
                </div>

                {/* Reviewer Details footer wrapper */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E0E0E0] text-xs">
                  <span className="font-sans font-bold text-[#0A0A0A] tracking-wide">
                    {authorName}
                  </span>

                  <span className="text-[#888888] flex items-center gap-1 font-sans">
                    <i className="fa-brands fa-google text-[#888888]"></i>
                    <span>via {r.source || 'Google'}</span>
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Overarching Aggregated Ratings badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center flex flex-col items-center justify-center gap-4">
        <div className="bg-white px-8 py-5 rounded-[6px] border border-[#E0E0E0] flex flex-col sm:flex-row items-center gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-serif text-3xl font-extrabold text-[#0A0A0A]">{ratingValue}</span>
              <div className="flex gap-0.5 text-[#0A0A0A] text-sm">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
            <p className="text-xs text-[#888888] mt-1 uppercase tracking-widest leading-none">
              {isRtl ? `استناداً إلى ${reviewCountVal} تقييم حقيقي` : `Aggregated on ${reviewCountVal} business reviews`}
            </p>
          </div>

          <a
            id="write-google-review"
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#0A0A0A] text-white hover:bg-[#2E2E2E] text-xs font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 shadow-md flex items-center gap-2 leading-none cursor-pointer"
          >
            <i className="fa-regular fa-star text-sm"></i>
            {isRtl ? 'اترك لنا تقييمًا' : 'Leave a Google Review'}
          </a>
        </div>
      </div>

    </section>
  );
}
