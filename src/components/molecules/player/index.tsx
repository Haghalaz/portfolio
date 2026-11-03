import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useTranslation } from 'react-i18next';
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume1, Volume2, VolumeX } from 'lucide-react';

import { Slider } from '@atoms/slider.tsx';
import { useSongContext } from '@contexts/songContext.tsx';
import { SongsType } from '@data/songs.ts';
import usePersistentState from '@hooks/usePersistentState.ts';
import { asset, techIcon } from '@utils/asset';

type PlayerProps = {
  player: ReactAudioPlayer | null | undefined;
  setPlayer: Dispatch<SetStateAction<ReactAudioPlayer | null | undefined>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentSong: SongsType;
  songs: SongsType[];
  playMusic: (id: number) => void;
};

type RepeatMode = 'off' | 'all' | 'one';

type Preferences = {
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
};

const DEFAULT_PREFERENCES: Preferences = { volume: 30, muted: false, shuffle: false, repeat: 'off' };
const REPEAT_ORDER: RepeatMode[] = ['off', 'all', 'one'];

const control = 'grid place-items-center rounded-full transition-all hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-30';

const formatDuration = (seconds: number) =>
  Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '0:00';

const calculatePercentage = (value: number, total: number): number => (total === 0 || !Number.isFinite(total) ? 0 : (value / total) * 100);

