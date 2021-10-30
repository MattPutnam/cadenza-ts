import _ from 'lodash';

import { useSongs } from '../../../../../../state';
import { printLocation } from '../../../../../../types';
import { Container, ControlMapper, Transpose } from '../../../../../components/';
import { TriggerEditor } from '../trigger-editor';
import { SongLocationEditor } from './song-location-editor';

interface Props {
  songId: number;
  cloneSelf: () => void;
  deleteSelf: () => void;
}

const SongEditor = ({ songId, cloneSelf, deleteSelf }: Props) => {
  const { findSong, updateSong } = useSongs();
  const song = findSong(songId)!;

  return (
    <Container
      marginCollapse="left"
      header={{
        title: 'Edit song',
        buttons: [
          ['clone', cloneSelf],
          ['delete', deleteSelf]
        ]
      }}
    >
      <SongLocationEditor key={printLocation(song.location)} songId={songId} />
      <Transpose
        alternate
        transposition={song.transposition}
        setTransposition={(transposition) => updateSong(songId, { transposition })}
      />
      <TriggerEditor triggers={song.triggers} setTriggers={(triggers) => updateSong(songId, { triggers })} />
      <ControlMapper alternate mapping={song.mapping} setMapping={(mapping) => updateSong(songId, { mapping })} />
    </Container>
  );
};

export default SongEditor;
