import { useEffect, useRef, useState } from 'react';
import { TFunction } from 'i18next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Flower2, Heart, Info } from 'lucide-react';

import PROJECTS from '@data/projects.ts';
import usePersistentState from '@hooks/usePersistentState.ts';

import { AppLayout, SidebarSection } from '@molecules/app-layout';
import { GithubIcon } from '@atoms/brand-icon.tsx';
import { ExternalLink } from '@atoms/external-link.tsx';
import { ProjectCover } from '@atoms/project-cover.tsx';
import { TechChip } from '@atoms/tech-chip.tsx';

type PageProps = {
  t: TFunction<'translation', undefined>;
};

type Album = 'library' | 'favorites';

const pad = (value: number) => String(value).padStart(2, '0');

/** Photos-style app: the library grid is the project gallery, the viewer is the project page. */
export default function Photos({ t }: PageProps) {
  const [album, setAlbum] = useState<Album>('library');
  const [favorites, setFavorites] = usePersistentState<number[]>('photos-favorites', []);
  const [selected, setSelected] = useState<number | null>(null); // project id
  const [showInfo, setShowInfo] = useState(true);

  const backButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = PROJECTS.filter(({ id }) => album === 'library' || favorites.includes(id));
  const position = visible.findIndex(({ id }) => id === selected);
  const project = position === -1 ? null : visible[position];

  const sections: SidebarSection[] = [
    {
      heading: t('Library'),
      items: [
        { id: 'library', label: t('AllProjects'), icon: Flower2, count: PROJECTS.length },
        { id: 'favorites', label: t('Favorites'), icon: Heart, count: favorites.length },
      ],
    },
  ];

  const toggleFavorite = (id: number) => setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const close = () => {
    setSelected(null);
    lastTrigger.current?.focus();
  };

  const go = (direction: 1 | -1) => {
    if (position === -1) return;
    setSelected(visible[(position + direction + visible.length) % visible.length].id);
  };

  useEffect(() => {
    if (selected !== null) backButton.current?.focus();
  }, [selected]);

  const onViewerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
    } else if (event.key === 'ArrowRight') go(1);
    else if (event.key === 'ArrowLeft') go(-1);
  };

  const iconButton = 'grid size-9 place-items-center rounded-md transition-colors hover:bg-white/15 disabled:opacity-30';

  return (
    <div className="relative h-full dark:text-white">
      <AppLayout label="Photos" sections={sections} activeIds={[album]} onSelect={(id) => setAlbum(id as Album)}>
        <div className="h-full overflow-auto bg-[#f1f1f1]/80 dark:bg-stone-900/80">
          <header className="flex items-end justify-between gap-2 px-4 pb-3 pt-6 sm:px-6">
            <div>
              <h1 className="reveal font-display text-2xl leading-tight sm:text-4xl">{album === 'library' ? t('Library') : t('Favorites')}</h1>
              <p className="reveal mt-1 text-sm opacity-60" style={{ '--d': '80ms' } as React.CSSProperties}>
                {album === 'library' ? t('ProjectsIntro') : t('Project', { count: visible.length })}
              </p>
            </div>
            <span className="font-mono text-xs opacity-50">{t('Project', { count: visible.length })}</span>
          </header>

          {visible.length === 0 ? (
            <p className="px-6 py-16 text-center text-sm opacity-60">{t('NoFavorites')}</p>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-1 px-1 pb-6 sm:px-2">
              {visible.map(({ id, title, src, current }, index) => (
                <li key={id} className="reveal" style={{ '--d': `${index * 70}ms` } as React.CSSProperties}>
                  <button
                    type="button"
                    onClick={(event) => {
                      lastTrigger.current = event.currentTarget;
                      setSelected(id);
                    }}
                    className="group relative block aspect-square w-full overflow-hidden bg-stone-300 dark:bg-stone-800"
                  >
                    <ProjectCover
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      src={src}
                      title={t(title)}
                      lazy
                    />
                    <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-2 pt-6 text-left text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      <span className="truncate">{t(title)}</span>
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </span>
                    {current && (
                      <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-cyan-200 backdrop-blur">
                        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-cyan-400" />
                        {t('YouAreHereShort')}
                      </span>
                    )}
                    {favorites.includes(id) && (
                      <Heart className="absolute bottom-2 left-2 size-4 fill-white text-white drop-shadow group-hover:opacity-0" aria-label={t('Favorites')} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </AppLayout>

      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(project.title)}
          className="absolute inset-0 z-50 flex animate-fade-in flex-col bg-stone-950 text-white"
          onKeyDown={onViewerKeyDown}
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
            <button
              ref={backButton}
              type="button"
              onClick={close}
              className="flex h-9 items-center gap-2 rounded-md px-2 text-sm transition-colors hover:bg-white/15"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {t('Back')}
            </button>

            <p className="truncate text-sm font-medium">
              {t(project.title)}{' '}
              <span className="ml-1 font-mono text-xs opacity-50">
                {pad(position + 1)} / {pad(visible.length)}
              </span>
            </p>

            <div className="flex items-center">
              <button
                type="button"
                className={iconButton}
                aria-label={t('Like')}
                aria-pressed={favorites.includes(project.id)}
                onClick={() => toggleFavorite(project.id)}
              >
                <Heart className={`size-4 transition-transform active:scale-125 ${favorites.includes(project.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button type="button" className={iconButton} aria-label={t('Info')} aria-pressed={showInfo} onClick={() => setShowInfo((value) => !value)}>
                <Info className="size-4" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 grow flex-col md:flex-row">
            <div className="relative flex min-h-0 grow items-center justify-center p-4">
              <ProjectCover
                key={project.id}
                src={project.src}
                title={t(project.title)}
                className="max-h-full max-w-full animate-pop rounded-md object-contain shadow-2xl"
              />

              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={t('Previous')}
                    onClick={() => go(-1)}
                    className={`${iconButton} absolute left-2 top-1/2 -translate-y-1/2 bg-black/40`}
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={t('Next')}
                    onClick={() => go(1)}
                    className={`${iconButton} absolute right-2 top-1/2 -translate-y-1/2 bg-black/40`}
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </>
              )}
            </div>

            {showInfo && (
              <aside
                key={project.id}
                className="shrink-0 animate-fade-in space-y-6 overflow-auto border-t border-white/10 p-5 md:w-80 md:border-l md:border-t-0"
              >
                <div className="space-y-3">
                  <h2 className="font-display text-2xl leading-tight">{t(project.title)}</h2>
                  <p className="text-sm leading-relaxed opacity-80">{t(project.description)}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">{t('TechnologiesUsed')}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <TechChip key={skill} id={skill} />
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  <ExternalLink
                    href={project.repo}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-stone-900 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <GithubIcon className="size-4" aria-hidden />
                    {t('ViewRepo')}
                  </ExternalLink>

                  {project.current && (
                    <span className="inline-flex h-10 items-center gap-2.5 rounded-md border border-cyan-400/40 bg-cyan-400/10 px-4 text-sm font-medium text-cyan-200">
                      <span aria-hidden className="size-2 animate-pulse rounded-full bg-cyan-400" />
                      {t('YouAreHere')}
                    </span>
                  )}

                  {project.demo && (
                    <ExternalLink
                      href={project.demo}
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-white/30 px-4 text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      <ArrowUpRight className="size-4" aria-hidden />
                      {t('ViewLive')}
                    </ExternalLink>
                  )}
                </div>
              </aside>
            )}
          </div>

          <ul className="flex shrink-0 justify-center gap-1 overflow-x-auto border-t border-white/10 p-2">
            {visible.map(({ id, title, src }) => (
              <li key={id}>
                <button
                  type="button"
                  aria-label={t(title)}
                  aria-current={id === project.id}
                  onClick={() => setSelected(id)}
                  className={`block h-12 w-16 overflow-hidden rounded transition-all ${id === project.id ? 'opacity-100 ring-2 ring-white' : 'opacity-50 hover:opacity-100'}`}
                >
                  <ProjectCover src={src} title={t(title)} className="size-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
