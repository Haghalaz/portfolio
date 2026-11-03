import { Lock, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSongContext } from '@contexts/songContext.tsx';
import useDateTime from '@hooks/useDateTime.tsx';

import { Equalizer } from '@atoms/equalizer.tsx';

type MenuBarProps = {
  activeWindow?: string;
  onLock: () => void;
};

const control = 'grid size-5 place-items-center rounded transition-colors hover:bg-white/25 active:scale-90';

const MenuBar = ({ activeWindow, onLock }: MenuBarProps) => {
  const { t } = useTranslation();
  const { song, playing, controls } = useSongContext();
  const { time } = useDateTime();

  return (
    <header className="absolute inset-x-0 top-0 z-[90] flex h-8 items-center justify-between bg-black/30 px-4 text-white backdrop-blur-xl">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-display text-sm leading-none">{t('Dev')}</span>
        {activeWindow && (
          <span key={activeWindow} className="hidden animate-fade-in font-mono text-xs text-white/80 sm:inline">
            / {activeWindow}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs">
        {song && (
          // Now playing. Hover (or keyboard focus) slides a mini transport open: previous, play/pause, next.
          <div className="group flex max-w-[45vw] animate-fade-in items-center gap-2 rounded px-1.5 py-0.5 transition-colors focus-within:bg-white/10 hover:bg-white/10">
            <div className="flex min-w-0 items-center gap-2 transition-opacity" aria-live="polite" style={{ opacity: playing ? 0.95 : 0.6 }}>
              <Equalizer playing={playing} className="h-3 shrink-0" />
              <span className="truncate">
                {song.title} · {song.name}
              </span>
            </div>

            <div className="flex max-w-0 items-center gap-0.5 overflow-hidden opacity-0 transition-all duration-200 group-focus-within:max-w-24 group-focus-within:opacity-100 group-hover:max-w-24 group-hover:opacity-100">
              <button type="button" aria-label={t('PreviousSong')} onClick={() => controls.current?.previous()} className={control}>
                <SkipBack className="size-3 fill-current" />
              </button>
              <button type="button" aria-label={playing ? t('Pause') : t('Play')} onClick={() => controls.current?.toggle()} className={control}>
                {playing ? <Pause className="size-3 fill-current" /> : <Play className="size-3 translate-x-px fill-current" />}
              </button>
              <button type="button" aria-label={t('NextSong')} onClick={() => controls.current?.next()} className={control}>
                <SkipForward className="size-3 fill-current" />
              </button>
            </div>
          </div>
        )}

        <button type="button" onClick={onLock} aria-label={t('Lock')} title={t('Lock')} className="rounded p-1 transition-colors hover:bg-white/20">
          <Lock className="size-3.5" />
        </button>

        <time className="font-mono tabular-nums">{time}</time>
      </div>
    </header>
  );
};

export default MenuBar;
