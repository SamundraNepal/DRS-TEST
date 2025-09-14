'use client';

import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center absolute z-10 w-full backdrop-blur-2xl">
      <h1 className="absolute w-full text-center text-black font-bold text-3xl">
        Loading...
      </h1>

      <motion.div
        className="w-80 h-80 border-8 border-teal-400 border-t-transparent rounded-full "
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
      />
    </div>
  );
}
