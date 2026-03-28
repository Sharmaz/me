import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AboutProps {
  about: string;
  profilePic: string;
}

const P = 645; // rounded-rect perimeter (x=16,y=16,w=168,h=168,rx=16)

const About = ({ about, profilePic }: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // SVG arc refs
  const a1HaloRef = useRef<SVGRectElement>(null);
  const a1Ref = useRef<SVGRectElement>(null);
  const a2HaloRef = useRef<SVGRectElement>(null);
  const a2Ref = useRef<SVGRectElement>(null);
  const a3Ref = useRef<SVGRectElement>(null);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.from(headingRef.current, {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.from(textRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
      gsap.from(imageRef.current, {
        opacity: 0, x: 50, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Arc animations — slow idle, fast on hover
  useEffect(() => {
    const tweens = [
      gsap.to(a1HaloRef.current, { strokeDashoffset: -P, duration: 3, repeat: -1, ease: 'none' }),
      gsap.to(a1Ref.current, { strokeDashoffset: -P, duration: 3, repeat: -1, ease: 'none' }),
      gsap.to(a2HaloRef.current, { strokeDashoffset: P, duration: 4.5, repeat: -1, ease: 'none' }),
      gsap.to(a2Ref.current, { strokeDashoffset: P, duration: 4.5, repeat: -1, ease: 'none' }),
      gsap.to(a3Ref.current, { strokeDashoffset: -P, duration: 7, repeat: -1, ease: 'none' }),
    ];

    const el = imageRef.current;
    const speedUp = () => tweens.forEach((t) => gsap.to(t, { timeScale: 5, duration: 0.3, ease: 'power2.in' }));
    const slowDown = () => tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.6, ease: 'power2.out' }));

    el?.addEventListener('mouseenter', speedUp);
    el?.addEventListener('mouseleave', slowDown);

    return () => {
      tweens.forEach((t) => t.kill());
      el?.removeEventListener('mouseenter', speedUp);
      el?.removeEventListener('mouseleave', slowDown);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p ref={labelRef} className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-5">
            About me
          </p>
          <h2 ref={headingRef} className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white">
            Who I{' '}
            <span className="bg-linear-to-r from-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent">
              Am
            </span>
          </h2>
          <p ref={textRef} className="text-lg text-slate-400 leading-relaxed">
            {about}
          </p>
        </div>

        <div ref={imageRef} className="relative group flex justify-center">
          <div className="relative w-full aspect-square">

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="glow-arc" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* Static ambient halo */}
              <rect x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#4dd9ff" strokeWidth="18" strokeOpacity="0.05" filter="url(#glow-soft)" />
              <rect x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#a78bfa" strokeWidth="10" strokeOpacity="0.04" filter="url(#glow-soft)" />

              {/* Arc 1 — cyan, clockwise */}
              <rect ref={a1HaloRef} x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#4dd9ff" strokeWidth="5" strokeDasharray="55 590" strokeLinecap="round" strokeOpacity="0.25" filter="url(#glow-soft)" />
              <rect ref={a1Ref} x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#4dd9ff" strokeWidth="1.8" strokeDasharray="35 610" strokeLinecap="round" strokeOpacity="0.95" filter="url(#glow-arc)" />

              {/* Arc 2 — violet, counter-clockwise */}
              <rect ref={a2HaloRef} x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#a78bfa" strokeWidth="4" strokeDasharray="45 600" strokeLinecap="round" strokeOpacity="0.20" filter="url(#glow-soft)" />
              <rect ref={a2Ref} x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="28 617" strokeLinecap="round" strokeOpacity="0.90" filter="url(#glow-arc)" />

              {/* Arc 3 — magenta, clockwise */}
              <rect ref={a3Ref} x="16" y="16" width="168" height="168" rx="8" fill="none" stroke="#ff14a0" strokeWidth="1.2" strokeDasharray="18 627" strokeLinecap="round" strokeOpacity="0.70" filter="url(#glow-arc)" />
            </svg>

            {/* Profile photo */}
            <div className="absolute inset-[8%] rounded-2xl overflow-hidden border border-white/15 z-10 shadow-[0_0_24px_#4dd9ff25]">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030314]/40 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
