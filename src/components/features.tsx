'use client';

import React, { useRef } from 'react';
import { Poppins } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
});

// 1. Data Array to keep JSX clean
const featureData = [
  {
    id: '01',
    title: 'Zero-Knowledge',
    desc: 'Every transaction is cryptographically shielded. You trade in the shadows while maintaining verifiable proof of reserves.',
    span: 'md:col-span-2', // Wide card
    accent: 'bg-light-one',
    textColor: 'text-light-one',
  },
  {
    id: '02',
    title: 'Dark Pools',
    desc: 'Access deep, aggregated liquidity without moving the public market. Whale-tier trading infrastructure built for the elite.',
    span: 'md:col-span-1', // Square card
    accent: 'bg-light-two',
    textColor: 'text-light-two',
  },
  {
    id: '03',
    title: 'Gasless Execution',
    desc: 'Native meta-transactions mean you never pay network fees in native tokens again. Pure, uninterrupted trading flow.',
    span: 'md:col-span-1', // Square card
    accent: 'bg-light-two',
    textColor: 'text-light-two',
  },
  {
    id: '04',
    title: 'The DAO',
    desc: 'Protocol revenue is programmatically routed to the Shinobi treasury, governed entirely by the community council.',
    span: 'md:col-span-2', // Wide card
    accent: 'bg-light-one',
    textColor: 'text-light-one',
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  // 2. The GSAP Entrance Animation
  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.bento-card');

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', // Triggers when the section is 30% up the screen
        },
        y: 50,
        opacity: 0,
        scale: 0.95, // Adds a subtle zoom-out effect as they appear
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)', // Gives them a slight premium "pop" into place
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 bg-purlack ${poppins.className}`}>
      {/* Section Header */}
      <div className='mb-16'>
        <h2 className='text-white text-3xl md:text-5xl font-bold tracking-tight mb-4'>
          Built for the{' '}
          <span className='text-transparent bg-clip-text bg-linear-to-r from-light-one to-light-two'>
            Shadows.
          </span>
        </h2>
        <p className='text-gray-400 font-light max-w-xl'>
          Institutional-grade infrastructure meets decentralized anonymity.
          Experience the next evolution of on-chain trading.
        </p>
      </div>

      {/* 3. The Bento Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
        {featureData.map((feature, index) => (
          <div
            key={index}
            className={`bento-card group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between min-h-[250px] ${feature.span}`}>
            {/* Ambient Hover Glow behind the card */}
            <div
              className={`absolute -top-24 -right-24 w-48 h-48 ${feature.accent} rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`}></div>

            <div>
              <div className='flex items-center gap-4 mb-6'>
                <span
                  className={`${feature.textColor} text-sm font-black tracking-widest`}>
                  {feature.id}
                </span>
                <div
                  className={`h-px flex-grow bg-linear-to-r from-white/20 to-transparent`}></div>
              </div>
              <h3 className='text-white text-xl md:text-2xl font-semibold mb-4'>
                {feature.title}
              </h3>
            </div>

            <p className='text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md'>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
