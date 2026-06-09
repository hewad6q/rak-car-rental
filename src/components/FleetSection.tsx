/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalCar) return;

    // Prepare booking payload
    const booking = {
      carName: activeModalCar.name,
      carId: activeModalCar.id,
      customerName: formData.name,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      notes: formData.notes || `Booking request for ${activeModalCar.name}`,
      createdAt: serverTimestamp(),
    };

    try {
      // Save to Cloud Firestore collection 'bookings'
      await addDoc(collection(db, 'bookings'), booking);

      // Keep existing callback for other side-effects
      onBookNowSubmit({
        name: formData.name,
        phone: formData.phone,
        carId: activeModalCar.id,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate,
        notes: booking.notes,
      });

      // Show success modal
      setSubmitSuccess(true);
      setTimeout(() => {
        setActiveModalCar(null);
        setFormData({ name: '', phone: '', pickupDate: '', returnDate: '', notes: '' });
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to save booking to Firestore:', error);
      // Basic user feedback on failure
      // (Could be replaced by a nicer inline UI later)
      // Keep modal open so user can retry
      // eslint-disable-next-line no-alert
      alert(isRtl ? 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.' : 'Failed to submit booking. Please try again.');
    }
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
    <section id="fleet" className="py-24 bg-white border-b border-[#E0E0E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] text-center uppercase">
            {isRtl ? 'عرض أسطول سياراتنا' : 'Our Premium Fleet'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] text-center max-w-[560px] mx-auto text-sm sm:text-base">
            {isRtl
              ? 'اختر سيارتك المفضلة من تشكيلتنا المتنوعة بأسعار حصرية منافسة تبدأ من 80 درهماً لليوم.'
              : 'Discover Ras Al Khaimah\'s finest selection of luxury coupés, elegant sedans, and high-performance family SUVs.'}
          </p>
        </div>

        {/* Filter Sliders */}
        <div id="fleet-filter-tabs" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`filter-tab-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-[#0A0A0A] text-white shadow-md' 
                  : 'bg-[#F5F5F5] text-[#888888] hover:bg-[#EEEEEE] hover:text-[#0A0A0A]'
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
          <div className="text-center text-[#888888] py-12">
            <i className="fa-solid fa-triangle-exclamation text-3xl text-neutral-300 mb-4"></i>
            <p className="text-lg">{isRtl ? 'عذراً، لا توجد سيارات مطابقة لهذه الفئة حالياً' : 'No cars match this filter yet. Please check again soon.'}</p>
          </div>
        ) : (
          <div id="fleet-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div 
                id={`car-card-${car.id}`}
                key={car.id}
                onClick={() => { window.location.href = `car-detail.html?id=${car.id}`; }}
                className="bg-white rounded-xl overflow-hidden border border-[#E0E0E0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col hover:border-[#CCCCCC] hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                
                {/* Car Image with Badge */}
                <div className="relative h-48 md:h-52 overflow-hidden bg-[#F5F5F5] flex items-center justify-center">
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
                  <span className="absolute bottom-4 left-4 text-[11px] font-semibold bg-[#F0F0F0] text-[#888888] px-2.5 py-0.5 rounded uppercase tracking-widest font-mono">
                    {isRtl 
                      ? (car.category === 'Economy' ? 'اقتصادي ' : car.category === 'Sedan' ? 'سيدان' : car.category === 'SUV' ? 'دفع رباعي' : car.category === 'Luxury' ? 'فاخرة' : 'فان')
                      : car.category
                    }
                  </span>
                </div>

                {/* Car Metrics Details */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-lg font-sans font-bold text-[#0A0A0A] mb-2 tracking-wide">
                      {car.name}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#E0E0E0] rounded-full"></div>
                  </div>

                  {/* Feature Icons Row */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-[#E0E0E0] text-center text-[12px] text-[#888888] font-sans">
                    <div className="flex flex-col items-center gap-1" title="Seating Capacity">
                      <i className="fa-solid fa-users text-[#888888] text-sm"></i>
                      <span>{car.seats} {isRtl ? 'مقاعد' : 'Seats'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="Gearbox">
                      <i className="fa-solid fa-gauge-high text-[#888888] text-sm"></i>
                      <span>{isRtl ? (car.transmission === 'Automatic' ? 'تلقائي' : 'يدوي') : car.transmission}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="AC System">
                      <i className="fa-solid fa-snowflake text-[#888888] text-sm"></i>
                      <span>{isRtl ? 'مكيف' : 'Climate'}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1" title="Fuel Engine">
                      <i className="fa-solid fa-gas-pump text-[#888888] text-sm text-[12px]"></i>
                      <span>{isRtl ? 'بنزين' : car.fuel}</span>
                    </div>
                  </div>

                  {/* Price Block & Action CTAs */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#888888] uppercase tracking-widest">{isRtl ? 'السعر اليومي' : 'DAILY RATE'}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#0A0A0A] font-semibold">AED</span>
                        <span className="text-3xl font-mono font-bold text-[#0A0A0A] tracking-wider leading-none">
                          {car.price}
                        </span>
                        <span className="text-[#888888] text-xs font-light">/{isRtl ? 'يوم' : 'day'}</span>
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
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 bg-transparent hover:bg-[#F5F5F5] border border-[#E0E0E0] text-[#0A0A0A] rounded-[6px] transition-all duration-300 flex items-center justify-center text-sm cursor-pointer hover:border-[#0A0A0A]"
                        title={isRtl ? 'استفسار سريع عبر واتساب' : 'Fast WhatsApp Booking'}
                      >
                        <i className="fa-brands fa-whatsapp text-lg"></i>
                      </a>

                      {/* Reserve modal dialog toggler */}
                      <button
                        id={`book-now-${car.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReserveModal(car);
                        }}
                        className="py-2.5 px-4 bg-[#0A0A0A] hover:bg-[#2E2E2E] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-[6px] transition-all duration-300 cursor-pointer"
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
        <div id="booking-modal" className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)] relative border border-[#E0E0E0] max-h-[92vh] overflow-y-auto">
            
            {/* Modal Heading Header */}
            <div className="bg-white px-6 py-5 border-b border-[#E0E0E0] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#888888] font-bold tracking-widest uppercase block mb-1">
                  {isRtl ? 'طلب حجز سيارة مخصصة' : 'SECURE BOOKING REQUEST'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0A0A0A] font-bold leading-none">
                  {activeModalCar.name}
                </h3>
              </div>
              <button 
                id="close-booking-modal"
                onClick={() => setActiveModalCar(null)}
                className="text-[#888888] hover:text-[#0A0A0A] h-8 w-8 rounded-full border border-[#E0E0E0] flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6">
              {submitSuccess ? (
                <div id="modal-success" className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-3xl mx-auto mb-4 border border-[#E0E0E0]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h4 className="text-xl font-bold text-[#0A0A0A] mb-2">
                    {isRtl ? 'تم استقبال طلب الحجز بنجاح!' : 'Request Received Successfully!'}
                  </h4>
                  <p className="text-sm text-[#888888]">
                    {isRtl 
                      ? 'تم تحويل طلبك لمدير التأجير. سنتصل بك خلال دقائق لتنسيق التسليم.' 
                      : 'We logged your inquiries. Our booking specialists will verify and call you immediately.'}
                  </p>
                </div>
              ) : (
                <form id="reservation-modal-form" onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                  
                  {/* Summary Pricing tag */}
                  <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded p-3 flex items-center justify-between text-xs sm:text-sm font-sans mb-2">
                    <span className="text-[#888888]">{isRtl ? 'التصنيف والمعدل اليومي' : 'Vehicle Category Rate:'}</span>
                    <span className="text-[#0A0A0A] font-bold font-mono">
                      {activeModalCar.category} — AED {activeModalCar.price} / {isRtl ? 'يوم' : 'Day'}
                    </span>
                  </div>

                  {/* Customer Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#0A0A0A]">
                      {isRtl ? 'الاسم بالكامل' : 'Full Name *'}
                    </label>
                    <input
                      id="modal-name-input"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isRtl ? 'أدخل اسمك الكريم' : 'e.g. Anup Rajput'}
                      className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
                      required
                    />
                  </div>

                  {/* Customer Contact Mobile */}
                  <div className="flex flex-col gap-1 font-sans">
                    <label className="text-xs font-semibold text-[#0A0A0A]">
                      {isRtl ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      id="modal-phone-input"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="050 602 4221"
                      className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
                      required
                    />
                  </div>

                  {/* Dates range row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#0A0A0A]">
                        {isRtl ? 'تاريخ البدء' : 'Pickup Date *'}
                      </label>
                      <input
                        id="modal-pickup-date-input"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-[#0A0A0A]">
                        {isRtl ? 'تاريخ العودة' : 'Return Date *'}
                      </label>
                      <input
                        id="modal-return-date-input"
                        type="date"
                        value={formData.returnDate}
                        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                        className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] p-2.5 text-xs text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Booking / Details Notes */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-[#0A0A0A]">
                      {isRtl ? 'ملاحظات إضافية (أو مكان التوصيل)' : 'Additional Notes (or pickup arrangements)'}
                    </label>
                    <textarea
                      id="modal-notes-input"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isRtl ? 'مثال: أريد التوصيل إلى جزيرة المرجان في تمام الساعة 2 ظهرًا' : 'e.g., Deliver to Al Hamra Village Hilton at 2:00 PM.'}
                      className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] p-2.5 text-xs text-[#0A0A0A] h-20 placeholder-[#AAAAAA] focus:outline-none focus:border-[#0A0A0A] focus:bg-white"
                    ></textarea>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      id="modal-cancel-btn"
                      type="button"
                      onClick={() => setActiveModalCar(null)}
                      className="w-1/3 py-3 border border-[#E0E0E0] rounded-[6px] text-[#888888] hover:bg-[#F5F5F5] text-xs font-bold transition-all duration-200 cursor-pointer"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      id="modal-submit-btn"
                      type="submit"
                      className="w-2/3 py-3 bg-[#0A0A0A] text-white hover:bg-[#2E2E2E] rounded-[6px] text-xs font-bold transition-all duration-300 cursor-pointer"
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
