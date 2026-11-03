import { SimpleIcon, siShadcnui, siThemoviedatabase } from 'simple-icons';

export type TechType = {
  label: string;
  /** Icon file in /public/assets/icons (named after the id). */
  local?: boolean;
  /** Otherwise a simple-icons logo; with neither, the chip is text only. */
  simple?: SimpleIcon;
};

/** Technologies shown as chips on a project. The id is also the icon file name for `local` ones. */
export const TECH: Record<string, TechType> = {
  next: { label: 'Next.js', local: true },
  vite: { label: 'Vite', local: true },
  react: { label: 'React', local: true },
  ts: { label: 'TypeScript', local: true },
  tailwind: { label: 'Tailwind CSS', local: true },
  shadcn: { label: 'shadcn/ui', simple: siShadcnui },
  tmdb: { label: 'TMDB API', simple: siThemoviedatabase },
  angular: { label: 'Angular', local: true },
  pixi: { label: 'Pixi.js' },
  zustand: { label: 'Zustand' },
};
