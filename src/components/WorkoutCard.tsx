'use client';

import React from 'react';
import Image from 'next/image';
import { IWorkout } from '@/types/type';

interface WorkoutCardProps {
    workout: IWorkout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
    // এখানে _id বা id যেটাই থাকুক না কেন, তা ডাইনামিকালি ধরবে
    const workoutId = workout.id;

    return (
        <a
            href={`/workout/${workoutId}`}
            className="group bg-[#13151b] border border-gray-800/80 hover:border-gray-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300"
        >
            <div>
                {/* Top Image Box */}
                <div className="relative w-full h-48 bg-[#0a0a0c] overflow-hidden">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-2">
                    {/* Category Tag Pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {workout.category?.map((cat, idx) => (
                            <span
                                key={idx}
                                className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Workout Title */}
                    <h3 className="text-white font-black text-sm uppercase tracking-tight line-clamp-1 group-hover:text-[#ccff00] transition-colors">
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

            {/* Bottom Stats Row */}
            <div className="px-4 pb-4 pt-2 flex items-center gap-4 text-gray-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5">⏱️ {workout.duration} min</span>
                <span className="flex items-center gap-1.5">
                    🔥 {workout.caloriesBurned || workout.calories} kcal
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">★ {workout.rating}</span>
            </div>
        </a>
    );
};

export default WorkoutCard;