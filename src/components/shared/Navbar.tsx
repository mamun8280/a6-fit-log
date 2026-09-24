import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Path alias (@) match na korle '../../assets/logo.png' try korte paren
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
    <nav className="navbar bg-[#0f1115] text-white px-4 md:px-8 py-3 border-b border-gray-800">
      {/* Left Side: Logo */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#181a20] rounded-box z-[1] mt-3 w-52 p-2 shadow text-gray-300"
          >
            <li>
              <Link href="/workouts" className={activePage === 'Workouts' ? 'text-[#ccff00] font-bold' : ''}>
                Workouts
              </Link>
            </li>
            <li>
              <Link href="/my-plan" className={activePage === 'My Plan' ? 'text-[#ccff00] font-bold' : ''}>
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand Logo Image */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={120}
            height={30}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-1 bg-[#181a20] p-1 rounded-full border border-gray-800">
          <Link
            href="/workouts"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activePage === 'Workouts'
                ? 'bg-[#212613] text-[#ccff00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activePage === 'My Plan'
                ? 'bg-[#212613] text-[#ccff00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>
      </div>

      {/* Right Side: Status Badges */}
      <div className="navbar-end flex items-center gap-4">
        {/* Plan Badge */}
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity"
        >
          <span>Plan</span>
          <span className="bg-[#ccff00] text-black font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {planCount}
          </span>
        </Link>

        {/* Saved Badge */}
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:opacity-90 transition-opacity"
        >
          <span>Saved</span>
          <span className="border border-gray-600 text-gray-300 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;