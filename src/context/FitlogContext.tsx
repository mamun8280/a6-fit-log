'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IWorkout } from '@/types/type';

interface FitlogContextType {
  todayPlan: IWorkout[];
  savedList: IWorkout[];
  completedList: string[];
  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: string) => void;
  addToSaved: (workout: IWorkout) => void;
  removeFromSaved: (id: string) => void;
  toggleMarkAsDone: (id: string) => void;
  toastMessage: string | null;
}

const FitlogContext = createContext<FitlogContextType | undefined>(undefined);

export const FitlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('fitlog_todayPlan');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedList, setSavedList] = useState<IWorkout[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('fitlog_savedList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedList, setCompletedList] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('fitlog_completedList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog_todayPlan', JSON.stringify(todayPlan));
    }
  }, [todayPlan]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog_savedList', JSON.stringify(savedList));
    }
  }, [savedList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog_completedList', JSON.stringify(completedList));
    }
  }, [completedList]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToPlan = (workout: IWorkout) => {
    if (todayPlan.length >= 5) {
      showToast('Maximum 5 lifts allowed for today!');
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      showToast("Already added to today's plan!");
      return;
    }
    setTodayPlan((prev) => [...prev, workout]);
    showToast("Added to today's plan!");
  };

  const removeFromPlan = (id: string) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    showToast("Removed from today's plan");
  };

  const addToSaved = (workout: IWorkout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      showToast('Already saved for later!');
      return;
    }
    setSavedList((prev) => [...prev, workout]);
    showToast('Saved for later!');
  };

  const removeFromSaved = (id: string) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from saved list');
  };

  const toggleMarkAsDone = (id: string) => {
    setCompletedList((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <FitlogContext.Provider
      value={{
        todayPlan,
        savedList,
        completedList,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleMarkAsDone,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-bold px-5 py-3 rounded-xl shadow-2xl transition-all animate-bounce">
          {toastMessage}
        </div>
      )}
    </FitlogContext.Provider>
  );
};

export const useFitlog = () => {
  const context = useContext(FitlogContext);
  if (!context) throw new Error('useFitlog must be used within a FitlogProvider');
  return context;
};