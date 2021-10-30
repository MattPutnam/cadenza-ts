import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { useCues, useSongs } from '../../../../../state';
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
  const { cloneSong, deleteSong } = useSongs();
  const { cloneCue, deleteCue } = useCues();

  const cloneSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return;
    const newSongId = cloneSong(selection.selectedId);
    if (newSongId !== undefined) {
      setSelection({ type: 'song', selectedId: newSongId });
    }
  }, [cloneSong, selection]);

  const deleteSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return;
    setSelection(undefined);
    deleteSong(selection.selectedId);
  }, [deleteSong, selection]);

  const cloneCueAction = React.useCallback(() => {
    if (!(selection?.type === 'cue')) return;
    const newCueId = cloneCue(selection.selectedId);
    if (newCueId !== undefined) {
      setSelection({ type: 'cue', selectedId: newCueId });
    }
  }, [cloneCue, selection]);

  const deleteCueAction = React.useCallback(() => {
    if (!(selection?.type === 'cue')) return;
    setSelection(undefined);
    deleteCue(selection.selectedId);
  }, [deleteCue, selection]);

  let mainDisplay: React.ReactNode;
  if (selection && selection.type === 'globals') {
    mainDisplay = <GlobalsEditor />;
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
