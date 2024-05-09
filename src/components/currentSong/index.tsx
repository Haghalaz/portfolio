import { useSongContext } from '@src/utils/contexts/songContext.tsx';
import { Avatar } from '@material-tailwind/react';

export default function CurrentSong() {
  const { song } = useSongContext();

  return (
    song && (
      <div className="absolute left-4 top-4 z-0 opacity-40">
        <div className="flex items-center gap-2">
          <Avatar src={`https://skillicons.dev/icons?i=${song.src}`} size="md" alt="avatar" variant="rounded" placeholder={undefined} />

          <div className="tracking-widest">
            <p>{song.title}</p>
            <small>
              {song.name} by {song.artist}
            </small>
          </div>
        </div>
      </div>
    )
  );
}
