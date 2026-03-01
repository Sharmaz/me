import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const proxy = { n: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          onComplete: () => onCompleteRef.current(),
        });
      },
    });

    tl.to(proxy, {
      n: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        if (counterRef.current) {
          const val = Math.round(proxy.n);
          counterRef.current.textContent = val < 10 ? `0${val}` : String(val);
        }
      },
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030314]"
    >
      <span
        ref={counterRef}
        className="font-mono font-bold select-none tabular-nums text-white/20 leading-none"
        style={{ fontSize: 'clamp(5rem, 16vw, 13rem)', letterSpacing: '-0.04em' }}
      >
        00
      </span>
    </div>
  );
};

export default Loader;
