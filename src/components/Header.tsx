import { useEffect, useRef, useState } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

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
      gsap.from(headerRef.current, { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }, headerRef);
    return () => ctx.revert();
  }, [animate]);

  // Animate mobile menu open/close
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      );
    } else {
      gsap.to(el, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' });
    }
  }, [open]);

  const close = () => setOpen(false);

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

      {/* Desktop nav */}
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

      {/* Hamburger button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-1.75' : ''}`} />
        <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.75' : ''}`} />
      </button>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 opacity-0"
        style={{ backgroundColor: 'rgba(3,3,20,0.95)', backdropFilter: 'blur(16px)', pointerEvents: open ? 'auto' : 'none' }}
      >
        <nav className="flex flex-col px-6 py-4 gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="text-xs font-mono tracking-[0.2em] text-white hover:text-[#4dd9ff] uppercase transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
