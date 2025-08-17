"use client";

import { useLanguageContext } from "../components/use-context";

const CTVSExperts = () => {
  const { language } = useLanguageContext();

  const content = {
    eng: {
      heading: "CTVS Experts",
      description:
        "A team of experienced cardio-thoracic and vascular surgeons offering advanced treatments with a compassionate approach. We specialize in complex heart and vascular procedures, ensuring safety, innovation, and patient-centered care.",
      updates:
        "Stay updated on heart and vascular health, expert consultations, and more. Follow us for tips, stories, and updates.",
      mission: "Your health. Our mission. Always.",
    },
    nep: {
      heading: "CTVS विशेषज्ञहरू",
      description:
        "अनुभवी कार्डियो-थोरासिक र भास्कुलर सर्जनहरूको टोली, जो संवेदनशील दृष्टिकोणसहित उन्नत उपचार प्रदान गर्छन्। हामी जटिल हृदय र रगत नली सम्बन्धी प्रक्रियामा विशेषज्ञता राख्छौं, सुरक्षा, नवीनता, र बिरामी केन्द्रित हेरचाह सुनिश्चित गर्दै।",
      updates:
        "हृदय र रगत नलीको स्वास्थ्य, विशेषज्ञ परामर्श र थप जानकारीको लागि अपडेट रहनुहोस्। सुझाव, कथाहरू, र अपडेटहरूका लागि हामीलाई फलो गर्नुहोस्।",
      mission: "तपाईंको स्वास्थ्य। हाम्रो मिशन। सधैं।",
    },
  };

  const lang = language === "ENG" ? content.eng : content.nep;

  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-90px)]">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition duration-300">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
          {lang.heading}
        </h2>

        {/* Description */}
        <p className="text-gray-700 mb-6 text-lg text-center">
          {lang.description}
        </p>

        {/* Updates / Follow Section */}
        <div className="bg-red-50 p-4 rounded-xl mb-6">
          <p className="text-red-700 text-center font-medium">{lang.updates}</p>
        </div>

        {/* Mission Statement */}
        <p className="text-gray-800 font-semibold text-center text-lg">
          {lang.mission}
        </p>
      </div>
    </div>
  );
};

export default CTVSExperts;
