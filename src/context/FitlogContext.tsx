'use client';

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';

import { IWorkout } from '@/types/type';

interface FitlogContextType {
  todayPlan: IWorkout[];
  savedList: IWorkout[];
  completedList: number[];

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;

  toggleMarkAsDone: (id: number) => void;

  toastMessage: string | null;
}



type Store = {
  todayPlan: IWorkout[];
  savedList: IWorkout[];
  completedList: number[];
};

const emptyStore: Store = {
  todayPlan: [],
  savedList: [],
  completedList: [],
};

let store: Store = emptyStore;

const listeners = new Set<() => void>();

let storageLoaded = false;


const loadStorage = () => {
  if (storageLoaded || typeof window === 'undefined') {
    return;
  }

  storageLoaded = true;

  try {
    const storedPlan =
      localStorage.getItem('fitlog_todayPlan');

    const storedSaved =
      localStorage.getItem('fitlog_savedList');

    const storedCompleted =
      localStorage.getItem('fitlog_completedList');

    store = {
      todayPlan: storedPlan
        ? JSON.parse(storedPlan)
        : [],

      savedList: storedSaved
        ? JSON.parse(storedSaved)
        : [],

      completedList: storedCompleted
        ? JSON.parse(storedCompleted)
        : [],
    };
  } catch (error) {
    console.error(
      'Failed to load FitLog localStorage:',
      error
    );

    store = emptyStore;
  }
};


const subscribe = (listener: () => void) => {
  listeners.add(listener);

 
  if (!storageLoaded && typeof window !== 'undefined') {
    queueMicrotask(() => {
      loadStorage();

      listeners.forEach((listener) => {
        listener();
      });
    });
  }

  return () => {
    listeners.delete(listener);
  };
};


const getServerSnapshot = () => emptyStore;

// Client snapshot
const getSnapshot = () => {
  return store;
};


const updateStore = (newStore: Store) => {
  store = newStore;

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'fitlog_todayPlan',
      JSON.stringify(store.todayPlan)
    );

    localStorage.setItem(
      'fitlog_savedList',
      JSON.stringify(store.savedList)
    );

    localStorage.setItem(
      'fitlog_completedList',
      JSON.stringify(store.completedList)
    );
  }

  listeners.forEach((listener) => {
    listener();
  });
};



const FitlogContext = createContext<
  FitlogContextType | undefined
>(undefined);



export const FitlogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toastMessage, setToastMessage] =
    useState<string | null>(null);

  const fitlogStore = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );



  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  

  const addToPlan = (workout: IWorkout) => {
    if (fitlogStore.todayPlan.length >= 5) {
      showToast(
        'Maximum 5 lifts allowed for today!'
      );
      return;
    }

    if (
      fitlogStore.todayPlan.some(
        (item) => item.id === workout.id
      )
    ) {
      showToast(
        "Already added to today's plan!"
      );
      return;
    }

    updateStore({
      ...fitlogStore,

      todayPlan: [
        ...fitlogStore.todayPlan,
        workout,
      ],
    });

    showToast(
      "Added to today's plan!"
    );
  };



  const removeFromPlan = (id: number) => {
    updateStore({
      ...fitlogStore,

      todayPlan:
        fitlogStore.todayPlan.filter(
          (item) => item.id !== id
        ),

      completedList:
        fitlogStore.completedList.filter(
          (itemId) => itemId !== id
        ),
    });

    showToast(
      "Removed from today's plan!"
    );
  };

 
  const addToSaved = (workout: IWorkout) => {
    if (
      fitlogStore.savedList.some(
        (item) => item.id === workout.id
      )
    ) {
      showToast(
        'Already saved for later!'
      );
      return;
    }

    updateStore({
      ...fitlogStore,

      savedList: [
        ...fitlogStore.savedList,
        workout,
      ],
    });

    showToast(
      'Saved for later!'
    );
  };



  const removeFromSaved = (id: number) => {
    updateStore({
      ...fitlogStore,

      savedList:
        fitlogStore.savedList.filter(
          (item) => item.id !== id
        ),
    });

    showToast(
      'Removed from saved list!'
    );
  };


  const toggleMarkAsDone = (id: number) => {
    const isDone =
      fitlogStore.completedList.includes(id);

    if (isDone) {
      updateStore({
        ...fitlogStore,

        completedList:
          fitlogStore.completedList.filter(
            (itemId) => itemId !== id
          ),
      });

      showToast(
        'Workout marked as incomplete!'
      );
    } else {
      updateStore({
        ...fitlogStore,

        completedList: [
          ...fitlogStore.completedList,
          id,
        ],
      });

      showToast(
        'Workout marked as done!'
      );
    }
  };

  
  return (
    <FitlogContext.Provider
      value={{
        todayPlan: fitlogStore.todayPlan,
        savedList: fitlogStore.savedList,
        completedList:
          fitlogStore.completedList,

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
        <div
          className="
            fixed
            bottom-6
            right-6
            z-[100]
            rounded-xl
            bg-[#ccff00]
            px-5
            py-3
            font-bold
            text-black
            shadow-2xl
            animate-bounce
          "
        >
          {toastMessage}
        </div>
      )}
    </FitlogContext.Provider>
  );
};


export const useFitlog = () => {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error(
      'useFitlog must be used within a FitlogProvider'
    );
  }

  return context;
};