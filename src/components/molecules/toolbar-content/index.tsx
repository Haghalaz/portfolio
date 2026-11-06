import * as React from 'react';
import { animated, useSpringValue } from '@react-spring/web';

import { useWindowResize } from '@hooks/useWindowResize.ts';

import { DockContext } from '@contexts/dockContext.ts';

interface DockProps {
  children: React.ReactNode;
}

const MOBILE_BREAKPOINT = 480;

const DOCK_ZOOM_LIMIT = [-100, 50];

export const ToolbarContent = ({ children }: DockProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [size, setSize] = React.useState(48);
  const isZooming = React.useRef(false);
  const dockRef = React.useRef<HTMLDivElement>(null!);

  const setIsZooming = React.useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth);
    },
  });

  useWindowResize((viewportWidth) => {
    setSize(viewportWidth < MOBILE_BREAKPOINT ? 38 : 48);
    setWidth(dockRef.current.clientWidth);
  });

  React.useLayoutEffect(() => {
    setWidth(dockRef.current.clientWidth);
  }, [size]);

  return (
    <DockContext.Provider value={{ size, hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className="fixed bottom-3 left-2/4 z-[95] box-content flex max-w-[calc(100vw-1rem)] origin-[center_bottom] -translate-x-2/4 items-end gap-1.5 rounded-xl border border-white/20 bg-white/25 p-2 pb-1.5 sm:gap-3 sm:p-2.5 sm:pb-1.5 shadow-2xl backdrop-blur-xl will-change-contents dark:bg-stone-800/60"
        onMouseOver={() => !isZooming.current && setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          x: '-50%',
          height: size,
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => Math.min(2, Math.max(0.5, value))),
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
};
