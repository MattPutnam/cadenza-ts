import React from 'react';

import _ from 'lodash';

import { useCues, useSongs } from '../../../../../state';
import { compareHasLocation, generateNext, LocationNumber, printLocation } from '../../../../../types';
import { Container, Content, Header, List, ListItem, ListSection, Title } from '../../../../components';
import { Selection } from './selection';

interface Props {
  selection: Selection;
  setSelection: (selection: Selection) => void;
}

export const CueList = ({ selection, setSelection }: Props) => {
  const { songs, createSong, findSong } = useSongs();
  const { cues, createCue, findCue } = useCues();

  const addSongAction = React.useCallback(() => {
    let newNumber: LocationNumber;
    if (_.isEmpty(songs)) {
      newNumber = { numberPart: 1 };
    } else if (!selection || selection.type === 'globals') {
      // nothing is selected, add to the end
      newNumber = generateNext(_.last(songs)!.location);
    } else if (selection.type === 'song') {
      // a song is selected, insert after
      const song = findSong(selection.selectedId)!;
      newNumber = generateNext(
        song.location,
        songs.map((s) => s.location)
      );
    } else {
      // a cue is selected, insert after its song
      const cue = findCue(selection.selectedId)!;
      const song = findSong(cue.songId)!;
      newNumber = generateNext(
        song.location,
        songs.map((s) => s.location)
      );
    }

    const newId = createSong({
      name: '',
      location: newNumber,
      transposition: 0,
      mapping: {},
      triggers: []
    });

    setSelection({ type: 'song', selectedId: newId });
  }, [createSong, findCue, findSong, selection, setSelection, songs]);

  const addCueAction = React.useCallback(() => {
    let resolvedSongId: number;
    let newNumber: LocationNumber;
    if (!selection || selection.type === 'globals') {
      // nothing is selected, add to the end of the last song
      const song = _.last(songs)!;
      const songCues = _.filter(cues, { songId: song.id }).sort(compareHasLocation);
      resolvedSongId = song.id;
      const lastCue = _.last(songCues);
      if (lastCue) {
        newNumber = generateNext(lastCue.location);
      } else {
        newNumber = { numberPart: 1 };
      }
    } else if (selection.type === 'song') {
      // a song is selected, add to the end of the song
      const songCues = _.filter(cues, { songId: selection.selectedId }).sort(compareHasLocation);
      resolvedSongId = selection.selectedId;
      const lastCue = _.last(songCues);
      if (lastCue) {
        newNumber = generateNext(lastCue.location);
      } else {
        newNumber = { numberPart: 1 };
      }
    } else {
      // a cue is selected, insert after
      const cue = findCue(selection.selectedId)!;
      const song = findSong(cue.songId)!;
      const songCues = _.filter(cues, { songId: song.id }).sort(compareHasLocation);
      resolvedSongId = song.id;
      newNumber = generateNext(
        cue.location,
        songCues.map((c) => c.location)
      );
    }

    const newId = createCue({
      songId: resolvedSongId,
      location: newNumber,
      patchUsages: [],
      mapping: {},
      triggers: []
    });

    setSelection({ type: 'cue', selectedId: newId });
  }, [createCue, cues, findCue, findSong, selection, setSelection, songs]);

  return (
    <Container flex="0 0 200px">
      <Header
        buttons={[
          ['addSong', addSongAction],
          ['add', addCueAction, _.isEmpty(songs)]
        ]}
      >
        <Title>Cues</Title>
      </Header>
      <Content>
        <List selectedItem={selection} setSelectedItem={setSelection}>
          <ListItem value={{ type: 'globals' }}>Global settings</ListItem>
          {songs.map((song, songIndex) => {
            const { name, location } = song;
            const songCues = _.filter(cues, { songId: song.id }).sort(compareHasLocation);

            return (
              <ListSection
                key={songIndex}
                title={`${printLocation(location)}: ${name}`}
                value={{ type: 'song', selectedId: song.id }}
              >
                {songCues.map((cue, cueIndex) => {
                  return (
                    <ListItem key={cueIndex} value={{ type: 'cue', selectedId: cue.id }}>
                      {`m. ${printLocation(cue.location)}`}
                    </ListItem>
                  );
                })}
              </ListSection>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};
