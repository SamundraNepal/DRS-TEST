"use client";

import Link from "next/link";
import { useLanguageContext } from "./use-context";

export default function Navigation() {
  const { language, setLanguage } = useLanguageContext();

  const handleChangeLangue = (value: string) => {
    setLanguage(value);
  };
  return (
    <div className=" font-bold  flex justify-around items-center p-4 bg-black text-white">
      <Link href={"/"}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold uppercase text-3xl">CTVS Experts</h1>
        </div>
      </Link>
      <div className="flex gap-8">
        <Link href={"/about-us"}>
          <div className="hover:text-green-500 cursor-pointer">
            {language === "ENG" ? "About Us" : "हाम्रो बारेमा"}
          </div>
        </Link>

        <Link href={"/log-in-sign-up"}>
          <div className="hover:text-green-500 cursor-pointer">
            Log In / Sign Up
          </div>
        </Link>

        <div className=" flex gap-4 justify-center items-center">
          <h1>{language === "ENG" ? "Language" : "भाषा"} : </h1>
          <div className="flex gap-4 ">
            <div
              onClick={() => handleChangeLangue("ENG")}
              className={`hover:border-2 rounded duration-100 transition-all cursor-pointer ${
                language === "ENG" ? "bg-green-500 text-white" : ""
              }`}
            >
              ENG
            </div>
            <div
              onClick={() => handleChangeLangue("NE")}
              className={`hover:border-2 rounded duration-100 transition-all cursor-pointer ${
                language === "NE" ? "bg-green-500 text-white" : ""
              }`}
            >
              NE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
