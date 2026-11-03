import { useEffect, useRef } from 'react';

import useReducedMotion from '@hooks/useReducedMotion.ts';
import { useSettings } from '@contexts/settingsContext.tsx';
import { asset } from '@utils/asset';

const layer = (file: string) => ({ backgroundImage: `url(${asset(`assets/images/${file}`)})` });

/** Full-screen wallpaper with a subtle pointer parallax (fine pointers only; off for reduced motion or when disabled in Settings). */
const Wallpaper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { settings } = useSettings();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Always settle back to the resting position when the effect is off.
    node.style.transform = '';
    if (reduced || !settings.parallax || !window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const px = (event.clientX / window.innerWidth - 0.5) * -24;
        const py = (event.clientY / window.innerHeight - 0.5) * -16;
        node.style.transform = `translate3d(${px}px, ${py}px, 0) scale(1.05)`;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced, settings.parallax]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={ref} className="absolute inset-0 scale-105 transition-transform duration-700 ease-out will-change-transform">
        <div className="absolute inset-0 bg-cover bg-center dark:hidden" style={layer('wallpaper-light.webp')} />
        <div className="absolute inset-0 hidden bg-cover bg-center dark:block" style={layer('wallpaper-dark.webp')} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30" />
    </div>
  );
};

export default Wallpaper;
