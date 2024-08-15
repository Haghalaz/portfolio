import { ReactNode } from 'react';
import { cn } from '@utils/tailwind-utils';

type ButtonProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, className, onClick, disabled }: ButtonProps) => {
  return (
    <button className={cn('bg-neutral-950 text-neutral-200 group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium', className)} onClick={onClick} disabled={disabled}>
      {children}
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  );
};

export { Button };
