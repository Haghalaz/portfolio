import { ReactNode } from 'react';

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

type SegmentedProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

/** Two-or-more way picker, like macOS segmented controls. */
export const Segmented = <T extends string>({ label, value, options, onChange }: SegmentedProps<T>) => (
  <div role="radiogroup" aria-label={label} className="flex rounded-lg bg-black/10 p-0.5 dark:bg-white/10">
    {options.map((option) => {
      const active = option.value === value;

      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
            active ? 'bg-white text-stone-900 shadow dark:bg-stone-600 dark:text-white' : 'opacity-60 hover:opacity-100'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      );
    })}
  </div>
);
