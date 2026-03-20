'use client';

import Navbar from './navbar';
import { Luckiest_Guy, Poppins } from 'next/font/google';
import Image from 'next/image';
import shinobi from '@/assets/ninja.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

const luckiestGuy = Luckiest_Guy({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const Hero = () => {
  const containerRef = useRef(null);
  const shinobiTextRef = useRef(null);

  const leftParaRef = useRef(null);
  const rightParaRef = useRef(null);

  const leftHeadingRef = useRef(null);
  const rightHeadingRef = useRef(null);

  useGSAP(
    () => {
      // 🔥 wait for fonts before splitting (VERY IMPORTANT)
      document.fonts.ready.then(() => {
        const tl = gsap.timeline();

        // -------------------------
        // TITLE
        // -------------------------
        const titleSplit = new SplitText(shinobiTextRef.current, {
          type: 'chars',
          charsClass:
            'text-transparent bg-clip-text bg-linear-to-b from-white to-gray-600',
        });

        tl.set(shinobiTextRef.current, { opacity: 1 }).from(titleSplit.chars, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        });

        // -------------------------
        // LEFT PARAGRAPH
        // -------------------------
        const leftSplit = new SplitText(leftParaRef.current, {
          type: 'lines',
          linesClass: 'line',
        });

        const leftMask = new SplitText(leftParaRef.current, {
          type: 'lines',
          linesClass: 'line-mask',
        });

        // -------------------------
        // RIGHT PARAGRAPH
        // -------------------------
        const rightSplit = new SplitText(rightParaRef.current, {
          type: 'lines',
          linesClass: 'line',
        });

        const rightMask = new SplitText(rightParaRef.current, {
          type: 'lines',
          linesClass: 'line-mask',
        });

        // -------------------------
        // LEFT CARD ANIMATION
        // -------------------------
        tl.from(
          leftHeadingRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.6',
        ).from(
          leftSplit.lines,
          {
            y: 60,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.3',
        );

        // -------------------------
        // RIGHT CARD ANIMATION
        // -------------------------
        tl.from(
          rightHeadingRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.8',
        ).from(
          rightSplit.lines,
          {
            y: 60,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.3',
        );

        return () => {
          titleSplit.revert();
          leftSplit.revert();
          rightSplit.revert();
          leftMask.revert();
          rightMask.revert();
        };
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className='hero relative overflow-hidden min-h-screen bg-purlack'>
      <Navbar />

      <section className='relative pt-32 flex flex-col items-center min-h-[calc(100vh-100px)]'>
        {/* TITLE */}
        <h1
          ref={shinobiTextRef}
          className={`text-[70px] md:text-[130px] leading-none font-bold text-center ${luckiestGuy.className} antialiased relative z-0 opacity-0`}>
          Shinobi.fi
        </h1>

        {/* IMAGE */}
        <div className='relative z-10 flex items-center justify-center -mt-16 md:-mt-24 drop-shadow-[0_0_60px_rgba(182,58,236,0.5)] animate-float'>
          <Image
            src={shinobi}
            alt='Ninja'
            width={500}
            priority
          />
        </div>

        {/* BOTTOM CARDS */}
        <div
          className={`absolute bottom-8 md:bottom-12 w-full px-8 md:px-16 hidden md:flex justify-between items-end z-20 ${poppins.className}`}>
          {/* LEFT CARD */}
          <div className='max-w-[320px] text-left p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-px bg-light-one'></div>
              <p
                ref={leftHeadingRef}
                className='text-light-one text-xs font-bold uppercase tracking-[0.2em]'>
                The Collection
              </p>
            </div>

            <p
              ref={leftParaRef}
              className='block text-gray-300 text-sm leading-relaxed font-light'>
              Forged in the cyber-void. A curated collection of 8,888
              stealth-tier avatars granting exclusive access to the Shinobi DAO,
              private alpha channels, and next-gen staking yields.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className='max-w-[320px] text-right flex flex-col items-end p-6 rounded-2xl bg-white/5 border border-light-two/40 backdrop-blur-md shadow-[0_0_25px_rgba(212,42,158,0.15)]'>
            <div className='flex items-center gap-3 mb-4'>
              <p
                ref={rightHeadingRef}
                className='text-light-two text-xs font-bold uppercase tracking-[0.2em]'>
                Phase 1 Live
              </p>
              <div className='w-2 h-2 rounded-full bg-light-two animate-pulse shadow-[0_0_8px_rgba(212,42,158,1)]'></div>
            </div>

            <p
              ref={rightParaRef}
              className='block text-gray-300 text-sm leading-relaxed font-light'>
              The Awakening is here. Secure your digital identity on the
              fastest, zero-gas NFT marketplace built natively on the Solana
              blockchain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
