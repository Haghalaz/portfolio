import { Player } from '@lottiefiles/react-lottie-player';
import { SongsType } from '@src/data/songs';
import { useRef } from 'react';
import { SongCard } from '../songCard';

type SongsListProps = {
  songs: SongsType[];
  playMusic: (index: number) => Promise<void>;
  handleOnFav: (id: number) => void;
};

const SongsList = ({ songs, playMusic, handleOnFav }: SongsListProps) => {
  const animation = useRef<Player>();

  return (
    <>
      {songs.map(({ id, title, album, src, active }, index) => (
        <SongCard handleOnFav={handleOnFav} key={id} id={id} title={title} album={album} src={src} active={active} animation={animation} playMusic={() => playMusic(index)} />
      ))}
    </>
  );
};

export default SongsList;
