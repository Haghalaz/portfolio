import { LucideIcon } from 'lucide-react';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@atoms/tooltip.tsx';

type CardProps = {
  page: string;
  icon: LucideIcon;
  gradient: string;
};

export const ToolbarCardContent = ({ page, icon: Icon, gradient }: CardProps) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`relative z-[99] flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] bg-gradient-to-br ${gradient}`}>
          <Icon className="size-1/2 text-white drop-shadow" strokeWidth={1.75} aria-hidden />
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="rounded-md bg-white px-2 py-1 text-xs font-medium text-stone-900 shadow-lg dark:bg-stone-900 dark:text-white">
        <p>{page}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
