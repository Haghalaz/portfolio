import { Typography } from '@material-tailwind/react';
import { PageProps } from '@src/data/pages';
import SONGS from '@src/data/songs';
import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { LuWaves } from 'react-icons/lu';
import AudioPlayer from './components/player';
import SongsList from './components/songsList';

export default function Skills({ t }: PageProps) {
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

  return (
    <div className="grid h-full grid-rows-12">
      <div className="flex h-full w-full items-center gap-2 bg-[#f1f1f1]  px-4 py-2 dark:bg-[#131313]">
        <LuWaves className="h-5 w-5" />
        <Typography className="font-mono" variant="h5" placeholder={'Skill_Wave'}>
          Skill_Wave
        </Typography>
      </div>

      <div className="row-span-8 overflow-y-auto">
        <div className="px- grid auto-cols-fr grid-flow-col items-center bg-[#cfcfcf] px-4 py-2 font-bold dark:bg-[#262626] ">
          <Typography className="font-mono place-self-center dark:opacity-50" variant="small" placeholder={'Skill_Wave'}>
            #
          </Typography>

          <Typography className="font-mono col-span-5" variant="paragraph" placeholder={''}>
            {t('Skill')}
          </Typography>

          <Typography className="font-mono col-span-2" variant="small" placeholder={''}>
            {t('Album')}
          </Typography>

          <Typography className="font-mono col-span-1 place-self-center" variant="small" placeholder={''}>
            {t('Fav')}
          </Typography>
        </div>

        <SongsList songs={songs} playMusic={playMusic} />
      </div>

      <div className="row-span-3">
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
