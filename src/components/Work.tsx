import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import type { Project } from '../types';
import Card from './Card';

interface WorkProps {
  projects: Project[];
}

const Work = ({ projects }: WorkProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0, y: 50, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <section ref={sectionRef} id="work" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-5">
          Projects
        </p>
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-16 text-white">
          Selected{' '}
          <span className="bg-linear-to-r from-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent">
            Work
          </span>
        </h2>
        <div
          ref={(el) => { if (el) cardsRef.current[0] = el; }}
          className="mb-6"
        >
          <Card project={featured} featured />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardsRef.current[i + 1] = el; }}
            >
              <Card project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
