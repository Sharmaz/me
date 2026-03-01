import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CHARS = '!@#$%<>?/\\|~ABCDEF0123456789';
const NAME = 'Frontend Developer';

interface LoaderScrambleProps {
  onComplete: () => void;
}

const LoaderScramble = ({ onComplete }: LoaderScrambleProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    // Build a span per character
    const chars = NAME.split('').map((original) => {
      const span = document.createElement('span');
      span.textContent = original === ' ' ? '\u00A0' : randomChar();
      span.style.color = 'rgba(255,255,255,0.15)';
      span.style.transition = 'color 0.12s ease, text-shadow 0.12s ease';
      el.appendChild(span);
      return { span, original };
    });

    const locked = chars.map(() => false);
    let frame: number;
    let startTime: number | null = null;
    const duration = 2200;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-in: slow start, fast lock at the end
      const eased = progress * progress;
      const toLock = Math.floor(eased * chars.length);

      chars.forEach(({ span, original }, i) => {
        if (original === ' ') return;

        if (i < toLock && !locked[i]) {
          locked[i] = true;
          span.textContent = original;
          span.style.color = 'rgba(255,255,255,1)';
          span.style.textShadow = '0 0 18px #a78bfa, 0 0 36px #4dd9ff';
          setTimeout(() => {
            span.style.textShadow = 'none';
          }, 350);
        } else if (!locked[i]) {
          span.textContent = randomChar();
          span.style.color = 'rgba(77,217,255,0.3)';
        }
      });

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          delay: 0.45,
          ease: 'expo.inOut',
          onComplete: () => onCompleteRef.current(),
        });
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030314]"
    >
      <h1
        ref={textRef}
        className="font-bold select-none"
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          letterSpacing: '-0.02em',
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
};

export default LoaderScramble;
