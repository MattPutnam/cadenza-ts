import React from 'react';

import _ from 'lodash';

import { useSongs } from '../../../../../../../state';
import { isValidLocation, parseLocation, printLocation, TriggerAction } from '../../../../../../../types';
import { Flex, Placeholder, TextField, Warning } from '../../../../../../components';
import { SongSelector } from '../../song-selector';

interface Props {
  action: TriggerAction;
  setAction: (action: TriggerAction) => void;
}

export const GotoEditor = ({ action, setAction }: Props) => {
  const { songs, findSong } = useSongs();
  const [error, setError] = React.useState<string | undefined>(undefined);

  if (action.type !== 'goto') {
    return <Placeholder>Wrong action type</Placeholder>;
  }

  if (songs.length === 0) {
    return <Placeholder>Add a song first</Placeholder>;
  }

  const selectedSong = findSong(action.songId)!;

  const setMeasure = (newMeasure: string) => {
    const trimmed = newMeasure.trim();
    if (isValidLocation(trimmed)) {
      setAction({ ...action, measure: parseLocation(trimmed) });
      setError(undefined);
    } else {
      setError('Invalid measure number');
    }
  };

  return (
    <Flex pad>
      <SongSelector selectedSong={selectedSong} setSelectedSong={(song) => setAction({ ...action, songId: song.id })} />
      <TextField label="Measure:" size={6} value={printLocation(action.measure)} setValue={setMeasure} />
      {error && <Warning>{error}</Warning>}
    </Flex>
  );
};
