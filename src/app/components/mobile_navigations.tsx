'use client';

import Link from 'next/link';
import { useLanguageContext } from './use-context';
import { useState } from 'react';

export default function MobileNavigation() {
  const { language, setLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLangue = (value: string) => {
    setLanguage(value);
    setIsOpen(false); // close menu after selecting
  };

  return (
    <nav className="px-6 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href={'/'}>
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <h1 className="font-extrabold uppercase text-2xl tracking-wide hover:scale-105 transition-transform duration-200">
              CTVS Experts
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center text-lg font-medium">
          <Link href={'/about-us'}>
            <div className="hover:text-green-400 transition-colors duration-200 cursor-pointer">
              {language === 'ENG' ? 'About Us' : 'हाम्रो बारेमा'}
            </div>
          </Link>

          <Link href={'/log-in-sign-up'}>
            <div className="hover:text-green-400 transition-colors duration-200 cursor-pointer">
              Log In / Sign Up
            </div>
          </Link>

          {/* Language Switcher */}
          <div className="flex gap-3 items-center">
            <span className="font-semibold">
              {language === 'ENG' ? 'Language' : 'भाषा'}:
            </span>
            <div className="flex gap-2">
              <div
                onClick={() => handleChangeLangue('ENG')}
                className={`px-3 py-1 rounded-lg border border-white/30 cursor-pointer transition-all duration-200 ${
                  language === 'ENG'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'hover:bg-white/20'
                }`}
              >
                ENG
              </div>
              <div
                onClick={() => handleChangeLangue('NE')}
                className={`px-3 py-1 rounded-lg border border-white/30 cursor-pointer transition-all duration-200 ${
                  language === 'NE'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'hover:bg-white/20'
                }`}
              >
                NE
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col gap-6 mt-6 text-lg font-medium md:hidden">
          <Link href={'/about-us'} onClick={() => setIsOpen(false)}>
            <div className="hover:text-green-400 transition-colors duration-200 cursor-pointer">
              {language === 'ENG' ? 'About Us' : 'हाम्रो बारेमा'}
            </div>
          </Link>

          <Link href={'/log-in-sign-up'} onClick={() => setIsOpen(false)}>
            <div className="hover:text-green-400 transition-colors duration-200 cursor-pointer">
              Log In / Sign Up
            </div>
          </Link>

          {/* Language Switcher */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold">
              {language === 'ENG' ? 'Language' : 'भाषा'}:
            </span>
            <div className="flex gap-2">
              <div
                onClick={() => handleChangeLangue('ENG')}
                className={`px-3 py-1 rounded-lg border border-white/30 cursor-pointer transition-all duration-200 ${
                  language === 'ENG'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'hover:bg-white/20'
                }`}
              >
                ENG
              </div>
              <div
                onClick={() => handleChangeLangue('NE')}
                className={`px-3 py-1 rounded-lg border border-white/30 cursor-pointer transition-all duration-200 ${
                  language === 'NE'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'hover:bg-white/20'
                }`}
              >
                NE
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
