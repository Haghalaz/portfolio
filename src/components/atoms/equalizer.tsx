type EqualizerProps = {
  playing?: boolean;
  className?: string;
};

/** Four-bar equalizer. Static (but still readable) when paused or when motion is reduced. */
export const Equalizer = ({ playing = true, className = 'h-4' }: EqualizerProps) => (
  <span aria-hidden className={`inline-flex items-end gap-[2px] ${className}`}>
    {[0, 0.25, 0.1, 0.4].map((delay) => (
      <span
        key={delay}
        className={`h-full w-[3px] origin-bottom rounded-full bg-current ${playing ? 'animate-bars' : 'scale-y-[0.3]'}`}
        style={{ animationDelay: `${delay}s` }}
      />
    ))}
  </span>
);
