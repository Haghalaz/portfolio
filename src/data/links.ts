import { ComponentType } from 'react';
import { Mail } from 'lucide-react';

import { GithubIcon, LinkedinIcon, WhatsappIcon } from '@atoms/brand-icon.tsx';

export type LinkType = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  /** Tailwind classes for the icon tile (background + text). */
  tone: string;
};

export const EMAIL = 'luizneto0213@gmail.com';

const LINKS: LinkType[] = [
  { id: 'email', label: 'Email', href: `mailto:${EMAIL}`, icon: Mail, tone: 'bg-sky-500 text-white' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/Haghalaz', icon: GithubIcon, tone: 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://br.linkedin.com/in/luiz-coelho-neto', icon: LinkedinIcon, tone: 'bg-[#0A66C2] text-white' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/5541995573573', icon: WhatsappIcon, tone: 'bg-[#25D366] text-white' },
];

export default LINKS;
