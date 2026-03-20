import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AboutProps {
  about: string;
  profilePic: string;
}

const About = ({ about, profilePic }: AboutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 30,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      });

      gsap.from(headingRef.current, {
        opacity: 0, y: 40,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      });

      gsap.from(textRef.current, {
        opacity: 0, y: 30,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
      });

      gsap.from(imageRef.current, {
        opacity: 0, x: 50,
        duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p
            ref={labelRef}
            className="text-xs font-mono tracking-[0.35em] text-[#4dd9ff] uppercase mb-5"
          >
            About me
          </p>
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white"
          >
            Who I{' '}
            <span className="bg-linear-to-r from-[#a78bfa] to-[#4dd9ff] bg-clip-text text-transparent">
              Am
            </span>
          </h2>
          <p
            ref={textRef}
            className="text-lg text-slate-400 leading-relaxed"
          >
            {about}
          </p>
        </div>
        <div ref={imageRef} className="relative group">
          <div className="absolute -inset-4 rounded-3xl bg-[#a78bfa]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#030314]/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
