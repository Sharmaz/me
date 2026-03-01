import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import HeroScene from './HeroScene';

interface HeroProps {
  name: string;
  resume: string;
  animate: boolean;
}

const Hero = ({ name, resume, animate }: HeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep elements invisible until the animation runs
  useEffect(() => {
    gsap.set(
      [labelRef.current, nameRef.current, taglineRef.current, ctaRef.current, scrollRef.current],
      { opacity: 0, y: 30 },
    );
  }, []);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(nameRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.3')
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }, containerRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#030314]"
    >
      <HeroScene />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none">
        <p ref={labelRef} className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-5">
          Hi, I&apos;m
        </p>

        <h1
          ref={nameRef}
          className="text-7xl md:text-9xl font-bold leading-none mb-6 bg-linear-to-r from-white via-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent"
        >
          {name}
        </h1>

        <p ref={taglineRef} className="text-xl md:text-2xl text-slate-400 mb-12 font-light tracking-wide">
          Frontend Developer
        </p>

        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap mt-12 pointer-events-auto">
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-3.5 rounded-full bg-[#4dd9ff] text-[#030314] font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-300"
          >
            Download Resume
          </a>
          <a
            href="#work"
            className="px-9 py-3.5 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-[#4dd9ff] hover:text-[#4dd9ff] transition-all duration-300 backdrop-blur-sm"
          >
            View Work
          </a>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
