'use client';

import React from 'react';
import Navbar from './Navbar';
import { useFitlog } from '@/context/FitlogContext';

interface NavbarWrapperProps {
  activePage?: 'Workouts' | 'My Plan';
}

export default function NavbarWrapper({ activePage }: NavbarWrapperProps) {
  const { todayPlan, savedList } = useFitlog();

  return (
    <Navbar
      activePage={activePage}
      planCount={todayPlan.length}
      savedCount={savedList.length}
    />
  );
}