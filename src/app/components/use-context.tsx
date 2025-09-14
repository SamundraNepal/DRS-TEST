'use client';

import React, { createContext, useContext, useState } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

// 1. Create context
const LanguageContext = createContext<LanguageContextType | null>(null);

// 2. Create a provider component that holds the state and provides value
export function LanguageContextProvider({ children }: any) {
  const [language, setLanguage] = useState<string>('ENG');

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Export a custom hook for easier use of context
export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}
