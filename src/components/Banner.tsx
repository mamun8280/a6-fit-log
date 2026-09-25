import React from 'react';
import Image from 'next/image';
import bannerImg from '@/assets/banner.png';

const Banner = () => {
  return (
    <div className="bg-[#13151b] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 my-12 mx-5 border border-gray-800">
      
      <div className="max-w-xl space-y-4">
        <span className="text-[#ccff00] font-bold text-xs tracking-widest uppercase">
          WORKOUT LIBRARY
        </span>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-all uppercase tracking-wide cursor-pointer"
        >
          BROWSE WORKOUTS
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>

      <div className="w-full md:w-auto flex justify-center">
        <Image
          src={bannerImg}
          alt="Workout Illustration"
          width={320}
          height={320}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Banner;