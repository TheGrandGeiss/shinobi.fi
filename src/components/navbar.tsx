'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/ninja.png';
import { Luckiest_Guy, Poppins } from 'next/font/google';
import { FaWallet, FaBars, FaXmark } from 'react-icons/fa6';
import { useMediaQuery } from 'react-responsive';

const poppins = Poppins({
  weight: ['200', '400', '900', '600'],
  display: 'swap',
  subsets: ['latin'],
});

const luckiestGuy = Luckiest_Guy({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

const navLinks = [
  { text: 'Home', href: '#' },
  { text: 'Market', href: '#market' },
  { text: 'About', href: '#about' },
];

const Navbar = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, SetIsMounted] = useState<boolean>(false);

  useEffect(() => {
    SetIsMounted(true);
  });

  return (
    // 1. THE FLOATING GLASS PILL CONTAINER
    <nav className='fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'>
      <div className='flex justify-between items-center'>
        {/* LOGO */}
        <div className='flex items-center gap-3'>
          <div className='p-1.5 bg-linear-to-br from-light-one to-light-two rounded-full shadow-[0_0_15px_rgba(182,58,236,0.4)]'>
            <Image
              src={logo}
              width={28}
              alt='Shinobi.fi Logo'
              className='drop-shadow-lg'
            />
          </div>
          {/* Optional: Add text next to the logo for brand identity */}
          <span
            className={`text-white font-bold tracking-wider ${luckiestGuy.className} antialiased hidden md:block`}>
            SHINOBI
          </span>
        </div>

        {/* --- DESKTOP VIEW --- */}
        {isMounted && isDesktop && (
          <>
            {/* Fixed the gap-30 to a standard gap-10 */}
            <ul className='flex gap-10 justify-center items-center'>
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={`group relative cursor-pointer ${poppins.className} antialiased text-gray-400 hover:text-white text-sm font-semibold transition-colors`}>
                  {link.text}
                  {/* The Animated Underline */}
                  <div className='absolute left-1/2 -bottom-2 h-0.5 w-0 -translate-x-1/2 rounded-2xl bg-light-two transition-all duration-300 ease-out group-hover:w-[80%] shadow-[0_0_10px_rgba(212,42,158,0.8)]'></div>
                </li>
              ))}
            </ul>

            {/* 2. THE GLOWING GRADIENT BUTTON */}
            <button className='flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-linear-to-r from-light-one to-light-two text-white uppercase text-xs font-black tracking-widest hover:shadow-[0_0_20px_rgba(212,42,158,0.6)] hover:scale-105 transition-all duration-300'>
              <FaWallet className='text-base' /> <span>Connect Wallet</span>
            </button>
          </>
        )}

        {/* --- MOBILE VIEW (Hamburger Icon) --- */}
        {isMounted && isMobile && (
          <button
            className='text-white text-2xl p-2 z-50 hover:text-light-two transition-colors'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        )}
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobile && isMobileMenuOpen && (
        // 3. FROSTED GLASS MOBILE DROPDOWN
        <div className='absolute top-full left-0 right-0 mt-4 flex flex-col items-center gap-6 bg-purlack/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl'>
          <ul className='flex flex-col gap-6 text-center w-full'>
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`${poppins.className} antialiased text-gray-300 hover:text-white text-lg font-semibold border-b border-white/5 pb-4`}
                onClick={() => setIsMobileMenuOpen(false)}>
                {link.text}
              </li>
            ))}
          </ul>
          <button className='flex items-center justify-center gap-2 px-6 py-4 w-full rounded-full bg-linear-to-r from-light-one to-light-two text-white uppercase text-sm font-bold shadow-[0_0_20px_rgba(212,42,158,0.4)]'>
            <FaWallet /> <span>Connect Wallet</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
