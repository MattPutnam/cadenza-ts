import React from 'react';

import _ from 'lodash';

import { useSongs } from '../../../../../../../state';
import { GotoTriggerAction, isValidLocation, parseLocation } from '../../../../../../../types';
import { Flex, ObjectSelect, TextField, Warning } from '../../../../../../components';

interface Props {
  action: GotoTriggerAction;
  setAction: (action: GotoTriggerAction) => void;
}

export const GotoEditor = ({ action, setAction }: Props) => {
  const { songs } = useSongs();

  const selectedSong = _.find(songs, { id: action.songId })!;

  const [error, setError] = React.useState<string | undefined>(undefined);

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
      <ObjectSelect
        label="Song:"
        options={songs}
        render={(song) => `${song.location.toString()}. ${song.name}`}
        selected={selectedSong}
        setSelected={(song) => setAction({ ...action, songId: song.id })}
      />
      <TextField label="Measure:" size={6} value={action.measure.toString()} setValue={setMeasure} />
      {error && <Warning>{error}</Warning>}
    </Flex>
  );
};
