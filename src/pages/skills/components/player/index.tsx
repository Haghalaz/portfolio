import { Avatar, IconButton, Slider, Tooltip, Typography } from '@material-tailwind/react';
import { Dispatch, SetStateAction, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { BsPause, BsPlay, BsSkipBackwardFill, BsSkipForwardFill } from 'react-icons/bs';
import { SongsType } from '@src/data/songs';
import { IoVolumeLow } from 'react-icons/io5';

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
  const [volumeSong, setVolumeSong] = useState(10);

  const handlerChangeMusic = (direction: 'next' | 'prev') => () => {
    const current = currentSong.id - 1;

    if (direction === 'next' && current + 1 < songs.length) playMusic(current + 1);
    else if (direction === 'prev' && current - 1 >= 0) playMusic(current - 1);
  };

  const handleStopPlayMusic = async () => {
    const current = currentSong.id - 1;

    setIsPlaying(!isPlaying);

    if (!isPlaying) await playMusic(current);
    else player?.audioEl.current?.pause();
  };

  const formatDuration = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };

  const calculatePercentage = (value: number, total: number) => (total === 0 ? 0 : (value / total) * 100);

  return (
    <>
      <div className="flex h-full w-full grid-flow-col grid-cols-8 flex-col items-center justify-evenly gap-4 overflow-hidden bg-[#f1f1f1] px-4 dark:bg-[#131313] sm:grid lg:gap-4 lg:px-6">
        <ReactAudioPlayer
          ref={(element) => setPlayer(element)}
          onListen={(evt) => setTimeSong(evt)}
          onEnded={handlerChangeMusic('next')}
          volume={volumeSong / 100}
          onCanPlay={() => {
            setTimeSong(player?.audioEl.current?.currentTime || 0);
            setDurationSong(player?.audioEl.current?.duration || 0);
            isPlaying && player?.audioEl.current?.play();
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          listenInterval={1000}
          className="h-full w-full rounded-none"
          src={currentSong?.audio}
        />

        <div className="col-span-2 flex justify-between gap-4 sm:flex-col ">
          <div className="flex items-center justify-center gap-2 lg:justify-start">
            <Avatar src={`https://skillicons.dev/icons?i=${currentSong?.src}`} size="lg" alt="avatar" variant="rounded" />

            <div className="hidden space-y-1 font-semibold lg:block">
              <p className="text-sm leading-6 text-cyan-500 dark:text-cyan-400">{`#${currentSong?.id}`}</p>
              <h2 className="truncate text-sm leading-6 dark:text-white">{currentSong?.title}</h2>
            </div>
          </div>

          <Tooltip content={`${volumeSong}%`}>
            <div className="flex w-full max-w-max items-center gap-2">
              <IoVolumeLow className="size-4" />

              <input
                value={volumeSong}
                onChange={(evt) => setVolumeSong(Number(evt.target.value))}
                className="volume cursor-pointer rounded-full"
                type="range"
                name="Volume control"
                min="0"
                max="100"
              />
            </div>
          </Tooltip>
        </div>

        <div className="col-span-6 w-full lg:px-8">
          <Slider size="sm" color="cyan" defaultValue={calculatePercentage(timeSong, durationSong)} value={calculatePercentage(timeSong, durationSong)} />

          <div className="flex justify-between py-2 text-sm font-medium tabular-nums leading-6">
            <div className="dark:text-slate-100 text-cyan-500">
              <Typography variant="small">{formatDuration(timeSong)}</Typography>
            </div>
            <div className="text-slate-500 dark:text-white">
              <Typography variant="small">{formatDuration(durationSong)}</Typography>
            </div>
          </div>

          <div className="flex items-center justify-between lg:px-8">
            <IconButton aria-label="Previous song" size="sm" onClick={handlerChangeMusic('prev')} disabled={currentSong.id === 1}>
              <BsSkipBackwardFill />
            </IconButton>

            <IconButton aria-label="Play/Pause song" onClick={handleStopPlayMusic} size="md" className="rounded-full">
              {isPlaying ? <BsPause className="h-6 w-6" /> : <BsPlay className="h-6 w-6" />}
            </IconButton>

            <IconButton aria-label="Next Song" onClick={handlerChangeMusic('next')} size="sm" disabled={currentSong.id === songs.length}>
              <BsSkipForwardFill />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
