import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ContactProps {
  email: string;
}

const Contact = ({ email }: ContactProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, linkRef.current], {
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-40 px-6 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-75 rounded-full bg-[#a78bfa]/10 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-8">
          Contact
        </p>

        <h2
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold leading-tight mb-12 bg-linear-to-r from-white via-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent"
        >
          Let&apos;s work<br />together
        </h2>

        <a
          ref={linkRef}
          href={`mailto:${email}`}
          className="inline-block text-lg md:text-2xl font-mono text-white/60 hover:text-white border-b border-white/20 hover:border-[#4dd9ff] pb-1 transition-all duration-300"
        >
          {email}
        </a>
      </div>
    </section>
  );
};

export default Contact;
