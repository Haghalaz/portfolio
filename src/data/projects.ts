import PortfolioCover from '@assets/imgs/portfolioCover.png';
import BounceCover from '@assets/imgs/bounceCover.png';

export type ProjectsType = {
  id: number;
  title: string;
  description: string;
  src: string;
  repo: string;
  skills: string[];
};

const PROJECTS: ProjectsType[] = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'PortfolioDescription',
    src: PortfolioCover,
    repo: 'https://github.com/Haghalaz/portfolio',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
  {
    id: 2,
    title: 'Bounce',
    description: 'BounceDescription',
    src: BounceCover,
    repo: 'https://github.com/Haghalaz/bounce',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
];

export default PROJECTS;
