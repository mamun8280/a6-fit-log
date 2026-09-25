'use client';

import React, { useState, useEffect } from 'react';
import Banner from '@/components/Banner';
import WorkoutCard from '@/components/WorkoutCard';
import { IWorkout } from '@/types/type';



const Page = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  // API থেকে ডেটা ফেচ করা
  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/fitlog')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) =>
    Number(b[sortBy]) - Number(a[sortBy])
  );


  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      {/* Banner Component */}
      <Banner />

      {/* Library Section */}
      <section className="container mx-auto px-4 md:px-8 py-12 border-t border-gray-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">The Library</h2>
            <p className="text-gray-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 bg-[#13151b] border border-gray-800 px-4 py-2 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'duration' | 'calories' | 'rating')}
              className="bg-transparent text-white text-xs font-bold outline-none cursor-pointer uppercase"
            >
              <option value="duration" className="bg-[#13151b]">Duration</option>
              <option value="calories" className="bg-[#13151b]">Calories</option>
              <option value="rating" className="bg-[#13151b]">Rating</option>
            </select>
          </div>
        </div>

        {loading && <div className="text-center py-20 text-[#ccff00] font-bold">Loading workouts...</div>}
        {error && <div className="text-center py-20 text-red-500 font-bold">Error: {error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout: IWorkout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;