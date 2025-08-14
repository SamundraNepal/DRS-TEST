"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguageContext } from "../components/use-context";
import { SetStateAction, useState } from "react";

type Doctor = {
  image: string;
  name: string;
  specialty: string;
  experience: number;
  services: string[];
};

export default function AllDoctors({ doctors }: { doctors: Doctor[] }) {
  const allDoctors = doctors || [];

  const [bookNow, setBookNow] = useState<boolean>(false);
  const [doctorsDetails, setDoctorsDetails] = useState({});

  const router = useRouter();
  const { language } = useLanguageContext();

  const haddleOnClick = (el) => {
    setDoctorsDetails(el);
    setBookNow(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="text-black w-full h-full flex flex-col justify-center items-center p-4">
      {!bookNow && (
        <>
          <div className="flex justify-between w-full">
            <button
              onClick={handleGoBack}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
            >
              Back
            </button>
          </div>

          <h1 className="text-4xl uppercase font-bold">
            {language === "ENG" ? "Our Doctors" : "हाम्रा चिकित्सकहरू"}
          </h1>
          <div
            className="
        rounded-2xl
     shadow-black
     shadow-2xl
    flex 
    flex-wrap 
    gap-8 
    justify-center 
    items-start 
    p-4 
    max-h-[80vh] 
    overflow-y-auto 
    scrollbar-thin 
    scrollbar-thumb-green-400 
    scrollbar-track-green-100

  "
          >
            {allDoctors.map((el, index) => (
              <div
                key={index}
                className="
      border-2 border-green-600 bg-green-50 
      p-4 w-80 rounded-2xl flex flex-col items-center 
      shadow-lg hover:shadow-2xl  duration-300
      flex-shrink-0
      hover:rotate-x-6 hover:rotate-y-12 transition-all 
    "
              >
                <div className="w-full flex justify-center mb-4">
                  <Image
                    width={200}
                    height={200}
                    alt="doctor image"
                    src={el.image}
                    className="rounded-full border-4 border-green-400"
                  />
                </div>

                <h2 className="text-green-900 text-xl font-semibold mb-1">
                  {language === "ENG" ? el.name.en : el.name.ne}
                </h2>
                <p className="text-green-700 font-medium mb-2">
                  {language === "ENG" ? el.specialty.en : el.specialty.ne}
                </p>
                <p className="text-green-600 mb-3">
                  {language === "ENG"
                    ? `${el.experience.en} years experience`
                    : `${el.experience.ne} वर्ष अनुभव`}
                </p>

                <div className="w-full mb-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    {language === "ENG" ? "Services:" : "सेवाहरू:"}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-100">
                    {(language === "ENG" ? el.services.en : el.services.ne).map(
                      (service, i) => (
                        <li key={i}>{service}</li>
                      )
                    )}
                  </ul>
                </div>

                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
                  onClick={() => haddleOnClick(el)}
                >
                  {language === "ENG" ? "Book Now" : "बुक गर्नुहोस्"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {bookNow && (
        <BookDoctor doctorsDetails={doctorsDetails} setBookNow={setBookNow} />
      )}
    </div>
  );
}

type bookDoctorsProps = {
  doctorsDetails: "";
  setBookNow: React.Dispatch<SetStateAction<boolean>>;
};

function BookDoctor({ doctorsDetails, setBookNow }: bookDoctorsProps) {
  const { language } = useLanguageContext();

  console.log(doctorsDetails);
  const handleCancel = () => {
    setBookNow(false);
  };
  return (
    <form className="border-4 w-full max-w-xl p-8 flex flex-col gap-2 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold uppercase text-green-900 mb-4 text-center">
          {language === "ENG"
            ? "Book an Appointment with"
            : "अपोइन्टमेन्ट बुक गर्नुहोस्"}
        </h1>
        <h1 className="text-2xl font-bold uppercase text-green-900 mb-4 text-center">
          {language === "ENG" ? doctorsDetails.name.en : doctorsDetails.name.ne}
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <Image
          src={doctorsDetails.image}
          width={500}
          height={500}
          alt={language === "ENG" ? "doctor photo" : "डाक्टरको फोटो"}
          className="w-40 h-40 rounded-full border-2 border-green-500"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="fullname" className="text-green-700">
          {language === "ENG" ? "Full Name" : "पुरा नाम"}
        </label>
        <input
          id="fullname"
          name="fullname"
          placeholder={
            language === "ENG"
              ? "Enter your full name"
              : "तपाईंको पुरा नाम लेख्नुहोस्"
          }
          className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-green-700">
          {language === "ENG" ? "Email Address" : "इमेल ठेगाना"}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={
            language === "ENG"
              ? "Enter your email address"
              : "तपाईंको इमेल ठेगाना लेख्नुहोस्"
          }
          className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-green-700">
          {language === "ENG" ? "Phone Number" : "फोन नम्बर"}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={
            language === "ENG"
              ? "Enter your phone number"
              : "तपाईंको फोन नम्बर लेख्नुहोस्"
          }
          className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-green-700">
          {language === "ENG" ? "Appointment Date" : "भेट गर्ने मिति"}
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Time */}
      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="text-green-700">
          {language === "ENG" ? "Appointment Time" : "भेट गर्ने समय"}
        </label>
        <input
          id="time"
          name="time"
          type="time"
          className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Reason */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-green-700">
          {language === "ENG" ? "Reason for Visit" : "भेटको कारण"}
        </label>
        <textarea
          id="message"
          name="message"
          cols={30}
          rows={4}
          placeholder={
            language === "ENG"
              ? "Briefly describe your symptoms or reason for appointment..."
              : "कृपया तपाईंको लक्षण वा भेटको कारण संक्षेपमा लेख्नुहोस्..."
          }
          className="border-2 border-green-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
        >
          {language === "ENG" ? "Book Now" : "बुक गर्नुहोस्"}
        </button>

        <button
          onClick={handleCancel}
          type="button"
          className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
        >
          {language === "ENG" ? "Cancel" : "रद्द गर्नुहोस्"}
        </button>
      </div>
    </form>
  );
}
