import { Song } from './../../types';

export type SongsActions = {
  setSongs: (songs: Song[]) => void;
};
