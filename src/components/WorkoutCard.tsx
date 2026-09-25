
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkout } from '@/types/type';

interface WorkoutCardProps {
    workout: IWorkout & { _id?: string };
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
    const workoutId = workout.id || workout._id;

    return (
        <Link
            href={`/workout/${workoutId}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800/80 bg-[#13151b] transition-all duration-300 hover:border-[#ccff00]/50 hover:shadow-xl hover:shadow-[#ccff00]/5"
        >
            
            <div>
              
                <div className="relative h-44 w-full overflow-hidden bg-[#0a0a0c] sm:h-48">
                    <Image
                        src={workout.image || '/placeholder.png'}
                        alt={workout.name || 'Workout'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

               
                <div className="space-y-2 p-3.5 sm:p-4">

                    
                    <div className="flex flex-wrap gap-1.5">
                        {workout.muscleGroups?.map((muscle, idx) => (
                            <span
                                key={idx}
                                className="rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black sm:text-xs"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>

                    
                    <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tight text-white transition-colors group-hover:text-[#ccff00] sm:text-base">
                        {workout.name}
                    </h3>

                    
                    <p className="line-clamp-1 text-xs font-medium text-gray-400">
                        {Array.isArray(workout.equipment)
                            ? workout.equipment.join(', ')
                            : workout.equipment || 'No Equipment'}
                    </p>
                </div>
            </div>

           
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-800/40 px-3.5 pb-4 pt-3 text-[11px] font-semibold text-gray-400 sm:px-4 sm:text-xs">

                
                <span className="flex items-center gap-1">
                    ⏱️ {workout.duration} min
                </span>

               
                <span className="flex items-center gap-1">
                    🔥 {workout.caloriesBurned || workout.calories || 0} kcal
                </span>

                
                <span className="flex items-center gap-1 text-[#ccff00]">
                    ★ {workout.rating || 'N/A'}
                </span>
            </div>
        </Link>
    );
};

export default WorkoutCard;


