import { useState } from 'react';

type ProjectCoverProps = {
  src: string;
  /** Translated project name: used for the alt text and the placeholder. */
  title: string;
  className?: string;
  lazy?: boolean;
};

/**
 * Project screenshot. While the image file is missing (or fails to load) it shows a quiet
 * placeholder tile with the project's initials, so a new project never renders a broken image.
 */
export const ProjectCover = ({ src, title, className = '', lazy = false }: ProjectCoverProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const initials = title
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        role="img"
        aria-label={`${title} cover`}
        className={`${className} grid aspect-[4/3] min-w-[min(100%,32rem)] place-items-center bg-gradient-to-br from-stone-700 to-stone-900 font-mono text-3xl font-medium tracking-tighter text-white/40`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img src={src} alt={`${title} cover`} className={className} loading={lazy ? 'lazy' : undefined} width={1200} height={900} onError={() => setFailed(true)} />
  );
};
