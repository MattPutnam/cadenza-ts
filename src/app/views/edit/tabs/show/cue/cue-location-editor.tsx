import React from 'react';

import _ from 'lodash';

import { useCues, useSongs } from '../../../../../../state';
import { isValidLocation, parseLocation, Song } from '../../../../../../types';
import { Button, Container, Content, Flex, TextField, Warning } from '../../../../../components';
import { SongSelector } from '../song-selector';

interface Props {
  cueId: number;
}

export const CueLocationEditor = ({ cueId }: Props) => {
  const { songs } = useSongs();
  const { cues, updateCue } = useCues();

  const cue = _.find(cues, { id: cueId })!;

  const [selectedSongId, setSelectedSongId] = React.useState(cue.songId);
  const [modified, setModified] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [selectedMeasure, setSelectedMeasure] = React.useState(cue.location);

  const selectedSong = _.find(songs, { id: selectedSongId })!;
  const setSelectedSong = (song: Song) => {
    setSelectedSongId(song.id);
    setModified(true);
  };

  const sameSongAndMeasureAsUnedited = selectedSongId === cue.songId && selectedMeasure.equals(cue.location);
  const conflict =
    !sameSongAndMeasureAsUnedited &&
    _.some(cues, (c) => c.songId === selectedSongId && selectedMeasure.equals(c.location));

  const measureUpdate = (measureText: string) => {
    const trimmed = measureText.trim();
    if (!isValidLocation(trimmed)) {
      setError('Not a valid measure number');
    } else {
      setError(undefined);
      setModified(true);
      setSelectedMeasure(parseLocation(trimmed));
    }
  };

  const save = () => {
    updateCue(cue.id, { songId: selectedSongId, location: selectedMeasure });
    setModified(true);
  };

  return (
    <Container alternate flex="none">
      <Content>
        <Flex pad>
          <SongSelector selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
          <TextField label="Measure:" size={6} value={selectedMeasure.toString()} setValue={measureUpdate} />
          {modified && <span>- Modified</span>}
          {error && <Warning>{error}</Warning>}
          {conflict && <Warning>Another cue with this song/measure already exists</Warning>}
          {modified && !error && !conflict && <Button onClick={save}>Save</Button>}
        </Flex>
      </Content>
    </Container>
  );
};
