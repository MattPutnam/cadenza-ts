import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { useSongs } from '../../../../../../state';
import { isValidLocation, parseLocation, printLocation } from '../../../../../../types';
import { Button, Container, Content, Flex, TextField, Warning } from '../../../../../components';

const StyledButton = styled(Button)`
  margin-right: 0.5rem;
`;

const StyledInput = styled(TextField)`
  flex: 1 1 auto;
`;

const Pre = styled.span`
  white-space: pre;
`;

interface Props {
  songId: number;
}

export const SongLocationEditor = ({ songId }: Props) => {
  const { songs, findSong, updateSong } = useSongs();
  const [songNumber, setSongNumber] = React.useState<string | undefined>(undefined);
  const [modified, setModified] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const song = findSong(songId)!;

  React.useEffect(() => {
    const song = findSong(songId);
    if (song) {
      setSongNumber(printLocation(song.location));
    } else {
      setSongNumber(undefined);
    }
  }, [findSong, songId, songs]);

  const updateSongNumber = React.useCallback(
    (numberString: string) => {
      const trimmed = numberString.trim();
      const trimmedTL = trimmed.toLowerCase();
      if (!isValidLocation(trimmed)) {
        setError('Not a valid song number');
      } else if (
        trimmedTL !== printLocation(song.location).toLowerCase() &&
        _.some(songs, (s) => printLocation(s.location).toLowerCase() === trimmedTL)
      ) {
        setError('Another song already has this number');
      } else {
        setError(undefined);
      }

      setSongNumber(trimmed);
      setModified(true);
    },
    [songs, song.location]
  );

  const save = () => {
    updateSong(songId, { location: parseLocation(songNumber!) });
    setModified(false);
  };

  return (
    <Container alternate>
      <Content>
        <Flex pad>
          <TextField label="Number:" size={6} value={songNumber || ''} setValue={updateSongNumber} />
          {modified && <Pre> - Modified</Pre>}
          {error && <Warning>{error}</Warning>}
          {modified && !error && <StyledButton onClick={save}>Save</StyledButton>}
          <StyledInput label="Name:" value={song.name} setValue={(name) => updateSong(songId, { name })} />
        </Flex>
      </Content>
    </Container>
  );
};
