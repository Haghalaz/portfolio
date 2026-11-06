import { animated, useIsomorphicLayoutEffect, useSpringValue } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useRef, useState } from 'react';

import { useWindowResize } from '@hooks/useWindowResize.ts';
import { useDock } from '@contexts/dockContext.ts';

type DockCardProps = {
  children: React.ReactNode;
  handler: (page: string) => void;
  page: string;
  active?: boolean;
};

export const ToolbarCard = ({ children, handler, page, active = false }: DockCardProps) => {
  const dock = useDock();
  const INITIAL_WIDTH = dock.size;
  const cardRef = useRef<HTMLButtonElement>(null!);
  const [elCenterX, setElCenterX] = useState(0);
  const size = useSpringValue(dock.size, { config: { mass: 0.1, tension: 220 } });

  useGesture(
    {
      onMove: (state) => {
        const mouseX = state.xy[0];

        if (dock.width > 0) {
          const transformedValue = INITIAL_WIDTH + 36 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12;
          size.start(transformedValue);
        }
      },

      onHover: (state) => !state.active && size.start(INITIAL_WIDTH),
    },
    { target: cardRef }
  );

  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) size.start(INITIAL_WIDTH);
  }, [dock.hovered, INITIAL_WIDTH]);

  useIsomorphicLayoutEffect(() => {
    const { x } = cardRef.current.getBoundingClientRect();
    setElCenterX(x + INITIAL_WIDTH / 2);
  }, [INITIAL_WIDTH, dock.width]);

  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();
    setElCenterX(x + INITIAL_WIDTH / 2);
  });

  return (
    <div className="relative m-0 cursor-pointer rounded-xl border border-solid border-white/20 p-0 shadow-lg brightness-[.95] transition-[filter] duration-200 hover:brightness-110">
      <animated.button
        ref={cardRef}
        type="button"
        aria-label={page}
        aria-pressed={active}
        onClick={() => handler(page)}
        className="flex flex-col items-center gap-4 rounded-xl"
        style={{
          width: size,
          height: size,
        }}
      >
        {children}
      </animated.button>

      <span
        aria-hidden
        className={`absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white shadow transition-all duration-300 ${
          active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      />
    </div>
  );
};
