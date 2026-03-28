import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import type { Job } from '../types';

interface ExperienceProps {
  jobs: Job[];
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Experience = ({ jobs }: ExperienceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: lineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      gsap.from(itemsRef.current, {
        opacity: 0, x: -40, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [jobs]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-5">
          Experience
        </p>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-16 text-white">
          Where I&apos;ve{' '}
          <span className="bg-linear-to-r from-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent">
            Worked
          </span>
        </h2>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-linear-to-b from-[#a78bfa] via-[#4dd9ff] to-transparent"
          />

          <div className="flex flex-col gap-12 pl-10">
            {jobs.map((job, i) => (
              <div
                key={job.id}
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className="relative group"
              >
                <div className="absolute -left-10 top-1.5 w-2 h-2 -translate-x-1/2 rounded-full bg-[#4dd9ff] ring-4 ring-[#4dd9ff]/20 group-hover:ring-[#4dd9ff]/50 transition-all duration-300" />

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/8 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                    <span className="text-xs font-mono text-[#4dd9ff]/70 shrink-0">
                      {formatDate(job.dateStarted)} — {formatDate(job.dateEnded)}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-[#a78bfa] mb-4">{job.name}</p>
                  <p className="text-slate-400 leading-relaxed text-sm">{job.description}</p>

                  {job.details?.list && job.details.list.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {job.details.list.map((item) => (
                        <li
                          key={item}
                          className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
