'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { useFitlog } from '@/context/FitlogContext';

export default function NavbarWrapper() {
  const pathname = usePathname();

  const { todayPlan, savedList } = useFitlog();

  const activePage =
    pathname === '/my-plan' ? 'My Plan' : 'Workouts';

  return (
    <Navbar
      activePage={activePage}
      planCount={todayPlan.length}
      savedCount={savedList.length}
    />
  );
}