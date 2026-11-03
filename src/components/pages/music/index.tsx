import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Disc3, Heart, Library, Play } from 'lucide-react';
import { TFunction } from 'i18next';

import { useSongContext } from '@contexts/songContext.tsx';
import SONGS from '@data/songs.ts';
import usePersistentState from '@hooks/usePersistentState.ts';

import { AppLayout, SidebarSection } from '@molecules/app-layout';
import AudioPlayer from '@molecules/player';
import SongsList from '@molecules/songs-list';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

const ALBUMS = Array.from(new Set(SONGS.map(({ album }) => album)));

/** Music-style app: every "song" is a skill, every album a group of skills. */
export default function Music({ t }: PageProps) {
  const { setSong, setPlaying } = useSongContext();
  // Once something has played, the track stays in the menu bar (paused) so it can be resumed from there.
  const [started, setStarted] = useState(false);

  const [player, setPlayer] = useState<ReactAudioPlayer | null>();
  // Browsing state and likes survive reloads; playback itself never autostarts.
  const [view, setView] = usePersistentState('music-view', 'all');
  const [favorites, setFavorites] = usePersistentState<number[]>('music-favorites', []);
  const [currentId, setCurrentId] = usePersistentState('music-current', SONGS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = SONGS.find(({ id }) => id === currentId) ?? SONGS[0];

  const visible = SONGS.filter(({ id, album }) => view === 'all' || (view === 'liked' ? favorites.includes(id) : album === view));

  const sections: SidebarSection[] = [
    {
      heading: t('Library'),
      items: [
        { id: 'all', label: t('AllSkills'), icon: Library, count: SONGS.length },
        { id: 'liked', label: t('Fav'), icon: Heart, count: favorites.length },
      ],
    },
    {
      heading: t('Albums'),
      items: ALBUMS.map((album) => ({ id: album, label: album, icon: Disc3, count: SONGS.filter((song) => song.album === album).length })),
    },
  ];

  const title = view === 'all' ? t('AllSkills') : view === 'liked' ? t('Fav') : view;

  const playMusic = async (id: number) => {
    setCurrentId(id);
    setIsPlaying(true);

    await player?.audioEl.current?.play();
  };

  const toggleFavorite = (id: number) => setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  useEffect(() => {
    if (isPlaying) setStarted(true);
  }, [isPlaying]);

  useEffect(() => {
    setSong(started || isPlaying ? currentSong : null);
    setPlaying(isPlaying);
  }, [started, isPlaying, currentSong, setSong, setPlaying]);

  return (
    <AppLayout label="Music" sections={sections} activeIds={[view]} onSelect={setView}>
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-end justify-between gap-4 px-5 pb-3 pt-6">
          <div>
            <h1 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h1>
            <p className="mt-1 font-mono text-xs opacity-50">{t('Skill', { count: visible.length })}</p>
          </div>

          <button
            type="button"
            onClick={() => visible[0] && playMusic(visible[0].id)}
            disabled={visible.length === 0}
            className="flex h-9 items-center gap-2 rounded-full bg-cyan-500 px-4 text-sm font-medium text-white shadow-md transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-30"
          >
            <Play className="size-3.5 fill-current" aria-hidden />
            {t('Play')}
          </button>
        </header>

        <div className="min-h-0 grow overflow-y-auto">
          {visible.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm opacity-60">{t('NoLikedSkills')}</p>
          ) : (
            <SongsList
              songs={visible}
              currentId={currentId}
              favorites={favorites}
              isPlaying={isPlaying}
              playMusic={playMusic}
              toggleFavorite={toggleFavorite}
            />
          )}
        </div>

        <AudioPlayer
          player={player}
          setPlayer={setPlayer}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          songs={visible}
          playMusic={playMusic}
        />
      </div>
    </AppLayout>
  );
}
