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

const CTA = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // 1. Staggered reveal for the massive text
      gsap.from('.cta-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // 2. The glowing button pop-in
      gsap.from('.cta-button', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'back.out(1.5)',
      });

      // 3. Fade in the footer links
      gsap.from('.footer-fade', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full flex flex-col items-center justify-between pt-32 pb-8 bg-linear-to-b from-[#03051e] to-black overflow-hidden ${poppins.className}`}>
      {/* Background Ambient Glow */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-light-two/10 rounded-full blur-[120px] pointer-events-none'></div>

      {/* Main CTA Content */}
      <div className='flex flex-col items-center text-center z-10 px-8 mb-32'>
        <div className='overflow-hidden mb-2'>
          <h2 className='cta-text text-light-one text-sm md:text-base font-bold uppercase tracking-[0.4em]'>
            The Gates Are Open
          </h2>
        </div>

        <div className='overflow-hidden mb-12'>
          <h3
            className={`cta-text text-6xl md:text-8xl lg:text-[120px] text-white font-bold leading-none ${luckiestGuy.className} tracking-wide`}>
            Enter The{' '}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-light-one to-light-two'>
              Shadows
            </span>
          </h3>
        </div>

        {/* The Action Button */}
        <button className='cta-button group relative px-10 py-5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md overflow-hidden transition-all hover:scale-105 hover:border-light-two/50'>
          {/* Button Hover Effect */}
          <div className='absolute inset-0 bg-linear-to-r from-light-one to-light-two opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>

          <span className='relative z-10 text-white font-bold tracking-widest uppercase text-sm flex items-center gap-3'>
            Join The DAO
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='group-hover:translate-x-1 transition-transform'>
              <path d='M5 12h14'></path>
              <path d='m12 5 7 7-7 7'></path>
            </svg>
          </span>
        </button>
      </div>

      {/* Footer Area */}
      <div className='w-full max-w-7xl px-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8 z-10 footer-fade'>
        <div className='flex items-center gap-2'>
          <span className={`text-2xl text-white ${luckiestGuy.className}`}>
            Shinobi.fi
          </span>
          <span className='text-gray-600 text-sm'>© 2026</span>
        </div>

        <div className='flex items-center gap-8 text-sm font-semibold text-gray-400'>
          <a
            href='#'
            className='hover:text-light-two transition-colors'>
            Twitter (X)
          </a>
          <a
            href='#'
            className='hover:text-light-two transition-colors'>
            Discord
          </a>
          <a
            href='#'
            className='hover:text-light-two transition-colors'>
            Docs
          </a>
          <a
            href='#'
            className='hover:text-light-two transition-colors'>
            Terms
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
