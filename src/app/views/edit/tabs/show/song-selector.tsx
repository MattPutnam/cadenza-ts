import { useSongs } from '../../../../../state';
import { Song } from '../../../../../types';
import { ObjectSelect } from '../../../../components';

interface Props {
  selectedSong: Song;
  setSelectedSong: (song: Song) => void;
}

export const SongSelector = ({ selectedSong, setSelectedSong }: Props) => {
  const { songs } = useSongs();

  return (
    <ObjectSelect
      label="Song:"
      options={songs}
      render={(song) => `${song.location.toString()}. ${song.name}`}
      selected={selectedSong}
      setSelected={setSelectedSong}
    />
  );
};
