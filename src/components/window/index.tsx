import { IconButton } from '@material-tailwind/react';
import { animated, useSpring } from '@react-spring/web';
import { useWindowResize } from '@src/utils/hooks/useWindowResize';
import { useDrag } from '@use-gesture/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { TiArrowMinimise } from 'react-icons/ti';

interface CardProps {
  children: ReactNode;
  windows: string[];
  handleOpen: (page: string) => void;
  handlePriority: (page: string) => void;
  variant: 'sm' | 'md' | 'lg' | 'xl' | null;
  name: string;
}
const getSize = (variant: string | null) => {
  switch (variant) {
    case 'sm':
      return [200, 200];

    case 'md':
      return [400, 250];

    case 'lg':
      return [800, 500];

    case 'xl':
      return [1000, 750];

    default:
      return [400, 200];
  }
};

const Window = ({ children, windows, handleOpen, handlePriority, variant, name }: CardProps) => {
  const [lastPosition, setLastPosition] = useState<number[]>([0, 0]);
  const [[width, height], setSize] = useState<number[]>(getSize(variant));
  const [open, setOpen] = useState<boolean>(windows.includes(name));
  const [current, setCurrent] = useState<boolean>();
  const [defaultSize] = useState<number[]>(getSize(variant));

  const target = useRef(null);

  const [{ x, y, rotateX, scale, opacity }, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    x: 0,
    y: 0,
    opacity: 0,
    config: { mass: 10, tension: 450, friction: 120 },
  }));

  useEffect(() => {
    setOpen(windows.includes(name));
    setCurrent(windows[0] === name);
  }, [name, windows]);

  useEffect(() => {
    if (!open) {
      api.start({ scale: 0.05, x: 0, y: 500, opacity: 0, rotateX: -45 });
    } else {
      const [x, y] = lastPosition;
      api.start({ scale: 1, x, y, opacity: 1, rotateX: 0 });
    }
  }, [api, lastPosition, open]);

  useDrag(
    ({ offset: [x, y] }) => {
      api.start({ x, y });
      setLastPosition([x, y]);
    },
    {
      target,
      eventOptions: { passive: true },
      bounds: {
        left: (window.innerWidth / 2 - width / 2) * -1,
        right: window.innerWidth / 2 - width / 2,
        top: (window.innerHeight / 2 - height / 2) * -1,
        bottom: window.innerHeight / 2 - height / 2,
      },
      rubberband: true,
    }
  );

  useWindowResize(() => setSize([Math.min(window.innerWidth - 100, defaultSize[0]), Math.min(window.innerHeight - 150, defaultSize[1])]));

  return (
    <animated.div
      className={`absolute flex h-full w-full flex-col overflow-hidden rounded-md border border-b-[2px]  bg-[#e4e4e4]/50  bg-clip-padding shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.3)] backdrop-blur backdrop-filter transition-shadow delay-[0.5s] duration-[0.5s,opacity] hover:shadow-[0px_30px_100px_-10px_rgba(0,0,0,0.4)]  dark:border-[#181818] dark:bg-[#181818]/45 ${
        !open && 'blur-sm'
      } ${current ? 'z-50' : 'z-10'}`}
      onMouseDown={() => handlePriority(name)}
      style={{
        x,
        y,
        scale,
        rotateX,
        opacity,
        width,
        height,
      }}
    >
      <animated.div
        ref={target}
        className="flex h-10 w-full cursor-grab touch-none items-center justify-between bg-[#C1D0D9] p-2 active:cursor-grabbing dark:bg-[#181818]"
      >
        <small className="select-none font-bold">{name}</small>
        <IconButton onClick={() => handleOpen(name)} placeholder={undefined} variant="text">
          <TiArrowMinimise className="h-5 w-5 fill-black dark:fill-white" />
        </IconButton>
      </animated.div>

      <animated.div children={children} className="relative w-full grow overflow-auto" />
    </animated.div>
  );
};

export default Window;
