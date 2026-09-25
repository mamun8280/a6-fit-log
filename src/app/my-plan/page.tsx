'use client';

import React, { useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import TodaysPlanList from '@/components/TodaysPlanList';
import SavedWorkoutsList from '@/components/SavedWorkoutsList';
import { IWorkout } from '@/types/type';

type SortOption = 'duration' | 'rating' | 'calories';

const MyPlanPage = () => {
    const {
        todayPlan,
        savedList,
        removeFromPlan,
        removeFromSaved,
    } = useFitlog();

    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');

    const [planSort, setPlanSort] = useState<SortOption>('duration');
    const [savedSort, setSavedSort] = useState<SortOption>('duration');

  
    const currentWorkouts =
        activeTab === 'plan' ? todayPlan : savedList;

   
    const totalMinutes = currentWorkouts.reduce(
        (acc, item) =>
            acc + (Number(item.duration) || 0),
        0
    );

   
    const totalCalories = currentWorkouts.reduce(
        (acc, item) =>
            acc +
            (Number(
                item.caloriesBurned || item.calories
            ) || 0),
        0
    );

   
    const sortWorkouts = (
        list: IWorkout[],
        sortBy: SortOption
    ) => {
        const listCopy = [...list];

        if (sortBy === 'duration') {
            return listCopy.sort(
                (a, b) =>
                    (Number(a.duration) || 0) -
                    (Number(b.duration) || 0)
            );
        }

        if (sortBy === 'rating') {
            return listCopy.sort(
                (a, b) =>
                    (Number(b.rating) || 0) -
                    (Number(a.rating) || 0)
            );
        }

        if (sortBy === 'calories') {
            return listCopy.sort((a, b) => {
                const calA =
                    Number(
                        a.caloriesBurned || a.calories
                    ) || 0;

                const calB =
                    Number(
                        b.caloriesBurned || b.calories
                    ) || 0;

                return calB - calA;
            });
        }

        return listCopy;
    };

    const sortedTodayPlan = sortWorkouts(
        todayPlan,
        planSort
    );

    const sortedSavedList = sortWorkouts(
        savedList,
        savedSort
    );

    return (
        <div className="min-h-screen bg-[#0a0c10] p-6 text-white md:p-12">

            <div className="mx-auto max-w-7xl space-y-8">

            
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                        MY PLAN
                    </h1>

                    <p className="mt-1 text-xs text-gray-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                
                <div className="grid grid-cols-3 gap-4 rounded-2xl border border-gray-800 bg-[#13151b] p-6">

                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-400">
                            Exercises
                        </p>

                        <h2 className="mt-1 text-3xl font-black text-[#ccff00]">
                            {currentWorkouts.length}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-400">
                            Minutes
                        </p>

                        <h2 className="mt-1 text-3xl font-black text-white">
                            {totalMinutes}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase text-gray-400">
                            Calories
                        </p>

                        <h2 className="mt-1 text-3xl font-black text-white">
                            {totalCalories}
                        </h2>
                    </div>

                </div>

              
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

                   
                    <div className="flex gap-3">

                        <button
                            onClick={() => setActiveTab('plan')}
                            className={`rounded-xl px-5 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                                activeTab === 'plan'
                                    ? 'border border-gray-700 bg-[#1e222d] text-white shadow'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Today&apos;s Plan
                        </button>

                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`rounded-xl px-5 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                                activeTab === 'saved'
                                    ? 'border border-gray-700 bg-[#1e222d] text-white shadow'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Saved
                        </button>

                    </div>

                    
                    <div className="flex items-center gap-3">

                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            Sort By
                        </span>

                        <div className="relative">

                            <select
                                value={
                                    activeTab === 'plan'
                                        ? planSort
                                        : savedSort
                                }
                                onChange={(e) => {
                                    const value =
                                        e.target.value as SortOption;

                                    if (activeTab === 'plan') {
                                        setPlanSort(value);
                                    } else {
                                        setSavedSort(value);
                                    }
                                }}
                                className="cursor-pointer appearance-none rounded-xl border border-gray-700 bg-[#13151b] py-2.5 pl-4 pr-10 text-xs font-bold uppercase tracking-wide text-[#ccff00] outline-none transition-all hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:outline-none focus:ring-0"
                            >
                                <option
                                    value="duration"
                                    className="bg-[#13151b] text-white"
                                >
                                    Duration
                                </option>

                                <option
                                    value="calories"
                                    className="bg-[#13151b] text-white"
                                >
                                    Calories
                                </option>

                                <option
                                    value="rating"
                                    className="bg-[#13151b] text-white"
                                >
                                    Rating
                                </option>
                            </select>

                            
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#ccff00]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.06l-4.25-4.51a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                        </div>

                    </div>

                </div>

            
                <div>
                    {activeTab === 'plan' ? (
                        <TodaysPlanList
                            workouts={sortedTodayPlan}
                            onRemove={removeFromPlan}
                        />
                    ) : (
                        <SavedWorkoutsList
                            workouts={sortedSavedList}
                            onRemove={removeFromSaved}
                        />
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyPlanPage;