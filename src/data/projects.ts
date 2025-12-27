import PortfolioCover from '@assets/images/portfolioCover.jpg';

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
    src: 'https://raw.githubusercontent.com/Haghalaz/bounce/main/src/assets/imgs/bounceCover.png',
    repo: 'https://github.com/Haghalaz/bounce',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
  {
    id: 3,
    title: 'MovieDiscover',
    description: 'MovieDiscoverDescription',
    src: 'https://raw.githubusercontent.com/Haghalaz/movie-discover/main/src/assets/project-cover.png',
    repo: 'https://github.com/Haghalaz/movie-discover',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
  {
    id: 4,
    title: 'MinedSonar',
    description: 'MinedSonarDescription',
    src: 'https://raw.githubusercontent.com/Haghalaz/MinedSonar/main/src/assets/img/mockup.png',
    repo: 'https://github.com/Haghalaz/MinedSonar',
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
];

export default PROJECTS;
