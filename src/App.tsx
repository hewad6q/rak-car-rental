/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect } from 'react';
import { Car, Inquiry, Promotion, BusinessInfo } from './types';
import { INITIAL_CARS, INITIAL_BUSINESS_INFO, INITIAL_PROMOTIONS } from './data';

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

  // Navigational / display preference states
  const [isRtl, setIsRtl] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize and load localized persistence files
  useEffect(() => {
    // 1. Cars Database
    const cachedCars = localStorage.getItem('speed_rental_cars');
    if (cachedCars) {
      try {
        setCars(JSON.parse(cachedCars));
      } catch {
        setCars(INITIAL_CARS);
      }
    } else {
      setCars(INITIAL_CARS);
      localStorage.setItem('speed_rental_cars', JSON.stringify(INITIAL_CARS));
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
    const cachedPromos = localStorage.getItem('speed_rental_promotions');
    if (cachedPromos) {
      try {
        setPromotions(JSON.parse(cachedPromos));
      } catch {
        setPromotions(INITIAL_PROMOTIONS);
      }
    } else {
      setPromotions(INITIAL_PROMOTIONS);
      localStorage.setItem('speed_rental_promotions', JSON.stringify(INITIAL_PROMOTIONS));
    }

    // 4. Contact Coordinate settings
    const cachedBusiness = localStorage.getItem('speed_rental_business');
    if (cachedBusiness) {
      try {
        setBusiness(JSON.parse(cachedBusiness));
      } catch {
        setBusiness(INITIAL_BUSINESS_INFO);
      }
    } else {
      setBusiness(INITIAL_BUSINESS_INFO);
      localStorage.setItem('speed_rental_business', JSON.stringify(INITIAL_BUSINESS_INFO));
    }

    // 5. Track Engagement tally sessions
    const views = parseInt(localStorage.getItem('speed_rental_page_views') || '0', 10);
    localStorage.setItem('speed_rental_page_views', (views + 1).toString());

    // 6. Manage 2-second splash screen fade
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      <div id="splash-layer" className="fixed inset-0 bg-navy-dark z-50 flex flex-col justify-center items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Rotating glowing golden circle */}
          <div className="w-20 h-20 rounded-full border-4 border-white/5 border-t-gold-lux animate-spin shadow-[0_0_20px_rgba(212,175,55,0.3)]"></div>
          
          <svg className="w-8 h-8 text-gold-lux absolute" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 5H19L16 12H21L11 20L13 13H8L13 5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="text-center font-sans">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-widest leading-none">
            SPEED RENTAL
          </h2>
          <span className="block text-xs uppercase font-semibold text-gold-lux tracking-widest mt-1">
            Ras Al Khaimah
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark text-white select-none">
      
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

        {/* 4. QUICK BOOKING SELECTOR */}
        <BookingWidget 
          onSearch={handleSelectFleetQuery} 
          isRtl={isRtl} 
        />

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
          isRtl={isRtl} 
        />

        {/* 10. FAQS ACCORDION */}
        <FaqSection 
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
