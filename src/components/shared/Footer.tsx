import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#090a0c] text-gray-400 py-6 border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Exact Logo & FITLOG Typography */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {/* Lime Dumbbell Icon */}
          <span className="text-[#ccff00]">
            <svg 
              className="w-6 h-6 fill-current" 
              viewBox="0 0 24 24"
            >
              <path d="M7 5v2h2V5H7zm10 0v2h2V5h-2zM3 9v6h2V9H3zm16 0v6h2V9h-2zM7 11h10v2H7v-2zM5 8h2v8H5V8zm12 0h2v8h-2V8z" />
            </svg>
          </span>

          {/* FITLOG Bold Condensed Text */}
          <span className="font-black text-xl tracking-tight text-white uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright Text */}
        <div className="text-xs md:text-sm text-gray-500 font-normal text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </div>

      </div>
    </footer>
  );
};

export default Footer;