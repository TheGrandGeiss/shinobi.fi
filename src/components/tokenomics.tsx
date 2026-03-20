'use client';

import React, { useRef } from 'react';
import { Poppins, Luckiest_Guy } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

const luckiestGuy = Luckiest_Guy({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

// The Data: Easy to update without touching the JSX structure
const allocationData = [
  {
    id: '01',
    label: 'Community & Rewards',
    percent: 40,
    color: 'bg-light-one',
    shadow: 'shadow-[0_0_15px_rgba(182,58,236,0.6)]',
  },
  {
    id: '02',
    label: 'Treasury & DAO',
    percent: 25,
    color: 'bg-light-two',
    shadow: 'shadow-[0_0_15px_rgba(212,42,158,0.6)]',
  },
  {
    id: '03',
    label: 'Liquidity Provision',
    percent: 15,
    color: 'bg-indigo-500',
    shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.6)]',
  },
  {
    id: '04',
    label: 'Core Contributors',
    percent: 15,
    color: 'bg-gray-400',
    shadow: 'shadow-none',
  },
  {
    id: '05',
    label: 'Advisors',
    percent: 5,
    color: 'bg-gray-600',
    shadow: 'shadow-none',
  },
];

const Tokenomics = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // 1. Animate the Left Side Stats (Slide up and fade in)
      gsap.from('.stat-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // 2. Animate the Allocation Bars (Grow from 0% to their target width)
      const bars = gsap.utils.toArray('.allocation-bar') as HTMLElement[];

      bars.forEach((bar) => {
        // We grab the target width we stored in a custom 'data-width' attribute
        const targetWidth = (bar as HTMLElement).getAttribute('data-width');

        gsap.fromTo(
          bar,
          { width: '0%' }, // Start completely empty
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
            width: `${targetWidth}%`, // Fill to exact percentage
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.4, // Wait a beat for the text to appear first
          },
        );
      });

      // 3. Fade in the allocation text list
      gsap.from('.allocation-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      // Switched to a slightly darker background to separate it from the Features section
      className={`relative w-full min-h-screen flex items-center justify-center px-8 md:px-24 py-24 bg-[#020314] ${poppins.className}`}>
      <div className='w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
        {/* LEFT COLUMN: Massive Typography & Stats */}
        <div className='flex flex-col gap-8'>
          <div className='stat-block'>
            <h2 className='text-light-one text-sm font-bold uppercase tracking-[0.3em] mb-4'>
              Tokenomics
            </h2>
            <h3
              className={`text-6xl md:text-8xl text-white font-bold leading-none ${luckiestGuy.className} tracking-wide`}>
              $NINJA
            </h3>
          </div>

          <div className='stat-block flex flex-col gap-2 mt-4'>
            <p className='text-gray-400 text-sm uppercase tracking-widest font-semibold'>
              Total Supply
            </p>
            <p className='text-4xl text-white font-black'>1,000,000,000</p>
          </div>

          <div className='stat-block flex flex-col gap-2'>
            <p className='text-gray-400 text-sm uppercase tracking-widest font-semibold'>
              Initial Market Cap
            </p>
            <p className='text-4xl text-transparent bg-clip-text bg-linear-to-r from-light-one to-light-two font-black'>
              $1.25M
            </p>
          </div>

          <div className='stat-block mt-4'>
            <p className='text-gray-400 text-sm font-light leading-relaxed max-w-md'>
              The $NINJA token is the deflationary backbone of the Shinobi.fi
              ecosystem. It is required for DAO voting, accessing dark pools,
              and earning protocol yields.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Animated Allocation Stack */}
        <div className='flex flex-col gap-8 w-full'>
          {allocationData.map((item, index) => (
            <div
              key={index}
              className='allocation-item flex flex-col gap-3 w-full'>
              {/* Text Label & Percentage */}
              <div className='flex justify-between items-end w-full'>
                <div className='flex items-center gap-4'>
                  <span className='text-gray-500 text-xs font-bold font-mono'>
                    {item.id}
                  </span>
                  <span className='text-gray-200 text-base font-semibold tracking-wide'>
                    {item.label}
                  </span>
                </div>
                <span className='text-white text-xl font-black'>
                  {item.percent}%
                </span>
              </div>

              {/* The Progress Bar Background (Track) */}
              <div className='w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5'>
                {/* The Animated Fill (The Bar) */}
                {/* We use data-width to pass the target percentage to our GSAP hook cleanly */}
                <div
                  className={`allocation-bar h-full rounded-full ${item.color} ${item.shadow} relative`}
                  data-width={item.percent}
                  style={{ width: '0%' }} // Initial state before JS takes over
                >
                  {/* Tiny glowing dot at the end of the progress bar for extra Web3 detail */}
                  <div className='absolute top-0 right-0 bottom-0 w-3 bg-white/40 rounded-full blur-[2px]'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
