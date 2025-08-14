"use client";

import { useLanguageContext } from "../components/use-context";

export default function Page() {
  const { language } = useLanguageContext();

  return (
    <div className="flex justify-center items-center h-full w-full flex-col gap-8">
      <form className="border-4 w-full max-w-md p-8 flex flex-col gap-4 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
        <h1 className="text-2xl font-bold uppercase text-green-900 mb-4 text-center">
          {language === "ENG" ? "Login" : "लगइन"}
        </h1>

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
                ? "Enter your email"
                : "तपाईंको इमेल लेख्नुहोस्"
            }
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-green-700">
            {language === "ENG" ? "Password" : "पासवर्ड"}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder={
              language === "ENG"
                ? "Enter your password"
                : "तपाईंको पासवर्ड लेख्नुहोस्"
            }
            className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            required
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
          >
            {language === "ENG" ? "Login" : "लगइन"}
          </button>
        </div>
      </form>
    </div>
  );
}

function test() {
  const { language } = useLanguageContext();

  <form className="border-4 w-full max-w-md p-8 flex flex-col gap-4 rounded-3xl shadow-black shadow-2xl font-bold bg-green-50">
    <h1 className="text-2xl font-bold uppercase text-green-900 mb-4 text-center">
      {language === "ENG" ? "Sign Up" : "साइन अप"}
    </h1>

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
          language === "ENG" ? "Enter your email" : "तपाईंको इमेल लेख्नुहोस्"
        }
        className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1">
      <label htmlFor="password" className="text-green-700">
        {language === "ENG" ? "Password" : "पासवर्ड"}
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder={
          language === "ENG"
            ? "Enter your password"
            : "तपाईंको पासवर्ड लेख्नुहोस्"
        }
        className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
    </div>

    {/* Confirm Password */}
    <div className="flex flex-col gap-1">
      <label htmlFor="confirmPassword" className="text-green-700">
        {language === "ENG" ? "Confirm Password" : "पासवर्ड पुन: लेख्नुहोस्"}
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder={
          language === "ENG"
            ? "Confirm your password"
            : "तपाईंको पासवर्ड पुन: लेख्नुहोस्"
        }
        className="border-2 border-green-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
    </div>

    {/* Submit */}
    <div className="flex justify-center gap-4">
      <button
        type="submit"
        className="
        bg-green-600 text-white font-semibold py-3 px-8 rounded-full 
        hover:bg-green-700 transition-colors duration-300 
        shadow-md hover:shadow-lg cursor-pointer
      "
      >
        {language === "ENG" ? "Sign Up" : "साइन अप"}
      </button>
    </div>
  </form>;
}
