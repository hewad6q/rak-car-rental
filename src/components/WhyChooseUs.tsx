/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface WhyChooseUsProps {
  isRtl: boolean;
}

export default function WhyChooseUs({ isRtl }: WhyChooseUsProps) {
  const cards = [
    {
      icon: 'fa-car-side',
      title: isRtl ? 'تشكيلة أسطول واسعة' : 'Wide Fleet Selection',
      desc: isRtl 
        ? 'من السيارات الاقتصادية اليومية إلى أفخم الموديلات الفارهة متوفرة دائمًا.' 
        : 'From everyday economy models to ultra-luxury supercars, we cater to all preferences.',
    },
    {
      icon: 'fa-tags',
      title: isRtl ? 'ضمان أفضل الأسعار' : 'Best Price Guarantee',
      desc: isRtl 
        ? 'أقل أسعار إيجار سيارات في رأس الخيمة خالية تمامًا من الرسوم الإضافية الخفية.' 
        : 'The lowest rental rates in Ras Al Khaimah with zero hidden fees. Pure transparency.',
    },
    {
      icon: 'fa-headset',
      title: isRtl ? 'دعم فني على مدار الساعة' : '24/7 Dedicated Support',
      desc: isRtl 
        ? 'فريق خدمة العملاء متواجد لمساعدتكم في أي وقت ليلًا أو نهارًا طوال أيام الأسبوع.' 
        : 'Our reservation and helpdesk agents are active and ready to assist you day or night.',
    },
    {
      icon: 'fa-truck-ramp-box',
      title: isRtl ? 'توصيل مجاني بالمدينة' : 'Free City Delivery',
      desc: isRtl 
        ? 'نقوم بتوصيل السيارة مباشرة إلى باب منزلك أو فندقك داخل رأس الخيمة مجانًا.' 
        : 'We deliver your selected car straight to your residence or hotel in RAK free of charge.',
    },
    {
      icon: 'fa-shield-halved',
      title: isRtl ? 'سيارات مؤمنة بالكامل' : 'Fully Insured Cars',
      desc: isRtl 
        ? 'أسطول سياراتنا بالكامل يخضع لصيانة دورية دورية ويحمل تأمينًا شاملًا لحمايتك.' 
        : 'Every vehicle in our fleet is rigorously inspected and comes with comprehensive insurance.',
    },
    {
      icon: 'fa-bolt',
      title: isRtl ? 'تأكيد فوري وآمن' : 'Instant Confirmation',
      desc: isRtl 
        ? 'خدمة حجز سريعة وبسيطة عبر الهاتف أو واتساب لتأكيد طلبك وتجهيز السيارة بدقائق.' 
        : 'Streamlined booking workflows via WhatsApp or phone. Confirmed and ready in minutes.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#111111] relative overflow-hidden border-b border-[#2E2E2E]">
      
      {/* Dynamic Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-gem text-xs text-[#AAAAAA]"></i> {isRtl ? 'لماذا تختارنا' : 'Trust Signals'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'التميز في خدمات التأجير' : 'Why Choose Speed Rental RAK'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* 3x2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div 
              id={`choose-card-${i}`}
              key={i}
              className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-white hover:bg-[#111111] hover:-translate-y-2 transition-all duration-300 p-8 rounded-xl flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded bg-[#0A0A0A] border border-[#2E2E2E] flex items-center justify-center text-white text-xl transition-all duration-300">
                <i className={`fa-solid ${c.icon}`}></i>
              </div>
              <h3 className="text-lg font-sans font-bold text-white tracking-wide transition-colors duration-200">
                {c.title}
              </h3>
              <p className="text-sm text-[#AAAAAA] leading-relaxed font-light">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
