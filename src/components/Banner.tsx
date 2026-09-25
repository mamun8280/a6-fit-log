
import React from 'react';
import Image from 'next/image';
import { Oswald } from 'next/font/google';
import bannerImg from '@/assets/banner.png';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const Banner = () => {
  return (
    <section className="mx-4 my-8 rounded-2xl border border-gray-800 bg-[#13151b] sm:mx-5 md:my-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-6 py-8 sm:px-8 md:flex-row md:px-12 md:py-12">

        
        <div className="w-full max-w-2xl space-y-4 text-center md:text-left">

         
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </span>

         
          <h1
            className={`${oswald.className} text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl`}
          >
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

         
          <p className="max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          
          <a
            href="#library"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-black transition-all duration-200 hover:bg-[#b8e600] hover:shadow-lg hover:shadow-[#ccff00]/20 focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-2 focus:ring-offset-[#13151b]"
          >
            <span>BROWSE WORKOUTS</span>

           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>

        
        <div className="flex w-full justify-center md:w-[40%]">
          <Image
            src={bannerImg}
            alt="FitLog workout illustration"
            width={400}
            height={400}
            priority
            className="h-auto w-56 object-contain sm:w-72 md:w-80 lg:w-[360px]"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;


