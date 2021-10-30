import React from 'react';

import _ from 'lodash';

import { AppContext } from '..';
import { compareHasLocation, Cue, generateNext, Song } from '../../types';
import { findId, findIds } from '../../utils/id';
import { CRUD } from '../utils';

export const useSongs = () => {
  const { songs, setSongs, cues, setState } = React.useContext(AppContext);

  const transform = (songs: Song[]) => {
    songs.sort(compareHasLocation);
    return songs;
  };
  const [createSong, findSong, updateSong] = CRUD(songs, setSongs, transform);

  const cloneSong = (songId: number) => {
    const song = findSong(songId);
    if (!song) return;

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

    const songCues = cues.filter((cue) => cue.songId === song.id);
    const newCueIds = findIds(cues, songCues.length);
    const newCuesWithIndices = _.zip(songCues, newCueIds);
    const clonedCues: Cue[] = newCuesWithIndices.map(([cue, id]) => ({
      id: id!,
      songId: newSongId,
      patchUsages: _.cloneDeep(cue!.patchUsages),
      location: cue!.location,
      transposition: cue!.transposition,
      triggers: _.cloneDeep(cue!.triggers),
      mapping: { ...cue!.mapping }
    }));

    setState({ songs: [...songs, newSong], cues: [...cues, ...clonedCues] });
    return newSongId;
  };

  const deleteSong = (songId: number) => {
    const newSongs = [...songs];
    _.remove(newSongs, { id: songId });
    const newCues = [...cues];
    _.remove(newCues, { songId: songId });

    setState({ songs: newSongs, cues: newCues });
  };

  return { songs, setSongs, createSong, findSong, updateSong, deleteSong, cloneSong };
};
