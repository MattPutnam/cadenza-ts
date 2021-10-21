import React from 'react';

import _ from 'lodash';

import { useSongs } from '../../../../../../../state';
import { GotoTriggerAction, isValidLocation, parseLocation, TriggerAction } from '../../../../../../../types';
import { Flex, ObjectSelect, Placeholder, TextField, Warning } from '../../../../../../components';

interface Props {
  action: TriggerAction;
  setAction: (action: GotoTriggerAction) => void;
}

export const GotoEditor = ({ action, setAction }: Props) => {
  const { songs } = useSongs();
  const [error, setError] = React.useState<string | undefined>(undefined);

  if (!(action instanceof GotoTriggerAction)) {
    return <Placeholder>Wrong action type</Placeholder>;
  }

  if (songs.length === 0) {
    return <Placeholder>Add a song first</Placeholder>;
  }

  const selectedSong = _.find(songs, { id: action.songId })!;

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
