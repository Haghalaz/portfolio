import { animated, useIsomorphicLayoutEffect, useSpringValue } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useRef, useState } from 'react';

import { useWindowResize } from '@hooks/useWindowResize.ts';
import { useDock } from '@contexts/dockContext.ts';

type DockCardProps = {
  children: React.ReactNode;
  handler: (page: string) => void;
  page: string;
};

const INITIAL_WIDTH = 48;

export const ToolbarCard = ({ children, handler, page }: DockCardProps) => {
  const dock = useDock();

  const cardRef = useRef<HTMLButtonElement>(null!);
  const [elCenterX, setElCenterX] = useState<number>(0);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: { mass: 0.1, tension: 220 },
  });

  useGesture(
    {
      onMove: (state) => {
        const mouseX = state.xy[0];

        if (dock.width > 0) {
          const transformedValue = INITIAL_WIDTH + 36 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 12;

          size.start(transformedValue);
        }
      },

      onHover: (state) => {
        if (!state.active) size.start(INITIAL_WIDTH);
      },
    },
    { target: cardRef }
  );

  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) size.start(INITIAL_WIDTH);
  }, [dock.hovered]);

  useWindowResize(() => {
    const { x } = cardRef.current.getBoundingClientRect();
    setElCenterX(x + INITIAL_WIDTH / 2);
  });

  return (
    <div className="m-0 cursor-pointer rounded-xl border border-solid border-[#ffffff1a] bg-[#262626] p-0 brightness-[.9] saturate-[.9] transition-all duration-200 hover:brightness-[1.12] hover:saturate-100">
      <animated.button
        ref={cardRef}
        onClick={() => handler(page)}
        className="container flex flex-col items-center gap-4"
        style={{
          width: size,
          height: size,
        }}
      >
        {children}
      </animated.button>
    </div>
  );
};
