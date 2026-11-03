import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@src/utils/tailwind-utils';

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  hideThumb?: boolean;
  /** Accessible name for the thumb (the only focusable part). */
  label?: string;
};

/**
 * Minimal media slider with a fixed-height hit area, so nothing ever shifts on hover:
 * the track thickens with a transform (not its height), and the thumb fades in on hover
 * as a purely visual, non-interactive dot (pointer-events-none) so it never gets in the way
 * of clicking or dragging the track.
 */
const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, hideThumb, label, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={cn('group relative flex h-5 w-full cursor-pointer touch-none select-none items-center', className)} {...props}>
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-black/15 transition-transform duration-200 group-hover:scale-y-150 group-active:scale-y-150 dark:bg-white/20">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-stone-800 transition-colors duration-200 group-hover:bg-cyan-500 group-active:bg-cyan-500 dark:bg-white dark:group-hover:bg-cyan-400 dark:group-active:bg-cyan-400" />
    </SliderPrimitive.Track>

    {!hideThumb && (
      <SliderPrimitive.Thumb
        aria-label={label}
        className="pointer-events-none block size-3 scale-50 rounded-full bg-white opacity-0 shadow-[0_1px_4px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-[transform,opacity] duration-200 focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100"
      />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
