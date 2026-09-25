'use client';

import React, { useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png'; 

interface NavbarProps {
    activePage?: 'Workouts' | 'My Plan';
    planCount?: number;
    savedCount?: number;
}

const emptySubscribe = () => () => {};

const Navbar: React.FC<NavbarProps> = ({
    activePage = 'Workouts',
    planCount = 0,
    savedCount = 0,
}) => {
    
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    const currentPlanCount = isMounted ? planCount : 0;
    const currentSavedCount = isMounted ? savedCount : 0;

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0f1115]/95 backdrop-blur-md border-b border-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 md:px-8 py-3 navbar">
                
             
                <div className="navbar-start flex items-center gap-2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 text-gray-300 hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#181a20] rounded-2xl border border-gray-800 z-50 mt-3 w-52 p-3 shadow-2xl text-gray-300 space-y-1">
                            <li>
                                <Link 
                                    href="/" 
                                    className={`rounded-full py-2 px-4 transition-all ${
                                        activePage === 'Workouts' 
                                            ? 'bg-[#1a2608] text-[#ccff00] font-bold' 
                                            : 'hover:text-white hover:bg-gray-800/50'
                                    }`}
                                >
                                    Workouts
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/my-plan" 
                                    className={`rounded-full py-2 px-4 transition-all ${
                                        activePage === 'My Plan' 
                                            ? 'bg-[#1a2608] text-[#ccff00] font-bold' 
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                >
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                        <Image src={logo} alt="FITLOG Icon" width={32} height={32} className="h-7 w-auto object-contain" priority />
                        <span className="font-extrabold text-lg md:text-xl tracking-wider text-white uppercase">FITLOG</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <div className="flex items-center gap-1">
                        <Link 
                            href="/" 
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                activePage === 'Workouts' 
                                    ? 'bg-[#1a2608] text-[#ccff00] font-bold' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Workouts
                        </Link>
                        <Link 
                            href="/my-plan" 
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                activePage === 'My Plan' 
                                    ? 'bg-[#1a2608] text-[#ccff00] font-bold' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            My Plan
                        </Link>
                    </div>
                </div>

              
                <div className="navbar-end flex items-center gap-3 md:gap-4">
                    <Link href="/my-plan" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity">
                        <span className="hidden sm:inline">Plan</span>
                        <span className="bg-[#ccff00] text-black font-extrabold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs shadow">{currentPlanCount}</span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity">
                        <span className="hidden sm:inline">Saved</span>
                        <span className="border border-gray-600 text-gray-300 font-extrabold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs bg-[#181a20]">{currentSavedCount}</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;