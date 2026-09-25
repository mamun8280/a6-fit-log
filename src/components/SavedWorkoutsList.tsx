'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkout } from '@/types/type';

interface SavedWorkoutsListProps {
    workouts: IWorkout[];
    onRemove: (id: number) => void;
}

const SavedWorkoutsList: React.FC<SavedWorkoutsListProps> = ({ workouts, onRemove }) => {
    if (workouts.length === 0) {
        return (
            <div className="text-center py-16 bg-[#13151b] rounded-2xl border border-dashed border-gray-800">
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight text-white">NO SAVED WORKOUTS</h3>
                <p className="text-gray-400 text-sm mb-6">Save your favorite workouts for later use.</p>
                <Link href="/" className="bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-xl text-sm uppercase tracking-wide inline-block hover:bg-[#b3e600] transition-colors">
                    Go to workouts
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {workouts.map((workout) => {
                const workoutId = workout.id;
                return (
                    <div key={workoutId} className="flex items-center justify-between bg-[#13151b] border border-gray-800 p-4 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase text-sm text-white">{workout.name}</h4>
                                {/* Name er niche equipment dekhanor jonno eta add kora holo */}
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment || 'None'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    ⏱️ {workout.duration} min • 🔥 {workout.caloriesBurned || workout.calories} kcal • ★ {workout.rating}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href={`/workout/${workoutId}`} className="text-xs font-bold border border-gray-700 hover:border-gray-500 px-3 py-2 rounded-lg text-white transition-colors">
                                View Details
                            </Link>
                            <button
                                onClick={() => onRemove(workoutId)}
                                className="text-gray-400 hover:text-red-500 font-bold px-2 text-lg transition-colors"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SavedWorkoutsList;