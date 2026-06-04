/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Car } from '../types';

interface FleetSectionProps {
  cars: Car[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onBookNowSubmit: (data: { name: string; phone: string; carId: string; pickupDate: string; returnDate: string; notes: string }) => void;
  isRtl: boolean;
}

export default function FleetSection({ cars, selectedCategory, setSelectedCategory, onBookNowSubmit, isRtl }: FleetSectionProps) {
  const [activeModalCar, setActiveModalCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', pickupDate: '', returnDate: '', notes: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['All', 'Economy', 'Sedan', 'SUV', 'Luxury', 'Van'];

  const filteredCars = selectedCategory === 'All' 
    ? cars 
    : cars.filter(c => c.category === selectedCategory);

  const handleOpenReserveModal = (car: Car) => {
    setActiveModalCar(car);
    setSubmitSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalCar) return;

    onBookNowSubmit({
      name: formData.name,
      phone: formData.phone,
      carId: activeModalCar.id,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      notes: formData.notes || `Booking request for ${activeModalCar.name}`
    });

    setSubmitSuccess(true);
    setTimeout(() => {
      setActiveModalCar(null);
      setFormData({ name: '', phone: '', pickupDate: '', returnDate: '', notes: '' });
      setSubmitSuccess(false);
    }, 2000);
  };

  const getStatusBadgeColor = (status: Car['status']) => {
    switch (status) {
      case 'Available': return 'bg-white text-black border border-neutral-200 shadow-sm';
      case 'Rented': return 'bg-[#2E2E2E] text-[#AAAAAA] border border-[#2E2E2E]';
      case 'Reserved': return 'bg-[#1A1A1A] text-[#555555] border border-[#555555]';
      default: return 'bg-[#2E2E2E] text-[#AAAAAA]';
    }
  };

  const getStatusBadgeLabel = (status: Car['status']) => {
    if (isRtl) {
      switch (status) {
        case 'Available': return 'متاحة حالياً';
        case 'Rented': return 'مؤجرة';
        case 'Reserved': return 'محجوزة';
      }
    }
    return status;
  };

  return (
    <section id="fleet" className="py-24 bg-[#0A0A0A] border-b border-[#2E2E2E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#AAAAAA] text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-car text-xs"></i> {isRtl ? 'أسطولنا الفاخر' : 'Exclusive Fleet'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'عرض أسطول سياراتنا' : 'Our Premium Fleet'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* Filter Sliders */}
        <div id="fleet-filter-tabs" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`filter-tab-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-white text-black shadow-lg border-none' 
                  : 'bg-transparent border border-[#2E2E2E] text-[#555555] hover:border-white hover:text-white'
              }`}
            >
              {isRtl 
                ? (cat === 'All' ? 'الكل' : cat === 'Economy' ? 'اقتصادية' : cat === 'Sedan' ? 'سيدان' : cat === 'SUV' ? 'الرباعي' : cat === 'Luxury' ? 'فاخرة' : 'فان')
                : cat
              }
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center text-[#AAAAAA] py-12">
            <i className="fa-solid fa-triangle-exclamation text-3xl text-[#555555] mb-4"></i>
            <p className="text-lg">{isRtl ? 'عذراً، لا توجد سيارات مطابقة لهذه الفئة حالياً' : 'No cars match this filter yet. Please check again soon.'}</p>
          </div>
        ) : (
          <div id="fleet-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div 
                id={`car-card-${car.id}`}
                key={car.id}
                className="bg-[#111111] rounded-xl overflow-hidden border border-[#2E2E2E] flex flex-col hover:border-white hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)] transition-all duration-300 group cursor-pointer"
              >
                
                {/* Car Image with Badge */}
                <div className="relative h-48 md:h-52 overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
                  <img 
                    src={car.imageUrl} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  
                  {/* Status Badge */}
                  <span className={`absolute top-4 right-4 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusBadgeColor(car.status)}`}>
                    {getStatusBadgeLabel(car.status)}
                  </span>

                  {/* Category Pill Tag */}
                  <span className="absolute bottom-4 left-4 text-[10px] font-semibold bg-[#2E2E2E] text-[#AAAAAA] px-2.5 py-0.5 rounded uppercase tracking-widest font-mono">
                    {isRtl 
                      ? (car.category === 'Economy' ? 'اقتصادي ' : car.category === 'Sedan' ? 'سيدان' : car.category === 'SUV' ? 'دفع رباعي' : car.category === 'Luxury' ? 'فاخرة' : 'فان')
                      : car.category
                    }
                  </span>
                </div>

                {/* Car Metrics Details */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white mb-2 tracking-wide">
                      {car.name}
                    </h3>
                    <div className="w-12 h-[2px] bg-white/10 rounded-full"></div>
                  </div>

                  {/* Feature Icons Row */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-[#2E2E2E] text-center text-[11px] text-[#555555] font-sans">
                    <div className="flex flex-col items-center gap-1" title="Seating Capacity">
                      <i className="fa-solid fa-users text-[#555555] text-sm"></i>
                      <span>{car.seats} {isRtl ? 'مقاعد' : 'Seats'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="Gearbox">
                      <i className="fa-solid fa-gauge-high text-[#555555] text-sm"></i>
                      <span>{isRtl ? (car.transmission === 'Automatic' ? 'تلقائي' : 'يدوي') : car.transmission}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="AC System">
                      <i className="fa-solid fa-snowflake text-[#555555] text-sm"></i>
                      <span>{isRtl ? 'مكيف' : 'Climate'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="Fuel Engine">
                      <i className="fa-solid fa-gas-pump text-[#555555] text-sm"></i>
                      <span>{isRtl ? 'بنزين' : car.fuel}</span>
                    </div>
                  </div>

                  {/* Price Block & Action CTAs */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#555555] uppercase tracking-widest">{isRtl ? 'السعر اليومي' : 'DAILY RATE'}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-white font-semibold">AED</span>
                        <span className="text-3xl font-mono font-bold text-white tracking-wider leading-none">
                          {car.price}
                        </span>
                        <span className="text-[#AAAAAA] text-xs font-light">/{isRtl ? 'يوم' : 'day'}</span>
                      </div>
                    </div>

                    {/* Interaction Buttons */}
                    <div className="flex items-center gap-2">
                      {/* WhatsApp outline link */}
                      <a
                        id={`whatsapp-car-${car.id}`}
                        href={`https://wa.me/971506024221?text=Hello%20Speed%20Rental%20RAK,%20I'd%20like%20to%20reserve%20the%20${encodeURIComponent(car.name)}%20for%20a%20rental.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-transparent hover:bg-white border border-white text-white hover:text-black rounded transition-all duration-300 flex items-center justify-center text-sm cursor-pointer"
                        title={isRtl ? 'استفسار سريع عبر واتساب' : 'Fast WhatsApp Booking'}
                      >
                        <i className="fa-brands fa-whatsapp text-lg"></i>
                      </a>

                      {/* Reserve modal dialog toggler */}
                      <button
                        id={`book-now-${car.id}`}
                        onClick={() => handleOpenReserveModal(car)}
                        className="py-2.5 px-4 bg-white hover:bg-[#E0E0E0] text-black font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 cursor-pointer"
                      >
                        {isRtl ? 'احجز الآن' : 'Book Now'}
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* RETHINK RESERVATION MODAL OVERLAY */}
      {activeModalCar && (
        <div id="booking-modal" className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative border border-[#2E2E2E] max-h-[92vh] overflow-y-auto">
            
            {/* Modal Heading Header */}
            <div className="bg-[#0A0A0A] px-6 py-5 border-b border-[#2E2E2E] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#AAAAAA] font-semibold tracking-widest uppercase block mb-1">
                  {isRtl ? 'طلب حجز سيارة مخصصة' : 'SECURE BOOKING REQUEST'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold leading-none">
                  {activeModalCar.name}
                </h3>
              </div>
              <button 
                id="close-booking-modal"
                onClick={() => setActiveModalCar(null)}
                className="text-slate-400 hover:text-white h-8 w-8 rounded-full border border-[#2E2E2E] flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6">
              {submitSuccess ? (
                <div id="modal-success" className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-3xl mx-auto mb-4 border border-[#2E2E2E]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {isRtl ? 'تم استقبال طلب الحجز بنجاح!' : 'Request Received Successfully!'}
                  </h4>
                  <p className="text-sm text-[#AAAAAA]">
                    {isRtl 
                      ? 'تم تحويل طلبك لمدير التأجير. سنتصل بك خلال دقائق لتنسيق التسليم.' 
                      : 'We logged your inquiries. Our booking specialists will verify and call you immediately.'}
                  </p>
                </div>
              ) : (
                <form id="reservation-modal-form" onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                  
                  {/* Summary Pricing tag */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded p-3 flex items-center justify-between text-xs sm:text-sm font-sans mb-2">
                    <span className="text-[#AAAAAA]">{isRtl ? 'التصنيف والمعدل اليومي' : 'Vehicle Category Rate:'}</span>
                    <span className="text-white font-bold font-mono">
                      {activeModalCar.category} — AED {activeModalCar.price} / {isRtl ? 'يوم' : 'Day'}
                    </span>
                  </div>

                  {/* Customer Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isRtl ? 'الاسم بالكامل' : 'Full Name *'}
                    </label>
                    <input
                      id="modal-name-input"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isRtl ? 'أدخل اسمك الكريم' : 'e.g. Anup Rajput'}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>

                  {/* Customer Contact Mobile */}
                  <div className="flex flex-col gap-1 font-sans">
                    <label className="text-xs font-semibold text-slate-300">
                      {isRtl ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      id="modal-phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="050 602 4221"
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>

                  {/* Dates range row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isRtl ? 'تاريخ البدء' : 'Pickup Date *'}
                      </label>
                      <input
                        id="modal-pickup-date-input"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2.5 text-xs text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-slate-300">
                        {isRtl ? 'تاريخ العودة' : 'Return Date *'}
                      </label>
                      <input
                        id="modal-return-date-input"
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2.5 text-xs text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Booking / Details Notes */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-300">
                      {isRtl ? 'ملاحظات إضافية (أو مكان التوصيل)' : 'Additional Notes (or pickup arrangements)'}
                    </label>
                    <textarea
                      id="modal-notes-input"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isRtl ? 'مثال: أريد التوصيل إلى جزيرة المرجان في تمام الساعة 2 ظهرًا' : 'e.g., Deliver to Al Hamra Village Hilton at 2:00 PM.'}
                      className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded p-2.5 text-xs text-white h-20 placeholder-[#555555] focus:outline-none focus:border-white"
                    ></textarea>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      id="modal-cancel-btn"
                      type="button"
                      onClick={() => setActiveModalCar(null)}
                      className="w-1/3 py-3 border border-[#2E2E2E] rounded text-[#AAAAAA] hover:bg-white/5 text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="modal-submit-btn"
                      type="submit"
                      className="w-2/3 py-3 bg-white text-black hover:bg-[#E0E0E0] rounded text-xs font-bold transition-all duration-300 cursor-pointer"
                    >
                      {isRtl ? 'تأكيد وحجز السيارة' : 'Confirm Rental Reservation'}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
