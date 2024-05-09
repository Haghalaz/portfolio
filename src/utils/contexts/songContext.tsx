import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { SongsType } from '@data/songs.ts';

interface SongContextType {
  song: SongsType | null;
  setSong: Dispatch<SetStateAction<SongsType | null>>;
}

const SongContext = createContext<SongContextType>({ song: null, setSong: () => {} });

export const SongProvider = ({ children }: { children: JSX.Element }) => {
  const [song, setSong] = useState<SongsType | null>(null);

  return <SongContext.Provider value={{ song, setSong }}>{children}</SongContext.Provider>;
};

export const useSongContext = () => useContext(SongContext);
