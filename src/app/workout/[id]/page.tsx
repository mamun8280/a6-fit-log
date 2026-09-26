'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';

import { IWorkout } from '@/types/type';
import { useFitlog } from '@/context/FitlogContext';

const WorkoutDetailsPage = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const { addToPlan, addToSaved } = useFitlog();

    const [workout, setWorkout] = useState<IWorkout | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://api.api-store.workers.dev/api/fitlog/:id`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Workout not found');
                }

                return res.json();
            })
            .then((data) => {
                if (!data || Object.keys(data).length === 0) {
                    throw new Error('Workout not found');
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
            <div className="min-h-[70vh] bg-[#0a0c10] text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>

                        <p className="text-sm font-bold uppercase tracking-wider text-[#ccff00]">
                            Loading workout details…
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    
    if (error || !workout) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white">

            <main className="container mx-auto px-4 py-10 md:px-8 md:py-12">

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">

                    
                    <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-gray-800 bg-[#13151b] sm:h-[500px] lg:h-[600px]">

                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-full w-full object-cover"
                            priority
                        />

                    </div>

                    
                    <div className="space-y-6">

                       
                        <div>

                            <h1 className="mb-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                                {workout.name}
                            </h1>

                            <p className="mb-5 text-sm leading-7 text-gray-400 sm:text-base">
                                {workout.description}
                            </p>

                         
                            <div className="flex flex-wrap gap-2">

                                {workout.muscleGroups?.map((muscle, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-black uppercase tracking-wider text-black"
                                    >
                                        {muscle}
                                    </span>
                                ))}

                            </div>

                        </div>

                       
                        <div className="overflow-hidden rounded-2xl border border-gray-800/80 bg-[#13151b]">

                            <div className="border-b border-gray-800 px-5 py-4">
                                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                                    Key Specs
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-800/60">

                               
                                <div className="flex items-center justify-between gap-4 px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Equipment
                                    </span>

                                    <span className="text-right text-sm font-bold text-white">
                                        {Array.isArray(workout.equipment)
                                            ? workout.equipment.join(', ')
                                            : workout.equipment || 'None'}
                                    </span>
                                </div>

                              
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Difficulty
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.difficulty}
                                    </span>
                                </div>

                              
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Sets
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.sets}
                                    </span>
                                </div>

                                
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Reps
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.reps}
                                    </span>
                                </div>

                                
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Duration
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.duration} min
                                    </span>
                                </div>

                               
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Calories
                                    </span>

                                    <span className="text-sm font-bold text-white">
                                        {workout.caloriesBurned} kcal
                                    </span>
                                </div>

                              
                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-xs font-semibold uppercase text-gray-400">
                                        Rating
                                    </span>

                                    <span className="text-sm font-bold text-[#ccff00]">
                                        ★ {workout.rating}
                                    </span>
                                </div>

                            </div>

                        </div>

                        
                        {workout.instructions?.length > 0 && (
                            <div className="space-y-4">

                                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                                    Instructions
                                </h2>

                                <ol className="space-y-3">

                                    {workout.instructions.map((step, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-sm leading-6 text-gray-300"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                                                {index + 1}
                                            </span>

                                            <span>{step}</span>
                                        </li>
                                    ))}

                                </ol>

                            </div>
                        )}

                      
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                        
                            <button
                                onClick={() => addToPlan(workout)}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-black transition-all hover:bg-[#b3e600] hover:shadow-lg hover:shadow-[#ccff00]/10"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>

                                Add to today&apos;s plan

                            </button>

                         
                            <button
                                onClick={() => addToSaved(workout)}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-700 bg-[#13151b] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-all hover:border-gray-500 hover:bg-gray-800"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>

                                Save for later

                            </button>

                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default WorkoutDetailsPage;