'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguageContext } from '../components/use-context';
import React, { useState } from 'react';
import { HandleBookForm } from '../database/handle_data';
import Spinner from '../components/spinner';

interface Doctors {
  id: number;
  doctor_expEn: string;
  doctor_expNe: string;
  doctor_imageURL: string;
  doctor_nameEn: string;
  doctor_nameNe: string;
}

interface BookForm {
  doctor_name:string;
  full_name: string;
  email_address: string;
  phone_number: string;
  appointment_date: string;
  appointment_time: string;
  reason_to_visit: string;
  doctor_email:string;
}

interface Services {
  id: number;
  disease_image: string;
  disease_name: { ne: string; en: string };
  disease_conditions: { ne: string; en: string }[];
  disease_treatments: { ne: string; en: string }[];
}

type Doc_Serv_props = {
  doctorsData: Doctors[];
  serviceData: Services[];
};

export default function AllDoctors({
  doctorsData,
  serviceData,
}: Doc_Serv_props) {
  const doctors = doctorsData || [];
  const services = serviceData || [];

  const [showDoctors, setShowDoctors] = useState(false);
  const [serviceType, setServiceType] = useState<any>(null);

  const router = useRouter();
  const { language } = useLanguageContext();

  const handleGoBack = () => {
    router.back();
  };

  const handleShowDoctors = (el: any) => {
    setShowDoctors(true);
    setServiceType(el);
  };

  return (
    <div className="text-black w-full sm:h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      {!showDoctors && (
        <>
          {/* Heading */}
          <div className="flex flex-col justify-center items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-emerald-700 tracking-wide text-center">
              {language === 'ENG' ? `Our Services` : 'हाम्रा सेवा'}
            </h1>

            <button
              onClick={handleGoBack}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 md:px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {language == 'ENG' ? `Back` : `पछाडि`}
            </button>
          </div>

          {/* Diseases List */}
          <div className="flex flex-wrap gap-6 justify-center w-full max-h-[70vh] md:max-h-[75vh] shadow-2xl overflow-y-auto p-4 rounded-2xl bg-white border border-gray-200">
            {Array.isArray(services) &&
              services.map((el: any, index: number) => (
                <DiseaseCard
                  key={index}
                  disease={el}
                  handleShowDoctors={handleShowDoctors}
                />
              ))}
          </div>
        </>
      )}

      {showDoctors && (
        <DoctorsShow
          allDoctors={doctors}
          setShowDoctors={setShowDoctors}
          serviceType={serviceType}
        />
      )}
    </div>
  );
}

