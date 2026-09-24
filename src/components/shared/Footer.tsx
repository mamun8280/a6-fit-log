import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0c] py-8 text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-8">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="FitLog Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span className="text-xl font-black uppercase tracking-wider text-white">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        <p className="text-center text-xs md:text-right md:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;