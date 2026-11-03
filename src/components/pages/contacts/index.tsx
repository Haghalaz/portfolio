import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ChevronDown, Heart, Quote } from 'lucide-react';

import { useSongContext } from '@contexts/songContext.tsx';
import CAREER, { CompanyType } from '@data/career.ts';
import LINKS from '@data/links.ts';
import { TECH } from '@data/tech.ts';
import TESTIMONIALS from '@data/testimonials.ts';
import { asset, techIcon } from '@utils/asset';

import { Avatar, AvatarImage } from '@atoms/avatar.tsx';
import { CompanyLogo } from '@atoms/company-logo.tsx';
import { ExternalLink } from '@atoms/external-link.tsx';
import { CodeBanner } from '@molecules/code-banner';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

type Status = 'online' | 'busy' | 'offline';

/** Presence colours, as in the old messengers. */
const STATUS_DOT: Record<Status, string> = {
  online: 'bg-green-500',
  busy: 'bg-red-500',
  offline: 'bg-stone-400',
};

const STATUS_LABEL: Record<Status, string> = {
  online: 'StatusOnline',
  busy: 'StatusBusy',
  offline: 'StatusOffline',
};

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

const card = 'reveal rounded-xl bg-white/60 dark:bg-white/5';
const fieldLabel = 'font-mono text-[10px] uppercase tracking-[0.18em] opacity-50';

/** The favourite goes first and gets the emphasis; Angular is "busy" because it is what the day job uses. */
const STACK: { id: string; status: Status }[] = [
  { id: 'react', status: 'online' },
  { id: 'next', status: 'online' },
  { id: 'ts', status: 'online' },
  { id: 'tailwind', status: 'online' },
  { id: 'angular', status: 'busy' },
];
const FAVORITE = 'react';

type ContactRow = {
  key: string;
  status: Status;
  title: string;
  subtitle?: string;
  avatar: ReactNode;
  favorite?: boolean;
};