/* -------------------- Doctors Display -------------------- */
function DoctorsShow({ allDoctors, setShowDoctors, serviceType }: any) {
  const { language } = useLanguageContext();
  const [bookNow, setBookNow] = useState(false);
  const [details, setDetails] = useState({ serviceType });

  const handleGoBack = () => setShowDoctors(false);

  const handleBookClick = (el: any) => {
    setBookNow(true);
    setDetails((prev) => ({ ...prev, doc: el }));
  };

  return (
    <>
      {!bookNow && (
        <>
          {/* Back Button */}
          <div className="flex justify-start w-full mb-6">
            <button
              onClick={handleGoBack}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {language == 'ENG' ? `Back` : `पछाडि`}
            </button>
          </div>

          {/* Doctors Heading */}
          <div className="flex flex-col justify-center items-center mb-6 text-center">
            <h1 className="text-3xl md:text-4xl uppercase font-extrabold text-emerald-700 mb-2">
              {language === 'ENG' ? 'Our Doctors' : 'हाम्रा चिकित्सकहरू'}
            </h1>
            <h2 className="text-lg md:text-2xl uppercase font-bold text-gray-700">
              {language === 'ENG'
                ? serviceType.disease_name.en
                : serviceType.disease_name.ne}
            </h2>
          </div>

          {/* Doctors Cards */}
          <div className="flex gap-6 flex-col sm:flex-row w-full flex-wrap justify-center items-center">
            {allDoctors.map((el: any, index: number) => (
              <div
                key={index}
                className="border border-emerald-200 bg-white/90 backdrop-blur-md 
                p-6 w-full max-w-sm rounded-2xl flex flex-col items-center 
                shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <Image
                  width={160}
                  height={160}
                  alt="doctor image"
                  src={el.doctor_imageURL}
                  className="rounded-full border-4 border-emerald-400 shadow-md w-40 h-40 object-cover mb-4"
                />

                <h2 className="text-emerald-900 text-lg md:text-xl font-semibold mb-1 text-center">
                  {language === 'ENG' ? el.doctor_nameEn : el.doctor_nameNe}
                </h2>

                <p className="text-emerald-600 text-sm mb-3 text-center">
                  {language === 'ENG'
                    ? `${el.doctor_expEn} years experience`
                    : `${el.doctor_expNe} वर्ष अनुभव`}
                </p>

                <button
                  onClick={() => handleBookClick(el)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {language === 'ENG' ? 'Book Now' : 'बुक गर्नुहोस्'}
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

/* -------------------- Booking Form -------------------- */
function BookDoctor({ doctorsDetails, setBookNow }: any) {

    const { language } = useLanguageContext();


  const [bookForm, setBookForm] = useState<BookForm>({
    doctor_name: language === "ENG" ? doctorsDetails.doc.doctor_nameEn : doctorsDetails.doc.doctor_nameNe,
    full_name: '',
    email_address: '',
    phone_number: '',
    appointment_date: '',
    appointment_time: '',
    reason_to_visit: '',
    doctor_email: doctorsDetails.doc.doctor_email
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [message, setMessage] = useState('');

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handdleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await HandleBookForm({ bookForm });

      if (res.success) {
        setIsLoading(false);
        setBookNow(false);
      } else {
        setIsLoading(false);
        setMessage(res.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      return { message: error.message };
    }
  };

  const handleCancel = () => setBookNow(false);

  return (
    <>
      {isLoading && (
        <div className="w-full h-full justify-center flex">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <form
          onSubmit={handdleOnSubmit}
          className="p-2 md:p-6 w-full max-w-2xl h-auto overflow-y-auto flex flex-col md:flex-row gap-6 rounded-2xl shadow-xl bg-white/95 backdrop-blur-lg border border-emerald-200"
        >
          {/* Doctor Image */}
          <div className="flex justify-center md:justify-start">
            <Image
              src={doctorsDetails.doc.doctor_imageURL}
              width={120}
              height={120}
              alt={language === 'ENG' ? 'doctor photo' : 'डाक्टरको फोटो'}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-emerald-500 shadow-lg object-cover"
            />
          </div>

          {/* Doctor Info + Form */}
          <div className="flex flex-col flex-1 gap-6">
            {/* Heading */}
            <div className="flex flex-col justify-center items-center text-center">
              <h1 className="text-xl md:text-2xl font-bold uppercase text-emerald-800 mb-2">
                {language === 'ENG'
                  ? 'Book an Appointment with'
                  : 'अपोइन्टमेन्ट बुक गर्नुहोस्'}
              </h1>
              <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-700">
                {language === 'ENG'
                  ? doctorsDetails.doc.doctor_nameEn
                  : doctorsDetails.doc.doctor_nameNe}
              </h2>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-4">
              {[
                {
                  name: 'full_name',
                  label: language === 'ENG' ? 'Full Name' : 'पुरा नाम',
                  type: 'text',
                  placeholder:
                    language === 'ENG'
                      ? 'Enter your full name'
                      : 'तपाईंको पुरा नाम लेख्नुहोस्',
                },
                {
                  name: 'email_address',
                  label: language === 'ENG' ? 'Email Address' : 'इमेल ठेगाना',
                  type: 'email',
                  placeholder:
                    language === 'ENG'
                      ? 'Enter your email address'
                      : 'तपाईंको इमेल ठेगाना लेख्नुहोस्',
                },
                {
                  name: 'phone_number',
                  label: language === 'ENG' ? 'Phone Number' : 'फोन नम्बर',
                  type: 'number',
                  placeholder:
                    language === 'ENG'
                      ? 'Enter your phone number'
                      : 'तपाईंको फोन नम्बर लेख्नुहोस्',
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-emerald-700 font-semibold"
                  >
                    {field.label}
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={bookForm[field.name as keyof typeof bookForm]} // ✅ Controlled value
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border-2 border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Date + Time */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="date"
                  className="text-emerald-700 font-semibold"
                >
                  {language === 'ENG' ? 'Appointment Date' : 'भेट गर्ने मिति'}
                </label>
                <input
                  onChange={handleOnChange}
                  value={bookForm.appointment_date}
                  name="appointment_date"
                  type="date"
                  className="border-2 border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="time"
                  className="text-emerald-700 font-semibold"
                >
                  {language === 'ENG' ? 'Appointment Time' : 'भेट गर्ने समय'}
                </label>
                <input
                  onChange={handleOnChange}
                  value={bookForm.appointment_time}
                  name="appointment_time"
                  type="time"
                  className="border-2 border-emerald-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-emerald-700 font-semibold"
              >
                {language === 'ENG' ? 'Reason for Visit' : 'भेटको कारण'}
              </label>
              <textarea
                onChange={handleOnChange}
                id="reason_to_visit"
                name="reason_to_visit"
                rows={4}
                value={bookForm.reason_to_visit}
                className="border-2 border-emerald-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
              <button
                type="submit"
                className="bg-emerald-600 text-white font-semibold py-3 px-6 md:px-10 rounded-full hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
              >
                {language === 'ENG' ? 'Book Now' : 'बुक गर्नुहोस्'}
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className="bg-gray-400 text-white font-semibold py-3 px-6 md:px-10 rounded-full hover:bg-gray-500 transition shadow-md hover:shadow-lg"
              >
                {language === 'ENG' ? 'Cancel' : 'रद्द गर्नुहोस्'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

/* -------------------- Disease Card -------------------- */
function DiseaseCard({ disease, handleShowDoctors }: any) {
  const { language } = useLanguageContext();
  const isENG = language === 'ENG';

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-emerald-200 flex flex-col items-center w-full max-w-sm hover:-translate-y-2">
      <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-1 text-center">
        {isENG ? disease.disease_name.en : disease.disease_name.ne}
      </h2>
      <h3 className="text-sm md:text-md text-gray-500 mb-4 italic text-center">
        {isENG ? disease.disease_name.en : disease.disease_name.ne}
      </h3>

      <Image
        src={disease.disease_image}
        alt="diseaseName"
        width={200}
        height={200}
        className="border-4 border-emerald-400 rounded-full w-32 h-32 md:w-48 md:h-48 shadow-md mb-4 object-cover"
      />

      {disease.disease_conditions && (
        <div className="mb-4 w-full">
          <h4 className="font-semibold text-emerald-600 mb-2">
            {isENG ? 'Conditions:' : 'अवस्थाहरू:'}
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm md:text-base">
            {disease.disease_conditions.map((c: any, idx: number) => (
              <li key={idx}>{isENG ? c.en : c.ne}</li>
            ))}
          </ul>
        </div>
      )}

      {disease.disease_treatments && (
        <div className="mb-4 w-full">
          <h4 className="font-semibold text-emerald-600 mb-2">
            {isENG ? 'Treatment Options:' : 'उपचार:'}
          </h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm md:text-base">
            {disease.disease_treatments.map((t: any, idx: number) => (
              <li key={idx}>{isENG ? t.en : t.ne}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => handleShowDoctors(disease)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        {isENG ? `Find Doctor` : `डाक्टर खोज्नुहोस्`}
      </button>
    </div>
  );
}
