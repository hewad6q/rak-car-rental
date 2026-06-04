/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BusinessInfo } from '../types';

interface ContactSectionProps {
  business: BusinessInfo;
  onContactSubmit: (data: { name: string; phone: string; message: string }) => void;
  isRtl: boolean;
}

export default function ContactSection({ business, onContactSubmit, isRtl }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContactSubmit(formData);
    setSuccess(true);
    setFormData({ name: '', phone: '', message: '' });
    
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-[#111111] relative border-b border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-compass text-xs text-[#AAAAAA]"></i> {isRtl ? 'اتصل بنا' : 'Stay Connected'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'تواصل معنا وزُر مكتبنا' : 'Contact & Find Us'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* Two-Column Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Contact details & Form */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8 h-full text-left">
            
            {/* Contact Details List */}
            <div className="flex flex-col gap-5 text-left font-sans text-xs sm:text-sm">
              <h3 className="font-serif text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                {isRtl ? 'بيانات الاتصال والتوصيل' : 'Get In Touch'}
              </h3>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 shrink-0 rounded bg-white/5 border border-[#2E2E2E] flex items-center justify-center text-white text-base">
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">{isRtl ? 'الموقع والعنوان ومقرنا' : 'Showroom Address'}</h4>
                  <p className="text-[#AAAAAA] font-light text-xs sm:text-sm">{business.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 shrink-0 rounded bg-white/5 border border-[#2E2E2E] flex items-center justify-center text-white text-base">
                  <i className="fa-solid fa-phone-volume"></i>
                </span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">{isRtl ? 'الهاتف المباشر للاستعلام' : 'Instant Reservation Call'}</h4>
                  <a href={`tel:${business.phoneFormatted}`} className="text-white font-semibold text-sm sm:text-base hover:underline transition-colors duration-200">
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 font-sans">
                <span className="w-10 h-10 shrink-0 rounded bg-white/5 border border-[#2E2E2E] flex items-center justify-center text-white text-base">
                  <i className="fa-solid fa-clock-pulse"></i>
                </span>
                <div>
                  <h4 className="font-bold text-white mb-0.5">{isRtl ? 'ساعات وأيام العمل ومواعيدنا' : 'Operating Hours'}</h4>
                  <p className="text-[#AAAAAA] font-light text-xs sm:text-sm">{business.hours}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-[#1A1A1A] rounded p-6 sm:p-8 border border-[#2E2E2E] text-left">
              <h4 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">
                {isRtl ? 'أرسل لنا استفساراً سريعاً' : 'Quick Enquiry Form'}
              </h4>

              {success ? (
                <div id="contact-success" className="p-4 rounded bg-white/5 border border-white/20 text-white text-xs sm:text-sm text-center font-bold">
                  <i className="fa-solid fa-circle-check mr-2"></i>
                  {isRtl 
                    ? 'تم إرسال استفسارك بنجاح! سيتصل بك فريقنا في أقرب فرصة.' 
                    : 'Your message was sent successfully. Our support team will register and reach you.'}
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={isRtl ? 'الاسم بالكامل' : 'Full Name *'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#0A0A0A] border border-[#2E2E2E] rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white w-full"
                      required
                    />
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder={isRtl ? 'رقم الهاتف' : 'Phone / WhatsApp *'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#0A0A0A] border border-[#2E2E2E] rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white w-full"
                      required
                    />
                  </div>

                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder={isRtl ? 'اكتب استفسارك أو السيارة المطلوبة هنا...' : 'Write your request details or question here...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#0A0A0A] border border-[#2E2E2E] rounded p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-white w-full"
                    required
                  ></textarea>

                  <button
                    id="submit-contact"
                    type="submit"
                    className="w-full py-3 bg-white text-black hover:bg-[#E0E0E0] text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 cursor-pointer"
                  >
                    {isRtl ? 'إرسال الرسالة الآن' : 'Send Message'}
                  </button>

                </form>
              )}
            </div>

          </div>

          {/* RIGHT: Embedded Google Maps styled sleek and dark */}
          <div className="lg:col-span-6 h-[400px] lg:h-auto min-h-[350px] relative rounded overflow-hidden shadow-2xl border border-[#2E2E2E]">
            <iframe
              id="showroom-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800.7493215886477!2d55.95540!3d25.77450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6366df0dbb0bb%3A0xda556cf8ff1c905d!2sAl%20Juwais%2C%20Ras%20al%20Khaimah%2C%20UAE!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(100%) contrast(120%) grayscale(100%) brightness(85%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Speed Rental RAK Showroom Route Map"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
