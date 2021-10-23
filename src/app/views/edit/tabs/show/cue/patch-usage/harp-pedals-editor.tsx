import _ from 'lodash';

import { HarpPedalPosition, HarpPedalsPatchUsage } from '../../../../../../../types';
import { Center, ObjectSelect } from '../../../../../../components';
import { PatchUsageEditorProps } from './patch-usage-editor-props';
import { wrongType } from './wrong-type';

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const HarpPedalsEditor = ({ patchUsage, setPatchUsage }: PatchUsageEditorProps) => {
  if (!(patchUsage instanceof HarpPedalsPatchUsage)) {
    return wrongType;
  }

  const { pedalPositions } = patchUsage;
  const setPedalPositions = (index: number) => (value: HarpPedalPosition) => {
    const newPedalPositions = [...pedalPositions];
    newPedalPositions[index] = value;
    setPatchUsage(patchUsage.clone(newPedalPositions));
  };

  return (
    <Center pad>
      {notes.map((note, index) => {
        return (
          <HarpPedal
            key={index}
            baseKey={note}
            selectedPosition={pedalPositions[index]}
            setSelectedPosition={setPedalPositions(index)}
          />
        );
      })}
    </Center>
  );
};

interface HarpPedalProps {
  baseKey: string;
  selectedPosition: HarpPedalPosition;
  setSelectedPosition: (position: HarpPedalPosition) => void;
}

const HarpPedal = ({ baseKey, selectedPosition, setSelectedPosition }: HarpPedalProps) => {
  const options: { label: string; value: HarpPedalPosition }[] = [
    { label: `${baseKey}♭`, value: -1 },
    { label: `${baseKey}♮`, value: 0 },
    { label: `${baseKey}♯`, value: 1 }
  ];

  const selected = _.find(options, { value: selectedPosition })!;

  return (
    <ObjectSelect
      options={options}
      render={(option) => option.label}
      selected={selected}
      setSelected={(option) => setSelectedPosition(option.value)}
    />
  );
};
