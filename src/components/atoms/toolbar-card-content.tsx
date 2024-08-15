import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@atoms/tooltip.tsx';

type CardProps = {
  page: string;
  src: string;
};

export const ToolbarCardContent = ({ page, src }: CardProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="relative z-[99] flex h-full w-full items-center justify-center overflow-hidden">
          <img className="relative z-0 h-3/6 w-6/12 rounded-full" src={src} alt={`${page} cover`} loading="lazy" />
          <img className="absolute z-[1] h-3/6 w-6/12 translate-y-2.5 rounded-full opacity-40 blur-[10px]" src={src} alt={`${page} cover`} loading="lazy" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{page}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
