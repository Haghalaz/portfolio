import * as React from 'react';
import { animated, useSpringValue } from '@react-spring/web';
import { clamp } from '@react-spring/shared';

import { useWindowResize } from '@hooks/useWindowResize.ts';

import { DockContext } from '@contexts/dockContext.ts';

interface DockProps {
  children: React.ReactNode;
}

const DOCK_ZOOM_LIMIT = [-100, 50];

export const ToolbarContent = ({ children }: DockProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
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

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth);
  });

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className="fixed bottom-3 left-2/4 z-[88] box-content flex h-12 origin-[center_bottom] -translate-x-2/4 items-end gap-3 rounded-xl bg-stone-200 bg-opacity-30 p-2.5 pb-1.5 will-change-contents dark:bg-stone-800"
        onMouseOver={() => !isZooming.current && setHovered(true)}
        onMouseOut={() => setHovered(false)}
        style={{
          x: '-50%',
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
};
