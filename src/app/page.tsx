"use client";

import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";
import { useLanguageContext } from "./components/use-context";
import Image from "next/image";

export default function Home() {
  const { language } = useLanguageContext();
  return (
    <div className="bg-white w-full h-[calc(100vh-95px)] text-black flex  justify-evenly items-center relative">
      <div className="h-full w-full absolute">
        <Image
          src="https://www.caregivercalifornia.org/wp-content/uploads/2024/01/stock-images-1.png"
          alt="imageName"
          width={500}
          height={500}
          className="h-full w-full object-cover blur-xs"
        />
      </div>
      <div className="flex justify-evenly items-baseline w-full z-10">
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center gap-8">
          {/*English Section*/}
          {language === "ENG" && (
            <div className="flex flex-col gap-4 text-center max-w-xl bg-white p-2 rounded-2xl">
              <h1 className="text-5xl font-bold text-green-800">
                Book your next
              </h1>
              <h1 className="text-5xl font-bold text-green-800">
                Healthcare appointment
              </h1>
              <h2 className="text-lg text-green-700">
                Find, book and add your favourite practitioners to your care
                team.
              </h2>
            </div>
          )}

          {/*Nepali Section*/}

          {language === "NE" && (
            <div className="flex flex-col gap-4 text-center max-w-xl  bg-white p-8 rounded-2xl">
              <h1 className="text-5xl font-bold text-green-800">
                आफ्नो अर्को स्वास्थ्य सेवा
              </h1>
              <h1 className="text-5xl font-bold text-green-800">
                भेटघाट बुक गर्नुहोस्
              </h1>
              <h2 className="text-lg text-green-700">
                आफ्ना मनपर्ने चिकित्सकहरू खोज्नुहोस्, बुक गर्नुहोस् र आफ्नो
                हेरचाह टोलीमा थप्नुहोस्।
              </h2>
            </div>
          )}

          {/* Our Doctors Card */}
          <div className="flex p-2">
            <Link href={"/doctors"}>
              <div
                className="
              border-4 border-green-600 
              p-6 rounded-3xl 
              w-56 h-56 
              flex flex-col justify-center items-center gap-6 
              cursor-pointer 
              bg-green-50 
              text-green-700 
              shadow-lg 
              hover:shadow-xl 
              hover:bg-green-600 
              hover:text-white 
              transition-all duration-300 
              transform hover:scale-105
            "
              >
                <div>
                  <FaUserDoctor className="text-9xl" />
                </div>
                <h1 className="font-extrabold text-lg">
                  {language === "ENG" ? "Our Doctors" : "हाम्रा चिकित्सकहरू"}
                </h1>
              </div>
            </Link>
          </div>
        </div>

        {/* Contact Form ENG */}
        {language === "ENG" && (
          <form className="border-4 w-full max-w-xl p-8 flex flex-col gap-6 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
            <h1 className="text-3xl font-bold uppercase text-green-900 mb-4 text-center">
              Contact Us
            </h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-green-700">
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-green-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-green-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                cols={30}
                rows={5}
                className="border-2 border-green-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="
              bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
              hover:bg-green-700 transition-colors duration-300 
              shadow-md hover:shadow-lg cursor-pointer
            "
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {/*Conatc Nepali Form */}

        {language === "NE" && (
          <form className="border-4 w-full max-w-xl p-8 flex flex-col gap-6 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
            <h1 className="text-3xl font-bold uppercase text-green-900 mb-4 text-center">
              हामीलाई सम्पर्क गर्नुहोस्
            </h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="fullname" className="text-green-700">
                पुरा नाम
              </label>
              <input
                id="fullname"
                name="fullname"
                className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-green-700">
                इमेल ठेगाना
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-green-700">
                सन्देश
              </label>
              <textarea
                id="message"
                name="message"
                cols={30}
                rows={5}
                className="border-2 border-green-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
              >
                पठाउनुहोस्
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// unused ones for now
function bookDOc() {
  <>
    {
      <form className="border-4 w-full max-w-xl p-8 flex flex-col gap-6 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
        <h1 className="text-3xl font-bold uppercase text-green-900 mb-4 text-center">
          Book an Appointment with docName
        </h1>

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname" className="text-green-700">
            Full Name
          </label>
          <input
            id="fullname"
            name="fullname"
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-green-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-green-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Doctor Selection */}
        <div className="flex flex-col gap-1">
          <label htmlFor="doctor" className="text-green-700">
            Select Doctor
          </label>
          <select
            id="doctor"
            name="doctor"
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">-- Choose a Doctor --</option>
            <option value="dr-smith">Dr. John Smith – Cardiology</option>
            <option value="dr-jane">Dr. Jane Doe – Thoracic Surgery</option>
            <option value="dr-lee">Dr. David Lee – Vascular Surgery</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-green-700">
            Appointment Date
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
            Appointment Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Message / Reason */}
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-green-700">
            Reason for Visit
          </label>
          <textarea
            id="message"
            name="message"
            cols={30}
            rows={4}
            placeholder="Briefly describe your symptoms or reason for appointment..."
            className="border-2 border-green-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
          >
            Book Now
          </button>
        </div>
      </form>
    }
  </>;
}
