import React from 'react';

import { AppContext } from '..';
import { compareHasLocation } from '../../types';
import { CRUD } from '../utils';

export const useSongs = () => {
  const { songs, setSongs } = React.useContext(AppContext);

  const [addSong, deleteSong, updateSong] = CRUD(songs, setSongs, (songs) => songs.sort(compareHasLocation));

  return { songs, setSongs, addSong, deleteSong, updateSong };
};
