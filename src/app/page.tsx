'use client';

import React, { useState, useEffect } from 'react';
import Banner from '@/components/Banner';
import WorkoutCard from '@/components/WorkoutCard';
import { IWorkout } from '@/types/type';

const Page = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/fitlog')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch workouts');
        }

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

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">

    
      <Banner />

     
      <section
        id="library"
        className="container mx-auto border-t border-gray-900 px-4 py-12 md:px-8"
      >
      
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            The Library
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

      
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>

              <p className="text-sm font-bold uppercase tracking-wider text-[#ccff00]">
                Loading workouts…
              </p>
            </div>
          </div>
        )}

      
        {error && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="font-bold text-red-500">
              Error: {error}
            </p>
          </div>
        )}

       
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout: IWorkout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Page;