import { SongsType } from "@src/data/songs";
import { Dispatch, SetStateAction } from "react";

export type HandleFavProps = {
  setSongs: Dispatch<SetStateAction<SongsType[]>>
  songs: SongsType[]
}

export function useHandleFav({ setSongs, songs }: HandleFavProps) {
  function injectFavoriteOnSong(id: number) {
    const newSongs = songs.map((song) => {
      const songToBeUpdated = song.id === id;

      if (!songToBeUpdated) return song;

      return {
        ...song,
        favorite: !song.favorite,
      }
    });

    setSongs(newSongs);
  }

  function handleReorderSongsOnFav(id: number) {
    const song = songs.find((song) => song.id === id);

    if (!song) return;

    const newSongs = songs.filter((song) => song.id !== id);

    if (song.favorite) {
      newSongs.push(song);
    } else {
      newSongs.unshift(song);
    }

    setSongs(newSongs);
  }

  function handleOnFav(id: number) {
    injectFavoriteOnSong(id);
    handleReorderSongsOnFav(id)
  }

  return {
    handleOnFav,
  }
}