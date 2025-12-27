import { Player } from '@lottiefiles/react-lottie-player';
import { useRef } from 'react';
import { SongsType } from '@data/songs.ts';
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar.tsx';

type SongsListProps = {
  songs: SongsType[];
  playMusic: (index: number) => void;
  toggleFavorite: (index: number) => void;
};

const SongsList = ({ songs, playMusic, toggleFavorite }: SongsListProps) => {
  const animation = useRef<Player>(null);

  return (
    <>
      {songs.map(({ id, title, album, src, active, favorite }, index) => (
        <div
          key={id}
          onClick={() => playMusic(index)}
          className={`grid cursor-pointer auto-cols-fr grid-flow-col items-center px-4 py-2
            ${active ? 'bg-[#d5d5d5] dark:bg-[#131313]' : 'opacity-70 hover:opacity-100'}
          `}
        >
          {/* INDEX / ANIMAÇÃO */}
          <div className="col-span-1 place-self-center font-mono">
            {active ? (
              <Player
                ref={animation}
                autoplay
                loop
                src="https://lottie.host/2e4b133d-d15e-48d5-b828-69d5216d0ddb/Rt97I38m61.json"
                style={{ height: 24, width: 24 }}
              />
            ) : (
              <small>{String(id).padStart(2, '0')}</small>
            )}
          </div>

          {/* INFO */}
          <div className="col-span-5 flex items-center gap-2">
            <Avatar>
              <AvatarImage src={`https://skillicons.dev/icons?i=${src}`} />
              <AvatarFallback>{src}</AvatarFallback>
            </Avatar>
            <p className="truncate font-mono font-medium">{title}</p>
          </div>

          <small className="col-span-2 font-mono opacity-70">{album}</small>

          {/* FAVORITO */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(index);
            }}
            className="place-self-center"
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'opacity-40'}`} />
          </button>
        </div>
      ))}
    </>
  );
};

export default SongsList;
