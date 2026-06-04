/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BusinessInfo } from '../types';

interface FooterProps {
  business: BusinessInfo;
  onNavigate: (sectionId: string) => void;
  isRtl: boolean;
}

type ModalType = 'privacy' | 'terms' | 'sitemap' | null;

export default function Footer({ business, onNavigate, isRtl }: FooterProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const year = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const sitemapLinks = [
    { label: 'Top Banner', id: 'main-header' },
    { label: 'Hero Welcome', id: 'hero' },
    { label: 'Quick Reservation Widget', id: 'quick-booking-form' },
    { label: 'Exclusive Fleet Grid', id: 'fleet' },
    { label: 'Trust Signals', id: 'why-us' },
    { label: 'Offers & Rates plans', id: 'offers' },
    { label: 'Process Steps', id: 'how-it-works' },
    { label: 'Google Testimonials', id: 'testimonials' },
    { label: 'FAQs Accordion', id: 'faq' },
    { label: 'Contact Details & Route Map', id: 'contact' },
    { label: 'Secure Administrator Panel', hash: '#admin' }
  ];

  return (
    <footer id="main-footer" className="relative bg-[#0A0A0A] pt-16 pb-8 border-t border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-10">
        
        {/* Directory columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left font-sans text-xs sm:text-sm">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-widest leading-none">
              SPEED RENTAL <span className="text-[#AAAAAA] font-sans block text-xs tracking-wider mt-1">RAK</span>
            </h4>
            <p className="text-[#AAAAAA] font-light leading-relaxed max-w-xs text-xs sm:text-sm">
              {isRtl 
                ? 'سبيد لتأجير السيارات رأس الخيمة — توفر لك أسطولاً متميزاً وصيانة مثالية وتوصيلاً مجانياً لقيادة آمنة وبأسعار تبدأ من 80 درهماً يومياً.' 
                : 'Premium car hire in Ras Al Khaimah, UAE. Enjoy free city deliveries, comprehensive protection coverage, and a meticulously detailed fleet.'}
            </p>
            
            {/* Social icons row */}
            <div className="flex items-center gap-3 text-white text-base mt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200" aria-label="Follow us on Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200" aria-label="Follow us on Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://maps.google.com/?q=2+Al+Nuwawir+St,+Al+Juwais,+Ras+Al+Khaimah,+UAE" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200" aria-label="Find our showroom on Google Maps">
                <i className="fa-solid fa-map-location-dot"></i>
              </a>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="flex flex-col gap-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs sm:text-sm mb-1">{isRtl ? 'روابط سريعة' : 'Quick Navigation'}</h5>
            <button id="foot-link-home" onClick={() => handleLinkClick('hero')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'الرئيسية' : 'Home Page'}</button>
            <button id="foot-link-fleet" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'الأسطول المتميز' : 'Browse Fleet'}</button>
            <button id="foot-link-why" onClick={() => handleLinkClick('why-us')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'لماذا تختارنا' : 'Trust Signals'}</button>
            <button id="foot-link-offers" onClick={() => handleLinkClick('offers')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'العروض الحالية' : 'Pricing & Pass Plans'}</button>
            <button id="foot-link-contact" onClick={() => handleLinkClick('contact')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'تواصل معنا' : 'Contact & Address'}</button>
          </div>

          {/* Categories Col */}
          <div className="flex flex-col gap-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs sm:text-sm mb-1">{isRtl ? 'فئات السيارات' : 'Our Fleet Classes'}</h5>
            <button id="foot-class-eco" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'اقتصادية يومية' : 'Economy Cars'}</button>
            <button id="foot-class-sed" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'سيدان أنيقة' : 'Premium Sedans'}</button>
            <button id="foot-class-suv" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'دفع رباعي عائلي' : 'Family SUVs'}</button>
            <button id="foot-class-lux" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'سيارات فارهة' : 'Luxury Sports'}</button>
            <button id="foot-class-van" onClick={() => handleLinkClick('fleet')} className="text-[#AAAAAA] hover:text-white hover:underline text-left transition-colors duration-200 w-fit cursor-pointer">{isRtl ? 'حافلات وفان' : 'Passenger Vans'}</button>
          </div>

          {/* Info details Col */}
          <div className="flex flex-col gap-3 font-sans Address-block">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs sm:text-sm mb-1">{isRtl ? 'معلومات الاتصال' : 'Support desk'}</h5>
            <p className="text-[#AAAAAA] text-xs leading-relaxed font-light">
              <span className="font-semibold block text-white mb-0.5">{isRtl ? 'رقم الهاتف:' : 'Telephone Call'}</span>
              <a href={`tel:${business.phoneFormatted}`} className="text-white hover:underline text-xs sm:text-sm font-semibold">{business.phone}</a>
            </p>
            <p className="text-[#AAAAAA] text-xs leading-relaxed font-light mt-1">
              <span className="font-semibold block text-white mb-0.5">{isRtl ? 'موقع المكتب بموجب الخريطة:' : 'Showroom Coordinates'}</span>
              <span>{business.address}</span>
            </p>
            <p className="text-[#AAAAAA] font-mono text-[10px] mt-2 tracking-widest select-none uppercase">
              ★ {business.rating} Rating on Google Maps
            </p>
          </div>

        </div>

        {/* Thick divider lines */}
        <hr className="border-t border-[#2E2E2E]" />

        {/* Lower Row: Copyright / Policies buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-4 text-xs text-slate-500">
          <p className="font-sans font-light text-[#AAAAAA]">
            © {year} Speed Rental RAK. {isRtl ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center font-medium">
            <button id="policy-btn-privacy" onClick={() => handleOpenModal('privacy')} className="hover:text-white hover:underline transition-colors duration-200 cursor-pointer">{isRtl ? 'سياسة الخصوصية' : 'Privacy Code'}</button>
            <span className="inline-block text-white/10 select-none">|</span>
            <button id="policy-btn-terms" onClick={() => handleOpenModal('terms')} className="hover:text-white hover:underline transition-colors duration-200 cursor-pointer">{isRtl ? 'شروط الخدمة' : 'Terms & Conditions'}</button>
            <span className="inline-block text-white/10 select-none">|</span>
            <button id="policy-btn-sitemap" onClick={() => handleOpenModal('sitemap')} className="hover:text-white hover:underline transition-colors duration-200 cursor-pointer">{isRtl ? 'خريطة الموقع' : 'Sitemap Directory'}</button>
          </div>
        </div>

      </div>

      {/* POPUP LEGAL MODALS LAYOUT */}
      {activeModal && (
        <div id="legal-modal-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[6px] overflow-hidden shadow-2xl relative border border-[#E0E0E0] max-h-[85vh] flex flex-col">
            
            {/* Modal Top Title Bar */}
            <div className="p-5 bg-[#F7F7F7] border-b border-[#E0E0E0] flex items-center justify-between text-left shrink-0">
              <h4 className="font-sans text-base sm:text-lg font-bold text-[#0A0A0A] capitalize">
                {activeModal === 'privacy' && (isRtl ? 'سياسة الخصوصية والتأمين' : 'Privacy Policy & Cookie Statement')}
                {activeModal === 'terms' && (isRtl ? 'الشروط وقواعد الاستخدام' : 'Rental Agreements, Terms & Conditions')}
                {activeModal === 'sitemap' && (isRtl ? 'دليل وبنية الفهرسة' : 'Sitemap Directory Outline')}
              </h4>
              <button 
                id="close-legal-modal"
                onClick={handleCloseModal}
                className="text-[#888888] hover:text-[#0A0A0A] h-7 w-7 rounded border border-[#E0E0E0] flex items-center justify-center text-sm cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal scroll contents body */}
            <div className="p-6 overflow-y-auto text-left flex flex-col gap-4 font-sans text-xs sm:text-sm text-[#888888] leading-relaxed font-light">
              
              {/* PRIVACY POLICY CONTEXT */}
              {activeModal === 'privacy' && (
                <>
                  <p className="font-semibold text-[#0A0A0A]">Last Modified: June 2026</p>
                  <p>
                    Welcome to Speed Rental RAK Privacy Center. We protect all customers driver licenses, Emirates ID, Passport files, and credit card validation metrics strictly in accordance with Ras Al Khaimah and United Arab Emirates federal guidelines.
                  </p>
                  <h5 className="font-bold text-[#0A0A0A] uppercase text-xs mt-2">1. Data Collected & Storage</h5>
                  <p>
                    When processing car rentals, we collect identification credentials, state driving licenses, and contact parameters. This information is stored in locked offline servers and digital local storage to register Salik toll deductions and municipal transit fines.
                  </p>
                  <h5 className="font-bold text-[#0A0A0A] uppercase text-xs mt-2">2. Processing & Disclosure</h5>
                  <p>
                    Your records are never leased to third-party advert entities. We disclose credentials solely to RAK traffic authorities or law enforcement agencies upon direct demand for accidents resolution or speed limit fines administration.
                  </p>
                </>
              )}

              {/* TERMS & CONDITIONS CONTEXT */}
              {activeModal === 'terms' && (
                <>
                  <p className="font-semibold text-[#0A0A0A]">Effective Date: June 2026</p>
                  <p>
                    These rules govern all vehicle rentals executed with Speed Rental RAK in the showroom or via delivery points.
                  </p>
                  <h5 className="font-bold text-[#0A0A0A] uppercase text-xs mt-2">1. Age Requirement & Licenses</h5>
                  <p>
                    The client driver must be 21 years old or above. UAE residents must provide valid original UAE driving license. Tourists must present a valid International Driving Permit (IDP) alongside their national license.
                  </p>
                  <h5 className="font-bold text-[#0A0A0A] uppercase text-xs mt-2">2. Fuel Costs & Damage Fines</h5>
                  <p>
                    Vehicles are supplied matching specific fuel gauges and must be returned matching that level, otherwise refueling expenses apply. Standard comprehensive insurance is loaded, but if an accident report is labeled with driver negligence, the client bears the aggregate excess deductible fees in UAE courts.
                  </p>
                </>
              )}

              {/* SITEMAP REGISTER CONTEXT */}
              {activeModal === 'sitemap' && (
                <>
                  <p>Complete structural map pointing to indexed landing blocks to help search crawlers navigate our UAE supercar fleet website efficiently.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {sitemapLinks.map((link, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded bg-[#F7F7F7] border border-[#E0E0E0] font-mono text-[11px] hover:border-[#0A0A0A] transition-all duration-200 cursor-pointer">
                        <i className="fa-solid fa-link text-[#888888] text-xs"></i>
                        {link.hash ? (
                          <a href={link.hash} onClick={handleCloseModal} className="text-[#0A0A0A] hover:underline w-full text-left font-sans">{link.label} ({link.hash})</a>
                        ) : (
                          <button onClick={() => { handleLinkClick(link.id); handleCloseModal(); }} className="text-[#0A0A0A] hover:underline text-left cursor-pointer font-sans">{link.label} (#{link.id})</button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>

            {/* Modal Bottom Close bar */}
            <div className="p-4 bg-[#F7F7F7] border-t border-[#E0E0E0] flex justify-end shrink-0">
              <button
                id="close-legal-bottom"
                onClick={handleCloseModal}
                className="px-6 py-2.5 bg-[#0A0A0A] text-white hover:bg-[#2E2E2E] text-xs font-bold uppercase rounded-[6px] transition-colors duration-200 cursor-pointer"
              >
                {isRtl ? 'موافق وإغلاق' : 'Acknowledge & Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
