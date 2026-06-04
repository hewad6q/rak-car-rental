/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface HowItWorksProps {
  isRtl: boolean;
}

export default function HowItWorks({ isRtl }: HowItWorksProps) {
  const steps = [
    {
      num: '01',
      icon: 'fa-magnifying-glass',
      title: isRtl ? 'تصفح واختر سيارتك' : 'Browse & Choose',
      desc: isRtl 
        ? 'ابحث في أسطولنا الممتاز واختر السيارة المناسبة لاحتياجاتك.' 
        : 'Choose your desired vehicle from our meticulously maintained premium fleet.',
    },
    {
      num: '02',
      icon: 'fa-calendar-days',
      title: isRtl ? 'حدد التواريخ والمدة' : 'Select Dates',
      desc: isRtl 
        ? 'اختر تواريخ الاستلام والإرجاع التي تفضلها وموقع التوصيل.' 
        : 'Select your preferred rental start/end dates and convenient delivery points.',
    },
    {
      num: '03',
      icon: 'fa-phone-volume',
      title: isRtl ? 'أكد الحجز معنا بمحادثة' : 'Confirm Rental',
      desc: isRtl 
        ? 'اتصل بنا هاتفيًا أو تواصل عبر واتساب بلمحة لتأكيد طلبك وتثبيته.' 
        : 'Connect with our reservation support specialists via phone call or WhatsApp in seconds.',
    },
    {
      num: '04',
      icon: 'fa-key',
      title: isRtl ? 'استلم سيارتك وانطلق' : 'Drive Away',
      desc: isRtl 
        ? 'نقوم بتوصيل السيارة معبأة بالوقود لتنطلق برحلتك في رأس الخيمة بسلامة.' 
        : 'Receive your clean, key-ready car delivered free of charge within RAK. Secure and drive!',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#111111] relative border-b border-[#2E2E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-white text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-graduation-cap text-xs text-[#AAAAAA]"></i> {isRtl ? 'سهولة الحجز' : 'Simple Checklist'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isRtl ? 'كيف تعمل خدماتنا؟' : 'How It Works'}
          </h2>
          <div className="w-40 mx-auto mt-4">
            <div className="artistic-line"></div>
          </div>
        </div>

        {/* Steps Horizontal Grid */}
        <div className="relative">
          {/* Connector Dotted Line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-[2px] border-t-2 border-dashed border-[#2E2E2E] z-0 transform -translate-y-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((s, index) => (
              <div 
                id={`work-step-${s.num}`}
                key={s.num} 
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                
                {/* Number Sphere + Custom Icon Layer */}
                <div className="relative mb-6">
                  {/* Step index tag */}
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-black font-mono font-bold text-sm flex items-center justify-center border border-[#2E2E2E] shadow-md z-10">
                    {s.num}
                  </span>

                  <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border-2 border-[#2E2E2E] flex items-center justify-center text-white text-2xl group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
                    <i className={`fa-solid ${s.icon}`}></i>
                  </div>
                </div>

                {/* Info titles */}
                <h3 className="text-lg font-sans font-bold text-white mb-2 leading-none transition-colors duration-200">
                  {s.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#AAAAAA] font-light leading-relaxed max-w-[240px]">
                  {s.desc}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
