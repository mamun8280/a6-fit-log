'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

interface NavbarProps {
    activePage?: 'Workouts' | 'My Plan';
    planCount?: number;
    savedCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({
    activePage = 'Workouts',
    planCount = 0,
    savedCount = 0,
}) => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0f1115]/95 text-white shadow-lg backdrop-blur-md">
            <div className="navbar container mx-auto px-4 py-3 md:px-8">

                
                <div className="navbar-start flex items-center gap-2">

                    
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost p-1 text-gray-300 hover:bg-gray-800 lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content z-[1] mt-3 w-44 rounded-box border border-gray-800 bg-[#13151b] p-2 shadow-xl"
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={
                                        activePage === 'Workouts'
                                            ? 'bg-[#ccff00] font-bold text-black'
                                            : 'text-gray-300'
                                    }
                                >
                                    Workouts
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-plan"
                                    className={
                                        activePage === 'My Plan'
                                            ? 'bg-[#ccff00] font-bold text-black'
                                            : 'text-gray-300'
                                    }
                                >
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                   
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src={logo}
                            alt="FitLog Logo"
                            width={36}
                            height={36}
                            className="h-8 w-8 md:h-9 md:w-9"
                        />

                        <span className="text-lg font-black tracking-wider md:text-xl">
                            FITLOG
                        </span>
                    </Link>
                </div>

                
                <div className="navbar-center hidden lg:flex">
                    <div className="flex items-center gap-2">

                        <Link
                            href="/"
                            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                                activePage === 'Workouts'
                                    ? 'bg-[#ccff00] text-black'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            Workouts
                        </Link>

                        <Link
                            href="/my-plan"
                            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                                activePage === 'My Plan'
                                    ? 'bg-[#ccff00] text-black'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            My Plan
                        </Link>

                    </div>
                </div>

               
                <div className="navbar-end flex items-center gap-2 md:gap-3">

                   
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-300 transition hover:text-white md:text-sm"
                    >
                        <span>Plan</span>

                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-xs font-extrabold text-black shadow md:h-6 md:w-6">
                            {planCount}
                        </span>
                    </Link>

                  
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-300 transition hover:text-white md:text-sm"
                    >
                        <span>Saved</span>

                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#ccff00] text-xs font-extrabold text-[#ccff00] md:h-6 md:w-6">
                            {savedCount}
                        </span>
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;