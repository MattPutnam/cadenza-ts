import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { useSongs, useSynthesizers } from '../../../../../state';
import { Flex, Placeholder } from '../../../../components';
import { CueList } from './cue-list';
import { CueEditor } from './cue/cue-editor';
import { GlobalsEditor } from './globals-editor';
import { Selection } from './selection';
import SongEditor from './song/song-editor';

const StyledFlex = styled(Flex)`
  flex: 1 1 auto;
  overflow: hidden;
`;

export const ShowTab = () => {
  const [selection, setSelection] = React.useState<Selection>(undefined);
  const { synthesizers } = useSynthesizers();
  const { findSong, cloneSong, deleteSong } = useSongs();

  const cloneSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return; // trick type system
    const songId = selection.selectedId;
    const song = findSong(songId)!;

    const newSongId = cloneSong(song);
    setSelection({ type: 'song', selectedId: newSongId });
  }, [cloneSong, findSong, selection]);

  const deleteSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return; // trick type system
    const songId = selection.selectedId;
    const song = findSong(songId)!;

    setSelection(undefined);
    deleteSong(song);
  }, [deleteSong, findSong, selection]);

  const cloneCueAction = React.useCallback(() => {}, []);

  const deleteCueAction = React.useCallback(() => {}, []);

  let mainDisplay: React.ReactNode;
  if (selection && selection.type === 'globals') {
    mainDisplay = <GlobalsEditor />;
  } else if (synthesizers.length === 0) {
    mainDisplay = <Placeholder>Add a synthesizer in the Setup tab</Placeholder>;
  } else if (!selection) {
    mainDisplay = <Placeholder>Select a song or cue to edit it</Placeholder>;
  } else if (selection.type === 'song') {
    mainDisplay = (
      <SongEditor songId={selection.selectedId} cloneSelf={cloneSongAction} deleteSelf={deleteSongAction} />
    );
  } else if (selection.type === 'cue') {
    mainDisplay = <CueEditor cueId={selection.selectedId} cloneSelf={cloneCueAction} deleteSelf={deleteCueAction} />;
  }

  return (
    <StyledFlex align="stretch">
      <CueList selection={selection} setSelection={setSelection} />
      {mainDisplay}
    </StyledFlex>
  );
};
