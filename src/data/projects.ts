import { asset } from '@utils/asset';

export type ProjectsType = {
  id: number;
  title: string;
  description: string;
  src: string;
  repo: string;
  /** Published site, when there is one. */
  demo?: string;
  /** This very site: shown as "you are here" instead of a link to itself. */
  current?: boolean;
  skills: string[];
};

const PROJECTS: ProjectsType[] = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'PortfolioDescription',
    src: asset('assets/images/projects/portfolio.webp'),
    repo: 'https://github.com/Haghalaz/portfolio',
    current: true,
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
  {
    id: 2,
    title: 'Bounce',
    description: 'BounceDescription',
    src: asset('assets/images/projects/bounce.webp'),
    repo: 'https://github.com/Haghalaz/bounce',
    demo: 'https://haghalaz.github.io/bounce/',
    skills: ['vite', 'react', 'ts', 'tailwind', 'pixi'],
  },
  {
    id: 3,
    title: 'MovieDiscover',
    description: 'MovieDiscoverDescription',
    src: asset('assets/images/projects/movie-discover.webp'),
    repo: 'https://github.com/Haghalaz/movie-discover',
    demo: 'https://haghalaz.github.io/movie-discover/',
    skills: ['vite', 'react', 'ts', 'tailwind', 'shadcn', 'tmdb'],
  },
  {
    id: 4,
    title: 'MinedSonar',
    description: 'MinedSonarDescription',
    src: asset('assets/images/projects/mined-sonar.webp'),
    repo: 'https://github.com/Haghalaz/MinedSonar',
    demo: 'https://mined-sonar.vercel.app',
    skills: ['vite', 'react', 'ts', 'tailwind', 'zustand'],
  },
  {
    id: 5,
    title: 'VideoMetadata',
    description: 'VideoMetadataDescription',
    src: asset('assets/images/projects/video-metadata-extraction.webp'),
    repo: 'https://github.com/Haghalaz/video-metadata-extraction',
    demo: 'https://video-metadata-extraction.vercel.app',
    skills: ['next', 'react', 'ts', 'tailwind'],
  },
  {
    id: 6,
    title: 'BarbePortfolio',
    description: 'BarbePortfolioDescription',
    src: asset('assets/images/projects/barbe-portfolio.webp'),
    repo: 'https://github.com/Haghalaz/barbe-portfolio',
    demo: 'https://barbe-portfolio.vercel.app',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
];

export default PROJECTS;
