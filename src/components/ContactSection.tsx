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
    <section id="contact" className="py-24 bg-white relative border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] text-center uppercase">
            {isRtl ? 'تواصل معنا وزُر مكتبنا' : 'Contact & Find Us'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] text-center max-w-[560px] mx-auto text-sm sm:text-base">
            {isRtl
              ? 'تواصل معنا في أي وقت أو قم بزيارة صالة عرضنا في قلب رأس الخيمة.'
              : 'Reach out to our reservation support desk or locate our clean luxury showroom in RAK.'}
          </p>
        </div>

        {/* Two-Column Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Contact details & Form */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8 h-full text-left">
            
            {/* Contact Details List */}
            <div className="flex flex-col gap-5 text-left font-sans text-xs sm:text-sm">
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-2 uppercase tracking-wide">
                {isRtl ? 'بيانات الاتصال والتوصيل' : 'Get In Touch'}
              </h3>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 shrink-0 rounded bg-[#F7F7F7] border border-[#E0E0E0] flex items-center justify-center text-[#0A0A0A] text-base">
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                <div>
                  <h4 className="font-bold text-[#0A0A0A] mb-0.5">{isRtl ? 'الموقع والعنوان ومقرنا' : 'Showroom Address'}</h4>
                  <p className="text-[#888888] font-light text-xs sm:text-sm">{business.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 shrink-0 rounded bg-[#F7F7F7] border border-[#E0E0E0] flex items-center justify-center text-[#0A0A0A] text-base">
                  <i className="fa-solid fa-phone-volume"></i>
                </span>
                <div>
                  <h4 className="font-bold text-[#0A0A0A] mb-0.5">{isRtl ? 'الهاتف المباشر للاستعلام' : 'Instant Reservation Call'}</h4>
                  <a href={`tel:${business.phoneFormatted}`} className="text-[#0A0A0A] font-semibold text-sm sm:text-base hover:underline transition-colors duration-200">
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 font-sans">
                <span className="w-10 h-10 shrink-0 rounded bg-[#F7F7F7] border border-[#E0E0E0] flex items-center justify-center text-[#0A0A0A] text-base">
                  <i className="fa-solid fa-clock-pulse"></i>
                </span>
                <div>
                  <h4 className="font-bold text-[#0A0A0A] mb-0.5">{isRtl ? 'ساعات وأيام العمل ومواعيدنا' : 'Operating Hours'}</h4>
                  <p className="text-[#888888] font-light text-xs sm:text-sm">{business.hours}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-[6px] p-6 sm:p-8 border border-[#E0E0E0] text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h4 className="font-sans text-base font-bold text-[#0A0A0A] mb-4 uppercase tracking-wider">
                {isRtl ? 'أرسل لنا استفساراً سريعاً' : 'Quick Enquiry Form'}
              </h4>

              {success ? (
                <div id="contact-success" className="p-4 rounded-[6px] bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm text-center font-bold">
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
                      className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-[6px] px-4 py-3 text-xs sm:text-sm text-[#0A0A0A] placeholder-[#888888] focus:outline-none focus:border-[#0A0A0A] focus:bg-white w-full transition-all duration-200"
                      required
                    />
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder={isRtl ? 'رقم الهاتف' : 'Phone / WhatsApp *'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-[6px] px-4 py-3 text-xs sm:text-sm text-[#0A0A0A] placeholder-[#888888] focus:outline-none focus:border-[#0A0A0A] focus:bg-white w-full transition-all duration-200"
                      required
                    />
                  </div>

                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder={isRtl ? 'اكتب استفسارك أو السيارة المطلوبة هنا...' : 'Write your request details or question here...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#F9F9F9] border border-[#E0E0E0] rounded-[6px] p-4 text-xs sm:text-sm text-[#0A0A0A] placeholder-[#888888] focus:outline-none focus:border-[#0A0A0A] focus:bg-white w-full transition-all duration-200"
                    required
                  ></textarea>

                  <button
                    id="submit-contact"
                    type="submit"
                    className="w-full py-3 bg-[#0A0A0A] text-white hover:bg-[#2E2E2E] text-xs font-bold uppercase tracking-wider rounded-[6px] transition-all duration-300 cursor-pointer shadow-md"
                  >
                    {isRtl ? 'إرسال الرسالة الآن' : 'Send Message'}
                  </button>

                </form>
              )}
            </div>

          </div>

          {/* RIGHT: Embedded Google Maps styled sleek and clean light gray */}
          <div className="lg:col-span-6 h-[400px] lg:h-auto min-h-[350px] relative rounded-[6px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E0E0E0]">
            <iframe
              id="showroom-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800.7493215886477!2d55.95540!3d25.77450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6366df0dbb0bb%3A0xda556cf8ff1c905d!2sAl%20Juwais%2C%20Ras%20al%20Khaimah%2C%20UAE!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(110%) brightness(100%)' }}
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
