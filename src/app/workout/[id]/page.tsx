'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { IWorkout } from '@/types/type';
import { useFitlog } from '@/context/FitlogContext';

function NavbarWrapper({ activePage }: { activePage?: string }) {
    return (
        <nav className="border-b border-gray-800 bg-[#0a0c10] px-4 py-4 md:px-8">
            <div className="container mx-auto flex items-center justify-between">
                <span className="text-xl font-black uppercase text-[#ccff00]">FitLog</span>
                <span className="text-sm font-bold uppercase tracking-wide text-white">{activePage}</span>
            </div>
        </nav>
    );
}

export default function WorkoutDetailsPage() {
    const params = useParams();
    const id = params?.id;

    const { addToPlan, addToSaved } = useFitlog();

    const [workout, setWorkout] = useState<IWorkout | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Workout details not found on server');
                return res.json();
            })
            .then((data) => {
                if (!data || Object.keys(data).length === 0) {
                    throw new Error('No workout data found');
                }
                setWorkout(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center">
                <p className="text-[#ccff00] font-bold text-lg">Loading workout details...</p>
            </div>
        );
    }

    if (error || !workout) {
        return (
            <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center">
                <p className="text-red-500 font-bold text-lg">Error: {error || 'Workout not found'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white">
            <NavbarWrapper activePage="Workouts" />

            <main className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    <div className="relative w-full h-[450px] md:h-[550px] bg-[#13151b] rounded-3xl overflow-hidden border border-gray-800">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            {/* Name */}
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                                {workout.name}
                            </h1>
                            
                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {workout.description}
                            </p>

                            {/* Name ebong description er niche muscleGroups (Chest, Arms) gulo rakha holo */}
                            <div className="flex flex-wrap gap-2">
                                {workout.muscleGroups?.map((muscle, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl overflow-hidden divide-y divide-gray-800/60 text-xs md:text-sm">
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Equipment</span>
                                <span className="font-bold text-white text-right">
                                    {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : workout.equipment || 'None'}
                                </span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Difficulty</span>
                                <span className="font-bold text-white">{workout.difficulty}</span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Sets</span>
                                <span className="font-bold text-white">{workout.sets}</span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Reps</span>
                                <span className="font-bold text-white">{workout.reps}</span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Duration</span>
                                <span className="font-bold text-white">{workout.duration} min</span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Calories</span>
                                <span className="font-bold text-white">
                                    {workout.caloriesBurned || workout.calories} kcal
                                </span>
                            </div>
                            <div className="flex justify-between p-4">
                                <span className="text-gray-400 font-semibold uppercase">Rating</span>
                                <span className="font-bold text-[#ccff00]">★ {workout.rating}</span>
                            </div>
                        </div>

                        {workout.instructions && workout.instructions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-black uppercase tracking-wider text-white">Instructions</h3>
                                <ol className="space-y-2 text-xs md:text-sm text-gray-300 list-decimal list-inside">
                                    {workout.instructions.map((step, idx) => (
                                        <li key={idx} className="leading-relaxed">{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => addToPlan(workout)}
                                className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                            >
                                📅 Add to today&apos;s plan
                            </button>
                            <button
                                onClick={() => addToSaved(workout)}
                                className="flex-1 bg-[#13151b] hover:bg-gray-800 text-white border border-gray-700 font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                            >
                                🔖 Save for later 
                            </button>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}