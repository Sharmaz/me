import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeaderProps {
  name: string;
  animate: boolean;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const Header = ({ name, animate }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // Glass blur effect on scroll
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () => gsap.to(el, { backgroundColor: 'rgba(3,3,20,0.85)', backdropFilter: 'blur(16px)', duration: 0.4 }),
      onLeaveBack: () => gsap.to(el, { backgroundColor: 'rgba(3,3,20,0.5)', backdropFilter: 'blur(8px)', duration: 0.4 }),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, headerRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-center justify-between border-b border-white/5"
      style={{ backgroundColor: 'rgba(3,3,20,0.5)', backdropFilter: 'blur(8px)' }}
    >
      <a
        href="#"
        className="text-sm font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
      >
        {name}
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
