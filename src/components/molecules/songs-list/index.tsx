import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

import { SongsType } from '@data/songs.ts';
import { techIcon } from '@utils/asset';

import { Equalizer } from '@atoms/equalizer.tsx';

type SongsListProps = {
  songs: SongsType[];
  currentId: number;
  favorites: number[];
  isPlaying: boolean;
  playMusic: (id: number) => void;
  toggleFavorite: (id: number) => void;
};

const SongsList = ({ songs, currentId, favorites, isPlaying, playMusic, toggleFavorite }: SongsListProps) => {
  const { t } = useTranslation();

  return (
    <ul className="px-2 pb-2">
      {songs.map(({ id, title, album, src }) => {
        const active = id === currentId;
        const favorite = favorites.includes(id);

        return (
          <li key={id} className={`group flex items-center rounded-lg transition-colors ${active ? 'bg-black/[0.07] dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <button type="button" onClick={() => playMusic(id)} aria-current={active} className="flex min-w-0 grow items-center gap-3 px-3 py-2 text-left">
              <span className="grid w-6 shrink-0 place-items-center font-mono text-xs opacity-50">
                {active ? <Equalizer playing={isPlaying} className="h-3.5 text-cyan-500 opacity-100" /> : String(id).padStart(2, '0')}
              </span>

              <img className="size-9 shrink-0 rounded-md shadow-sm" src={techIcon(src)} alt="" loading="lazy" />

              <span className={`min-w-0 grow truncate text-sm ${active ? 'font-semibold text-cyan-600 dark:text-cyan-400' : 'font-medium'}`}>{title}</span>

              <span className="hidden shrink-0 font-mono text-xs opacity-40 sm:block">{album}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(id)}
              aria-label={`${t('Like')}: ${title}`}
              aria-pressed={favorite}
              className="p-3"
            >
              <Heart className={`size-4 transition-all active:scale-125 ${favorite ? 'fill-red-500 text-red-500' : 'opacity-0 group-hover:opacity-40 group-focus-within:opacity-40'}`} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SongsList;
