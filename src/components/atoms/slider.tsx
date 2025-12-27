import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@src/utils/tailwind-utils';

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  hideThumb?: boolean;
};

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, hideThumb, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center', className)} {...props}>
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-cyan-500/20">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-cyan-500" />
    </SliderPrimitive.Track>
    {!hideThumb && (
      <SliderPrimitive.Thumb className="bg-background ring-offset-background focus-visible:ring-ring block h-3 w-3 cursor-pointer rounded-full border border-white bg-cyan-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
