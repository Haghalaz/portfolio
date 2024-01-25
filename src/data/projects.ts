import PortfolioCover from '@assets/imgs/portfolioCover.png';

export type ProjectsType = {
  id: number;
  title: string;
  description: string;
  src: string;
  skills: string[];
};

const PROJECTS: ProjectsType[] = [
  {
    id: 1,
    title: 'Portfolio',
    description: 'PortfolioDescription',
    src: PortfolioCover,
    skills: ['vite', 'react', 'ts', 'tailwind'],
  },
];

export default PROJECTS;