/** Now-playing bar: track + transport (shuffle, repeat, prev/next) + seek + volume. Preferences persist in localStorage. */
const AudioPlayer = ({ player, setPlayer, isPlaying, setIsPlaying, currentSong, songs, playMusic }: PlayerProps) => {
  const { t } = useTranslation();
  const [durationSong, setDurationSong] = useState(0);
  const [timeSong, setTimeSong] = useState(0);
  // Position (in %) while the seek thumb is being dragged; the audio only jumps when it is released.
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const [stored, setPreferences] = usePersistentState<Partial<Preferences>>('music-player', {});
  const { volume, muted, shuffle, repeat } = { ...DEFAULT_PREFERENCES, ...stored };

  const audio = () => player?.audioEl.current;
  const patch = (next: Partial<Preferences>) => setPreferences((current) => ({ ...current, ...next }));

  const position = songs.findIndex(({ id }) => id === currentSong.id);
  // When the current skill is outside the filtered view, "next" starts from its top.
  const previousSong = position > 0 ? songs[position - 1] : undefined;

  const pickNext = () => {
    if (shuffle) {
      const others = songs.filter(({ id }) => id !== currentSong.id);
      return others[Math.floor(Math.random() * others.length)];
    }

    return songs[position + 1] ?? (repeat === 'all' ? songs[0] : undefined);
  };

  const nextSong = pickNext();
  const canNext = shuffle ? songs.length > 1 : position + 1 < songs.length || repeat === 'all';

  const goNext = () => {
    const target = pickNext();
    if (target) playMusic(target.id);
    else setIsPlaying(false);
  };

  const goPrevious = () => {
    // Like every player: restart the track first, go back only when it has just started.
    if (timeSong > 3 || !previousSong) {
      const element = audio();
      if (element) element.currentTime = 0;
      setTimeSong(0);
    } else playMusic(previousSong.id);
  };

  const handleStopPlayMusic = () => {
    if (isPlaying) audio()?.pause();
    else
      audio()
        ?.play()
        .catch(() => setIsPlaying(false));

    setIsPlaying(!isPlaying);
  };

  const handleSeek = ([percentage]: number[]) => {
    setScrubbing(null);

    const element = audio();
    if (!element || !durationSong) return;

    element.currentTime = (percentage / 100) * durationSong;
    setTimeSong(element.currentTime);
  };

  // Let the menu bar's mini controls drive this same player (refreshed every render so they never go stale).
  const { controls } = useSongContext();
  useEffect(() => {
    controls.current = { toggle: handleStopPlayMusic, next: goNext, previous: goPrevious };
  });
  useEffect(() => () => void (controls.current = null), [controls]);

  const cycleRepeat = () => patch({ repeat: REPEAT_ORDER[(REPEAT_ORDER.indexOf(repeat) + 1) % REPEAT_ORDER.length] });

  const [accent, accentSecondary] = currentSong.color;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat;
  const toggle = (on: boolean) => (on ? 'text-cyan-500 opacity-100' : 'opacity-50 hover:opacity-100');

  const seek = (
    <>
      <span className="w-9 text-right">{formatDuration(scrubbing === null ? timeSong : (scrubbing / 100) * durationSong)}</span>
      <Slider
        label={t('Seek')}
        value={[scrubbing ?? calculatePercentage(timeSong, durationSong)]}
        step={0.5}
        onValueChange={([value]) => setScrubbing(value)}
        onValueCommit={handleSeek}
      />
      <span className="w-9">{formatDuration(durationSong)}</span>
    </>
  );

  return (
    <div
      className="relative grid shrink-0 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 overflow-hidden border-t border-black/10 px-4 py-3 transition-[background] duration-700 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] sm:gap-x-6 dark:border-white/10"
      style={{ background: `linear-gradient(90deg, ${accent}2e, ${accentSecondary}14 60%, transparent)` }}
    >
      <ReactAudioPlayer
        ref={(element) => setPlayer(element)}
        onListen={(evt) => setTimeSong(evt)}
        onEnded={goNext}
        loop={repeat === 'one'}
        volume={muted ? 0 : volume / 100}
        onCanPlay={() => {
          setTimeSong(audio()?.currentTime || 0);
          setDurationSong(audio()?.duration || 0);
          isPlaying && audio()?.play();
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        listenInterval={500}
        className="hidden"
        src={asset(currentSong.audio)}
      />

      <div className="flex min-w-0 items-center gap-3">
        <img key={currentSong.src} className="size-12 shrink-0 animate-pop rounded-xl shadow-lg" src={techIcon(currentSong.src)} alt="" />

        <div className="min-w-0 leading-tight">
          <p key={currentSong.id} className="animate-fade-in truncate text-sm font-semibold">
            {currentSong.title}
          </p>
          <p className="truncate font-mono text-[11px] opacity-50">{currentSong.album}</p>
        </div>
      </div>

      <div className="row-span-2 flex flex-col items-center gap-1 sm:row-span-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={t('Shuffle')}
            aria-pressed={shuffle}
            onClick={() => patch({ shuffle: !shuffle })}
            className={`${control} size-8 ${toggle(shuffle)}`}
          >
            <Shuffle className="size-4" />
          </button>

          <button type="button" aria-label={t('PreviousSong')} onClick={goPrevious} className={`${control} size-8`}>
            <SkipBack className="size-4 fill-current" />
          </button>

          <button
            type="button"
            aria-label={isPlaying ? t('Pause') : t('Play')}
            onClick={handleStopPlayMusic}
            className={`${control} size-11 bg-stone-900 text-white shadow-lg dark:bg-white dark:text-stone-900`}
          >
            {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 translate-x-px fill-current" />}
          </button>

          <button type="button" aria-label={t('NextSong')} onClick={goNext} disabled={!canNext || !nextSong} className={`${control} size-8`}>
            <SkipForward className="size-4 fill-current" />
          </button>

          <button
            type="button"
            aria-label={`${t('Repeat')}: ${t(repeat === 'off' ? 'RepeatOff' : repeat === 'all' ? 'RepeatAll' : 'RepeatOne')}`}
            aria-pressed={repeat !== 'off'}
            onClick={cycleRepeat}
            className={`${control} size-8 ${toggle(repeat !== 'off')}`}
          >
            <RepeatIcon className="size-4" />
          </button>
        </div>

        <div className="hidden w-full items-center gap-2 font-mono text-[10px] tabular-nums opacity-70 sm:flex">{seek}</div>
      </div>

      <div className="hidden items-center justify-end gap-2 sm:flex">
        <button
          type="button"
          aria-label={muted ? t('Unmute') : t('Mute')}
          aria-pressed={muted}
          onClick={() => patch({ muted: !muted })}
          className={`${control} size-7 opacity-70 hover:opacity-100`}
        >
          <VolumeIcon className="size-4" />
        </button>
        <Slider className="max-w-24" label={t('Volume')} value={[muted ? 0 : volume]} onValueChange={([value]) => patch({ volume: value, muted: false })} />
      </div>

      <div className="col-span-2 flex items-center gap-2 font-mono text-[10px] tabular-nums opacity-70 sm:hidden">{seek}</div>
    </div>
  );
};

export default AudioPlayer;
