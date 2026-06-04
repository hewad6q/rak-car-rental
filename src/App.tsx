/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';
import { Car, Inquiry, Promotion, BusinessInfo } from './types';
import { INITIAL_CARS, INITIAL_BUSINESS_INFO, INITIAL_PROMOTIONS, TESTIMONIALS, FAQS } from './data';

// Component imports
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import WhyChooseUs from './components/WhyChooseUs';
import FleetSection from './components/FleetSection';
import HowItWorks from './components/HowItWorks';
import OffersSection from './components/OffersSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import FloatingElements from './components/FloatingElements';

export default function App() {
  // Splash loader state
  const [showSplash, setShowSplash] = useState(true);

  // Core administrative states
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [business, setBusiness] = useState<BusinessInfo>(INITIAL_BUSINESS_INFO);
  const [reviews, setReviews] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Navigational / display preference states
  const [isRtl, setIsRtl] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize and load localized persistence files
  useEffect(() => {
    // 1. Cars Database
    const cachedCars = localStorage.getItem('speedrental_cars');
    if (cachedCars) {
      try {
        setCars(JSON.parse(cachedCars));
      } catch {
        setCars(INITIAL_CARS);
      }
    } else {
      setCars(INITIAL_CARS);
      localStorage.setItem('speedrental_cars', JSON.stringify(INITIAL_CARS));
    }

    // 2. Inquiries Log
    const cachedInq = localStorage.getItem('speed_rental_inquiries');
    if (cachedInq) {
      try {
        setInquiries(JSON.parse(cachedInq));
      } catch {
        setInquiries([]);
      }
    } else {
      setInquiries([]);
      localStorage.setItem('speed_rental_inquiries', JSON.stringify([]));
    }

    // 3. Special Banners
    const getDefaultOffers = () => [
      {
        id: 1,
        emoji: "🚗",
        title: "Book 7+ Days — Get 1 Day FREE",
        description: "Rent any car for 7 days or more and get one extra day completely free.",
        promoCode: "",
        code: "",
        validUntil: "",
        active: true,
        isActive: true,
        bgColorClass: "bg-white"
      },
      {
        id: 2,
        emoji: "💰",
        title: "First Time? Get 10% OFF",
        description: "New customers get 10% discount on their first rental booking.",
        promoCode: "SPEED10",
        code: "SPEED10",
        validUntil: "",
        active: true,
        isActive: true,
        bgColorClass: "bg-white"
      }
    ];

    const cachedPromos = localStorage.getItem('speedrental_offers');
    if (cachedPromos) {
      try {
        setPromotions(JSON.parse(cachedPromos));
      } catch {
        setPromotions(getDefaultOffers());
      }
    } else {
      setPromotions(getDefaultOffers());
      localStorage.setItem('speedrental_offers', JSON.stringify(getDefaultOffers()));
    }

    // 4. Contact Coordinate settings (Use the master key "speedrental_settings")
    const cachedBusiness = localStorage.getItem('speedrental_settings') || localStorage.getItem('speed_rental_business');
    if (cachedBusiness) {
      try {
        const parsed = JSON.parse(cachedBusiness);
        setBusiness({
          name: parsed.businessName || parsed.name || INITIAL_BUSINESS_INFO.name,
          phone: parsed.phone || INITIAL_BUSINESS_INFO.phone,
          phoneFormatted: parsed.phoneFormatted || parsed.phone || INITIAL_BUSINESS_INFO.phoneFormatted,
          address: parsed.address || INITIAL_BUSINESS_INFO.address,
          hours: parsed.operatingHours || parsed.hours || INITIAL_BUSINESS_INFO.hours,
          whatsapp: parsed.whatsapp || INITIAL_BUSINESS_INFO.whatsapp,
          rating: Number(parsed.rating) || INITIAL_BUSINESS_INFO.rating,
          reviewCount: Number(parsed.reviewCount) || INITIAL_BUSINESS_INFO.reviewCount,
        });
      } catch {
        setBusiness(INITIAL_BUSINESS_INFO);
      }
    } else {
      setBusiness(INITIAL_BUSINESS_INFO);
      const initialSettingsObj = {
        businessName: INITIAL_BUSINESS_INFO.name,
        tagline: "Drive with Confidence",
        phone: INITIAL_BUSINESS_INFO.phone,
        whatsapp: INITIAL_BUSINESS_INFO.whatsapp,
        email: "speedrentalrak@gmail.com",
        address: INITIAL_BUSINESS_INFO.address,
        googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.7346853746654!2d55.9528!3d25.7745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef206b000000001%3A0x0!2zU3BlZWQgUmVudGFsIFJBSw!5e0!3m2!1sen!2sae!4v1700000000000",
        googleMapsLink: "https://maps.google.com/?q=Speed+Rental+RAK",
        operatingHours: INITIAL_BUSINESS_INFO.hours,
        instagram: "",
        facebook: "",
        twitter: "",
        tiktok: "",
        googleBusiness: "",
        heroHeadline1: "DRIVE IN",
        heroHeadline2: "LUXURY",
        heroSubheading: "Premium Car Rentals in Ras Al Khaimah — From AED 80 / Day",
        footerTagline: "Speed Rental RAK — Drive with Confidence",
        copyrightText: "© 2026 Speed Rental RAK. All Rights Reserved.",
        termsText: "Welcome to Speed Rental RAK. By renting our vehicles, you agree to UAE road laws and booking terms.",
        privacyText: "Your privacy is highly valued. We secure identification documents exclusively for legal rental clearance.",
        announcementBarEnabled: true,
        googleReviewsUrl: "https://g.page/r/SpeedRentalRAK/review",
        contactFormEnabled: true,
        rating: INITIAL_BUSINESS_INFO.rating,
        reviewCount: INITIAL_BUSINESS_INFO.reviewCount
      };
      localStorage.setItem('speedrental_settings', JSON.stringify(initialSettingsObj));
    }

    // 5. Testimonial Reviews Database
    const cachedReviews = localStorage.getItem('speedrental_reviews');
    if (cachedReviews) {
      try {
        setReviews(JSON.parse(cachedReviews));
      } catch {
        setReviews(TESTIMONIALS);
      }
    } else {
      const formattedReviews = TESTIMONIALS.map((t, idx) => ({
        id: idx + 1,
        author: t.name,
        rating: t.rating,
        text: t.text,
        date: '2026-05-15',
        source: t.source === 'Google Reviews' ? 'Google' : t.source,
        visible: true,
        rank: idx + 1
      }));
      setReviews(formattedReviews);
      localStorage.setItem('speedrental_reviews', JSON.stringify(formattedReviews));
    }

    // 6. Frequently Asked Questions Database
    const cachedFaqs = localStorage.getItem('speedrental_faqs');
    if (cachedFaqs) {
      try {
        setFaqs(JSON.parse(cachedFaqs));
      } catch {
        setFaqs(FAQS);
      }
    } else {
      const formattedFaqs = FAQS.map((f, idx) => ({
        id: idx + 1,
        question: f.question,
        answer: f.answer,
        category: 'General',
        visible: true,
        rank: idx + 1
      }));
      setFaqs(formattedFaqs);
      localStorage.setItem('speedrental_faqs', JSON.stringify(formattedFaqs));
    }

    // 7. Track Engagement tally sessions
    const views = parseInt(localStorage.getItem('speed_rental_page_views') || '0', 10);
    localStorage.setItem('speed_rental_page_views', (views + 1).toString());

    // 8. Bind global functions to window for index.html storage event sync
    (window as any).renderFleet = () => {
      const st = localStorage.getItem('speedrental_cars');
      if (st) {
        try { setCars(JSON.parse(st)); } catch {}
      }
    };
    (window as any).renderOffers = () => {
      const st = localStorage.getItem('speedrental_offers');
      if (st) {
        try { setPromotions(JSON.parse(st)); } catch {}
      }
    };
    (window as any).renderAnnouncementBar = () => {
      // announcements will read internally or we reload custom settings since it holds announcement flags
      window.dispatchEvent(new Event('reload_announcements'));
    };
    (window as any).renderReviews = () => {
      const st = localStorage.getItem('speedrental_reviews');
      if (st) {
        try { setReviews(JSON.parse(st)); } catch {}
      }
    };
    (window as any).renderFAQs = () => {
      const st = localStorage.getItem('speedrental_faqs');
      if (st) {
        try { setFaqs(JSON.parse(st)); } catch {}
      }
    };
    (window as any).applyBusinessSettings = () => {
      const st = localStorage.getItem('speedrental_settings');
      if (st) {
        try {
          const parsed = JSON.parse(st);
          setBusiness({
            name: parsed.businessName || parsed.name || INITIAL_BUSINESS_INFO.name,
            phone: parsed.phone || INITIAL_BUSINESS_INFO.phone,
            phoneFormatted: parsed.phoneFormatted || parsed.phone || INITIAL_BUSINESS_INFO.phoneFormatted,
            address: parsed.address || INITIAL_BUSINESS_INFO.address,
            hours: parsed.operatingHours || parsed.hours || INITIAL_BUSINESS_INFO.hours,
            whatsapp: parsed.whatsapp || INITIAL_BUSINESS_INFO.whatsapp,
            rating: Number(parsed.rating) || INITIAL_BUSINESS_INFO.rating,
            reviewCount: Number(parsed.reviewCount) || INITIAL_BUSINESS_INFO.reviewCount,
          });
        } catch {}
      }
    };

    // 9. Manage 2-second splash screen fade
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Real-time synchronization for speedrental_cars (Part 6)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'speedrental_cars') {
        try {
          const updated = e.newValue ? JSON.parse(e.newValue) : null;
          if (updated) {
            setCars(updated);
            console.log("React state synchronized in response to StorageEvent:", updated.length, "cars");
          }
        } catch (err) {
          console.error("Error synchronizing storage event:", err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also poll every 1.5 seconds to sync changes immediately if on same window without storage events
    const pollInterval = setInterval(() => {
      const stored = localStorage.getItem('speedrental_cars');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (JSON.stringify(parsed) !== JSON.stringify(cars)) {
            setCars(parsed);
          }
        } catch {}
      }
    }, 1500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, [cars]);

  // Real-time synchronization for speedrental_offers
  useEffect(() => {
    const handlePromosChange = (e: StorageEvent) => {
      if (e.key === 'speedrental_offers') {
        try {
          const updated = e.newValue ? JSON.parse(e.newValue) : null;
          if (updated) {
            setPromotions(updated);
          }
        } catch (err) {
          console.error("Error synchronizing offers storage event:", err);
        }
      }
    };

    window.addEventListener('storage', handlePromosChange);
    const pollInterval = setInterval(() => {
      const stored = localStorage.getItem('speedrental_offers');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (JSON.stringify(parsed) !== JSON.stringify(promotions)) {
            setPromotions(parsed);
          }
        } catch {}
      }
    }, 1500);

    return () => {
      window.removeEventListener('storage', handlePromosChange);
      clearInterval(pollInterval);
    };
  }, [promotions]);

  // Monitor Window URL change triggers to popup Admin Control Panel
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // run immediately

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth Scroll Anchor Navigator
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Callback: Filter Fleet Gallery view and scroll down
  const handleSelectFleetQuery = (categoryName: string) => {
    setSelectedCategory(categoryName);
    handleNavigate('fleet');
  };

  // Callback: Push New Inquiries from Landing Components
  const handleRecordNewInquiry = (inquiryData: { name: string; phone: string; message: string }) => {
    const timestamp = new Date().toLocaleString('en-US', { hour12: true });
    
    setInquiries((prev) => {
      const newInq: Inquiry = {
        id: Date.now().toString(),
        date: timestamp,
        name: inquiryData.name,
        phone: inquiryData.phone,
        message: inquiryData.message,
        status: 'New',
      };
      const updated = [newInq, ...prev];
      localStorage.setItem('speed_rental_inquiries', JSON.stringify(updated));
      return updated;
    });
  };

  // Close Admin overlay view
  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    window.location.hash = '';
  };

  // Rendering Loading Splash Intro screen
  if (showSplash) {
    return (
      <div id="splash-layer" className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Rotating dark progress circle */}
          <div className="w-16 h-16 rounded-full border-2 border-neutral-100 border-t-[#0A0A0A] animate-spin"></div>
          
          <svg className="w-6 h-6 text-[#0A0A0A] absolute" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 5H19L16 12H21L11 20L13 13H8L13 5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-center font-sans">
          <h2 className="font-sans text-xl font-extrabold text-[#0A0A0A] tracking-widest leading-none">
            SPEED RENTAL
          </h2>
          <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-widest mt-1.5">
            Ras Al Khaimah
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] select-none">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. STICKY NAV HEADER */}
      <Navbar 
        business={business} 
        isRtl={isRtl} 
        setIsRtl={setIsRtl} 
        onNavigate={handleNavigate} 
      />

      {/* 3. HERO SHOWROOM (MAIN CONTENT WRAPPER) */}
      <main>
        <Hero 
          onExploreClick={() => handleSelectFleetQuery('All')} 
          isRtl={isRtl} 
        />

        {/* Wrapper containing both the booking widget and the stats bar together */}
        <div id="booking-stats-wrapper" className="flex flex-col gap-[48px] pb-[48px]">
          {/* 4. QUICK BOOKING SELECTOR */}
          <BookingWidget 
            onSearch={handleSelectFleetQuery} 
            isRtl={isRtl} 
          />

          {/* Performance Statistics Row */}
          <div id="performance-stats-bar" className="relative z-1 mt-[32px] md:mt-[48px] pt-[48px] max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A0A0A] border-t border-transparent rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.14)] w-full">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 py-8 w-full">
                <div className="flex flex-col items-center border-r border-white/15 last:border-r-0">
                  <i className="fa-solid fa-face-smile text-white text-2xl mb-2"></i>
                  <span className="font-mono text-2xl text-white font-semibold">500+</span>
                  <span className="text-xs text-white/70 font-sans uppercase tracking-widest mt-1">
                    {isRtl ? 'عميل سعيد' : 'Happy Customers'}
                  </span>
                </div>

                <div className="flex flex-col items-center border-r border-white/15 last:border-r-0 lg:border-r">
                  <i className="fa-solid fa-key text-white text-2xl mb-2"></i>
                  <span className="font-mono text-2xl text-white font-semibold">20+</span>
                  <span className="text-xs text-white/70 font-sans uppercase tracking-widest mt-1">
                    {isRtl ? 'سيارة متاحة' : 'Cars Available'}
                  </span>
                </div>

                <div className="flex flex-col items-center border-r border-white/15 last:border-r-0 sm:border-r">
                  <i className="fa-solid fa-star text-white text-2xl mb-2"></i>
                  <span className="font-mono text-2xl text-white font-semibold">4.3 ★</span>
                  <span className="text-xs text-white/70 font-sans uppercase tracking-widest mt-1">
                    {isRtl ? 'تقييم جوجل' : 'Google Rating'}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <i className="fa-solid fa-award text-white text-2xl mb-2"></i>
                  <span className="font-mono text-2xl text-white font-semibold">5+</span>
                  <span className="text-xs text-white/70 font-sans uppercase tracking-widest mt-1">
                    {isRtl ? 'سنوات الخبرة' : 'Years Experience'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. WHY CHOOSE US (TRUST CARDS) */}
        <WhyChooseUs 
          isRtl={isRtl} 
        />

        {/* 6. EXCLUSIVE CAR FLEET */}
        <FleetSection 
          cars={cars} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          onBookNowSubmit={(data) => {
            // compile request details into readable text message to log
            const formattedMsg = `Reservation Request: Selected Car ID: ${data.carId}. Dates: ${data.pickupDate} to ${data.returnDate}. Customer comments: "${data.notes}"`;
            handleRecordNewInquiry({
              name: data.name,
              phone: data.phone,
              message: formattedMsg
            });
          }}
          isRtl={isRtl} 
        />

        {/* 7. HOW IT WORKS TIMELINE */}
        <HowItWorks 
          isRtl={isRtl} 
        />

        {/* 8. RATES & OFFERS MODULE */}
        <OffersSection 
          promotions={promotions} 
          onBookRateClick={handleSelectFleetQuery} 
          isRtl={isRtl} 
        />

        {/* 9. GOOGLE TESTIMONIAL LOOPS */}
        <ReviewsSection 
          reviews={reviews}
          isRtl={isRtl} 
        />

        {/* 10. FAQS ACCORDION */}
        <FaqSection 
          faqs={faqs}
          isRtl={isRtl} 
        />

        {/* 11. ADDRESS CONTACTS & ROUTE MAP */}
        <ContactSection 
          business={business} 
          onContactSubmit={handleRecordNewInquiry} 
          isRtl={isRtl} 
        />
      </main>

      {/* 12. LOWER FOOTER BAR & PRIVACY POLICIES */}
      <Footer 
        business={business} 
        onNavigate={handleNavigate} 
        isRtl={isRtl} 
      />

      {/* 13. FLOATING COCKPIT WIDGET ENGINES */}
      <FloatingElements 
        phoneFormatted={business.phoneFormatted} 
        whatsappNumber={business.whatsapp} 
        isRtl={isRtl} 
      />

      {/* 14. INVISIBLE PASSWORD-RESRICTED ADMIN DASHBOARD OVERLAY */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={handleCloseAdmin} 
        cars={cars} 
        setCars={setCars} 
        inquiries={inquiries} 
        setInquiries={setInquiries} 
        promotions={promotions} 
        setPromotions={setPromotions} 
        business={business} 
        setBusiness={setBusiness} 
      />

    </div>
  );
}
