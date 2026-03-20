import CTA from '@/components/CTA';
import Features from '@/components/features';
import Hero from '@/components/hero';
import Roadmap from '@/components/roadmap';
import Tokenomics from '@/components/tokenomics';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Tokenomics />
      <Roadmap />
      <CTA />
    </>
  );
}
