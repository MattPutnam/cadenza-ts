import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { Flex } from '..';
import { useSynthesizers } from '../../../state';
import { renderPatch } from './render-patch';
import { SearchSection } from './search-section';
import { Selection } from './selection';

export type PatchSelection = [string, string, number | [number, number]];
type PartialPatchSelection = [string, string | undefined, number | [number, number] | undefined];

interface Props {
  alternate?: boolean;
  initialSelection: PartialPatchSelection;
  onPatchSelected: (selection: PatchSelection) => void;
}

const MyContainer = styled(Flex)`
  overflow-y: hidden;
  height: 100%;
`;

export const PatchPicker: React.FC<Props> = ({ alternate, initialSelection, onPatchSelected }) => {
  const { synthesizers, synthTree } = useSynthesizers();

  const [selection, setSelection] = React.useState<PartialPatchSelection>(initialSelection);
  React.useEffect(() => {
    setSelection(initialSelection);
  }, [initialSelection, setSelection, synthTree]);

  const [selectedSynthName, selectedBankName, selectedPatchNumber] = selection;

  const synthOptions = synthesizers.map((synth) => synth.name);
  const selectedSynthTreeSynth = selectedSynthName ? _.find(synthTree, { name: selectedSynthName })! : undefined;

  const bankOptions = selectedSynthTreeSynth
    ? selectedSynthTreeSynth.banks.map((synthTreeBank) => synthTreeBank.name)
    : [];
  const selectedSynthTreeBank = selectedBankName
    ? _.find(selectedSynthTreeSynth!.banks, { name: selectedBankName })
    : undefined;

  const patchOptions = selectedSynthTreeBank ? selectedSynthTreeBank.patches : [];
  const selectedSynthTreePatch =
    selectedPatchNumber !== undefined
      ? _.find(selectedSynthTreeBank!.patches, { number: selectedPatchNumber })
      : undefined;

  const updateSelection = ([synth, bank, number]: [string, string, number | [number, number]]) => {
    setSelection([synth, bank, number]);
    onPatchSelected([synth, bank, number]);
  };

  return (
    <MyContainer align="stretch">
      <Selection
        options={synthOptions}
        selected={selectedSynthName}
        onChange={(newSynthName) => setSelection([newSynthName, undefined, undefined])}
        render={_.identity}
      />
      <Selection
        key={selectedSynthName ?? '<none>'}
        options={bankOptions}
        selected={selectedBankName}
        onChange={(newBankName) => setSelection([selectedSynthName, newBankName, undefined])}
        render={_.identity}
      />
      <Selection
        key={selectedBankName ?? '<none>'}
        options={patchOptions}
        terminal
        selected={selectedSynthTreePatch}
        render={(patch) => renderPatch(selectedSynthTreeBank!, patch)}
        onChange={(newPatch) => updateSelection([selectedSynthName!, selectedBankName!, newPatch.number])}
      />
      <SearchSection
        alternate={alternate}
        selectedPatch={initialSelection}
        setSelectedPatch={(selection) => updateSelection([selection.synthesizer, selection.bank, selection.number])}
      />
    </MyContainer>
  );
};
