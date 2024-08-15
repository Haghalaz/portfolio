import { useSongContext } from '@src/utils/contexts/songContext.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar.tsx';

export default function CurrentSong() {
  const { song } = useSongContext();

  if (!song) return null;

  return (
    <div className="absolute left-4 top-4 z-[999] animate-fade-in">
      <div className="flex items-center gap-2 opacity-40">
        <Avatar>
          <AvatarImage src={`https://skillicons.dev/icons?i=${song.src}`} alt={`${song.src} song cover`} />
          <AvatarFallback>{song.src}</AvatarFallback>
        </Avatar>

        <div className="tracking-widest text-white">
          <p>{song.title}</p>
          <small>
            {song.name} by {song.artist}
          </small>
        </div>
      </div>
    </div>
  );
}
