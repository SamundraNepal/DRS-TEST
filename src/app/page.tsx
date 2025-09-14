'use client';

import Link from 'next/link';
import { FaUserDoctor } from 'react-icons/fa6';
import { useLanguageContext } from './components/use-context';
import Image from 'next/image';

export default function Home() {
  const { language } = useLanguageContext();
  return (
    <div className="sm:h-[calc(100vh-70px)] h-[calc(100vh-135px)] w-full text-black flex sm:w-full justify-center items-center relative">
      <Image
        className="w-full absolute h-full object-cover brightness-50 -z-10"
        width={500}
        height={500}
        alt={'images'}
        src={
          'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15815402/shutterstock_280947350.0.0.1463614660.jpg?quality=90&strip=all&crop=0,0.02498750624688,100,99.950024987506'
        }
      />

      <div className="text-white w-full h-full flex justify-center items-center flex-col uppercase">
        <h1 className="font-bold sm:text-8xl text-4xl">CTVS EXPERTS</h1>
        <h2 className="font-bold sm:text-2xl">Leaders in vascular &</h2>
        <h2 className="font-bold sm:text-2xl">Thoraacic Care</h2>

        <div className="flex p-2">
          <Link href={'/doctors'}>
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
                {language === 'ENG' ? 'Our Services' : 'हाम्रा सेवा'}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
