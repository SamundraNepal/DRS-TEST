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
  const allServices = doctors || [];

  const [showDoctors, setShowDoctors] = useState<boolean>(false);
  const [serviceType, setServiceType] = useState("");

  const router = useRouter();
  const { language } = useLanguageContext();

  const handleGoBack = () => {
    router.back();
  };

  const handleShowDoctors = (el) => {
    setShowDoctors(true);
    setServiceType(el);
  };

  return (
    <div className="text-black w-full h-full flex flex-col justify-center items-center p-4 gap-6 ">
      {!showDoctors && (
        <>
          <div className="flex justify-center items-center w-full flex-col">
            <h1 className="text-4xl font-bold uppercase">
              {language === "ENG" ? `Our Services` : "हाम्रा सेवा"}
            </h1>

            <button
              onClick={handleGoBack}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
            >
              {language == "ENG" ? `Back` : `पछाडि`}
            </button>
          </div>

          <div
            className="flex flex-wrap gap-4 justify-center w-full max-h-[75vh]  shadow-2xl shadow-green-800 p-2 rounded-2xl
    overflow-y-auto "
          >
            {allServices.CTVS_Diseases_and_Procedures.map((el, index) => {
              return (
                <DiseaseCard
                  key={index}
                  disease={el}
                  handleShowDoctors={handleShowDoctors}
                />
              );
            })}
          </div>
        </>
      )}

      {showDoctors && (
        <DoctorsShow
          allDoctors={allServices.Doctors}
          setShowDoctors={setShowDoctors}
          serviceType={serviceType}
        />
      )}
    </div>
  );
}

type bookDoctorsProps = {
  doctorsDetails: "";
  setBookNow: React.Dispatch<SetStateAction<boolean>>;
};

function DoctorsShow({ allDoctors, setShowDoctors, serviceType }) {
  const { language } = useLanguageContext();
  const [bookNow, setBookNow] = useState<boolean>(false);

  const [details, setDetails] = useState({ serviceType });

  const handleGoBack = () => {
    setShowDoctors(false);
  };

  const haddleOnClick = (el) => {
    setBookNow(true);

    setDetails((prev) => ({ ...prev, doc: el }));
  };

  return (
    <>
      {!bookNow && (
        <>
          <div className="flex justify-between w-full">
            <button
              onClick={handleGoBack}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
            >
              {language == "ENG" ? `Back` : `पछाडि`}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl uppercase font-bold">
              {language === "ENG" ? "Our Doctors" : "हाम्रा चिकित्सकहरू"}
            </h1>

            <h1 className="text-2xl uppercase font-bold">
              {" "}
              {language === "ENG" ? serviceType.name.en : serviceType.name.ne}
            </h1>
          </div>
          <div className=" flex gap-8 flex-wrap justify-center items-center">
            {allDoctors.map((el, index: number) => (
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

                <p className="text-green-600 mb-3">
                  {language === "ENG"
                    ? `${el.experience.en} years experience`
                    : `${el.experience.ne} वर्ष अनुभव`}
                </p>

                <button
                  onClick={() => haddleOnClick(el)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
                >
                  {language === "ENG" ? "Book Now" : "बुक गर्नुहोस्"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {bookNow && (
        <BookDoctor doctorsDetails={details} setBookNow={setBookNow} />
      )}
    </>
  );
}

function BookDoctor({ doctorsDetails, setBookNow }: bookDoctorsProps) {
  const { language } = useLanguageContext();

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
          {language === "ENG"
            ? doctorsDetails.doc.name.en
            : doctorsDetails.doc.name.ne}
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <Image
          src={doctorsDetails.doc.image}
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
          value={
            language === "ENG"
              ? doctorsDetails.serviceType.name.en
              : doctorsDetails.serviceType.name.ne
          }
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

type diseaseCardProps = {
  disease: "";
  handleShowDoctors: () => void;
};

function DiseaseCard({ disease, handleShowDoctors }: diseaseCardProps) {
  const { language } = useLanguageContext();

  const isENG = language === "ENG";

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border-2 border-green-400 flex flex-col items-center hover:cursor-pointer">
      {/* Disease Name */}
      <h2 className="text-2xl font-bold text-green-700 mb-1">
        {isENG ? disease.name.en : disease.name.ne}
      </h2>
      <h3 className="text-md text-gray-500 mb-4">
        {isENG ? disease.name.en : disease.name.ne}
      </h3>

      <Image
        src={
          "https://dvl2h13awlxkt.cloudfront.net/assets/general-images/Knowledge/_800x800_crop_center-center_82_none/heart-anatomy.png?mtime=1675729924"
        }
        alt="heartimages"
        width={500}
        height={500}
        className="border-4 border-amber-500 rounded-full w-80 h-80"
      />

      {/* Conditions */}
      {disease.Conditions && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-600 mb-2">
            {isENG ? "Conditions:" : "अवस्थाहरू:"}
          </h4>
          <ul className="list-disc list-inside text-gray-600">
            {disease.Conditions.map((c, idx) => (
              <li key={idx}>{isENG ? c.en : c.ne}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Treatment Options */}
      {disease.Treatment_Options && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-600 mb-2">
            {isENG ? "Treatment Options:" : "उपचार:"}
          </h4>
          <ul className="list-disc list-inside text-gray-600">
            {disease.Treatment_Options.map((t, idx) => (
              <li key={idx}>{isENG ? t.en : t.ne}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Procedures */}
      {disease.Procedures && (
        <div>
          <h4 className="font-semibold text-green-600 mb-2">
            {isENG ? "Procedures:" : "प्रक्रिया:"}
          </h4>
          <ul className="list-disc list-inside text-gray-600">
            {disease.Procedures.map((p, idx) => (
              <li key={idx}>{isENG ? p.en : p.ne}</li>
            ))}
          </ul>
        </div>
      )}

      <div className=" w-full h-full flex justify-center items-end">
        <button
          onClick={() => handleShowDoctors(disease)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer"
        >
          {isENG ? `Find Doctor` : `डाक्टर खोज्नुहोस्`}
        </button>
      </div>
    </div>
  );
}
