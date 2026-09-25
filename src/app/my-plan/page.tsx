'use client';

import React, { useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import TodaysPlanList from '@/components/TodaysPlanList';
import SavedWorkoutsList from '@/components/SavedWorkoutsList';
import { IWorkout } from '@/types/type';

type SortOption = 'duration' | 'rating' | 'calories';

const MyPlanPage = () => {
    const { todayPlan, savedList, removeFromPlan, removeFromSaved } = useFitlog();
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
    
    
    const [planSort, setPlanSort] = useState<SortOption>('duration');
    const [savedSort, setSavedSort] = useState<SortOption>('duration');

  
    const totalMinutes = todayPlan.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
    const totalCalories = todayPlan.reduce((acc, item) => acc + (Number(item.caloriesBurned || item.calories) || 0), 0);

  
    const sortWorkouts = (list: IWorkout[], sortBy: SortOption) => {
        const listCopy = [...list];
        
        if (sortBy === 'duration') {
            return listCopy.sort((a, b) => (Number(a.duration) || 0) - (Number(b.duration) || 0));
        }
        if (sortBy === 'rating') {
            return listCopy.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        }
        if (sortBy === 'calories') {
            return listCopy.sort((a, b) => {
                const calA = Number(a.caloriesBurned || a.calories) || 0;
                const calB = Number(b.caloriesBurned || b.calories) || 0;
                return calB - calA;
            });
        }
        return listCopy;
    };

    
    const sortedTodayPlan = sortWorkouts(todayPlan, planSort);
    const sortedSavedList = sortWorkouts(savedList, savedSort);

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white p-6 md:p-12">
            
            <div className="max-w-7xl mx-auto space-y-8">
                
               
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white">MY PLAN</h1>
                    <p className="text-gray-400 text-xs mt-1">Cap of five lifts for today. Finish them, then load more.</p>
                </div>

               
                <div className="grid grid-cols-3 gap-4 bg-[#13151b] border border-gray-800 p-6 rounded-2xl">
                    <div>
                        <p className="text-gray-400 text-xs font-semibold uppercase">Exercises</p>
                        <h2 className="text-3xl font-black text-[#ccff00] mt-1">{todayPlan.length}</h2>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-semibold uppercase">Minutes</p>
                        <h2 className="text-3xl font-black text-white mt-1">{totalMinutes}</h2>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-semibold uppercase">Calories</p>
                        <h2 className="text-3xl font-black text-white mt-1">{totalCalories}</h2>
                    </div>
                </div>

             
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                   
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveTab('plan')}
                            className={`px-5 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                                activeTab === 'plan'
                                    ? 'bg-[#1e222d] text-white border border-gray-700 shadow'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Today&apos;s Plan
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`px-5 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                                activeTab === 'saved'
                                    ? 'bg-[#1e222d] text-white border border-gray-700 shadow'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Saved 
                        </button>
                    </div>

                    
                    <div className="flex items-center gap-2 bg-[#13151b] border border-gray-800 px-3 py-1.5 rounded-xl">
                        <span className="text-xs text-gray-400 font-semibold uppercase">Sort By:</span>
                        <select
                            value={activeTab === 'plan' ? planSort : savedSort}
                            onChange={(e) => {
                                const val = e.target.value as SortOption;
                                if (activeTab === 'plan') {
                                    setPlanSort(val);
                                } else {
                                    setSavedSort(val);
                                }
                            }}
                            className="bg-transparent text-xs font-bold text-[#ccff00] focus:outline-none cursor-pointer uppercase"
                        >
                            <option value="duration" className="bg-[#13151b] text-white">duration</option>
                            <option value="rating" className="bg-[#13151b] text-white">rating</option>
                            <option value="calories" className="bg-[#13151b] text-white">calories</option>
                        </select>
                    </div>
                </div>

                
                <div>
                    {activeTab === 'plan' ? (
                        <TodaysPlanList workouts={sortedTodayPlan} onRemove={removeFromPlan} />
                    ) : (
                        <SavedWorkoutsList workouts={sortedSavedList} onRemove={removeFromSaved} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyPlanPage;