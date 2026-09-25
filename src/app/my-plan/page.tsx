'use client';

import React, { useState } from 'react';
import { useFitlog } from '@/context/FitlogContext';
import TodaysPlanList from '@/components/TodaysPlanList';
import SavedWorkoutsList from '@/components/SavedWorkoutsList';

const MyPlanPage = () => {
    // এখানে savedWorkouts এর পরিবর্তে savedList ব্যবহার করা হয়েছে এবং তা নিচে ব্যবহৃত হচ্ছে
    const { todayPlan, savedList, removeFromPlan, removeFromSaved } = useFitlog();
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');

    // মোট সময় এবং ক্যালরি হিসাব করা (শুধুমাত্র Today's Plan এর ওপর ভিত্তি করে)
    const totalMinutes = todayPlan.reduce((acc, item) => acc + (Number(item.duration) || 0), 0);
    const totalCalories = todayPlan.reduce((acc, item) => acc + (Number(item.caloriesBurned || item.calories) || 0), 0);

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* পেজ হেডার */}
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white">MY PLAN</h1>
                    <p className="text-gray-400 text-xs mt-1">Cap of five lifts for today. Finish them, then load more.</p>
                </div>

                {/* স্ট্যাটস কার্ড */}
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

                {/* ট্যাব সুইচিং বাটন */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setActiveTab('plan')}
                        className={`px-5 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'plan'
                                ? 'bg-[#1e222d] text-white border border-gray-700 shadow'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Today&apos;s Plan ({todayPlan.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`px-5 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                            activeTab === 'saved'
                                ? 'bg-[#1e222d] text-white border border-gray-700 shadow'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Saved ({savedList.length})
                    </button>
                </div>

                {/* ট্যাব অনুযায়ী আলাদা কম্পোনেন্ট রেন্ডার করা (এখানে savedList ব্যবহার করা হয়েছে) */}
                <div>
                    {activeTab === 'plan' ? (
                        <TodaysPlanList workouts={todayPlan} onRemove={removeFromPlan} />
                    ) : (
                        <SavedWorkoutsList workouts={savedList} onRemove={removeFromSaved} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyPlanPage;