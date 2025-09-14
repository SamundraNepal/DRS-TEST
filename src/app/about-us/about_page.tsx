'use client';

import { useLanguageContext } from '../components/use-context';

const CTVSExperts = () => {
  const { language } = useLanguageContext();

  const content = {
    eng: {
      heading: 'CTVS Experts',
      description:
        'A team of experienced cardio-thoracic and vascular surgeons offering advanced treatments with a compassionate approach. We specialize in complex heart and vascular procedures, ensuring safety, innovation, and patient-centered care.',
      updates:
        'Stay updated on heart and vascular health, expert consultations, and more. Follow us for tips, stories, and updates.',
      mission: 'Your health. Our mission. Always.',
    },
    nep: {
      heading: 'CTVS विशेषज्ञहरू',
      description:
        'अनुभवी कार्डियो-थोरासिक र भास्कुलर सर्जनहरूको टोली, जो संवेदनशील दृष्टिकोणसहित उन्नत उपचार प्रदान गर्छन्। हामी जटिल हृदय र रगत नली सम्बन्धी प्रक्रियामा विशेषज्ञता राख्छौं, सुरक्षा, नवीनता, र बिरामी केन्द्रित हेरचाह सुनिश्चित गर्दै।',
      updates:
        'हृदय र रगत नलीको स्वास्थ्य, विशेषज्ञ परामर्श र थप जानकारीको लागि अपडेट रहनुहोस्। सुझाव, कथाहरू, र अपडेटहरूका लागि हामीलाई फलो गर्नुहोस्।',
      mission: 'तपाईंको स्वास्थ्य। हाम्रो मिशन। सधैं।',
    },
  };

  const lang = language === 'ENG' ? content.eng : content.nep;

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-90px)] bg-gradient-to-br from-gray-100 via-white to-gray-50 px-4">
      <div className="max-w-3xl w-full mx-auto bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-emerald-600 mb-6 text-center tracking-wide">
          {lang.heading}
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
          {lang.description}
        </p>

        {/* Updates / Follow Section */}
        <div className="bg-emerald-50 p-5 rounded-xl mb-8 border border-emerald-100">
          <p className="text-emerald-700 text-center font-medium">
            {lang.updates}
          </p>
        </div>

        {/* Mission Statement */}
        <p className="text-gray-900 font-semibold text-center text-xl italic">
          {lang.mission}
        </p>
      </div>
    </div>
  );
};

export default CTVSExperts;
