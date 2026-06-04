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
    <section id="why-us" className="py-24 bg-[#F7F7F7] relative overflow-hidden border-b border-[#E0E0E0]">
      
      {/* Dynamic Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#0A0A0A] tracking-[-0.02em] text-center uppercase">
            {isRtl ? 'التميز في خدمات التأجير' : 'Why Choose Speed Rental RAK'}
          </h2>
          <div className="w-[48px] h-[3px] bg-[#0A0A0A] mx-auto mt-3 mb-6 rounded-[2px]"></div>
          <p className="text-[#888888] text-center max-w-[560px] mx-auto text-sm sm:text-base">
            {isRtl
              ? 'نهدف لتقديم أفضل تجربة تأجير سيارات مريحة وسلسة في رأس الخيمة بأسعار متميزة وخدمة استثنائية.'
              : 'Our mission is to deliver the most seamless, high-end car rental experience in Ras Al Khaimah with stellar hospitality.'}
          </p>
        </div>

        {/* 3x2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <div 
              id={`choose-card-${i}`}
              key={i}
              className="bg-white border border-[#E0E0E0] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:-translate-y-1 hover:border-[#CCCCCC] transition-all duration-300 p-8 rounded-xl flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-[8px] bg-[#0A0A0A] flex items-center justify-center text-white text-xl transition-all duration-300">
                <i className={`fa-solid ${c.icon}`}></i>
              </div>
              <h3 className="text-lg font-sans font-bold text-[#0A0A0A] tracking-wide transition-colors duration-200">
                {c.title}
              </h3>
              <p className="text-sm text-[#888888] leading-relaxed font-light">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
