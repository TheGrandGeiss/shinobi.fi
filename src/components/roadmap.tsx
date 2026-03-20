'use client';

import React, { useRef } from 'react';
import { Poppins } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const poppins = Poppins({
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

const roadmapData = [
  {
    phase: 'Phase 01',
    title: 'The Awakening',
    desc: 'Deploying the Shinobi.fi testnet. Initiating smart contract audits and launching the closed alpha for early Discord supporters.',
    status: 'Completed',
  },
  {
    phase: 'Phase 02',
    title: 'Token Generation',
    desc: '$NINJA TGE on Solana Mainnet. Launching the staking dashboard and opening the first decentralized dark pool liquidity vaults.',
    status: 'Active',
  },
  {
    phase: 'Phase 03',
    title: 'Zero-Gas Integration',
    desc: 'Implementing native meta-transactions. Users can now trade entirely gasless, paying fees exclusively in $NINJA.',
    status: 'Upcoming',
  },
  {
    phase: 'Phase 04',
    title: 'The DAO Handover',
    desc: 'Full decentralization. Protocol ownership is transferred to the community treasury via on-chain governance voting.',
    status: 'Upcoming',
  },
];

const Roadmap = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // 1. The Scrubbing Center Line
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      const cards = gsap.utils.toArray('.roadmap-card') as HTMLElement[];

      cards.forEach((card, index) => {
        const xOffset = index % 2 === 0 ? -50 : 50;

        // 2. The Entrance: Slide in early
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          x: xOffset,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });

        // 3. The Ignition: Glow the card when the line hits it
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          boxShadow: '0 0 30px rgba(212,42,158, 0.2)',
          borderColor: 'rgba(212,42,158, 0.5)',
          backgroundColor: 'rgba(255,255,255, 0.08)',
          duration: 0.4,
        });

        // 4. Ignite the Dot: Light up the specific dot next to the card
        const dot = card.parentElement?.querySelector('.roadmap-dot');
        if (dot) {
          gsap.to(dot, {
            scrollTrigger: {
              trigger: card,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            backgroundColor: '#d42a9e', // Your light-two color
            boxShadow: '0 0 20px rgba(212,42,158, 0.8)',
            scale: 1.3,
            duration: 0.3,
            ease: 'back.out(2)',
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen py-32 bg-[#03051e] overflow-hidden ${poppins.className}`}>
      {/* Section Header */}
      <div className='text-center mb-24 relative z-10'>
        <h2 className='text-light-one text-sm font-bold uppercase tracking-[0.3em] mb-4'>
          The Master Plan
        </h2>
        <h3 className='text-4xl md:text-6xl text-white font-bold'>
          Protocol{' '}
          <span className='text-transparent bg-clip-text bg-linear-to-r from-light-one to-light-two'>
            Roadmap
          </span>
        </h3>
      </div>

      <div className='relative max-w-5xl mx-auto px-8'>
        {/* THE TRACK: Faint background line */}
        <div className='absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2'></div>

        {/* THE FILL: Glowing animated line */}
        <div
          ref={lineRef}
          className='absolute left-[39px] md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-light-one to-light-two -translate-x-1/2 shadow-[0_0_15px_rgba(212,42,158,0.8)]'
          style={{ height: '0%' }}></div>

        {/* The Roadmap Items */}
        <div className='flex flex-col gap-12 md:gap-24 relative z-10'>
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`w-full flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
              {/* THE DOT (Desktop) */}
              <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#03051e] border-4 border-light-two items-center justify-center shadow-[0_0_15px_rgba(212,42,158,0.5)] z-20'>
                <div className='roadmap-dot w-2 h-2 rounded-full bg-white transition-colors'></div>
              </div>

              {/* THE CARD */}
              <div
                className={`roadmap-card w-full md:w-[45%] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative pl-12 md:pl-8 transition-colors`}>
                {/* THE DOT (Mobile) */}
                <div className='roadmap-dot md:hidden absolute left-0 top-8 w-4 h-4 rounded-full bg-light-two -translate-x-[21px] border-2 border-[#03051e] shadow-[0_0_10px_rgba(212,42,158,0.8)]'></div>

                <div className='flex justify-between items-center mb-4'>
                  <span className='text-light-one text-xs font-black tracking-widest uppercase'>
                    {item.phase}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                      item.status === 'Completed'
                        ? 'bg-white/10 text-gray-400'
                        : item.status === 'Active'
                          ? 'bg-light-two/20 text-light-two border border-light-two/30'
                          : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}>
                    {item.status}
                  </span>
                </div>

                <h4 className='text-white text-xl md:text-2xl font-bold mb-3'>
                  {item.title}
                </h4>
                <p className='text-gray-400 text-sm font-light leading-relaxed'>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
