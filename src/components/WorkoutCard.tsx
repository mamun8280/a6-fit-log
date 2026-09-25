'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkout } from '@/types/type';

interface WorkoutCardProps {
    workout: IWorkout & { _id?: string }; // _id এবং id উভয়কেই সাপোর্ট করার জন্য
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
    // ব্যাকএন্ডে id বা _id যেটাই থাকুক না কেন তা ডাইনামিকালি ধরবে
    const workoutId = workout.id || workout._id;

    return (
        <Link
            href={`/workout/${workoutId}`}
            className="group bg-[#13151b] border border-gray-800/80 hover:border-[#ccff00]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#ccff00]/5"
        >
            <div>
                {/* Top Image Box: মোবাইল এবং বড় স্ক্রিনের জন্য হাইট অ্যাডজাস্ট করা হয়েছে */}
                <div className="relative w-full h-44 sm:h-48 bg-[#0a0a0c] overflow-hidden">
                    <Image
                        src={workout.image || '/placeholder.png'}
                        alt={workout.name || 'Workout'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Card Details */}
                <div className="p-3.5 sm:p-4 space-y-2">
                    {/* Category Tag Pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {workout.category?.map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-[#ccff00] text-black text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Workout Title */}
                    <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight line-clamp-1 group-hover:text-[#ccff00] transition-colors">
                        {workout.name}
                    </h3>

                    {/* Equipment Subtitle */}
                    <p className="text-gray-400 text-xs font-medium line-clamp-1">
                        {Array.isArray(workout.equipment)
                            ? workout.equipment.join(', ')
                            : workout.equipment || 'No Equipment'}
                    </p>
                </div>
            </div>

            {/* Bottom Stats Row: মোবাইল স্ক্রিনে যেন লেখা ভেঙে না যায় সেভাবে ফ্লেক্স রেসপন্সিভ করা হয়েছে */}
            <div className="px-3.5 sm:px-4 pb-4 pt-2 flex flex-wrap items-center justify-between gap-2 text-gray-400 text-[11px] sm:text-xs font-semibold border-t border-gray-800/40">
                <span className="flex items-center gap-1">⏱️ {workout.duration}m</span>
                <span className="flex items-center gap-1">
                    🔥 {workout.caloriesBurned || workout.calories || 0} kcal
                </span>
                <span className="flex items-center gap-1 text-[#ccff00]">★ {workout.rating || 'N/A'}</span>
            </div>
        </Link>
    );
};

export default WorkoutCard;