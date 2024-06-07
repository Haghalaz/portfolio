import { Player } from '@lottiefiles/react-lottie-player';
import { Avatar, IconButton, Typography } from '@material-tailwind/react';
import { MutableRefObject, useState } from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

export type SongCardProps = {
  id: number;
  title: string;
  album: string;
  src: string;
  active: boolean;
  animation: MutableRefObject<Player | undefined>
  playMusic: () => Promise<void>;
  handleOnFav: (id: number) => void;
}

export function SongCard({ id, title, album, src, active, animation, playMusic, handleOnFav }: SongCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked(!isChecked);
    handleOnFav(id)
  }

  return (
    <div
    key={id}
    onClick={playMusic}
    className={`grid cursor-pointer auto-cols-fr grid-flow-col items-center bg-[#d5d5d5] px-4 py-2 dark:bg-[#131313] ${
      active ? 'opacity-100' : 'opacity-70 hover:opacity-100 dark:opacity-40 dark:hover:opacity-100'
    }`}
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

    <IconButton  placeholder={null} variant='text' onClick={handleCheck}>
      {isChecked ? <BsFillHeartFill className="h-4 w-4 place-self-center" /> : <BsHeart className="h-4 w-4 place-self-center" />}
    </IconButton>
  </div>
  )
}