import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSongContext } from '@contexts/songContext.tsx';

import SONGS from '@data/songs.ts';

import AudioPlayer from '@molecules/player';
import SongsList from '@molecules/songs-list';
import { Waves } from 'lucide-react';
import { TFunction } from 'i18next';

declare type PageProps = {
  t: TFunction<'translation', undefined>;
};

export default function Skills({ t }: PageProps) {
  const { setSong } = useSongContext();

  const [player, setPlayer] = useState<ReactAudioPlayer | null>();

  const [songs, setSongs] = useState(SONGS);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async (index: number) => {
    setCurrentSong(songs[index]);
    setIsPlaying(true);
    setSongs((prevSongs) => prevSongs.map(({ ...songs }, indexSongs) => (indexSongs === index ? { ...songs, active: true } : { ...songs, active: false })));

    await player?.audioEl.current?.play();
  };

  const toggleFavorite = (index: number) => {
    setSongs((prev) => prev.map((song, i) => (i === index ? { ...song, favorite: !song.favorite } : song)));
  };

  useEffect(() => {
    isPlaying ? setSong(currentSong) : setSong(null);
  }, [isPlaying, currentSong, setSong]);

  return (
    <div className="grid h-full grid-rows-12">
      <div className="flex h-full w-full items-center gap-2 bg-[#f1f1f1]  px-4 py-2 dark:bg-[#131313]">
        <Waves className="h-5 w-5" />
        <h5 className="font-mono">Skill_Wave</h5>
      </div>

      <div className="row-span-6 overflow-y-auto xl:row-span-8">
        <div className="px- grid auto-cols-fr grid-flow-col items-center bg-[#cfcfcf] px-4 py-2 font-bold dark:bg-[#262626] ">
          <small className="place-self-center font-mono dark:opacity-50">#</small>

          <p className="col-span-5 font-mono">{t('Skill')}</p>

          <small className="col-span-2 font-mono">{t('Album')}</small>

          <small className="col-span-1 place-self-center font-mono">{t('Fav')}</small>
        </div>

        <SongsList songs={songs} playMusic={playMusic} toggleFavorite={toggleFavorite} />
      </div>

      <div className="row-span-5 xl:row-span-3">
        <AudioPlayer
          player={player}
          setPlayer={setPlayer}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          songs={songs}
          playMusic={playMusic}
        />
      </div>
    </div>
  );
}
