import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { useSongs, useSynthesizers } from '../../../../../state';
import { Flex, Placeholder } from '../../../../components';
import { CueList } from './cue-list';
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
  const { songs, cloneSong, deleteSong } = useSongs();

  const cloneSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return; // trick type system
    const songId = selection.selectedId;
    const song = _.find(songs, { id: songId })!;

    const newSongId = cloneSong(song);
    setSelection({ type: 'song', selectedId: newSongId });
  }, [cloneSong, selection, songs]);

  const deleteSongAction = React.useCallback(() => {
    if (!(selection?.type === 'song')) return; // trick type system
    const songId = selection.selectedId;
    const song = _.find(songs, { id: songId })!;

    setSelection(undefined);
    deleteSong(song);
  }, [deleteSong, selection, songs]);

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
  }

  return (
    <StyledFlex align="stretch">
      <CueList selection={selection} setSelection={setSelection} />
      {mainDisplay}
    </StyledFlex>
  );
};
