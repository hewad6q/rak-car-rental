/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface BookingWidgetProps {
  onSearch: (carType: string) => void;
  isRtl: boolean;
}

export default function BookingWidget({ onSearch, isRtl }: BookingWidgetProps) {
  const [pickupLocation, setPickupLocation] = useState('RAK City Center');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [carType, setCarType] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(carType);
  };

  const locations = [
    { value: 'RAK City Center', label: isRtl ? 'وسط مدينة رأس الخيمة (مجاني)' : 'RAK City Center (Free)' },
    { value: 'Al Hamra', label: isRtl ? 'الحمراء (رأس الخيمة)' : 'Al Hamra, RAK' },
    { value: 'Al Marjan Island', label: isRtl ? 'جزيرة المرجان' : 'Al Marjan Island' },
    { value: 'RAK Airport', label: isRtl ? 'مطار رأس الخيمة الدولي' : 'RAK Airport (OMRK)' },
    { value: 'Custom Delivery', label: isRtl ? 'توصيل مخصص لوجهتك' : 'Custom Delivery Location' }
  ];

  const carTypes = [
    { value: 'All', label: isRtl ? 'جميع الفئات' : 'All Categories' },
    { value: 'Economy', label: isRtl ? 'اقتصادية' : 'Economy' },
    { value: 'Sedan', label: isRtl ? 'سيدان' : 'Sedan' },
    { value: 'SUV', label: isRtl ? 'دفع رباعي' : 'SUV' },
    { value: 'Luxury', label: isRtl ? 'فاخرة' : 'Luxury' },
    { value: 'Van', label: isRtl ? 'حافلات / فان' : 'Van' }
  ];

  return (
    <div className="relative z-10 max-w-6xl mx-auto mb-0 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-[#E0E0E0]">
        <form id="quick-booking-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          
          {/* Pickup Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-[#0A0A0A] tracking-wider flex items-center gap-1.5 font-sans">
              <i className="fa-solid fa-location-dot text-[11px] text-[#0A0A0A]"></i>
              {isRtl ? 'مكتب أو موقع الاستلام' : 'Pickup Location'}
            </label>
            <select
              id="booking-pickup-loc"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value} className="bg-white text-[#0A0A0A]">
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-[#0A0A0A] tracking-wider flex items-center gap-1.5 font-sans">
              <i className="fa-solid fa-calendar-days text-[11px] text-[#0A0A0A]"></i>
              {isRtl ? 'تاريخ الاستلام' : 'Pickup Date'}
            </label>
            <input
              id="booking-pickup-date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-[#0A0A0A] tracking-wider flex items-center gap-1.5 font-sans">
              <i className="fa-solid fa-calendar-check text-[11px] text-[#0A0A0A]"></i>
              {isRtl ? 'تاريخ الإرجاع' : 'Return Date'}
            </label>
            <input
              id="booking-return-date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
              required
            />
          </div>

          {/* Car Type Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-[#0A0A0A] tracking-wider flex items-center gap-1.5 font-sans">
              <i className="fa-solid fa-sliders text-[11px] text-[#0A0A0A]"></i>
              {isRtl ? 'فئة السيارة المطلوبة' : 'Car Category'}
            </label>
            <select
              id="booking-car-type"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-[6px] px-3 py-3 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-colors duration-200"
            >
              {carTypes.map((t) => (
                <option key={t.value} value={t.value} className="bg-white text-[#0A0A0A]">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search CTA and call options */}
          <div className="col-span-1 md:col-span-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-[#E0E0E0]">
            <p className="text-xs text-[#888888]">
              {isRtl ? 'أو تواصل للحجز الفوري عبر الهاتف:' : 'Or reserve instantly via phone:'}{' '}
              <a href="tel:+971506024221" className="text-[#0A0A0A] font-bold hover:underline">
                050 602 4221
              </a>
            </p>
            <button
              id="submit-booking-widget"
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#0A0A0A] text-white font-sans font-bold text-sm tracking-uppercase rounded-[6px] transition-all duration-300 hover:bg-[#2E2E2E] cursor-pointer"
            >
              <i className="fa-solid fa-magnifying-glass mr-2"></i>
              {isRtl ? 'ابحث عن السيارات المتاحة' : 'Search Available Fleet'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
