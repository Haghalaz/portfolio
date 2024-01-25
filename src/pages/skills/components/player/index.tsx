import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { BsPause, BsPlay, BsSkipBackwardFill, BsSkipForwardFill } from 'react-icons/bs';
import { SongsType } from '@src/data/songs';

type PlayerProps = {
  player: ReactAudioPlayer | null | undefined;
  setPlayer: Dispatch<SetStateAction<ReactAudioPlayer | null | undefined>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  currentSong: SongsType;
  songs: SongsType[];
  playMusic: (index: number) => Promise<void>;
};

const AudioPlayer = ({ player, setPlayer, isPlaying, setIsPlaying, currentSong, songs, playMusic }: PlayerProps) => {
  const [durationSong, setDurationSong] = useState(0);
  const [timeSong, setTimeSong] = useState(0);

  const handlerChangeMusic = (direction: 'next' | 'prev') => () => {
    const current = currentSong.id - 1;

    if (direction === 'next' && current + 1 < songs.length) playMusic(current + 1);
    else if (direction === 'prev' && current - 1 >= 0) playMusic(current - 1);
  };

  const handleStopPlayMusic = async () => {
    const current = currentSong.id - 1;

    setIsPlaying(!isPlaying);

    if (!isPlaying == true) await playMusic(current);
    else player?.audioEl.current?.pause();
  };

  const formatDuration = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  const calculatePercentage = (value: number, total: number) => (total === 0 ? 0 : (value / total) * 100);

  return (
    <div className="grid h-full w-full grid-flow-col grid-cols-6 items-center gap-2 bg-[#f1f1f1] px-4 dark:bg-[#131313] lg:gap-12 lg:px-6">
      <ReactAudioPlayer
        ref={(element) => setPlayer(element)}
        onListen={(evt) => setTimeSong(evt)}
        onEnded={handlerChangeMusic('next')}
        onCanPlay={() => {
          setTimeSong(player?.audioEl.current?.currentTime || 0);
          setDurationSong(player?.audioEl.current?.duration || 0);
          isPlaying === true && player?.audioEl.current?.play();
        }}
        listenInterval={1000}
        className="h-full w-full rounded-none"
        src={currentSong?.audio}
      />

      <div className="col-span-2 flex items-center gap-2">
        <Avatar src={`https://skillicons.dev/icons?i=${currentSong?.src}`} size="lg" alt="avatar" variant="rounded" placeholder={undefined} />

        <div className="space-y-1 font-semibold">
          <p className="hidden text-sm leading-6 text-cyan-500 dark:text-cyan-400 lg:block">{`#${currentSong?.id}`}</p>
          <h2 className="hidden truncate text-sm leading-6 dark:text-white lg:block">{currentSong?.title}</h2>
        </div>
      </div>
      <div className="col-span-4 w-full lg:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-full  bg-gray-700 dark:bg-gray-700">
            <div className="left-0 top-0 h-1 w-full bg-cyan-500 dark:bg-cyan-400" style={{ width: `${calculatePercentage(timeSong, durationSong)}%` }} />
          </div>

          <div
            className="absolute top-1/2 -ml-2 -mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow ring-1 ring-cyan-500 dark:ring-cyan-400"
            style={{ left: `${calculatePercentage(timeSong, durationSong)}%` }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 ring-1 ring-inset ring-white/5 dark:bg-cyan-400"></div>
          </div>
        </div>
        <div className="flex justify-between py-2 text-sm font-medium tabular-nums leading-6">
          <div className="dark:text-slate-100 text-cyan-500">
            <Typography variant={'small'} placeholder={undefined}>
              {formatDuration(timeSong)}
            </Typography>
          </div>
          <div className="text-slate-500 dark:text-white">
            <Typography variant={'small'} placeholder={undefined}>
              {formatDuration(durationSong)}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between lg:px-8">
          <IconButton size="sm" onClick={handlerChangeMusic('prev')} disabled={currentSong.id === 1} placeholder={undefined}>
            <BsSkipBackwardFill />
          </IconButton>

          <IconButton onClick={handleStopPlayMusic} size="md" placeholder={undefined} className="rounded-full">
            {isPlaying ? <BsPause className="h-6 w-6" /> : <BsPlay className="h-6 w-6" />}
          </IconButton>

          <IconButton size="sm" onClick={handlerChangeMusic('next')} disabled={currentSong.id === songs.length} placeholder={undefined}>
            <BsSkipForwardFill />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
