import { lazy, LazyExoticComponent } from 'react';
import { TFunction } from 'i18next';
import { BookUser, CalendarDays, Flower2, LucideIcon, Mail, Music2, Settings } from 'lucide-react';

const Calendar = lazy(() => import('@pages/calendar'));
const Contacts = lazy(() => import('@pages/contacts'));
const Mail_ = lazy(() => import('@pages/mail'));
const Music = lazy(() => import('@pages/music'));
const Photos = lazy(() => import('@pages/photos'));
const SettingsPage = lazy(() => import('@pages/settings'));

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

export type PageType = {
  /** Name of the macOS app this window imitates; also the window id. */
  name: string;
  page?: LazyExoticComponent<({ t }: PageProps) => JSX.Element>;
  size: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  /** Tailwind gradient classes for the dock tile; each one echoes the accent colour of its app's window. */
  gradient?: string;
};

/**
 * Each app tells one part of the story, in reading order:
 * Contacts → who I am, Calendar → career, Photos → projects, Music → skills, Mail → get in touch.
 */
const PAGES: PageType[] = [
  { name: 'Contacts', page: Contacts, size: 'xl', icon: BookUser, gradient: 'from-violet-500 to-fuchsia-600' },
  { name: 'Calendar', page: Calendar, size: 'xl', icon: CalendarDays, gradient: 'from-rose-500 to-red-600' },
  { name: 'Photos', page: Photos, size: 'xl', icon: Flower2, gradient: 'from-amber-300 via-rose-400 to-violet-500' },
  { name: 'Music', page: Music, size: 'lg', icon: Music2, gradient: 'from-cyan-400 to-teal-600' },
  { name: 'Mail', page: Mail_, size: 'md', icon: Mail, gradient: 'from-blue-500 to-indigo-700' },
  { name: 'Divider', size: 'sm' },
  { name: 'Settings', page: SettingsPage, size: 'sm', icon: Settings, gradient: 'from-slate-500 to-slate-800' },
];

export default PAGES;
