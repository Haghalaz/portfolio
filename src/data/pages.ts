import { TFunction } from 'i18next';
import { lazy, LazyExoticComponent } from 'react';

const About = lazy(() => import('@pages/about'));
const Config = lazy(() => import('@pages/config'));
const Projects = lazy(() => import('@pages/projects'));
const Skills = lazy(() => import('@pages/skills'));

export type PageProps = {
  t: TFunction<'translation', undefined>;
};

export type PageType = {
  name: string;
  page?: LazyExoticComponent<({ t }: PageProps) => JSX.Element>;
  size: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
};

const PAGES: PageType[] = [
  { name: 'About.me', page: About, size: 'xl', src: 'https://cdn.iconscout.com/icon/free/png-256/free-about-me-461762.png?f=webp' },
  { name: 'Skill_Wave', page: Skills, size: 'lg', src: 'https://i.pinimg.com/1200x/0f/f3/20/0ff320da67fecb07cf88ed4bc2841eb3.jpg' },
  { name: 'Projects', page: Projects, size: 'xl', src: 'https://icon-library.com/images/gallery-icon-android/gallery-icon-android-19.jpg' },
  { name: 'Divider', size: 'sm' },
  { name: 'Config', page: Config, size: 'sm', src: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/settings_macos_bigsur_icon_189754.png' },
];

export default PAGES;
