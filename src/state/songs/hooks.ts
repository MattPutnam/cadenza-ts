import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { compareHasLocation, Cue, generateNext, Song } from '../../types';
import { findId } from '../../utils/id';
import { CRUD } from '../utils';

export const useSongs = () => {
  const { songs, setSongs, cues, setState } = React.useContext(AppContext);

  const transform = (songs: Song[]) => {
    songs.sort(compareHasLocation);
    return songs;
  };
  const [createSong, findSong, updateSong] = CRUD(songs, setSongs, transform);

  const cloneSong = (song: Song) => {
    const newLocation = generateNext(
      song.location,
      songs.map((s) => s.location)
    );
    const newSongId = findId(songs);
    const newSong = {
      id: newSongId,
      name: song.name,
      location: newLocation,
      transposition: song.transposition,
      mapping: { ...song.mapping },
      triggers: _.cloneDeep(song.triggers)
    };

    let firstId = findId(cues);
    const clonedCues: Cue[] = cues
      .filter((cue) => cue.songId === song.id)
      .map((cue) => ({
        id: firstId++,
        songId: newSongId,
        patchUsages: _.cloneDeep(cue.patchUsages),
        location: cue.location,
        transposition: cue.transposition,
        triggers: _.cloneDeep(cue.triggers),
        mapping: { ...cue.mapping }
      }));

    setState({ songs: [...songs, newSong], cues: [...cues, ...clonedCues] });
    return newSongId;
  };

  const deleteSong = (song: Song) => {
    const newSongs = [...songs];
    _.remove(newSongs, { id: song.id });
    const newCues = [...cues];
    _.remove(newCues, { songId: song.id });

    setState({ songs: newSongs, cues: newCues });
  };

  return { songs, setSongs, createSong, findSong, updateSong, deleteSong, cloneSong };
};