/** A buddy-list contact: avatar with a presence dot, name, and a one-line "personal message". */
const Contact = ({ row, t }: { row: ContactRow; t: TFunction<'translation', undefined> }) => (
  <li className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5">
    <span className="relative shrink-0">
      {row.avatar}
      <span
        role="img"
        aria-label={t(STATUS_LABEL[row.status])}
        title={t(STATUS_LABEL[row.status])}
        className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-[#ececec] dark:ring-[#222] ${STATUS_DOT[row.status]}`}
      />
    </span>

    <span className="min-w-0 leading-tight">
      <span className={`block truncate text-sm ${row.favorite ? 'font-semibold' : 'font-medium'}`}>{row.title}</span>
      <span className="mt-0.5 flex items-center gap-1 truncate text-xs opacity-60">
        {t(STATUS_LABEL[row.status]).toLowerCase()}
        {row.favorite && <Heart className="size-3 shrink-0 fill-red-500 text-red-500" aria-hidden />}
        {row.subtitle && <span className="truncate">· {row.subtitle}</span>}
      </span>
    </span>
  </li>
);

/** Collapsible group header, like "Online (3)" in the buddy list. */
const Group = ({ title, rows, t, at }: { title: string; rows: ContactRow[]; t: TFunction<'translation', undefined>; at: number }) => {
  const [open, setOpen] = useState(true);

  return (
    <section className="reveal" style={delay(at)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-xs font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/5"
      >
        <ChevronDown className={`size-3.5 transition-transform duration-200 ${open ? '' : '-rotate-90'}`} aria-hidden />
        {title}
        <span className="font-normal opacity-50">({rows.length})</span>
      </button>

      {open && (
        <ul className="mt-0.5 animate-fade-in">
          {rows.map((row) => (
            <Contact key={row.key} row={row} t={t} />
          ))}
        </ul>
      )}
    </section>
  );
};

/** Contacts app, drawn as an instant-messenger profile: my status and personal message up top, a buddy list of where I work, study and what I build with. */
export default function Contacts({ t }: PageProps) {
  const { i18n } = useTranslation();
  const { song, playing } = useSongContext();

  const formatDate = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString(i18n.language, { month: 'short', year: 'numeric' });
  };

  const formatDay = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const jobs = CAREER.filter(({ kind }) => !kind);
  const schools = CAREER.filter(({ kind }) => kind === 'education');
  const [work] = jobs;
  const [currentRole] = work.roles;

  const companyRow = (company: CompanyType): ContactRow => {
    const newest = company.roles[0];
    const oldest = company.roles[company.roles.length - 1];
    const current = !newest.end;

    return {
      key: company.id,
      status: current ? 'online' : 'offline',
      title: company.name,
      avatar: <CompanyLogo company={company} className="size-9 rounded-lg shadow" />,
      subtitle:
        company.kind === 'education'
          ? t('GraduatedIn', { date: formatDate(newest.end ?? oldest.start) })
          : current
            ? t('Since', { date: formatDate(oldest.start) })
            : `${formatDate(oldest.start)} – ${formatDate(newest.end ?? oldest.start)}`,
    };
  };

  const stackRows: ContactRow[] = STACK.map(({ id, status }) => {
    const tech = TECH[id] ?? { label: id };

    return {
      key: id,
      status,
      title: tech.label,
      favorite: id === FAVORITE,
      subtitle: id === FAVORITE ? t('StackFavorite') : status === 'busy' ? t('UsedAtWork') : undefined,
      avatar: tech.local ? (
        <img className="size-9 rounded-lg bg-white/70 p-1 shadow dark:bg-white/10" src={techIcon(id)} alt="" />
      ) : (
        <span aria-hidden className="grid size-9 place-items-center rounded-lg bg-black/10 font-mono text-xs font-medium dark:bg-white/10">
          {tech.label.slice(0, 2)}
        </span>
      ),
    };
  });

  return (
    <div className="h-full overflow-auto bg-[#f1f1f1]/80 dark:bg-stone-900/80 dark:text-white">
      <header className="relative">
        <CodeBanner />

        <Avatar
          className="reveal absolute -bottom-14 left-6 size-28 rounded-full border-4 border-[#f1f1f1] sm:left-10 sm:size-32 dark:border-stone-900"
          style={delay(0)}
        >
          <AvatarImage src={asset('assets/images/profilePic.webp')} alt="Luiz Coelho profile picture" />
        </Avatar>
      </header>

      <section className="px-6 pt-20 sm:px-10">
        <h1 className="reveal font-display text-3xl leading-tight sm:text-5xl" style={delay(80)}>
          {t('Dev')}
        </h1>

        {/* Presence + personal message: shows the song playing in Music when there is one, like a messenger's "now listening". */}
        <div className="reveal mt-2 space-y-1" style={delay(140)}>
          <p className="flex items-center gap-2 font-mono text-xs">
            <span aria-hidden className="relative flex size-2.5">
              <span className={`absolute inset-0 rounded-full ${STATUS_DOT.online}`} />
            </span>
            {t('StatusOnline')}
            <span className="opacity-50">· {t(currentRole.title)}</span>
          </p>

          <p aria-live="polite" className="text-sm italic opacity-80">
            {song && playing ? `♫ ${song.title} · ${song.name}` : t('PersonalMessage')}
          </p>
        </div>

        <ul className="reveal mt-5 flex gap-3" style={delay(220)}>
          {LINKS.map(({ id, label, href, icon: Icon }) => (
            <li key={id}>
              <ExternalLink
                href={href}
                aria-label={label}
                title={label}
                className="grid size-11 place-items-center rounded-full bg-black/10 transition-all hover:-translate-y-0.5 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <Icon className="size-5" aria-hidden />
              </ExternalLink>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-3 px-6 py-8 sm:px-10 md:grid-cols-[19rem_minmax(0,1fr)]">
        <aside aria-label={t('BuddyList')} className={`${card} space-y-2 bg-[#ececec]/70 p-2 dark:bg-[#222]/70`} style={delay(300)}>
          <Group title={t('FieldWork')} rows={jobs.map(companyRow)} t={t} at={360} />
          <Group title={t('FieldEducation')} rows={schools.map(companyRow)} t={t} at={420} />
          <Group title={t('FieldStack')} rows={stackRows} t={t} at={480} />
        </aside>

        <div className="space-y-3 self-start">
          <section className={`${card} p-4`} style={delay(380)}>
            <h2 className={fieldLabel}>{t('AboutMe')}</h2>

            <div className="mt-3">
              <p className="font-mono text-xs opacity-60">{t('Says', { name: t('Dev') })}</p>
              <div className="mt-1.5 max-w-prose space-y-3 rounded-2xl rounded-tl-sm bg-black/[0.05] px-4 py-3 text-base leading-relaxed dark:bg-white/[0.07]">
                {t('Description')
                  .split('\n\n')
                  .map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </section>

          <section className={`${card} p-4`} style={delay(440)}>
            <h2 className={fieldLabel}>{t('Recommendations')}</h2>

            <ul className="mt-3 space-y-4">
              {TESTIMONIALS.map((testimonial) => (
                <li key={testimonial.id}>
                  <blockquote className="relative rounded-2xl rounded-tl-sm bg-black/[0.05] px-4 py-3 dark:bg-white/[0.07]">
                    <Quote className="absolute -top-2 right-3 size-5 fill-cyan-500/30 text-cyan-500/60" aria-hidden />
                    <p lang="pt-BR" className="max-w-prose text-base leading-relaxed">
                      {testimonial.text}
                    </p>
                  </blockquote>

                  <div className="mt-3 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 font-mono text-sm font-medium text-white"
                    >
                      {testimonial.name
                        .split(' ')
                        .filter((word) => word[0] === word[0].toUpperCase())
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join('')}
                    </span>

                    <div className="min-w-0 leading-tight">
                      <ExternalLink href={testimonial.profile} className="truncate text-sm font-semibold underline-offset-2 hover:underline">
                        {testimonial.name}
                      </ExternalLink>
                      <p className="mt-0.5 text-xs opacity-70">{t(testimonial.role)}</p>
                      <p className="mt-0.5 font-mono text-[11px] opacity-50">{t('WorkedTogether', { date: formatDay(testimonial.date) })}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 font-mono text-[10px] opacity-40">{t('RecommendationsNote')}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
