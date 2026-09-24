'use client';

import React from 'react';
import Navbar from './Navbar';
import { useFitlog } from '@/context/FitlogContext';

export default function NavbarWrapper() {
  const { todayPlan, savedList } = useFitlog();

  return (
    <Navbar
      planCount={todayPlan.length}
      savedCount={savedList.length}
    />
  );
}