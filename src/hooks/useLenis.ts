import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis();

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
