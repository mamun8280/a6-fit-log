import Image from 'next/image';
import bannerImg from '@/assets/banner.png';

export default function Banner() {
  return (
    
    <div className="bg-[#13151b] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mt-8 mb-12 mx-2.5 border border-gray-800">
      {/* Left Content */}
      <div className="max-w-xl space-y-4">
        <span className="text-[#ccff00] font-bold text-xs tracking-widest uppercase">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <button className="bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition-opacity">
          BROWSE WORKOUTS
        </button>
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
}