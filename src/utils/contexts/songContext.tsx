import { createContext, Dispatch, MutableRefObject, SetStateAction, useContext, useRef, useState } from 'react';
import { SongsType } from '@data/songs.ts';

/** Transport commands the Music player exposes, so other parts of the desktop (the menu bar) can drive it. */
export type PlayerControls = {
  toggle: () => void;
  next: () => void;
  previous: () => void;
};

interface SongContextType {
  /** The track of the current listening session: set once something has played, kept while paused. */
  song: SongsType | null;
  setSong: Dispatch<SetStateAction<SongsType | null>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  /** Always-fresh handlers (a ref, so updating them never re-renders the tree). */
  controls: MutableRefObject<PlayerControls | null>;
}

const SongContext = createContext<SongContextType>({
  song: null,
  setSong: () => {},
  playing: false,
  setPlaying: () => {},
  controls: { current: null },
});

export const SongProvider = ({ children }: { children: JSX.Element }) => {
  const [song, setSong] = useState<SongsType | null>(null);
  const [playing, setPlaying] = useState(false);
  const controls = useRef<PlayerControls | null>(null);

  return <SongContext.Provider value={{ song, setSong, playing, setPlaying, controls }}>{children}</SongContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSongContext = () => useContext(SongContext);
