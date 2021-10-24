import _ from 'lodash';

import { useSongs } from '../../../../../../state';
import { printLocation } from '../../../../../../types';
import { Container, Content, ControlMapper, Header, Title, Transpose } from '../../../../../components/';
import { TriggerEditor } from '../trigger-editor';
import { SongLocationEditor } from './song-location-editor';

interface Props {
  songId: number;
  cloneSelf: () => void;
  deleteSelf: () => void;
}

const SongEditor = ({ songId, cloneSelf, deleteSelf }: Props) => {
  const { songs, updateSong } = useSongs();
  const song = _.find(songs, { id: songId })!;

  return (
    <Container marginCollapse="left">
      <Header
        buttons={[
          ['clone', cloneSelf],
          ['delete', deleteSelf]
        ]}
      >
        <Title>Edit song</Title>
      </Header>
      <Content>
        <SongLocationEditor key={printLocation(song.location)} songId={songId} />
        <Transpose
          alternate
          transposition={song.transposition}
          setTransposition={(transposition) => updateSong(songId, { transposition })}
        />
        <TriggerEditor triggers={song.triggers} setTriggers={(triggers) => updateSong(songId, { triggers })} />
        <ControlMapper alternate mapping={song.mapping} setMapping={(mapping) => updateSong(songId, { mapping })} />
      </Content>
    </Container>
  );
};

export default SongEditor;
