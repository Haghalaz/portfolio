import { ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import { useWindowResize } from '@hooks/useWindowResize.ts';
import useReducedMotion from '@hooks/useReducedMotion.ts';
import useIsMobile from '@hooks/useIsMobile.ts';

import { Minus } from 'lucide-react';

import { Button } from '@atoms/button.tsx';

interface CardProps {
  children: ReactNode;
  windows: string[];
  handleOpen: (page: string) => void;
  handlePriority: (page: string) => void;
  variant: 'sm' | 'md' | 'lg' | 'xl' | null;
  name: string;
}

/** Vertical space taken by the menu bar (top) and the dock (bottom). */
const MENU_BAR = 32;
const DOCK = 72;

const getSize = (variant: string | null) => {
  switch (variant) {
    case 'sm':
      return [440, 500];

    case 'md':
      return [480, 580];

    case 'lg':
      return [800, 500];

    case 'xl':
      return [1000, 750];

    default:
      return [400, 200];
  }
};

const Window = ({ children, windows, handleOpen, handlePriority, variant, name }: CardProps) => {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const open = windows.includes(name);
  const stackIndex = windows.indexOf(name);

  // Pages stay mounted once opened so state (e.g. the music player) survives minimizing.
  const [mounted, setMounted] = useState(open);
  const [lastPosition, setLastPosition] = useState<number[]>([0, 0]);
  const [viewport, setViewport] = useState<number[]>([window.innerWidth, window.innerHeight]);

  const root = useRef<HTMLDivElement>(null);
  const target = useRef(null);

  const [defaultWidth, defaultHeight] = getSize(variant);
  const width = mobile ? viewport[0] - 16 : Math.min(viewport[0] - 100, defaultWidth);
  const height = mobile ? viewport[1] - MENU_BAR - DOCK - 16 : Math.min(viewport[1] - 150, defaultHeight);

  const [{ x, y, scaleX, scaleY }, api] = useSpring(() => ({
    scaleX: 0.05,
    scaleY: 0.02,
    x: 0,
    y: 300,
    // Width collapses faster than height, which gives the genie-style funnel.
    config: (key) => (key === 'scaleX' ? { mass: 1, tension: 240, friction: 24 } : { mass: 1, tension: 150, friction: 20 }),
  }));

  // The window "genies" into / out of its dock icon, like macOS.
  const closedPose = () => {
    const node = root.current;
    const icon = document.querySelector<HTMLElement>(`button[aria-label="${CSS.escape(name)}"]`);
    if (!node || !icon) return { x: 0, y: 300, scaleX: 0.05, scaleY: 0.02 };

    const win = node.getBoundingClientRect();
    const dock = icon.getBoundingClientRect();
    // Natural (untransformed) centre of the window = current centre minus the current translation.
    const naturalX = win.left + win.width / 2 - x.get();
    const naturalY = win.top + win.height / 2 - y.get();

    return { x: dock.left + dock.width / 2 - naturalX, y: dock.top + dock.height / 2 - naturalY, scaleX: 0.05, scaleY: 0.02 };
  };

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    if (!open) {
      api.start({ ...closedPose(), immediate: reduced });
      return;
    }

    const [px, py] = mobile ? [0, 0] : lastPosition;
    if (scaleY.get() < 0.5) api.set(closedPose());
    api.start({ x: px, y: py, scaleX: 1, scaleY: 1, immediate: reduced });
    // closedPose reads refs/springs only; it must not retrigger this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, lastPosition, mobile, open, reduced]);

  const isFront = stackIndex === 0;

  // Closed windows must not be reachable by keyboard or screen readers; the front one takes focus.
  useEffect(() => {
    if (!root.current) return;

    root.current.inert = !open;
    if (isFront) root.current.focus({ preventScroll: true });
  }, [open, isFront]);

  useDrag(
    ({ offset: [x, y] }) => {
      api.start({ x, y });
      setLastPosition([x, y]);
    },
    {
      target,
      enabled: !mobile,
      eventOptions: { passive: true },
      from: () => [x.get(), y.get()],
      bounds: {
        left: ((viewport[0] - width) / 2) * -1,
        right: (viewport[0] - width) / 2,
        top: ((viewport[1] - MENU_BAR - DOCK - height) / 2) * -1,
        bottom: (viewport[1] - MENU_BAR - DOCK - height) / 2,
      },
      rubberband: true,
    }
  );

  useWindowResize((width, height) => setViewport([width, height]));

  return (
    <animated.div
      ref={root}
      role="dialog"
      aria-label={name}
      tabIndex={-1}
      className="absolute flex flex-col overflow-hidden rounded-xl border border-b-2 border-white/30 bg-[#e4e4e4]/60 bg-clip-border shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.3)] outline-none backdrop-blur-xl backdrop-filter transition-shadow duration-500 hover:shadow-[0px_30px_100px_-10px_rgba(0,0,0,0.4)] dark:border-[#2a2a2a] dark:bg-[#181818]/60"
      onPointerDown={() => handlePriority(name)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') handleOpen(name);
      }}
      style={{
        x,
        y,
        scaleX,
        scaleY,
        opacity: scaleY.to([0.02, 0.2], [0, 1], 'clamp'),
        transformOrigin: 'center',
        width,
        height,
        zIndex: open ? 50 - stackIndex : 0,
        visibility: scaleY.to((value) => (value <= 0.02 && !open ? 'hidden' : 'visible')),
      }}
    >
      <animated.div
        ref={target}
        className={`flex h-10 w-full shrink-0 touch-none items-center justify-between bg-[#C1D0D9]/90 p-2 dark:bg-[#181818] ${
          mobile ? '' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <small className="select-none font-mono text-xs font-medium tracking-tight">{name}</small>

        <Button aria-label={`Minimize ${name}`} className="h-full w-max bg-transparent px-3 py-0" onClick={() => handleOpen(name)}>
          <Minus className="size-4 stroke-black dark:stroke-white" />
        </Button>
      </animated.div>

      <div className="relative w-full grow overflow-auto">
        {mounted && <Suspense fallback={<div className="grid h-full place-items-center opacity-60">…</div>}>{children}</Suspense>}
      </div>
    </animated.div>
  );
};

export default Window;
