import { Player } from '@lottiefiles/react-lottie-player';
import { Avatar, Typography } from '@material-tailwind/react';
import { useRef } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { SongsType } from '@src/data/songs';

type SongsListProps = {
  songs: SongsType[];
  playMusic: (index: number) => Promise<void>;
};

const SongsList = ({ songs, playMusic }: SongsListProps) => {
  const animation = useRef<Player>();

  return (
    <>
      {songs.map(({ id, title, album, src, active }, index) => (
        <div
          key={id}
          onClick={() => playMusic(index)}
          className="grid cursor-pointer auto-cols-fr grid-flow-col items-center bg-[#d5d5d5] px-4 py-2 opacity-70 hover:opacity-100 dark:bg-[#131313] dark:opacity-40 dark:hover:opacity-100"
        >
          <div className={`font-mono col-span-1 place-self-center ${active ? 'opacity-100' : 'opacity-30'}'`}>
            {active ? (
              <Player
                ref={animation as React.LegacyRef<Player>}
                autoplay
                loop
                src="https://lottie.host/2e4b133d-d15e-48d5-b828-69d5216d0ddb/Rt97I38m61.json"
                style={{ height: '24px', width: '24px' }}
              />
            ) : (
              <Typography variant="small" placeholder={'Skill_Wave'}>
                {String(id).padStart(2, '0')}
              </Typography>
            )}
          </div>

          <div className="col-span-5 flex flex-row items-center gap-2">
            <Avatar src={`https://skillicons.dev/icons?i=${src}`} size="sm" alt="avatar" variant="rounded" placeholder={undefined} />

            <Typography className="font-mono truncate font-medium" variant="paragraph" placeholder={title}>
              {title}
            </Typography>
          </div>

          <Typography className="font-mono col-span-2 opacity-70" variant="small" placeholder={title}>
            {album}
          </Typography>

          <BsFillHeartFill className="h-4 w-4 place-self-center" />
        </div>
      ))}
    </>
  );
};

export default SongsList;
