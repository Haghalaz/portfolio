import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from '@use-gesture/react';
import { Lock } from 'lucide-react';

import { asset } from '@utils/asset';
import useDateTime from '@hooks/useDateTime.tsx';

import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar.tsx';

type LockPageProps = {
  locked: boolean;
  onUnlock: () => void;
};

/** Distance (px) the screen must be dragged up before it lets go. */
const UNLOCK_DISTANCE = 140;

/** 00–04 night owl, 05–11 morning, 12–17 afternoon, 18–23 evening. */
const PERIODS = [
  { until: 5, greeting: 'GoodNight', phrase: 'PhraseNight' },
  { until: 12, greeting: 'GoodMorning', phrase: 'PhraseMorning' },
  { until: 18, greeting: 'GoodAfternoon', phrase: 'PhraseAfternoon' },
  { until: 24, greeting: 'GoodEvening', phrase: 'PhraseEvening' },
];

const periodOf = (hour: number) => PERIODS.find(({ until }) => hour < until) ?? PERIODS[3];

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties;

const LockPage = ({ locked, onUnlock }: LockPageProps) => {
  const { t } = useTranslation();
  const { time, date } = useDateTime();
  const enterButton = useRef<HTMLButtonElement>(null);

  // Stay mounted while the slide-up animation plays after unlocking.
  const [mounted, setMounted] = useState(true);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (locked) {
      setMounted(true);
      setDragY(0);
    }
  }, [locked]);

  useEffect(() => {
    if (!locked) return;

    enterButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') onUnlock();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [locked, mounted, onUnlock]);

  // Drag the lock screen up like a phone; release past the threshold (or flick) to unlock.
  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], direction: [, dy], last, first }) => {
      if (first) setDragging(true);

      if (!last) return setDragY(Math.min(0, my));

      setDragging(false);
      if (my < -UNLOCK_DISTANCE || (vy > 0.6 && dy < 0 && my < -30)) onUnlock();
      else setDragY(0);
    },
    { axis: 'y', filterTaps: true, pointer: { touch: true } }
  );

  if (!mounted) return null;

  const progress = Math.min(1, Math.abs(dragY) / UNLOCK_DISTANCE);
  const { greeting, phrase } = periodOf(new Date().getHours());
  const firstName = t('Dev').split(' ')[0];

  return (
    <div
      {...bind()}
      role="dialog"
      aria-label={t('Enter')}
      className={`absolute z-[99] flex size-full touch-none flex-col items-center justify-between bg-black/25 py-12 text-white backdrop-blur-md sm:py-16 ${
        locked ? (dragging ? '' : 'animate-fade-in') : 'pointer-events-none animate-unlock'
      }`}
      style={
        {
          '--drag': `${dragY}px`,
          ...(locked && {
            transform: `translateY(${dragY}px)`,
            opacity: 1 - progress * 0.6,
            transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s',
          }),
        } as React.CSSProperties
      }
      onAnimationEnd={(event) => event.target === event.currentTarget && !locked && setMounted(false)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      <div className="reveal relative flex flex-col items-center gap-3 text-center" style={delay(100)}>
        <p className="flex items-center gap-2 font-sans text-base font-medium text-white/85 first-letter:uppercase sm:text-lg">
          <Lock className="size-4" aria-hidden />
          {date}
        </p>
        <h1 className="font-display text-7xl font-light tabular-nums leading-none drop-shadow-lg sm:text-[9rem]">{time}</h1>
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="reveal flex flex-col items-center gap-4 text-center" style={delay(300)}>
          <Avatar className="size-20 shadow-2xl sm:size-24">
            <AvatarImage src={asset('assets/images/profilePic.webp')} alt="Luiz Coelho" />
            <AvatarFallback />
          </Avatar>

          <div>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              {t(greeting)}, <span className="text-cyan-300">{firstName}</span>
            </h2>
            <p className="mt-1 text-sm text-white/70">{t(phrase)}</p>
          </div>
        </div>

        <div className="reveal flex flex-col items-center gap-3" style={delay(500)}>
          <button
            ref={enterButton}
            type="button"
            onClick={onUnlock}
            className="h-10 rounded-full border border-white/40 bg-white/10 px-8 text-sm uppercase tracking-[0.2em] backdrop-blur transition-all hover:border-white/70 hover:bg-white/20 active:scale-95"
          >
            {t('Enter')}
          </button>

          <p className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
            <kbd className="rounded border border-white/30 px-1.5 py-px font-mono text-[10px] leading-none">↵</kbd>
            {t('SwipeHint')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockPage;
